import React, { useState } from 'react';
import { ActionType, Result } from './types';
import { INITIAL_CODE } from './constants';
import { getCodeAnalysis } from './services/geminiService';

import Header from './components/Header';
import CodeEditor from './components/CodeEditor';
import OutputDisplay from './components/OutputDisplay';
import ActionButton from './components/ActionButton';
import { BugIcon, PlayIcon, SparklesIcon, CodeBracketIcon, DocumentTextIcon, ChartBarIcon } from './components/Icons';
import StartPage from './components/StartPage';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [code, setCode] = useState<string>(INITIAL_CODE);
  const [activeAction, setActiveAction] = useState<ActionType>(ActionType.Explain);
  const [result, setResult] = useState<Result | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleStart = (name: string) => {
    setUserName(name);
    setHasStarted(true);
  };

  const handleActionSelect = (action: ActionType) => {
    const isGenerateAction = action === ActionType.Generate || action === ActionType.GenerateHTML;
    const wasGenerateAction = activeAction === ActionType.Generate || activeAction === ActionType.GenerateHTML;

    // UX improvement: clear editor when switching to a generate-like action
    if (isGenerateAction && !wasGenerateAction) {
      setCode('');
    }
    // UX improvement: restore initial code when switching from an empty generate-like action
    if (!isGenerateAction && wasGenerateAction && !code.trim()) {
      setCode(INITIAL_CODE);
    }
    
    setActiveAction(action);
    setResult(null); // Clear previous results when switching actions
  };

  const handleSubmit = async () => {
    const isGenerateAction = activeAction === ActionType.Generate || activeAction === ActionType.GenerateHTML;

    if (!code.trim()) {
      const message = isGenerateAction
        ? 'Please enter a description of what you want to generate.'
        : 'Please enter some code to analyze.';
      setResult({ type: 'error', content: message });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const analysis = await getCodeAnalysis(code, activeAction);
      setResult({ type: 'success', content: analysis });

      // If code was generated, populate the editor and switch to a follow-up action.
      if (isGenerateAction) {
        // Extract code from the markdown response
        const codeBlockMatch = analysis.match(/```(?:\w*\n)?([\s\S]*?)```/);
        if (codeBlockMatch && codeBlockMatch[1]) {
          const generatedCode = codeBlockMatch[1].trim();
          setCode(generatedCode); // Update the editor with the new code

          // Switch to a logical next action
          if (activeAction === ActionType.GenerateHTML) {
            handleActionSelect(ActionType.Run);
          } else {
            handleActionSelect(ActionType.Explain);
          }
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      setResult({ type: 'error', content: `Failed to get analysis. ${errorMessage}` });
    } finally {
      setIsLoading(false);
    }
  };
  
  const placeholder = activeAction === ActionType.Generate
    ? "Ask me to write some code...\ne.g., 'Create a React button component with a blue background'"
    : activeAction === ActionType.GenerateHTML
    ? "Describe the webpage you want to create...\ne.g., 'A simple portfolio page with a hero section'"
    : activeAction === ActionType.Visualize
    ? "Enter code that produces data to visualize...\ne.g., 'print([10, 20, 15, 30, 25])'"
    : "Paste your code here...";
  
  const SUBMIT_LABELS: Record<ActionType, string> = {
    [ActionType.Generate]: "Generate Code",
    [ActionType.GenerateHTML]: "Generate HTML",
    [ActionType.Explain]: "Explain Code",
    [ActionType.Run]: "Run Code",
    [ActionType.Debug]: "Debug Code",
    [ActionType.Visualize]: "Visualize Output",
  };

  if (!hasStarted) {
    return <StartPage onStart={handleStart} />;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 font-sans">
      <Header userName={userName} />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-zinc-900/50 rounded-xl shadow-2xl shadow-black/50 ring-1 ring-white/10">
            <div className="p-4 sm:p-6 border-b border-zinc-800">
              <div className="flex flex-wrap items-center gap-4">
                <ActionButton
                  label="Generate"
                  icon={<CodeBracketIcon />}
                  isActive={activeAction === ActionType.Generate}
                  onClick={() => handleActionSelect(ActionType.Generate)}
                  disabled={isLoading}
                />
                <ActionButton
                  label="Generate HTML"
                  icon={<DocumentTextIcon />}
                  isActive={activeAction === ActionType.GenerateHTML}
                  onClick={() => handleActionSelect(ActionType.GenerateHTML)}
                  disabled={isLoading}
                />
                <ActionButton
                  label="Run"
                  icon={<PlayIcon />}
                  isActive={activeAction === ActionType.Run}
                  onClick={() => handleActionSelect(ActionType.Run)}
                  disabled={isLoading}
                />
                <ActionButton
                  label="Explain"
                  icon={<SparklesIcon />}
                  isActive={activeAction === ActionType.Explain}
                  onClick={() => handleActionSelect(ActionType.Explain)}
                  disabled={isLoading}
                />
                 <ActionButton
                  label="Visualize"
                  icon={<ChartBarIcon />}
                  isActive={activeAction === ActionType.Visualize}
                  onClick={() => handleActionSelect(ActionType.Visualize)}
                  disabled={isLoading}
                />
                <ActionButton
                  label="Debug"
                  icon={<BugIcon />}
                  isActive={activeAction === ActionType.Debug}
                  onClick={() => handleActionSelect(ActionType.Debug)}
                   disabled={isLoading}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <CodeEditor 
                code={code} 
                onCodeChange={setCode} 
                disabled={isLoading}
                placeholder={placeholder}
              />
              <OutputDisplay result={result} isLoading={isLoading} activeAction={activeAction} />
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full max-w-xs flex items-center justify-center gap-3 mx-auto px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-950 focus:ring-violet-500 disabled:opacity-60 disabled:cursor-not-allowed bg-violet-600 text-white shadow-lg hover:bg-violet-700 disabled:hover:bg-violet-600"
            >
              {isLoading ? <LoadingSpinner /> : <SparklesIcon />}
              <span>{isLoading ? 'Thinking...' : SUBMIT_LABELS[activeAction]}</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;