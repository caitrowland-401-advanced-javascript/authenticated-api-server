const supergoose = require('@code-fellows/supergoose');
const { server } = require('../src/app');
const mockRequest = supergoose(server)

describe('Error handlers', () => {
    it('Will return 404 error on bad route', () => {
        return mockRequest
        .get('/errorRoute')
        .then(results => {
            expect(results.status).toBe(404)
        })
    })
})