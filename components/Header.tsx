import React from 'react';

interface HeaderProps {
  userName: string;
}

const Header: React.FC<HeaderProps> = ({ userName }) => {
  return (
    <header className="p-4 sm:p-6 lg:p-8 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">
        Codalyze
      </h1>
      <p className="mt-2 text-zinc-400">
        Welcome, {userName}! Let's explain, run, and debug some code.
      </p>
    </header>
  );
};

export default Header;