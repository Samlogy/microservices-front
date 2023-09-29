pipeline {
    agent any

    stages {
        stage('checkout') {
            steps {
                // Checkout code from the GitHub repository
                script {
                    if (env.BRANCH_NAME == 'develop' ) {
                        checkout([$class: 'GitSCM', 
                            branches: [[name: env.BRANCH_NAME]], 
                            doGenerateSubmoduleConfigurations: false, 
                            extensions: [], 
                            submoduleCfg: [], 
                            userRemoteConfigs: [[url: 'https://github.com/Samlogy/microservices-front.git']]
                        ])
                    }
                }
            }
        }

        stage('Build') {
            when {
                expression { env.BRANCH_NAME == 'develop' }
            }
            steps {
               sh "npm install"
               sh "npm run build"
            }
        }

        stage('Docker Build') {
            when {
                expression { env.BRANCH_NAME == 'develop'  }
            }
            steps {
               sh "sudo docker build -t eco-ui ."
            }
        }

        stage('Push to Docker Hub') {
            when {
                expression { env.BRANCH_NAME == 'develop'  }
            }
            steps {
              withCredentials([usernamePassword(credentialsId: 'sam', usernameVariable: 'username',
                passwordVariable: 'password')]) {
                sh "sudo docker login -u sammmmmm -p $password"
                sh "sudo docker tag eco-ui sammmmmm/eco-ui:$branchName"
                sh "sudo docker push sammmmmm/eco-ui:$branchName"
                sh "sudo docker rmi sammmmmm/eco-ui:$branchName"
                sh "sudo docker rmi eco-ui"
                stash includes: 'docker-compose.yml', name: 'utils'
              }
            }
        }

        stage('Deploy') {
            when {
                expression { env.BRANCH_NAME == 'master' }
            }
            steps {
              //  unstash 'utils'
              // sh "echo TAG=$branchName > .env"
              // try {
              //   sh "sudo docker-compose down"
              //   sh "sudo docker-compose pull"
              //   sh "sudo docker-compose up -d"
      
              // } catch (Exception e) {
              //   println "No Docker Compose Running"
              //   sh "sudo docker-compose pull"
              //   sh "sudo docker-compose up -d"
              // }
              echo 'deploy app'
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully"
        }
        failure {
            echo "Pipeline failed"
        }
    }
}
