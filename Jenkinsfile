pipeline {
    agent any

    tools {
        nodejs 'Node22' // Configurado en Jenkins → Global Tool Configuration
        jdk 'Java17'
    }

    environment {
        PROJECT_DIR = "WDIO_Example"
        ALLURE_RESULTS = "allure-results"
        ALLURE_REPORT  = "allure-report"
    }

    stages {

        stage('Initialize Workspace') {
            steps {
                echo '🧹 Limpiando workspace antes de clonar...'
                cleanWs() // Limpia antes de clonar, no al final
            }
        }

        stage('Checkout') {
            steps {
                echo '🔹 Clonando repositorio...'
                dir("${PROJECT_DIR}") {
                    git branch: 'main',
                        url: 'https://github.com/RoyGuido/WDIO_Example.git'
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '📦 Instalando dependencias...'
                dir("${PROJECT_DIR}") {
                    bat 'npm ci'
                }
            }
        }

        stage('Run WDIO Tests') {
            steps {
                echo '🚀 Ejecutando pruebas WDIO...'
                dir("${PROJECT_DIR}") {
                    bat 'npx wdio run wdio.conf.js --headless'
                }
            }
        }

        stage('Generate Allure Report') {
            steps {
                echo '📊 Generando reporte Allure...'
                dir("${PROJECT_DIR}") {
                    bat "npx allure generate ${ALLURE_RESULTS} --clean -o ${ALLURE_REPORT}"
                }
            }
        }

        stage('Publish HTML Report') {
            steps {
                echo '📖 Publicando reporte HTML en Jenkins...'
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: "${PROJECT_DIR}/${ALLURE_REPORT}",
                    reportFiles: 'index.html',
                    reportName: 'Allure Report'
                ])
            }
        }

    }

    post {
        success {
            echo '✅ Build finalizado con éxito.'
        }

        failure {
            echo '❌ Build fallido. Revisa los logs y reportes.'
        }

        // No limpiamos el workspace al final, para conservar los resultados
    }
}
