pipeline {
    agent {
        docker {
            image 'node:6-alpine' 
            args '-p 3000:3000' 
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install'
                sh 'npm run build' 
            }
        }
        stage('Archive') {
            steps {
                // Archive the build output artifacts.
                archiveArtifacts artifacts: 'build/*'
                sh 'rm -r /var/jenkins_home/jobs/nicky-transcribe/latestRelease/*'
                sh 'cp -r build/* /var/jenkins_home/jobs/nicky-transcribe/latestRelease'
            }
        }
    }
}