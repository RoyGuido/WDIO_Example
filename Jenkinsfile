pipeline {
    agent any

    tools {
        nodejs 'Node22'  // nombre configurado en Jenkins
        jdk 'Java17'
    }
    environment {
        ALLURE_RESULTS = "allure-results"
        HTML_REPORT = "html-report"
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
                    reportDir: "${HTML_REPORT}",
                    reportFiles: 'report.html',
                    reportName: 'WDIO HTML Report'
                ])

                // Archivar resultados Allure para mantenerlos disponibles
                archiveArtifacts artifacts: "${ALLURE_RESULTS}/**", fingerprint: true
            }
        }
    }

    post {
        success {
            echo 'Build finalizado con éxito.'
            allure([
                includeProperties: false,
                jdk: '',
                results: [[path: "${ALLURE_RESULTS}"]]
            ])
        }

        failure {
            echo 'Build fallido. Revisa los logs y reportes.'
        }

        always {
            echo '🧹 Limpiando workspace...'
            cleanWs()
        }
    }
}
