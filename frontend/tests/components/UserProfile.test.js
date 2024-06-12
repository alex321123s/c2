// /frontend/tests/components/UserProfile.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UserProfile from '../../src/components/UserProfile';

const mockUser = {
    id: 1,
    name: 'John Doe',
    bio: 'A passionate innovator and mentor.',
    email: 'john.doe@example.com',
    projects: [
        { id: 1, title: 'Project One', description: 'Description for project one' },
        { id: 2, title: 'Project Two', description: 'Description for project two' },
    ],
};

describe('UserProfile Component', () => {
    it('should render user profile information', () => {
        render(<UserProfile user={mockUser} />);

        expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
        expect(screen.getByText(/A passionate innovator and mentor./i)).toBeInTheDocument();
        expect(screen.getByText(/john.doe@example.com/i)).toBeInTheDocument();
    });

    it('should render user projects', () => {
        render(<UserProfile user={mockUser} />);

        expect(screen.getByText(/Project One/i)).toBeInTheDocument();
        expect(screen.getByText(/Description for project one/i)).toBeInTheDocument();
        expect(screen.getByText(/Project Two/i)).toBeInTheDocument();
        expect(screen.getByText(/Description for project two/i)).toBeInTheDocument();
    });

    it('should handle edit profile button click', () => {
        const handleEdit = jest.fn();
        render(<UserProfile user={mockUser} onEditProfile={handleEdit} />);

        fireEvent.click(screen.getByText(/Edit Profile/i));
        expect(handleEdit).toHaveBeenCalled();
    });

    it('should display a message when no projects are available', () => {
        const userWithoutProjects = { ...mockUser, projects: [] };
        render(<UserProfile user={userWithoutProjects} />);

        expect(screen.getByText(/No projects available/i)).toBeInTheDocument();
    });
});
