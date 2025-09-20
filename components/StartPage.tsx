import React, { useState } from 'react';

interface StartPageProps {
  onStart: (name: string) => void;
}

const StartPage: React.FC<StartPageProps> = ({ onStart }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name.trim());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-zinc-200 font-sans p-4">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">
          Codalyze
        </h1>
        <p className="mt-2 text-zinc-400">
          Your AI-powered assistant to explain, run, and debug code instantly.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mt-12 w-full max-w-sm">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name..."
            className="w-full px-4 py-3 bg-zinc-900/50 rounded-md text-zinc-200 placeholder-zinc-600 ring-1 ring-zinc-700 focus:ring-2 focus:ring-violet-500 focus:outline-none transition-shadow"
            aria-label="Enter your name"
            autoFocus
          />
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md font-semibold text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-950 focus:ring-violet-500 disabled:opacity-50 disabled:cursor-not-allowed bg-violet-600 text-white shadow-lg hover:bg-violet-700 disabled:hover:bg-violet-600"
          >
            Ask the AI
          </button>
        </div>
      </form>
    </div>
  );
};

export default StartPage;