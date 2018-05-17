const configureEnvironment = require('dotenv').config;
const { toMatchOneOf, toMatchShapeOf } = require('jest-to-match-shape-of')
 
expect.extend({
  toMatchOneOf,
  toMatchShapeOf,
});

configureEnvironment({
  path:'.env.testing'
});