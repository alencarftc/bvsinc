


pipeline {

    stages {
         stage 'Checkout' {
            cleanWs()
            checkout([$class: 'SubversionSCM', 
            additionalCredentials: [], 
            excludedCommitMessages: '', 
            excludedRegions: '', 
            excludedRevprop: '', 
            excludedUsers: '', 
            filterChangelog: false, 
            ignoreDirPropChanges: false, 
            includedRegions: '', 
            locations: [[cancelProcessOnExternalsFail: true, 
            credentialsId: '234243-45654-234randomstuff', 
            depthOption: 'infinity', 
            ignoreExternalsOption: true, 
            local: '.', 
            remote: 'https://gitlab.com/alencarfff/solinc/']],
            quietOperation: true, 
            workspaceUpdater: [$class: 'UpdateUpdater']])
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
                
            }
        }
        
        stage('Push') {
            steps {
                
            }
        }
        
        stage('Deploy') {
            steps {
                
            }
        }
    }
}


