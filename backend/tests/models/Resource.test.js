// /backend/tests/models/Resource.test.js

const mongoose = require('mongoose');
const Resource = require('../../api/models/Resource');

describe('Resource Model Test', () => {
    beforeAll(async () => {
        const url = `mongodb://127.0.0.1/test_db`;
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });

    it('create & save resource successfully', async () => {
        const validResource = new Resource({
            title: 'React Tutorial',
            type: 'Video',
            url: 'https://example.com/react-tutorial',
            description: 'A comprehensive tutorial on React.js'
        });
        const savedResource = await validResource.save();

        expect(savedResource._id).toBeDefined();
        expect(savedResource.title).toBe(validResource.title);
        expect(savedResource.type).toBe(validResource.type);
        expect(savedResource.url).toBe(validResource.url);
        expect(savedResource.description).toBe(validResource.description);
    });

    it('create resource without required field should fail', async () => {
        const invalidResource = new Resource({ type: 'Video', url: 'https://example.com/react-tutorial' });
        let err;
        try {
            const savedResourceWithoutRequiredField = await invalidResource.save();
            err = savedResourceWithoutRequiredField;
        } catch (error) {
            err = error;
        }

        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.title).toBeDefined();
        expect(err.errors.description).toBeDefined();
    });
});
