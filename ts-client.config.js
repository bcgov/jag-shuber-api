const paths = require('./config/paths').paths;
const settings = {
    swaggerFile: `${paths.outputDir}/swagger.json`,
    templateHelpers: {
        "toInterpolatedString": (url) => {
            return (url || "").replace("{", "${");
        }
    },
    type: {
        outPutPath: `${paths.sourceRoot}/client/models.ts`,
        templateFile: paths.templates.types,
        membersOptional: true
    },
    operations: {
        outPutPath: `${paths.sourceRoot}/client/`,
        templateFile: paths.templates.operations,
        ungroupedOperationsName: 'Client'
    }
};
module.exports = settings;