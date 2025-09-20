import React from 'react';

interface CodeEditorProps {
  code: string;
  onCodeChange: (newCode: string) => void;
  disabled: boolean;
  placeholder: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onCodeChange, disabled, placeholder }) => {
  return (
    <div className="relative h-[50vh] lg:h-auto bg-black/30 lg:rounded-bl-xl">
      <textarea
        value={code}
        onChange={(e) => onCodeChange(e.target.value)}
        disabled={disabled}
        className="w-full h-full p-4 bg-transparent text-zinc-300 font-mono text-sm resize-none border-0 focus:ring-0 placeholder-zinc-600 disabled:opacity-50"
        placeholder={placeholder}
        spellCheck="false"
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
      />
    </div>
  );
};

export default CodeEditor;