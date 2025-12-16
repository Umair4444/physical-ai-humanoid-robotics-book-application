import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { NavigationProvider, useNavigation } from '../contexts/NavigationContext';

// Test component to use the navigation hook
const TestNavigationComponent = () => {
  const { 
    currentModule, 
    currentChapter, 
    setCurrentModule, 
    setCurrentChapter, 
    breadcrumbs,
    addBreadcrumb,
    clearBreadcrumbs
  } = useNavigation();
  
  const mockModule = {
    id: 'module-1',
    title: 'Test Module',
    description: 'A test module',
    order: 1,
    chaptersCount: 3
  };
  
  const mockChapter = {
    id: 'chapter-1',
    title: 'Test Chapter',
    moduleId: 'module-1',
    order: 1,
    duration: 10
  };
  
  return (
    <div>
      <span data-testid="current-module">{currentModule?.title || 'none'}</span>
      <span data-testid="current-chapter">{currentChapter?.title || 'none'}</span>
      <button 
        data-testid="set-module" 
        onClick={() => setCurrentModule(mockModule)}
      >
        Set Module
      </button>
      <button 
        data-testid="set-chapter" 
        onClick={() => setCurrentChapter(mockChapter)}
      >
        Set Chapter
      </button>
      <button 
        data-testid="add-breadcrumb" 
        onClick={() => addBreadcrumb({ label: 'Test Breadcrumb' })}
      >
        Add Breadcrumb
      </button>
      <button 
        data-testid="clear-breadcrumbs" 
        onClick={clearBreadcrumbs}
      >
        Clear Breadcrumbs
      </button>
      <span data-testid="breadcrumbs-count">{breadcrumbs.length}</span>
    </div>
  );
};

describe('NavigationContext', () => {
  test('should provide default navigation state', () => {
    render(
      <NavigationProvider>
        <TestNavigationComponent />
      </NavigationProvider>
    );
    
    expect(screen.getByTestId('current-module')).toHaveTextContent('none');
    expect(screen.getByTestId('current-chapter')).toHaveTextContent('none');
    expect(screen.getByTestId('breadcrumbs-count')).toHaveTextContent('0');
  });

  test('should set current module', () => {
    render(
      <NavigationProvider>
        <TestNavigationComponent />
      </NavigationProvider>
    );
    
    fireEvent.click(screen.getByTestId('set-module'));
    
    expect(screen.getByTestId('current-module')).toHaveTextContent('Test Module');
    expect(screen.getByTestId('breadcrumbs-count')).toHaveTextContent('1');
  });

  test('should set current chapter', () => {
    render(
      <NavigationProvider>
        <TestNavigationComponent />
      </NavigationProvider>
    );
    
    fireEvent.click(screen.getByTestId('set-module'));
    fireEvent.click(screen.getByTestId('set-chapter'));
    
    expect(screen.getByTestId('current-module')).toHaveTextContent('Test Module');
    expect(screen.getByTestId('current-chapter')).toHaveTextContent('Test Chapter');
    expect(screen.getByTestId('breadcrumbs-count')).toHaveTextContent('2');
  });

  test('should add and clear breadcrumbs', () => {
    render(
      <NavigationProvider>
        <TestNavigationComponent />
      </NavigationProvider>
    );
    
    expect(screen.getByTestId('breadcrumbs-count')).toHaveTextContent('0');
    
    fireEvent.click(screen.getByTestId('add-breadcrumb'));
    expect(screen.getByTestId('breadcrumbs-count')).toHaveTextContent('1');
    
    fireEvent.click(screen.getByTestId('clear-breadcrumbs'));
    expect(screen.getByTestId('breadcrumbs-count')).toHaveTextContent('0');
  });
});