
import React from 'react';

interface ActionButtonProps {
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  disabled: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({ label, icon, isActive, onClick, disabled }) => {
  const baseClasses = 'flex items-center gap-2 px-4 py-2 rounded-md font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-950 focus:ring-violet-500 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const activeClasses = 'bg-violet-600 text-white shadow-lg';
  const inactiveClasses = 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default ActionButton;