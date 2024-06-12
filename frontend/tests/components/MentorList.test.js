// /frontend/tests/components/MentorList.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MentorList from '../../src/components/MentorList';

const mockMentors = [
    { id: 1, name: 'Alice Smith', expertise: 'Software Engineering', bio: 'Expert in software development and AI.' },
    { id: 2, name: 'Bob Johnson', expertise: 'Data Science', bio: 'Specialist in data analysis and machine learning.' },
];

describe('MentorList Component', () => {
    it('should render a list of mentors', () => {
        render(<MentorList mentors={mockMentors} />);

        expect(screen.getByText(/Alice Smith/i)).toBeInTheDocument();
        expect(screen.getByText(/Software Engineering/i)).toBeInTheDocument();
        expect(screen.getByText(/Expert in software development and AI./i)).toBeInTheDocument();

        expect(screen.getByText(/Bob Johnson/i)).toBeInTheDocument();
        expect(screen.getByText(/Data Science/i)).toBeInTheDocument();
        expect(screen.getByText(/Specialist in data analysis and machine learning./i)).toBeInTheDocument();
    });

    it('should display a message when no mentors are available', () => {
        render(<MentorList mentors={[]} />);

        expect(screen.getByText(/No mentors available/i)).toBeInTheDocument();
    });

    it('should handle mentor selection', () => {
        const handleSelect = jest.fn();
        render(<MentorList mentors={mockMentors} onSelectMentor={handleSelect} />);

        fireEvent.click(screen.getByText(/Alice Smith/i));
        expect(handleSelect).toHaveBeenCalledWith(mockMentors[0]);

        fireEvent.click(screen.getByText(/Bob Johnson/i));
        expect(handleSelect).toHaveBeenCalledWith(mockMentors[1]);
    });
});
