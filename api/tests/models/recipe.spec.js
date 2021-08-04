const { Recipe, conn } = require('../../src/db.js');
const { expect, assert, to, have, lengthOf } = require('chai');

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('title', () => {
      it('should throw an error if title is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires title not to be null')))
          .catch(() => done());
      });
      it('should work when title is valid', () => {
        Recipe.create({ name: 'Milanesa a la napolitana' });
      });
      it('should not allow a recipe without a summary', (done) => {
        Recipe.create({ title: 'Tortilla de papa' })
          .then(() => done(new Error('Summary must not be null')))
          .catch(() => done());
      });
      it('should error if score is invalid', function (done) {
        Recipe.create({
          title: 'Empanadas de jota y cú',
          summary: 'jota y cú dentro de una empanada',
          score: 'una string no debería ser una puntuación válida'
        })
          .then(() => done('Score is invalid'))
          .catch(() => done());
      });

    });
  });
  
});
