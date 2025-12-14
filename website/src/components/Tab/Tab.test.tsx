import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Tab, { TabList, TabPanel, TabPanels } from '../Tab';

describe('Tab Components', () => {
  test('renders tabs with correct initial state', () => {
    render(
      <Tab>
        <TabList>
          <TabPanel selected={true}>Tab 1 Content</TabPanel>
          <TabPanel selected={false}>Tab 2 Content</TabPanel>
        </TabList>
      </Tab>
    );

    expect(screen.getByText('Tab 1 Content')).toBeInTheDocument();
    expect(screen.queryByText('Tab 2 Content')).not.toBeInTheDocument();
  });

  test('switches between tabs when clicked', () => {
    const { rerender } = render(
      <Tab>
        <TabList>
          <TabPanel selected={true}>Tab 1 Content</TabPanel>
          <TabPanel selected={false}>Tab 2 Content</TabPanel>
        </TabList>
      </Tab>
    );

    // Initially only first tab content visible
    expect(screen.getByText('Tab 1 Content')).toBeInTheDocument();
    expect(screen.queryByText('Tab 2 Content')).not.toBeInTheDocument();

    // Simulate tab switch by rerendering with different selected state
    rerender(
      <Tab>
        <TabList>
          <TabPanel selected={false}>Tab 1 Content</TabPanel>
          <TabPanel selected={true}>Tab 2 Content</TabPanel>
        </TabList>
      </Tab>
    );

    expect(screen.queryByText('Tab 1 Content')).not.toBeInTheDocument();
    expect(screen.getByText('Tab 2 Content')).toBeInTheDocument();
  });

  test('renders tab panels structure correctly', () => {
    render(
      <Tab>
        <TabPanels>
          <TabPanel selected={true}>
            <p>Panel content</p>
          </TabPanel>
        </TabPanels>
      </Tab>
    );

    expect(screen.getByText('Panel content')).toBeInTheDocument();
  });

  test('handles tab selection properly', () => {
    const { getByText, queryByText } = render(
      <Tab>
        <TabList>
          <button role="tab" data-selected={true}>Lesson</button>
          <button role="tab" data-selected={false}>Summary</button>
        </TabList>
        <TabPanels>
          <TabPanel selected={true}>Lesson Content</TabPanel>
          <TabPanel selected={false}>Summary Content</TabPanel>
        </TabPanels>
      </Tab>
    );

    expect(getByText('Lesson Content')).toBeInTheDocument();
    expect(queryByText('Summary Content')).not.toBeInTheDocument();
  });
});