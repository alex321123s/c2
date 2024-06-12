// /frontend/tests/components/ResourceLibrary.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResourceLibrary from '../../src/components/ResourceLibrary';

const mockResources = [
    { id: 1, title: 'React Guide', description: 'A comprehensive guide to React.', link: 'https://reactjs.org' },
    { id: 2, title: 'Node.js Documentation', description: 'The official Node.js documentation.', link: 'https://nodejs.org' },
];

describe('ResourceLibrary Component', () => {
    it('should render a list of resources', () => {
        render(<ResourceLibrary resources={mockResources} />);

        expect(screen.getByText(/React Guide/i)).toBeInTheDocument();
        expect(screen.getByText(/A comprehensive guide to React./i)).toBeInTheDocument();
        expect(screen.getByText(/Node.js Documentation/i)).toBeInTheDocument();
        expect(screen.getByText(/The official Node.js documentation./i)).toBeInTheDocument();
    });

    it('should display a message when no resources are available', () => {
        render(<ResourceLibrary resources={[]} />);

        expect(screen.getByText(/No resources available/i)).toBeInTheDocument();
    });

    it('should handle resource selection', () => {
        const handleSelect = jest.fn();
        render(<ResourceLibrary resources={mockResources} onSelectResource={handleSelect} />);

        fireEvent.click(screen.getByText(/React Guide/i));
        expect(handleSelect).toHaveBeenCalledWith(mockResources[0]);

        fireEvent.click(screen.getByText(/Node.js Documentation/i));
        expect(handleSelect).toHaveBeenCalledWith(mockResources[1]);
    });
});
