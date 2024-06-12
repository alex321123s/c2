// /backend/tests/services/ideaService.test.js

const mongoose = require('mongoose');
const IdeaService = require('../../api/services/ideaService');
const Idea = require('../../api/models/Idea');

describe('Idea Service Test', () => {
    beforeAll(async () => {
        const url = `mongodb://127.0.0.1/test_db`;
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });

    afterEach(async () => {
        await Idea.deleteMany({});
    });

    it('should create a new idea successfully', async () => {
        const ideaData = {
            title: 'New Idea',
            description: 'This is a new idea.',
            creator: mongoose.Types.ObjectId()
        };
        const createdIdea = await IdeaService.createIdea(ideaData);

        expect(createdIdea._id).toBeDefined();
        expect(createdIdea.title).toBe(ideaData.title);
        expect(createdIdea.description).toBe(ideaData.description);
        expect(createdIdea.creator).toBe(ideaData.creator);
    });

    it('should fetch all ideas successfully', async () => {
        const ideaData1 = { title: 'Idea 1', description: 'Description 1', creator: mongoose.Types.ObjectId() };
        const ideaData2 = { title: 'Idea 2', description: 'Description 2', creator: mongoose.Types.ObjectId() };

        await IdeaService.createIdea(ideaData1);
        await IdeaService.createIdea(ideaData2);

        const ideas = await IdeaService.getAllIdeas();

        expect(ideas.length).toBe(2);
        expect(ideas[0].title).toBe(ideaData1.title);
        expect(ideas[1].title).toBe(ideaData2.title);
    });

    it('should fetch a single idea by ID successfully', async () => {
        const ideaData = { title: 'New Idea', description: 'This is a new idea.', creator: mongoose.Types.ObjectId() };
        const createdIdea = await IdeaService.createIdea(ideaData);

        const fetchedIdea = await IdeaService.getIdeaById(createdIdea._id);

        expect(fetchedIdea._id.toString()).toBe(createdIdea._id.toString());
        expect(fetchedIdea.title).toBe(ideaData.title);
        expect(fetchedIdea.description).toBe(ideaData.description);
    });

    it('should update an idea successfully', async () => {
        const ideaData = { title: 'New Idea', description: 'This is a new idea.', creator: mongoose.Types.ObjectId() };
        const createdIdea = await IdeaService.createIdea(ideaData);

        const updatedData = { title: 'Updated Idea', description: 'Updated description.' };
        const updatedIdea = await IdeaService.updateIdea(createdIdea._id, updatedData);

        expect(updatedIdea._id.toString()).toBe(createdIdea._id.toString());
        expect(updatedIdea.title).toBe(updatedData.title);
        expect(updatedIdea.description).toBe(updatedData.description);
    });

    it('should delete an idea successfully', async () => {
        const ideaData = { title: 'New Idea', description: 'This is a new idea.', creator: mongoose.Types.ObjectId() };
        const createdIdea = await IdeaService.createIdea(ideaData);

        await IdeaService.deleteIdea(createdIdea._id);
        const deletedIdea = await Idea.findById(createdIdea._id);

        expect(deletedIdea).toBeNull();
    });
});
