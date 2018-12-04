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
        stage("Build") {
            steps {
                echo "Running build ${env.BUILD_ID} on ${env.JENKINS_URL}"
                sh "npm ci"
                sh "npm run cy:verify"
            }
        }

        stage("Start local server") {
            steps {
                // start local server in the background
                // we will shut it down in "post" command block
                sh "nohup npm start &"
            }
        }

        environment {
            // see https://jenkins.io/doc/book/using/using-credentials/
            CYPRESS_RECORD_KEY = credentials("cypress_dashboard_key")
            // only needed for parallel runs
            // (cf. https://github.com/cypress-io/cypress-example-kitchensink/blob/master/Jenkinsfile)
            // CYPRESS_trashAssetsBeforeRuns = "false"
        }

        // this tage runs end-to-end tests, and each agent uses the workspace
        // from the previous stage
        stage("Testing react") {
            steps {
                echo "Running build ${env.BUILD_ID}"
                sh "npm run cypress:react-test"
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
