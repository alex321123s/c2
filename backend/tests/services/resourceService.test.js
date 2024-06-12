// /backend/tests/services/resourceService.test.js

const mongoose = require('mongoose');
const ResourceService = require('../../api/services/resourceService');
const Resource = require('../../api/models/Resource');

describe('Resource Service Test', () => {
    beforeAll(async () => {
        const url = `mongodb://127.0.0.1/test_db`;
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });

    afterEach(async () => {
        await Resource.deleteMany({});
    });

    it('should add a new resource successfully', async () => {
        const resourceData = {
            title: 'Node.js Tutorial',
            description: 'Comprehensive guide to Node.js',
            link: 'http://example.com/nodejs-tutorial',
            type: 'Article',
        };
        const addedResource = await ResourceService.addResource(resourceData);

        expect(addedResource._id).toBeDefined();
        expect(addedResource.title).toBe(resourceData.title);
        expect(addedResource.description).toBe(resourceData.description);
        expect(addedResource.link).toBe(resourceData.link);
        expect(addedResource.type).toBe(resourceData.type);
    });

    it('should not add a resource without a title', async () => {
        const resourceData = {
            description: 'Comprehensive guide to Node.js',
            link: 'http://example.com/nodejs-tutorial',
            type: 'Article',
        };

        try {
            await ResourceService.addResource(resourceData);
        } catch (error) {
            expect(error.message).toBe('Resource validation failed: title: Path `title` is required.');
        }
    });

    it('should get a resource by ID', async () => {
        const resourceData = {
            title: 'Node.js Tutorial',
            description: 'Comprehensive guide to Node.js',
            link: 'http://example.com/nodejs-tutorial',
            type: 'Article',
        };
        const addedResource = await ResourceService.addResource(resourceData);
        const fetchedResource = await ResourceService.getResourceById(addedResource._id);

        expect(fetchedResource).toBeDefined();
        expect(fetchedResource.title).toBe(resourceData.title);
        expect(fetchedResource.description).toBe(resourceData.description);
        expect(fetchedResource.link).toBe(resourceData.link);
        expect(fetchedResource.type).toBe(resourceData.type);
    });

    it('should update a resource successfully', async () => {
        const resourceData = {
            title: 'Node.js Tutorial',
            description: 'Comprehensive guide to Node.js',
            link: 'http://example.com/nodejs-tutorial',
            type: 'Article',
        };
        const addedResource = await ResourceService.addResource(resourceData);

        const updateData = {
            title: 'Advanced Node.js Tutorial',
            link: 'http://example.com/advanced-nodejs-tutorial',
        };
        const updatedResource = await ResourceService.updateResource(addedResource._id, updateData);

        expect(updatedResource.title).toBe(updateData.title);
        expect(updatedResource.link).toBe(updateData.link);
    });

    it('should delete a resource successfully', async () => {
        const resourceData = {
            title: 'Node.js Tutorial',
            description: 'Comprehensive guide to Node.js',
            link: 'http://example.com/nodejs-tutorial',
            type: 'Article',
        };
        const addedResource = await ResourceService.addResource(resourceData);
        await ResourceService.deleteResource(addedResource._id);

        const fetchedResource = await Resource.findById(addedResource._id);
        expect(fetchedResource).toBeNull();
    });
});
