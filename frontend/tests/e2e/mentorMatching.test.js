// /frontend/tests/e2e/mentorMatching.test.js

import { Selector } from 'testcafe';

fixture `Mentor Matching E2E Test`
    .page `http://localhost:3000`;

const emailInput = Selector('input[name="email"]');
const passwordInput = Selector('input[name="password"]');
const loginButton = Selector('button').withText('Login');
const mentorPageLink = Selector('a').withText('Mentor Page');
const mentorSearchInput = Selector('input[name="mentorSearch"]');
const searchButton = Selector('button').withText('Search');
const mentorList = Selector('.mentor-list');
const mentorProfileLink = Selector('.mentor-profile-link');
const messageButton = Selector('button').withText('Send Message');
const messageInput = Selector('textarea[name="message"]');
const sendMessageButton = Selector('button').withText('Send');

test('User can search for mentors, view profiles, and send messages', async t => {
    // Log in as a user
    await t
        .navigateTo('/login')
        .typeText(emailInput, 'testuser@example.com')
        .typeText(passwordInput, 'Password123')
        .click(loginButton)
        .expect(mentorPageLink.exists).ok();

    // Navigate to the mentor page
    await t
        .click(mentorPageLink)
        .expect(mentorSearchInput.exists).ok();

    // Search for a mentor
    await t
        .typeText(mentorSearchInput, 'Software Development')
        .click(searchButton)
        .expect(mentorList.exists).ok();

    // View a mentor profile
    const mentorCount = await mentorList.childElementCount;
    await t
        .expect(mentorCount).gt(0)
        .click(mentorProfileLink.nth(0))
        .expect(messageButton.exists).ok();

    // Send a message to the mentor
    await t
        .click(messageButton)
        .typeText(messageInput, 'Hello, I would like to discuss potential mentorship opportunities.')
        .click(sendMessageButton)
        .expect(Selector('.success-message').innerText).contains('Message sent successfully');
});
