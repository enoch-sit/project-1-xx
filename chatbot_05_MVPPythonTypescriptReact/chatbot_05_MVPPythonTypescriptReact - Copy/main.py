from fastapi import FastAPI, HTTPException, Header, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import httpx
import json
import asyncio
import os
from contextlib import asynccontextmanager
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# API Configuration
EDUHK_API_URL = os.getenv("EDUHK_API_URL", "https://aai02.eduhk.hk/openai/deployments/gpt-4o-mini/chat/completions")
EDUHK_API_KEY = os.getenv("EDUHK_API_KEY")

# App Configuration
APP_HOST = os.getenv("APP_HOST", "0.0.0.0")
APP_PORT = int(os.getenv("APP_PORT", "8000"))
APP_DEBUG = os.getenv("APP_DEBUG", "False").lower() == "true"

# Request/Response Models
class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]
    model: Optional[str] = "gpt-4o-mini"
    temperature: Optional[float] = 0.7
    max_tokens: Optional[int] = 1000
    stream: Optional[bool] = True
    stream_options: Optional[Dict[str, Any]] = {"include_usage": True}

# FastAPI App Configuration
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print(f"🔗 EDUHK API URL: {EDUHK_API_URL}")
    print(f"🔑 API Key Status: {'✅ Configured' if EDUHK_API_KEY else '❌ Not set'}")
    app.state.httpx_client = httpx.AsyncClient(timeout=300.0)
    yield
    # Shutdown
    await app.state.httpx_client.aclose()

app = FastAPI(
    title="Chatbot MVP Backend",
    description="FastAPI backend that proxies requests to EDUHK AI API with streaming support",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Configuration - Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Authentication dependency
async def verify_api_key(api_key: str = Header(None, alias="X-API-Key")):
    """
    Verify that API key is provided by the client or available in environment.
    Priority: Header API key > Environment variable
    """
    # Use client-provided API key if available, otherwise fallback to environment
    effective_api_key = api_key or EDUHK_API_KEY
    
    if not effective_api_key:
        raise HTTPException(
            status_code=401, 
            detail="API key required. Provide via X-API-Key header or EDUHK_API_KEY environment variable."
        )
    return effective_api_key

@app.get("/")
async def root():
    return {"message": "Chatbot MVP Backend API", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/chat/completions")
async def chat_completions(
    request: ChatRequest,
    effective_api_key: str = Depends(verify_api_key)
):
    """
    Proxy chat completions to EDUHK API with streaming support.
    Uses API key from header or environment variable.
    """
    
    # Prepare headers for EDUHK API
    headers = {
        "Content-Type": "application/json",
        "api-key": effective_api_key
    }
    
    # Prepare request payload
    payload = request.dict(exclude_none=True)
    
    try:
        if request.stream:
            # For streaming requests - REAL streaming implementation
            async def stream_response():
                async with app.state.httpx_client.stream(
                    'POST',
                    EDUHK_API_URL,
                    headers=headers,
                    json=payload,
                    timeout=300.0
                ) as response:
                    
                    # Check if request was successful
                    if response.status_code != 200:
                        raise HTTPException(
                            status_code=response.status_code,
                            detail=f"EDUHK API error: {await response.aread()}"
                        )
                    
                    # Stream chunks as they arrive - TRUE real-time streaming
                    async for chunk in response.aiter_text():
                        if chunk:
                            yield chunk
            
            return StreamingResponse(
                stream_response(),
                media_type="text/event-stream",
                headers={
                    "Cache-Control": "no-cache",
                    "Connection": "keep-alive",
                    "X-Accel-Buffering": "no",  # Disable nginx buffering
                }
            )
        else:
            # For non-streaming requests
            response = await app.state.httpx_client.post(
                EDUHK_API_URL,
                headers=headers,
                json=payload
            )
            
            if response.status_code != 200:
                raise HTTPException(
                    status_code=response.status_code,
                    detail=f"EDUHK API error: {response.text}"
                )
                
            return response.json()
                
    except httpx.RequestError as e:
        raise HTTPException(status_code=500, detail=f"Request to EDUHK API failed: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    
    # Check if API key is configured
    if not EDUHK_API_KEY:
        print("⚠️  WARNING: EDUHK_API_KEY not set in environment variables.")
        print("   You'll need to provide API key via X-API-Key header for each request.")
        print("   Consider setting EDUHK_API_KEY in your .env file for convenience.")
    else:
        print("✅ EDUHK API key loaded from environment variables.")
    
    print(f"🚀 Starting server on {APP_HOST}:{APP_PORT}")
    log_level = "debug" if APP_DEBUG else "info"
    uvicorn.run(app, host=APP_HOST, port=APP_PORT, log_level=log_level)