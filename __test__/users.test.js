// process.env.SECRET = 'test';
const {server} = require('../src/app')
const supergoose = require('@code-fellows/supergoose')
const mockRequest = supergoose(server);
const Roles = require('../src/models/roles/roles')

let users = {
    admin: {
        username: 'testAdmin',
        password: 'password',
        role: 'admin'
    },
    user: {
        username: 'testUser',
        password: 'password',
        role: 'user'

    }
}

let roles = {
    admin: {name: 'admin', permissions:['create','read','update','delete']},
    user: {name: 'user', permissions:['read']},
  }

beforeAll(  () => {
    const admin = new Roles(roles.admin).save();
    const user = new Roles(roles.user).save();
});

describe('Auth Router', () => {
  
    Object.keys(users).forEach( userType => {
      
      describe(`${userType} users`, () => {
        
        it('can create one', () => {
            return mockRequest.post('/signup')
            .send(users[userType])
            .then(results => {
                expect(results.status).toBe(200)
            });
        });
  
        it('can signin with basic', () => {
          return mockRequest.post('/signin')
            .auth(users[userType].username, users[userType].password)
            .then(results => {
                expect(results.status).toBe(200)
                })
        })
        })

        // it('Will update with admin privlages', () =>{
        //     return mockRequest.put()
        // })
    })
})
