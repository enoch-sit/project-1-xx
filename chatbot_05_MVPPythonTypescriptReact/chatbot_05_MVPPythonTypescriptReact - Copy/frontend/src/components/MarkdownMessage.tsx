import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css'; // You can change this to other themes

interface MarkdownMessageProps {
  content: string;
  className?: string;
}

const MarkdownMessage: React.FC<MarkdownMessageProps> = ({ content, className = '' }) => {
  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // Custom components for better styling
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <pre className={className}>
                <code {...props}>{children}</code>
              </pre>
            ) : (
              <code className={`inline-code ${className || ''}`} {...props}>
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="code-block">
              {children}
            </pre>
          ),
          blockquote: ({ children }) => (
            <blockquote className="markdown-blockquote">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="table-wrapper">
              <table className="markdown-table">
                {children}
              </table>
            </div>
          ),
          a: ({ href, children }) => (
            <a 
              href={href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="markdown-link"
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownMessage;