// /frontend/tests/components/IdeaForm.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import IdeaForm from '../../src/components/IdeaForm';

describe('IdeaForm Component', () => {
    it('should render the form correctly', () => {
        render(<IdeaForm />);

        expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
    });

    it('should update the title field on user input', () => {
        render(<IdeaForm />);
        
        const titleInput = screen.getByLabelText(/Title/i);
        fireEvent.change(titleInput, { target: { value: 'New Idea Title' } });

        expect(titleInput.value).toBe('New Idea Title');
    });

    it('should update the description field on user input', () => {
        render(<IdeaForm />);
        
        const descriptionInput = screen.getByLabelText(/Description/i);
        fireEvent.change(descriptionInput, { target: { value: 'New Idea Description' } });

        expect(descriptionInput.value).toBe('New Idea Description');
    });

    it('should call the submit handler when the form is submitted', () => {
        const mockSubmitHandler = jest.fn();
        render(<IdeaForm onSubmit={mockSubmitHandler} />);
        
        const submitButton = screen.getByRole('button', { name: /Submit/i });
        fireEvent.click(submitButton);

        expect(mockSubmitHandler).toHaveBeenCalled();
    });

    it('should not call the submit handler if required fields are empty', () => {
        const mockSubmitHandler = jest.fn();
        render(<IdeaForm onSubmit={mockSubmitHandler} />);
        
        const submitButton = screen.getByRole('button', { name: /Submit/i });
        fireEvent.click(submitButton);

        expect(mockSubmitHandler).not.toHaveBeenCalled();
    });
});
