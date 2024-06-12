// /frontend/tests/e2e/submitIdea.test.js

import { Selector } from 'testcafe';

fixture `Submit Idea E2E Test`
    .page `http://localhost:3000`;

const titleInput = Selector('input[name="title"]');
const descriptionInput = Selector('textarea[name="description"]');
const submitButton = Selector('button').withText('Submit Idea');
const ideaList = Selector('.idea-list');

test('User can submit a new idea', async t => {
    await t
        .typeText(titleInput, 'Test Idea')
        .typeText(descriptionInput, 'This is a test idea description.')
        .click(submitButton)
        .expect(ideaList.innerText).contains('Test Idea')
        .expect(ideaList.innerText).contains('This is a test idea description.');
});
