// /frontend/tests/integration/mentorProfileIntegration.test.js

import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import MentorPage from '../../src/pages/MentorPage';
import api from '../../src/services/api';

jest.mock('../../src/services/api');

describe('Mentor Profile Integration Test', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should display mentor profile information', async () => {
        const mockMentorData = {
            data: {
                name: 'John Doe',
                bio: 'Experienced software engineer with a passion for mentoring.',
                expertise: 'Full Stack Development',
                availability: 'Weekdays',
                contact: 'john.doe@example.com'
            }
        };
        api.get.mockResolvedValueOnce(mockMentorData);

        render(
            <Router>
                <MentorPage match={{ params: { mentorId: '1' } }} />
            </Router>
        );

        await waitFor(() => {
            expect(api.get).toHaveBeenCalledWith('/mentors/1');
        });

        expect(screen.getByText(/john doe/i)).toBeInTheDocument();
        expect(screen.getByText(/experienced software engineer/i)).toBeInTheDocument();
        expect(screen.getByText(/full stack development/i)).toBeInTheDocument();
        expect(screen.getByText(/weekdays/i)).toBeInTheDocument();
        expect(screen.getByText(/john.doe@example.com/i)).toBeInTheDocument();
    });

    it('should handle error when fetching mentor profile information', async () => {
        api.get.mockRejectedValueOnce(new Error('Failed to fetch mentor profile'));

        render(
            <Router>
                <MentorPage match={{ params: { mentorId: '1' } }} />
            </Router>
        );

        await waitFor(() => {
            expect(api.get).toHaveBeenCalledWith('/mentors/1');
        });

        expect(screen.getByText(/failed to fetch mentor profile/i)).toBeInTheDocument();
    });

    it('should update mentor profile information', async () => {
        const mockMentorData = {
            data: {
                name: 'John Doe',
                bio: 'Experienced software engineer with a passion for mentoring.',
                expertise: 'Full Stack Development',
                availability: 'Weekdays',
                contact: 'john.doe@example.com'
            }
        };
        api.get.mockResolvedValueOnce(mockMentorData);

        render(
            <Router>
                <MentorPage match={{ params: { mentorId: '1' } }} />
            </Router>
        );

        await waitFor(() => {
            expect(api.get).toHaveBeenCalledWith('/mentors/1');
        });

        fireEvent.change(screen.getByLabelText(/bio/i), { target: { value: 'New bio content' } });
        fireEvent.click(screen.getByRole('button', { name: /update profile/i }));

        await waitFor(() => {
            expect(api.put).toHaveBeenCalledWith('/mentors/1', {
                bio: 'New bio content',
                name: 'John Doe',
                expertise: 'Full Stack Development',
                availability: 'Weekdays',
                contact: 'john.doe@example.com'
            });
        });

        expect(screen.getByText(/profile updated successfully/i)).toBeInTheDocument();
    });

    it('should handle error when updating mentor profile information', async () => {
        api.get.mockResolvedValueOnce({
            data: {
                name: 'John Doe',
                bio: 'Experienced software engineer with a passion for mentoring.',
                expertise: 'Full Stack Development',
                availability: 'Weekdays',
                contact: 'john.doe@example.com'
            }
        });
        api.put.mockRejectedValueOnce(new Error('Failed to update profile'));

        render(
            <Router>
                <MentorPage match={{ params: { mentorId: '1' } }} />
            </Router>
        );

        await waitFor(() => {
            expect(api.get).toHaveBeenCalledWith('/mentors/1');
        });

        fireEvent.change(screen.getByLabelText(/bio/i), { target: { value: 'New bio content' } });
        fireEvent.click(screen.getByRole('button', { name: /update profile/i }));

        await waitFor(() => {
            expect(api.put).toHaveBeenCalledWith('/mentors/1', {
                bio: 'New bio content',
                name: 'John Doe',
                expertise: 'Full Stack Development',
                availability: 'Weekdays',
                contact: 'john.doe@example.com'
            });
        });

        expect(screen.getByText(/failed to update profile/i)).toBeInTheDocument();
    });
});
