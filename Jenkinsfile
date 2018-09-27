// Load shared devops utils
library identifier: 'devops-library@master', retriever: modernSCM([
  $class: 'GitSCMSource',
  remote: 'https://github.com/BCDevOps/jenkins-pipeline-shared-lib.git'
])

// Edit your app's name below
def APP_NAME = 'api'
def PATHFINDER_URL = "pathfinder.gov.bc.ca"
def PROJECT_PREFIX = "jag-shuber"
// Edit your environment TAG names below
def TAG_NAMES = [
  'dev', 
  'test', 
  'prod'
]
def APP_URLS = [
  "https://${APP_NAME}-${PROJECT_PREFIX}-${TAG_NAMES[0]}.${PATHFINDER_URL}",
  "https://${APP_NAME}-${PROJECT_PREFIX}-${TAG_NAMES[1]}.${PATHFINDER_URL}",
  "https://${APP_NAME}-${PROJECT_PREFIX}-${TAG_NAMES[2]}.${PATHFINDER_URL}"
]

// You shouldn't have to edit these if you're following the conventions
def BUILDER_BUILD = APP_NAME + '-builder-build'
def RUNTIME_BUILD = 'shuber-' + APP_NAME
def IMAGESTREAM_NAME = APP_NAME
def SLACK_DEV_CHANNEL="#sheriffscheduling_dev"
def SLACK_MAIN_CHANNEL="#sheriff_scheduling"
// def scmVars = checkout scm
def work_space = "/var/lib/jenkins/jobs/jag-shuber-tools/jobs/jag-shuber-tools-shuber-api-pipeline/workspace@script"
//Trigger remote job
// def handle = build job: 'Jag-shuber-prod-deploy'

// Gets the container hash for the latest image in an image stream
def getLatestHash = {imageStreamName ->
  sh (
    script: """oc get istag ${imageStreamName}:latest -o=jsonpath='{@.image.metadata.name}' | sed -e 's/sha256://g'""",
    returnStdout: true
  ).trim()
}

def ensureBuildExists(buildConfigName,templatePath){
  if(!openshift.selector( "bc/${buildConfigName}")){
    newBuildConfig = sh ( """oc process -f "${work_space}/${templatePath}" | oc create -f - """)
    echo ">> ${newBuildConfig}"
  }else{
    echo "Build Config '${buildConfigName}' already exists"
  }
}

def buildAndVerify(buildConfigName){
  echo "Building: ${buildConfigName}"
  openshiftBuild bldCfg: buildConfigName, showBuildLogs: 'true', waitTime: '900000'
  openshiftVerifyBuild bldCfg: buildConfigName, showBuildLogs: 'true', waitTime: '900000'
}

def notifyNewDeployment(environment,url,deployText){
  slackNotify(
    "New ${APP_NAME} in ${environment} 🚀",
    "A new version of the ${APP_NAME} is now in ${environment}",
    'good',
    env.SLACK_HOOK,
    SLACK_MAIN_CHANNEL,
    [
      [
        type: "button",
        text: "View New Version",           
        url: "${url}"
      ],
      [
        type: "button",            
        text: "Deploy to Production?",
        style: "primary",              
        url: "${currentBuild.absoluteUrl}/input"
      ]
    ]
  )
}

def notifyError(title,description){
  slackNotify(
    title,
    description,
    'danger',
    env.SLACK_HOOK,
    SLACK_DEV_CHANNEL,
    [
      [
        type: "button",
        text: "View Build Logs",
        style:"danger",        
        url: "${currentBuild.absoluteUrl}/console"
      ]
    ]
  )
}

def notifyDeploymentError(environment,error){
  notifyError(
    "Couldn't deploy ${APP_NAME} to ${environment} 🤕",
    "The latest deployment of the ${APP_NAME} to ${environment} seems to have failed\n'${error.message}'"
  )
}

stage('Build ' + APP_NAME) {
  node{
      // Cheking template exists  or else create
      openshift.withProject() {
        // Ensure that the necessary build configs exist
        ensureBuildExists(BUILDER_BUILD,"openshift/templates/api-builder/api-builder-build.json")
        ensureBuildExists(RUNTIME_BUILD,"openshift/templates/api/api-build.json")
      
      try{
        buildAndVerify(BUILDER_BUILD)
        buildAndVerify(RUNTIME_BUILD)
        // Don't tag with BUILD_ID so the pruner can do it's job; it won't delete tagged images.
        // Tag the images for deployment based on the image's hash
        IMAGE_HASH = getLatestHash(IMAGESTREAM_NAME)          
        echo ">> IMAGE_HASH: ${IMAGE_HASH}"
      }catch(error){
        notifyError(
          "${APP_NAME} Build Broken 🤕",
          "The latest ${APP_NAME} build seems to have broken\n'${error.message}'"
        )
        throw error
      }
    }
  }
}
  

  // // Creating Emphemeral post-gress instance for testing
  // stage('Create Test environment'){
  //   node{
  //     // try{
  //     //   echo "Creating Ephemeral Postgress instance for testing"
  //     //   POSTGRESS = sh (
  //     //     script: """oc project jag-shuber-tools; oc process -f "${work_space}/openshift/test/frontend-deploy.json" | oc create -f -; oc process -f "${work_space}/openshift/test/api-postgress-ephemeral.json" | oc create -f - """)
  //     //     echo ">> POSTGRESS: ${POSTGRESS}" 
        
  //     // } catch(error){
  //     //   echo "Error in creating postgress instance"
  //     //   throw error
  //     // }
  //   }
  // }


  // //Running functional Test cases - in tools project
  // stage('Run Test Cases'){
  //   // node{
  //   // try{
  //   //   echo "Run Test Case scripts here"
  //   //   POSTGRESS_DEL = sh (
  //   //     script: """oc project jag-shuber-tools; oc process -f "${work_space}/openshift/test/frontend-deploy.json" | oc delete -f -; oc process -f "${work_space}/openshift/test/api-postgress-ephemeral.json" | oc delete -f - """)
  //   //     echo ">> ${POSTGRESS_DEL}"
  //   //   echo "postgress instance deleted successfully"
  //   // } catch(error){
  //   //   echo "Error while test cases are running"
  //   //   throw error
  //   //   }
  //   // }
  // }

  // Deploying to Dev
  stage('Deploy ' + TAG_NAMES[0]) {
    def environment = TAG_NAMES[0]
    def url = APP_URLS[0]
    node{
      try{
        openshiftTag destStream: RUNTIME_BUILD, verbose: 'true', destTag: environment, srcStream: RUNTIME_BUILD, srcTag: "${IMAGE_HASH}", waitTime: '900000'
        // verify deployment
        openshiftVerifyDeployment deploymentConfig: IMAGESTREAM_NAME, namespace: "${PROJECT_PREFIX}"+"-"+environment, waitTime: '900000'
        notifyNewDeployment(environment,url,"Deploy to Test?")
      }catch(error){
        notifyDeploymentError(environment,error)
        throw error
      }
    }
  }

  //Deploying in stable Test
  stage('Deploy ' + TAG_NAMES[1]){
    def environment = TAG_NAMES[1]
    def url = APP_URLS[1]
    timeout(time:7, unit: 'DAYS'){ input id: 'Approval', message: "Deploy to ${environment}?", submitter: 'ronald-garcia-admin,cjam-admin', submitterParameter: 'approvingSubmitter'}
    node{
      try{
        openshiftTag destStream: RUNTIME_BUILD, verbose: 'true', destTag: environment, srcStream: RUNTIME_BUILD, srcTag: "${IMAGE_HASH}", waitTime: '900000'
        // verify deployment
        openshiftVerifyDeployment deploymentConfig: IMAGESTREAM_NAME, namespace: "${PROJECT_PREFIX}"+"-"+environment, waitTime: '900000'
        notifyNewDeployment(environment,url,"Tag for production?")
      } catch(error){
        notifyDeploymentError(environment,error)            
        throw error
      }   
    }
  }

  // Deploying to production
  stage('Tag Image to ' + TAG_NAMES[2]){
    def environment = TAG_NAMES[2]
    def url = APP_URLS[2]
    def newTarget = getNewTarget()
    def currentTarget = getCurrentTarget()
    timeout(time:7, unit: 'DAYS'){ input "Deploy to ${environment}?"}
    node{
      
      try {
      // Check for current route target
      ROUT_CHK = sh (
      script: """oc project jag-shuber-prod; oc get route api -o template --template='{{ .spec.to.name }}' > route-target; cat route-target""")
      // echo ">> ROUT_CHK: ${ROUT_CHK}"
      // Tag the new build as "prod"
      openshiftTag destStream: "${newTarget}", verbose: 'true', destTag: environment, srcStream: RUNTIME_BUILD, srcTag: "${IMAGE_HASH}", waitTime: '900000'

      // // Deploy Image to the environment
      
      slackNotify(
          "Current production Image tagged to ${environment}",
          "To Deploy ${newTarget} stack and with prod tagged image",
          'To switch to new version',
          env.SLACK_HOOK,
          SLACK_MAIN_CHANNEL,
            [
              [
                type: "button",            
                text: "switch to new version on ${newTarget}?",
                style: "primary",              
                url: "${currentBuild.absoluteUrl}/console"
              ]
            ])
    }catch(error){
      slackNotify(
              "Couldn't tag image to ${environment} 🤕",
              "The latest tagging of the image to ${environment} seems to have failed\n'${error.message}'",
              'danger',
            env.SLACK_HOOK,
            SLACK_DEV_CHANNEL,
            [
              [
                type: "button",
                text: "View Build Logs",
                style:"danger",        
                url: "${currentBuild.absoluteUrl}/console"
              ]
            ])
            echo "Build failed"
    }
  }
  }

  // Once approved (input step) switch production over to the new version.
  stage('Switch over to new production stack') {
    def newTarget = getNewTarget()
    def currentTarget = getCurrentTarget()
    // Wait for administrator confirmation
    timeout(time:7, unit: 'DAYS'){ input id: 'Approval', message: 'Switch Production from ${currentTarget} to ${newTarget} ?', submitter: 'ronald-garcia-admin,cjam-admin', submitterParameter: 'approvingSubmitter'}
    node{
      try{
        
      //Trigger remote job
      def handle = build job: 'Jag-shuber-prod-deploy'
    
      }catch(error){
        echo "Failed to switch route"
        throw error
      }
  }
  }

// // Functions to check currentTarget (api-blue)deployment and mark to for deployment to newTarget(api-green) & vice versa
  def getCurrentTarget() {
  def currentTarget = readFile("route-target")
  return currentTarget
  }

  def getNewTarget() {
  def currentTarget = getCurrentTarget()
  def newTarget = ""
  if (currentTarget == 'api-blue') {
      newTarget = 'api-green'
  } else if (currentTarget == 'api-green') {
      newTarget = 'api-blue'
  } else {
    echo "OOPS, wrong target"
  }
  return newTarget
  }
