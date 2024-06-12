// /frontend/tests/e2e/resourceAccess.test.js

import { Selector } from 'testcafe';

fixture `Resource Access E2E Test`
    .page `http://localhost:3000`;

const emailInput = Selector('input[name="email"]');
const passwordInput = Selector('input[name="password"]');
const loginButton = Selector('button').withText('Login');
const resourcePageLink = Selector('a').withText('Resource Page');
const resourceList = Selector('.resource-list');
const resourceItem = Selector('.resource-item');
const downloadButton = Selector('button').withText('Download');

test('User can access and download resources', async t => {
    // Log in as a user
    await t
        .navigateTo('/login')
        .typeText(emailInput, 'testuser@example.com')
        .typeText(passwordInput, 'Password123')
        .click(loginButton)
        .expect(resourcePageLink.exists).ok();

    // Navigate to the resource page
    await t
        .click(resourcePageLink)
        .expect(resourceList.exists).ok();

    // Ensure there are resources listed
    const resourceCount = await resourceList.childElementCount;
    await t
        .expect(resourceCount).gt(0)
        .expect(resourceItem.exists).ok();

    // Access and download a resource
    await t
        .click(resourceItem.nth(0))
        .click(downloadButton)
        .expect(Selector('.success-message').innerText).contains('Download started');
});
