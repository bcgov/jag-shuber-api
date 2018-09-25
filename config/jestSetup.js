const configureEnvironment = require('dotenv').config;
const { toMatchOneOf, toMatchShapeOf } = require('jest-to-match-shape-of')

expect.extend({
  toMatchOneOf,
  toMatchShapeOf,
});

// The jest environment will override the DB user and password
// to allow the tests to cleanup and delete records as needed
configureEnvironment({
  path: '.env.jest'
});

configureEnvironment({
  path: '.env.testing',
});



