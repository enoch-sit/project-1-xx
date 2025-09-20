import requests
import json

# Test the backend directly
url = "http://localhost:8000/chat/completions"

data = {
    "messages": [
        {"role": "user", "content": "Hello, this is a test"}
    ],
    "model": "gpt-4o-mini",
    "temperature": 0.7,
    "max_tokens": 100,
    "stream": True
}

print("Testing backend directly...")
response = requests.post(url, json=data, stream=True)

print(f"Status Code: {response.status_code}")
print(f"Headers: {response.headers}")

if response.status_code == 200:
    print("\nStreaming response:")
    for line in response.iter_lines():
        if line:
            line_str = line.decode('utf-8')
            print(f"Raw line: {line_str}")
            if line_str.startswith('data: '):
                data_part = line_str[6:].strip()
                if data_part != '[DONE]':
                    try:
                        chunk_data = json.loads(data_part)
                        if 'choices' in chunk_data and len(chunk_data['choices']) > 0:
                            content = chunk_data['choices'][0].get('delta', {}).get('content', '')
                            if content:
                                print(f"Content: {content}")
                        else:
                            print(f"Metadata chunk: {chunk_data}")
                    except json.JSONDecodeError as e:
                        print(f"JSON decode error: {e}")
else:
    print(f"Error: {response.text}")