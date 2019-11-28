export PROJECT_NAMESPACE="jag-shuber"
export GIT_URI="https://github.com/bcgov/jag-shuber-api.git"
export GIT_REF="master"

# Skip Jenkins pipeline processing for this project.  The pipelines are integrated into the build templates.
export SKIP_PIPELINE_PROCESSING=1

# The list of templates to ignore
export ignore_templates="api-postgress-deploy-bluegreen"

# The templates that should not have their GIT referances(uri and ref) over-ridden
# Templates NOT in this list will have they GIT referances over-ridden
# with the values of GIT_URI and GIT_REF
export skip_git_overrides="backup-build.json"
