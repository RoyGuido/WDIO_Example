pipeline {
    agent any

    tools {
        nodejs 'Node22'    // Debe estar configurado en Jenkins → Global Tool Configuration
        jdk 'Java17'
    }

    environment {
        ALLURE_RESULTS = "allure-results"
        ALLURE_REPORT  = "allure-report"
    }

    stages {
        stage('Checkout') {
            steps {
                echo '🔹 Clonando repositorio...'
                git branch: 'main', url: 'https://github.com/RoyGuido/WDIO_Example.git'
            }
        }

        stage('Install dependencies') {
            steps {
                echo '📦 Instalando dependencias...'
                dir("${WORKSPACE}") {
                    bat 'npm ci'
                }
            }
        }

        stage('Run WDIO Tests') {
            steps {
                echo 'Ejecutando pruebas WDIO...'
                dir("${WORKSPACE}") {
                    // Ejecuta WDIO; asegúrate que wdio.conf.js tenga outputDir: 'allure-results'
                    bat 'npx wdio run wdio.conf.js --headless'
                }
            }
        }

        stage('Generate Allure Report') {
            steps {
                echo 'Generando reporte Allure...'
                dir("${WORKSPACE}") {
                    // Borra reportes anteriores y genera uno nuevo
                    bat "npx allure generate ${ALLURE_RESULTS} --clean -o ${ALLURE_REPORT}"
                }
            }
        }

        stage('Publish HTML Report') {
            steps {
                echo 'Publicando reporte en Jenkins...'
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: "${ALLURE_REPORT}",
                    reportFiles: 'index.html',
                    reportName: 'Allure Report'
                ])
            }
        }
    }

    post {
        success {
            echo 'Build finalizado con éxito.'
        }

        failure {
            echo 'Build fallido. Revisa los logs y reportes.'
        }

        
    }
}
