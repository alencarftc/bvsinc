

pipeline {

    stages {
        stage('Checkout') {
            steps{
                checkout scm
            }
        }
        
        stage('Front-End') {
            agent { dockerfile true }
            steps {
                sh 'echo front ok'
            }
        }
        
        stage('Back-End') {
            agent { dockerfile true }
            steps {
                sh 'echo back ok'
            }
        }
        
        stage('Database') {
             agent { 
                docker { image 'mysql' }
            }
            steps {
                sh 'ok but what i do here at database now'
            }
        }
        
        stage('Test') {
            steps {
                sh 'ok but what i do here at teste now'
                
            }
        }
        
        stage('Push') {
            steps {
                sh 'ok but what i do here at database push now'
            }
        }
        
        stage('Deploy') {
            steps {
                sh 'ok but what i do here at deploy now'
            }
        }
    }
}


