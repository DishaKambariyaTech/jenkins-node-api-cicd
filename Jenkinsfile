pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME = 'jenkins-node-api-cicd'
        DOCKER_IMAGE_TAG = 'latest'
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/DishaKambariyaTech/jenkins-node-api-cicd.git', branch: 'main'
            }
        }

        stage('Build and Push Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}")
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                        docker.image("${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}").push()
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                // SSH into your server and pull the latest Docker image
                sshagent(credentials: ['your-ssh-key-credentials-id']) {
                    sh "ssh -o StrictHostKeyChecking=no your-ssh-user@your-server 'docker pull ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG} && docker-compose up -d'"
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded! Deployed to production.'
        }
        failure {
            echo 'Pipeline failed! Deployment to production aborted.'
        }
    }
}
