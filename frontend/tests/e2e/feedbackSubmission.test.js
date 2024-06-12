// /frontend/tests/e2e/feedbackSubmission.test.js

import { Selector } from 'testcafe';

fixture `Feedback Submission E2E Test`
    .page `http://localhost:3000`;

const emailInput = Selector('input[name="email"]');
const passwordInput = Selector('input[name="password"]');
const loginButton = Selector('button').withText('Login');
const feedbackPageLink = Selector('a').withText('Feedback Page');
const feedbackForm = Selector('.feedback-form');
const feedbackInput = Selector('textarea[name="feedback"]');
const submitButton = Selector('button').withText('Submit');
const successMessage = Selector('.success-message');

test('User can submit feedback', async t => {
    // Log in as a user
    await t
        .navigateTo('/login')
        .typeText(emailInput, 'testuser@example.com')
        .typeText(passwordInput, 'Password123')
        .click(loginButton)
        .expect(feedbackPageLink.exists).ok();

    // Navigate to the feedback page
    await t
        .click(feedbackPageLink)
        .expect(feedbackForm.exists).ok();

    // Fill out and submit the feedback form
    await t
        .typeText(feedbackInput, 'This is a test feedback message.')
        .click(submitButton)
        .expect(successMessage.innerText).contains('Thank you for your feedback');
});
