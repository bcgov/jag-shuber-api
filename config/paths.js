const path = require('path');

const sourceRoot = './src';
const outputDir = './dist';

const templateRoot = 'templates'
const templates = {
    operations: `${templateRoot}/operationsGroup.handlebars`,
    types: `${templateRoot}/typeDefinitions.handlebars`
}

const testCoveragePath=path.resolve('./coverage');

exports.paths = {
    outputDir,
    tsConfigPath: './tsconfig.json',
    sourceRoot,
    tsoaWatchPaths: [
        `src/controllers/`,
        `src/models/`,
        `src/index.ts`,
        `${templateRoot}/`
    ],
    testWatchPaths: `${outputDir}/**/*.spec.js`,
    testCoveragePath,
    templateRoot,
    templates
}