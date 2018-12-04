pipeline {
    agent {
        // this image provides everything needed to run Cypress
        docker {
            image "cypress/base:10"
        }
    }

    stages {
        stage("Testing node") {
            steps {
                sh "node --version"
            }
        }

        // first stage installs node dependencies and Cypress binary
        stage("build") {
            steps {
                echo "Running build ${env.BUILD_ID} on ${env.JENKINS_URL}"
                sh "npm ci"
                sh "npm run cy:verify"
            }
        }

        stage("start local server") {
            steps {
                // start local server in the background
                // we will shut it down in "post" command block
                sh "nohup npm start &"
            }
        }

        // this tage runs end-to-end tests, and each agent uses the workspace
        // from the previous stage
        stage("cypress tests") {
            environment {
                // we will be recording test results and video on Cypress dashboard
                // to record we need to set an environment variable
                // we can load the record key variable from credentials store
                // see https://jenkins.io/doc/book/using/using-credentials/
                CYPRESS_RECORD_KEY = credentials("cypress_dashboard_key")
                // because parallel steps share the workspace they might race to delete
                // screenshots and videos folders. Tell Cypress not to delete these folders
                CYPRESS_trashAssetsBeforeRuns = "false"
            }
            
            // start several test jobs in parallel, and they all
            // will use Cypress Dashboard to load balance any found spec files
            stage("Testing react") {
                steps {
                    echo "Running build ${env.BUILD_ID}"
                    sh "npm run cypress:react-test"
                }
            }

        }
    }

    post {
        // shutdown the server running in the background
        always {
            echo "Stopping local server"
            sh "pkill -f http-server"
        }
    }
}
