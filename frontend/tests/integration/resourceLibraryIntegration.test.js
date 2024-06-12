// /frontend/tests/integration/resourceLibraryIntegration.test.js

import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import ResourceLibrary from '../../src/components/ResourceLibrary';
import api from '../../src/services/api';

jest.mock('../../src/services/api');

describe('Resource Library Integration Test', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should display resources in the library', async () => {
        const mockResources = {
            data: [
                {
                    id: 1,
                    title: 'Resource 1',
                    description: 'Description of Resource 1',
                    link: 'http://example.com/resource1'
                },
                {
                    id: 2,
                    title: 'Resource 2',
                    description: 'Description of Resource 2',
                    link: 'http://example.com/resource2'
                },
            ],
        };
        api.get.mockResolvedValueOnce(mockResources);

        render(
            <Router>
                <ResourceLibrary />
            </Router>
        );

        await waitFor(() => {
            expect(api.get).toHaveBeenCalledWith('/resources');
        });

        expect(screen.getByText(/resource 1/i)).toBeInTheDocument();
        expect(screen.getByText(/resource 2/i)).toBeInTheDocument();
    });

    it('should handle error when fetching resources', async () => {
        api.get.mockRejectedValueOnce(new Error('Failed to fetch resources'));

        render(
            <Router>
                <ResourceLibrary />
            </Router>
        );

        await waitFor(() => {
            expect(api.get).toHaveBeenCalledWith('/resources');
        });

        expect(screen.getByText(/failed to fetch resources/i)).toBeInTheDocument();
    });

    it('should create a new resource and display it in the library', async () => {
        const newResource = {
            id: 3,
            title: 'New Resource',
            description: 'Description of New Resource',
            link: 'http://example.com/newresource'
        };

        api.post.mockResolvedValueOnce({ data: newResource });

        render(
            <Router>
                <ResourceLibrary />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Resource' } });
        fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Description of New Resource' } });
        fireEvent.change(screen.getByLabelText(/link/i), { target: { value: 'http://example.com/newresource' } });
        fireEvent.click(screen.getByRole('button', { name: /add resource/i }));

        await waitFor(() => {
            expect(api.post).toHaveBeenCalledWith('/resources', {
                title: 'New Resource',
                description: 'Description of New Resource',
                link: 'http://example.com/newresource'
            });
        });

        expect(screen.getByText(/new resource/i)).toBeInTheDocument();
    });

    it('should handle error when creating a new resource', async () => {
        api.post.mockRejectedValueOnce(new Error('Failed to create resource'));

        render(
            <Router>
                <ResourceLibrary />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Resource' } });
        fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Description of New Resource' } });
        fireEvent.change(screen.getByLabelText(/link/i), { target: { value: 'http://example.com/newresource' } });
        fireEvent.click(screen.getByRole('button', { name: /add resource/i }));

        await waitFor(() => {
            expect(api.post).toHaveBeenCalledWith('/resources', {
                title: 'New Resource',
                description: 'Description of New Resource',
                link: 'http://example.com/newresource'
            });
        });

        expect(screen.getByText(/failed to create resource/i)).toBeInTheDocument();
    });
});
