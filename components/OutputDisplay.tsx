import React, { useState } from 'react';
import { Result, ActionType } from '../types';
import LoadingSpinner from './LoadingSpinner';

// Props
interface OutputDisplayProps {
  result: Result | null;
  isLoading: boolean;
  activeAction: ActionType;
}

// Markdown Renderer Component (Internal)
const MarkdownViewer: React.FC<{ content: string }> = ({ content }) => {
    const formattedContent = content.split('```').map((part, index) => {
      if (index % 2 === 1) { // This is a code block
        const lines = part.split('\n');
        const language = lines[0] || '';
        const code = lines.slice(1).join('\n');
        return (
          <pre key={index} className="bg-zinc-950/70 rounded-md p-4 my-4 overflow-x-auto">
            <code className={`language-${language}`}>{code}</code>
          </pre>
        );
      }
      return <span key={index}>{part}</span>;
    });

    return (
      <div className="prose prose-invert prose-sm sm:prose-base max-w-none text-zinc-300 prose-headings:text-violet-400 prose-strong:text-zinc-100 prose-a:text-fuchsia-400 p-4 sm:p-6">
         {formattedContent}
      </div>
    );
};

// HTML Renderer Component (Internal)
const HtmlRunner: React.FC<{ htmlContent: string; rawContent: string }> = ({ htmlContent, rawContent }) => {
  const [activeTab, setActiveTab] = useState<'render' | 'raw'>('render');

  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 p-2 border-b border-zinc-800 bg-zinc-900/50">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('render')}
            className={`px-3 py-1 text-sm rounded-md transition ${activeTab === 'render' ? 'bg-violet-600 text-white font-semibold' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}
            aria-pressed={activeTab === 'render'}
          >
            Rendered Output
          </button>
          <button
            onClick={() => setActiveTab('raw')}
            className={`px-3 py-1 text-sm rounded-md transition ${activeTab === 'raw' ? 'bg-violet-600 text-white font-semibold' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}
            aria-pressed={activeTab === 'raw'}
          >
            Raw Output
          </button>
        </div>
      </div>
      <div className="flex-grow relative bg-zinc-950">
        {activeTab === 'render' ? (
          <iframe
            srcDoc={htmlContent}
            title="Rendered HTML Output"
            className="w-full h-full border-0 bg-white"
            sandbox="allow-scripts allow-same-origin"
          />
        ) : (
          <div className="overflow-y-auto h-full">
            <MarkdownViewer content={rawContent} />
          </div>
        )}
      </div>
    </div>
  );
};


// Main Component
const OutputDisplay: React.FC<OutputDisplayProps> = ({ result, isLoading, activeAction }) => {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-zinc-400">
          <LoadingSpinner />
          <p className="mt-4 text-lg">AI is analyzing...</p>
        </div>
      );
    }

    if (!result) {
      return (
        <div className="flex items-center justify-center h-full text-zinc-500 p-4 sm:p-6">
          <p>Your code analysis will appear here.</p>
        </div>
      );
    }

    if (result.type === 'error') {
      return (
        <div className="p-4 sm:p-6 text-red-400">
          <h3 className="font-bold mb-2">Error</h3>
          <p className="whitespace-pre-wrap">{result.content}</p>
        </div>
      );
    }

    // Success case
    if (activeAction === ActionType.Run || activeAction === ActionType.Visualize) {
      // Look for a markdown block, optionally with 'html' tag
      const codeBlockMatch = result.content.match(/```(?:html\n)?([\s\S]*?)```/);
      const extractedCode = codeBlockMatch ? codeBlockMatch[1].trim() : null;

      const isHtml = extractedCode && (
        extractedCode.toLowerCase().startsWith('<!doctype html>') ||
        extractedCode.toLowerCase().startsWith('<html')
      );

      if (isHtml) {
        return <HtmlRunner htmlContent={extractedCode} rawContent={result.content} />;
      }
    }
    
    // Fallback for Explain, Debug, Generate, or non-HTML Run results
    return <MarkdownViewer content={result.content} />;
  };

  return (
    <div className="relative min-h-[50vh] lg:min-h-[60vh] bg-zinc-900/50 lg:rounded-br-xl lg:border-l border-zinc-800 overflow-hidden">
      {renderContent()}
    </div>
  );
};

export default OutputDisplay;