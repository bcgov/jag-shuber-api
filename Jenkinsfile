
// Load Common Variables and utils
common = ""
node{
  common = load "../workspace@script/Jenkinsfile.common.groovy"
}

// You shouldn't have to edit these if you're following the conventions
BUILDER_BUILD = APP_NAME + '-builder-build'
APP_BUILD = APP_NAME
IMAGESTREAM_NAME = APP_NAME

stage('Assemble Builder'){
  node{
    openshift.withProject(){
      // Assemble Yarn Builder
      try{        
        common.ensureBuildExists(BUILDER_BUILD,"openshift/templates/api-builder/api-builder-build.json")
        common.buildAndVerify(BUILDER_BUILD)
      }catch(error){
        common.notifyError(
          "Problem Assembling Yarn Builder 🤕",
          "Error: ${error.message}"
          )
      } 
    }
  }
}

stage('Build ' + common.APP_NAME) {
  node{
    openshift.withProject() {
      try{
        // Make sure the frontend build configs exist
        common.ensureBuildExists(APP_BUILD,"openshift/templates/api/api-build.json")

        // Build and verify the app
        common.buildAndVerify(APP_BUILD)
        
        // Don't tag with BUILD_ID so the pruner can do it's job; it won't delete tagged images.
        // Tag the images for deployment based on the image's hash
        IMAGE_HASH = common.getLatestHash(IMAGESTREAM_NAME)          
        echo ">> IMAGE_HASH: ${IMAGE_HASH}"

      }catch(error){
        common.notifyError(
          "${common.APP_NAME} Build Broken 🤕",
          "Author:${env.CHANGE_AUTHOR_DISPLAY_NAME}\r\nError:'${error.message}'"
        )
        throw error
      }
    }
  }
}
  
  // We have Functional tests in our API project, commenting out these stages
  // as we do not currently have e2e tests within our frontend.
  // // Creating Emphemeral post-gress instance for testing
  // stage('Emphemeral Test Environment'){
  //   node{
  //     try{
  //       echo "Creating Ephemeral Postgress instance for testing"
  //       POSTGRESS = sh (
  //         script: """oc project jag-shuber-tools; oc process -f "${work_space}/openshift/test/frontend-deploy.json" | oc create -f -; oc process -f "${work_space}/openshift/test/api-postgress-ephemeral.json" | oc create -f - """)
  //         echo ">> POSTGRESS: ${POSTGRESS}" 
        
  //     } catch(error){
  //       echo "Error in creating postgress instance"
  //       throw error
  //     }
  //   }
  // }

  // //Running functional Test cases - in tools project
  // stage('Run Test Cases'){
  //   node{
  //   try{
  //     echo "Run Test Case scripts here"
  //     POSTGRESS_DEL = sh (
  //       script: """oc project jag-shuber-tools; oc process -f "${work_space}/openshift/test/frontend-deploy.json" | oc delete -f -; oc process -f "${work_space}/openshift/test/api-postgress-ephemeral.json" | oc delete -f - """)
  //       echo ">> ${POSTGRESS_DEL}"
  //     echo "postgress instance deleted successfully"
  //   } catch(error){
  //     echo "Error while test cases are running"
  //     throw error
  //     }
  //   }
  // }

// Deploying to Dev
stage("Deploy to ${common.environments.dev.name}") {
  def environment = common.environments.dev.tag
  def url = common.environments.dev.url
  node{
    try{
      common.deployAndVerify(IMAGE_HASH,environment,IMAGESTREAM_NAME)
      common.notifyNewDeployment(environment,url,"Deploy to ${common.environments.test.name}?")
    }catch(error){
      common.notifyDeploymentError(environment,error)
      throw error
    }
  }
}


// Deploying to Test
stage("Deploy to ${common.environments.test.name}") {
  def environment = common.environments.test.tag
  def url = common.environments.test.url
  timeout(time:7, unit: 'DAYS'){ input "Deploy to ${environment}?"}
  node{
    try{
      common.deployAndVerify(IMAGE_HASH,environment,IMAGESTREAM_NAME)
      common.notifyNewDeployment(environment,url,"Tag for ${common.environments.prod.name}?")
    }catch(error){
      common.notifyDeploymentError(environment,error)
      throw error
    }
  }
}

// Tag for Prod
stage("Tag for ${common.environments.prod.name}") {
  def environment = common.environments.prod.tag
  timeout(time:7, unit: 'DAYS'){ input "Tag for ${common.environments.prod.name}?"}
  node{
    try{
      common.tagImage(IMAGE_HASH,environment,IMAGESTREAM_NAME)
      common.notifyGood(
        "${common.APP_NAME} tagged for ${common.environments.prod.name}",
        "Start production pipeline to push new images"
      )
    }catch(error){
      common.notifyError(
        "Couldn't tag ${common.APP_NAME} for ${common.environments.prod.name} 🤕",
        "Error: '${error.message}'"
      )
      throw error
    }
  }
}