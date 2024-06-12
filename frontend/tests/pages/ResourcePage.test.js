// /frontend/tests/pages/ResourcePage.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResourcePage from '../../src/pages/ResourcePage';
import { BrowserRouter as Router } from 'react-router-dom';

describe('ResourcePage Component', () => {
    it('should render the ResourcePage with a list of resources', () => {
        render(
            <Router>
                <ResourcePage />
            </Router>
        );

        // Check for the presence of resource list elements
        expect(screen.getByTestId('resource-list')).toBeInTheDocument();
        expect(screen.getAllByTestId('resource-item').length).toBeGreaterThan(0);
    });

    it('should allow filtering resources by category', () => {
        render(
            <Router>
                <ResourcePage />
            </Router>
        );

        // Simulate selecting a filter option
        fireEvent.change(screen.getByLabelText(/Filter by Category/i), { target: { value: 'Education' } });

        // Check if the list updates with filtered resources
        const filteredResources = screen.getAllByTestId('resource-item').filter(resource => 
            resource.textContent.includes('Education')
        );
        expect(filteredResources.length).toBeGreaterThan(0);
    });

    it('should allow navigation to a resource\'s details page', () => {
        render(
            <Router>
                <ResourcePage />
            </Router>
        );

        // Simulate clicking on a resource item
        const resourceItem = screen.getAllByTestId('resource-item')[0];
        fireEvent.click(resourceItem);

        // Check if the URL has changed to the resource details page
        expect(window.location.pathname).toMatch(/\/resources\/\d+/);
    });

    it('should display an error message if no resources are found', () => {
        render(
            <Router>
                <ResourcePage />
            </Router>
        );

        // Simulate a scenario where no resources match the filter
        fireEvent.change(screen.getByLabelText(/Filter by Category/i), { target: { value: 'NonExistentCategory' } });

        // Check for error message
        expect(screen.getByText(/No resources found for this category/i)).toBeInTheDocument();
    });
});
