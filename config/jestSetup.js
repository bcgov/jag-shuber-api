const { toMatchOneOf, toMatchShapeOf } = require('jest-to-match-shape-of')
 
expect.extend({
  toMatchOneOf,
  toMatchShapeOf,
});