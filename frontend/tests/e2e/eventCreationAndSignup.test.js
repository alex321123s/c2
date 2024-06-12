// /frontend/tests/e2e/eventCreationAndSignup.test.js

import { Selector } from 'testcafe';

fixture `Event Creation and Signup E2E Test`
    .page `http://localhost:3000`;

const emailInput = Selector('input[name="email"]');
const passwordInput = Selector('input[name="password"]');
const loginButton = Selector('button').withText('Login');
const eventPageLink = Selector('a').withText('Event Page');
const createEventButton = Selector('button').withText('Create Event');
const eventNameInput = Selector('input[name="eventName"]');
const eventDateInput = Selector('input[name="eventDate"]');
const eventDescriptionInput = Selector('textarea[name="eventDescription"]');
const saveEventButton = Selector('button').withText('Save');
const signupEventButton = Selector('button').withText('Sign Up');
const eventList = Selector('.event-list');
const eventItem = Selector('.event-item');

test('User can create an event and sign up for it', async t => {
    // Log in as a user
    await t
        .navigateTo('/login')
        .typeText(emailInput, 'testuser@example.com')
        .typeText(passwordInput, 'Password123')
        .click(loginButton)
        .expect(eventPageLink.exists).ok();

    // Navigate to the event page
    await t
        .click(eventPageLink)
        .expect(createEventButton.exists).ok();

    // Create a new event
    await t
        .click(createEventButton)
        .typeText(eventNameInput, 'Test Event')
        .typeText(eventDateInput, '2024-06-30')
        .typeText(eventDescriptionInput, 'This is a test event description.')
        .click(saveEventButton)
        .expect(eventList.exists).ok();

    // Ensure the event is listed
    const eventCount = await eventList.childElementCount;
    await t
        .expect(eventCount).gt(0)
        .expect(eventItem.withText('Test Event').exists).ok();

    // Sign up for the event
    await t
        .click(eventItem.withText('Test Event'))
        .click(signupEventButton)
        .expect(Selector('.success-message').innerText).contains('You have successfully signed up for the event');
});
