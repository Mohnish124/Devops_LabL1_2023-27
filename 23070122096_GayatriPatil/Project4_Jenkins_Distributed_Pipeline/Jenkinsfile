pipeline {
    agent none

    stages {

        stage('Checkout') {
            agent { label 'compile' }

            steps {
                git branch: 'main',
                    url: 'https://github.com/gayatrii16/GayatriPortfolio.git'
            }
        }

        stage('Compile') {
            agent { label 'compile' }

            tools {
                jdk 'JDK21'
                maven 'Maven3'
            }

            steps {
                bat 'mvn clean compile'
            }
        }

        stage('Test') {
            agent { label 'test' }

            tools {
                jdk 'JDK21'
                maven 'Maven3'
            }

            steps {
                bat 'mvn test'
            }
        }

        stage('Package') {
            agent { label 'compile' }

            tools {
                jdk 'JDK21'
                maven 'Maven3'
            }

            steps {
                bat 'mvn package'
            }
        }
    }
}