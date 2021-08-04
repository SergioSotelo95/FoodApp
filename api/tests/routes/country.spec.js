/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
// const recipe = {
//   title: 'Milanea a la napolitana',
// };
const recipe = {
  id: "006a1891-d70e-4b2a-9d8a-bdeb91b53c3d",
  title: 'Milanesa a la napolitana',
  summary: 'blablalblalba',
  score: 10,
  healthScore: 10,
  steps: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));

  describe('GET /recipes', () => {
    it('should get 200', () =>
      agent.get('/recipes').expect(200)
    );
  });
});

describe('GET /recipes/:id', function () {
  it('responds with 200 if there exists a recipe with a given id', function(){
    return agent.get('/recipes/654959')
      .expect(200);
  });
  it('finds recipes from the API', function() {
    return agent.get('/recipes/511728')
      .expect(200);
  });
  it('responds with 404 when the recipe does not exist', function() {
    return agent.get('/recipes/32164116432168432')
      .expect(404);
  });

});

describe('POST /recipe', function () {
  it('responds with 200 if it creates a recipe successfully', function(){
    return agent.post('/recipe')
      .send({
        title: 'Menta granizada y limón al agua',
        summary: 'El mejor helado del mundo',
        spoonacularScore: 90,
      })
      .expect(200);
  });
  it('creates a new recipe in the database', function(){
    return agent.post('/recipe')
      .send({
        title: 'Fideos con tuco',
        summary: 'Tuco con fideos',
        score: 50,
        healthScore: 10,
        steps:"Hacer fideos y juntar con tuco"
      })
      .then(() => {
        return Recipe.findOne({
          where: {
            title: 'Fideos con tuco'
          }
        });
      })
      .then(() => {
        expect(recipe).to.exist;
      });
  });
});
