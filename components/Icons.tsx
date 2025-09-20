import React from 'react';

const iconProps = {
  className: "w-5 h-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
};

export const SparklesIcon: React.FC = () => (
  <svg {...iconProps} xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm8 0a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0V6h-1a1 1 0 110-2h1V3a1 1 0 011-1zM5 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM11 9a1 1 0 100 2h2a1 1 0 100-2h-2zm3-5a1 1 0 011 1v2a1 1 0 11-2 0V5a1 1 0 011-1z" clipRule="evenodd" />
  </svg>
);

export const PlayIcon: React.FC = () => (
  <svg {...iconProps} xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
  </svg>
);

export const BugIcon: React.FC = () => (
  <svg {...iconProps} xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M9 2a1 1 0 00-1 1v1.172l-1.707.284A3 3 0 004 7.226V11a3 3 0 003 3h2a3 3 0 003-3V7.226a3 3 0 00-2.293-2.77L11 4.172V3a1 1 0 00-1-1H9zM8 8a1 1 0 00-1 1v1a1 1 0 002 0V9a1 1 0 00-1-1zm3 1a1 1 0 11-2 0 1 1 0 012 0zM7 14a1 1 0 00-1 1v1a1 1 0 102 0v-1a1 1 0 00-1-1zm4 0a1 1 0 00-1 1v1a1 1 0 102 0v-1a1 1 0 00-1-1z" clipRule="evenodd" />
  </svg>
);

export const CodeBracketIcon: React.FC = () => (
  <svg {...iconProps} xmlns="http://www.w3.org/2000/svg" >
    <path fillRule="evenodd" d="M6.28 5.22a.75.75 0 010 1.06L2.56 10l3.72 3.72a.75.75 0 01-1.06 1.06L.97 10.53a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 0zm7.44 0a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L17.44 10l-3.72-3.72a.75.75 0 010-1.06z" clipRule="evenodd" />
  </svg>
);

export const DocumentTextIcon: React.FC = () => (
    <svg {...iconProps} xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm2 5a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
    </svg>
);

export const ChartBarIcon: React.FC = () => (
    <svg {...iconProps} xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M3 12a1 1 0 011-1h2a1 1 0 110 2H4a1 1 0 01-1-1zm5-6a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm5 3a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zM2 17.5A1.5 1.5 0 013.5 16h13a1.5 1.5 0 010 3h-13A1.5 1.5 0 012 17.5z" clipRule="evenodd" />
    </svg>
);