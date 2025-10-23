pipeline {
    agent any

    tools {
        nodejs 'Node22'  // nombre configurado en Jenkins
    }

    stages {

        stage('Checkout') {
            steps {
                echo '📦 Clonando el repositorio WDIO...'
                git branch: 'main', url: 'https://github.com/RoyGuido/WDIO_Example.git'
            }
        }

        stage('Instalar dependencias') {
            steps {
                echo '📥 Instalando dependencias del proyecto...'
                bat 'npm install'
            }
        }

        stage('Ejecutar pruebas WDIO') {
            steps {
                echo '🧪 Ejecutando pruebas E2E con WebdriverIO...'
                bat 'npx wdio run wdio.conf.js'
            }
        }

        stage('Publicar Reporte Allure') {
            steps {
                echo '📊 Generando y publicando reporte de Allure...'
                // Generar reporte HTML
                bat 'npx allure generate allure-results --clean -o allure-report'
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'allure-report',
                    reportFiles: 'index.html',
                    reportName: 'Reporte WDIO Allure'
                ])
            }
        }
    }

    post {
        always {
            echo 'Limpiando workspace...'
            cleanWs()
        }
        success {
            echo 'Pruebas WDIO ejecutadas correctamente.'
        }
        failure {
            echo 'Error en alguna etapa del pipeline.'
        }
    }
}
