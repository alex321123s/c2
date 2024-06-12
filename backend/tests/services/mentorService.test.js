// /backend/tests/services/mentorService.test.js

const mongoose = require('mongoose');
const MentorService = require('../../api/services/mentorService');
const Mentor = require('../../api/models/Mentor');

describe('Mentor Service Test', () => {
    beforeAll(async () => {
        const url = `mongodb://127.0.0.1/test_db`;
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });

    afterEach(async () => {
        await Mentor.deleteMany({});
    });

    it('should add a new mentor successfully', async () => {
        const mentorData = {
            name: 'John Doe',
            expertise: 'Software Development',
            email: 'john.doe@example.com',
        };
        const addedMentor = await MentorService.addMentor(mentorData);

        expect(addedMentor._id).toBeDefined();
        expect(addedMentor.name).toBe(mentorData.name);
        expect(addedMentor.expertise).toBe(mentorData.expertise);
        expect(addedMentor.email).toBe(mentorData.email);
    });

    it('should not add a mentor with existing email', async () => {
        const mentorData = {
            name: 'John Doe',
            expertise: 'Software Development',
            email: 'john.doe@example.com',
        };
        await MentorService.addMentor(mentorData);

        try {
            await MentorService.addMentor(mentorData);
        } catch (error) {
            expect(error.message).toBe('Mentor with this email already exists');
        }
    });

    it('should get a mentor by ID', async () => {
        const mentorData = {
            name: 'John Doe',
            expertise: 'Software Development',
            email: 'john.doe@example.com',
        };
        const addedMentor = await MentorService.addMentor(mentorData);
        const fetchedMentor = await MentorService.getMentorById(addedMentor._id);

        expect(fetchedMentor).toBeDefined();
        expect(fetchedMentor.name).toBe(mentorData.name);
        expect(fetchedMentor.expertise).toBe(mentorData.expertise);
        expect(fetchedMentor.email).toBe(mentorData.email);
    });

    it('should update a mentor successfully', async () => {
        const mentorData = {
            name: 'John Doe',
            expertise: 'Software Development',
            email: 'john.doe@example.com',
        };
        const addedMentor = await MentorService.addMentor(mentorData);

        const updateData = {
            name: 'John Smith',
            expertise: 'Data Science',
        };
        const updatedMentor = await MentorService.updateMentor(addedMentor._id, updateData);

        expect(updatedMentor.name).toBe(updateData.name);
        expect(updatedMentor.expertise).toBe(updateData.expertise);
    });

    it('should delete a mentor successfully', async () => {
        const mentorData = {
            name: 'John Doe',
            expertise: 'Software Development',
            email: 'john.doe@example.com',
        };
        const addedMentor = await MentorService.addMentor(mentorData);
        await MentorService.deleteMentor(addedMentor._id);

        const fetchedMentor = await Mentor.findById(addedMentor._id);
        expect(fetchedMentor).toBeNull();
    });
});
