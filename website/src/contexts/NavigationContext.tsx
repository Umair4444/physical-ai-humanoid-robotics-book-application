import React, { createContext, useContext, useState } from 'react';

interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  chaptersCount: number;
}

interface Chapter {
  id: string;
  title: string;
  moduleId: string;
  order: number;
  duration: number;
}

interface Breadcrumb {
  label: string;
  href?: string;
}

type NavigationContextType = {
  currentModule: Module | null;
  currentChapter: Chapter | null;
  setCurrentModule: (module: Module) => void;
  setCurrentChapter: (chapter: Chapter) => void;
  breadcrumbs: Breadcrumb[];
  addBreadcrumb: (breadcrumb: Breadcrumb) => void;
  clearBreadcrumbs: () => void;
};

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentModule, setCurrentModuleState] = useState<Module | null>(null);
  const [currentChapter, setCurrentChapterState] = useState<Chapter | null>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);

  const setCurrentModule = (module: Module) => {
    setCurrentModuleState(module);
    // Adding breadcrumb for the module
    const breadcrumb: Breadcrumb = {
      label: module.title,
      href: `/docs/modules/${module.id}`
    };
    setBreadcrumbs([breadcrumb]);
  };

  const setCurrentChapter = (chapter: Chapter) => {
    setCurrentChapterState(chapter);
    // Adding breadcrumb for the chapter
    const breadcrumb: Breadcrumb = {
      label: chapter.title,
      href: `/docs/modules/${chapter.moduleId}/chapters/${chapter.id}`
    };
    setBreadcrumbs(prev => [...prev, breadcrumb]);
  };

  const addBreadcrumb = (breadcrumb: Breadcrumb) => {
    setBreadcrumbs(prev => [...prev, breadcrumb]);
  };

  const clearBreadcrumbs = () => {
    setBreadcrumbs([]);
  };

  const value = {
    currentModule,
    currentChapter,
    setCurrentModule,
    setCurrentChapter,
    breadcrumbs,
    addBreadcrumb,
    clearBreadcrumbs
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};