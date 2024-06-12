// /frontend/tests/components/IdeaList.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import IdeaList from '../../src/components/IdeaList';

const mockIdeas = [
    { id: 1, title: 'Idea One', description: 'This is the first idea', category: 'Tech' },
    { id: 2, title: 'Idea Two', description: 'This is the second idea', category: 'Health' },
];

describe('IdeaList Component', () => {
    it('should render a list of ideas', () => {
        render(<IdeaList ideas={mockIdeas} />);

        expect(screen.getByText(/Idea One/i)).toBeInTheDocument();
        expect(screen.getByText(/This is the first idea/i)).toBeInTheDocument();
        expect(screen.getByText(/Tech/i)).toBeInTheDocument();

        expect(screen.getByText(/Idea Two/i)).toBeInTheDocument();
        expect(screen.getByText(/This is the second idea/i)).toBeInTheDocument();
        expect(screen.getByText(/Health/i)).toBeInTheDocument();
    });

    it('should display a message when there are no ideas', () => {
        render(<IdeaList ideas={[]} />);

        expect(screen.getByText(/No ideas available/i)).toBeInTheDocument();
    });

    it('should correctly handle long descriptions', () => {
        const longDescription = 'This is a very long description that should be handled correctly by the component without breaking the layout.';
        const longDescriptionIdeas = [
            { id: 3, title: 'Idea Three', description: longDescription, category: 'Education' },
        ];

        render(<IdeaList ideas={longDescriptionIdeas} />);

        expect(screen.getByText(longDescription)).toBeInTheDocument();
    });
});
