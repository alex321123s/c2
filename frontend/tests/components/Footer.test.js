// /frontend/tests/components/Footer.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Footer from '../../src/components/Footer';

describe('Footer Component', () => {
    it('should render the footer with all text content', () => {
        render(<Footer />);

        expect(screen.getByText(/© 2024 C2. All rights reserved./i)).toBeInTheDocument();
        expect(screen.getByText(/Privacy Policy/i)).toBeInTheDocument();
        expect(screen.getByText(/Terms of Service/i)).toBeInTheDocument();
    });

    it('should have links with correct URLs', () => {
        render(<Footer />);

        expect(screen.getByText(/Privacy Policy/i).closest('a')).toHaveAttribute('href', '/privacy-policy');
        expect(screen.getByText(/Terms of Service/i).closest('a')).toHaveAttribute('href', '/terms-of-service');
    });
});
