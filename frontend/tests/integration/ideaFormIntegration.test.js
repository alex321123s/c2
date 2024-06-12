// /frontend/tests/integration/ideaFormIntegration.test.js

import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import IdeaForm from '../../src/components/IdeaForm';
import api from '../../src/services/api';

jest.mock('../../src/services/api');

describe('IdeaForm Integration Test', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should submit the idea form successfully', async () => {
        const mockResponse = { data: { id: 1, title: 'New Idea', description: 'Test description' } };
        api.post.mockResolvedValueOnce(mockResponse);

        render(<IdeaForm />);

        fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Idea' } });
        fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Test description' } });
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            expect(api.post).toHaveBeenCalledWith('/ideas', { title: 'New Idea', description: 'Test description' });
        });

        expect(screen.getByText(/idea submitted successfully/i)).toBeInTheDocument();
    });

    it('should show an error message when the form submission fails', async () => {
        api.post.mockRejectedValueOnce(new Error('Failed to submit'));

        render(<IdeaForm />);

        fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Idea' } });
        fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Test description' } });
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            expect(api.post).toHaveBeenCalledWith('/ideas', { title: 'New Idea', description: 'Test description' });
        });

        expect(screen.getByText(/failed to submit/i)).toBeInTheDocument();
    });
});
