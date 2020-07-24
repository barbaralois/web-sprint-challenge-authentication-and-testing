const Users = require('./users-model.js');
const db = require('../data/dbConfig.js');

describe('users model', () => {
  describe('add method', () => {
    beforeEach(async () => {
      await db('users').truncate();
    });

    it('should insert the provided user into the database', async () => {
      await Users.add({ username: 'joe', password: 'garcia' });
      await Users.add({ username: 'jben', password: 'ransom' });
      const users = await db('users');
      expect(users).toHaveLength(2);
    });
  });
});
