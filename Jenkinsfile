pipeline {
    agent any

    environment {
        // Carpeta absoluta para resultados y reportes
        ALLURE_RESULTS = "${env.WORKSPACE}/allure-results"
        ALLURE_REPORT  = "${env.WORKSPACE}/allure-report"
    }

    stages {
        stage('Preparar Workspace') {
            steps {
                echo "Limpiando workspace..."
                deleteDir()
            }
        }

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/RoyGuido/WDIO_Example.git'
            }
        }

        stage('Instalar dependencias') {
            steps {
                bat 'npm install'
            }
        }

        stage('Ejecutar WDIO') {
            steps {
                echo "Ejecutando pruebas WDIO..."
                bat "npx wdio run wdio.conf.js"
            }
        }

        stage('Generar reporte Allure') {
            steps {
                echo "Generando reporte Allure..."
                bat """
                npx allure generate %ALLURE_RESULTS% --clean -o %ALLURE_REPORT%
                """
            }
        }

        stage('Publicar reporte HTML') {
            steps {
                echo "Abriendo reporte Allure en Jenkins..."
                // Para visualizar el HTML, puedes usar el plugin "HTML Publisher"
                publishHTML(target: [
                    reportDir: 'allure-report',
                    reportFiles: 'index.html',
                    reportName: 'Allure Report',
                    keepAll: true,
                    allowMissing: false
                ])
            }
        }
    }

    post {
        always {
            echo 'Pipeline finalizada'
        }
    }
}
