pipeline {
    agent { 
        label 'dev-agent' ,
    environment {
    DOCKERHUB_CREDENTIALS = credentials('dockerhub')
  }}
    
    stages{
        stage('Code'){
            steps {
                git url: 'https://github.com/DishaKambariyaTech/jenkins-node-api-cicd.git', branch: 'main'
            }
        }
        stage('Build'){
            steps {
                sh 'docker build . -t jenkins-node-api-cicd:latest' 
            }
        }
        stage('Login and Push Image'){
            steps {
                echo 'logging in to docker hub and pushing image..'
               withCredentials([usernamePassword(credentialsId: 'dockerHub', passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUser')]) {
                    sh "docker login -u $dockerHubUser -p $dockerHubPassword"
                    sh "docker push jenkins-node-api-cicd:latest"
                    }

                }
            }
        }
        stage('Deploy'){
            steps {
                sh 'docker-compose down && docker-compose up -d'
            }
        }
    }