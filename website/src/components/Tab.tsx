import React, { useState } from 'react';

interface TabProps {
  children: React.ReactNode;
}

interface TabListProps {
  children: React.ReactNode;
}

interface TabPanelProps {
  children: React.ReactNode;
  selected: boolean;
}

interface TabButtonProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  id?: string;
}

const TabContext = React.createContext<{
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}>({
  selectedIndex: 0,
  setSelectedIndex: () => {},
});

export const Tab: React.FC<TabProps> = ({ children }) => {
  return <div className="tabs-container">{children}</div>;
};

export const TabList: React.FC<TabListProps> = ({ children }) => {
  return <div className="flex border-b border-gray-200 dark:border-gray-700">{children}</div>;
};

export const TabButton: React.FC<TabButtonProps> = ({ 
  selected, 
  onClick, 
  children, 
  id 
}) => {
  return (
    <button
      role="tab"
      id={id}
      aria-selected={selected}
      aria-controls={id ? `${id}-panel` : undefined}
      onClick={onClick}
      className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors ${
        selected
          ? 'text-ai-primary border-b-2 border-ai-primary bg-gray-50 dark:bg-gray-800'
          : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
      }`}
    >
      {children}
    </button>
  );
};

export const TabPanel: React.FC<TabPanelProps> = ({ children, selected }) => {
  if (!selected) return null;
  
  return (
    <div
      role="tabpanel"
      className="py-4"
    >
      {children}
    </div>
  );
};

export const TabPanels: React.FC<TabProps> = ({ children }) => {
  return <div className="tab-panels-container">{children}</div>;
};