# Práctica Creativa BDFI
Para probar esta práctica hay que seguir estos pasos:

### Clonar repositorio
```
git clone https://github.com/juliiosp/practica_creativa.git
```
```
cd practica_creativa
```
### Descargar datos
```
resources/download_data.sh
```
### Levantar aplicación
```
docker compose up --build
```
Entrar en http://localhost:5001/flights/delays/predict_kafka para acceder a la aplicación web.

## Mejoras realizadas

### Aplicación disponible en Google Cloud
La aplicación está desplegada en Google Cloud y se puede acceder a la API Flask directamente desde la siguiente URL:
```
http://34.175.194.66:5001/flights/delays/predict_kafka
```
Una vez dentro, se puede la aplicación está disponible para usar.

### Entrenamiento con Apache Airflow
Se ha implementado el entrenamiento con Apache AirFlow. Para conseguirlo hay que realizar los siguientes pasos:
```
cd /home/ibdn/practica_creativa/resources/airflow
```
```
python3.7 -m venv env_airflow37
source env_airflow37/bin/activate
```
```
pip install -r requirements.txt -c constraints.txt
```
Establecemos las variables de entorno AIRFLOW_HOME, PROJECT_HOME.
```
export AIRFLOW_HOME=/home/ibdn/airflow
export PROJECT_HOME=/home/ibdn/practica_creativa
```
Creamos los directorios necesarios
```
mkdir $AIRFLOW_HOME/dags
mkdir $AIRFLOW_HOME/logs
mkdir $AIRFLOW_HOME/plugins
```
Y por ultimo iniciamos airflow y creamos un usuario (admin)
```
airflow db init
```
```
airflow users create \
  --username admin \
  --firstname Jack \
  --lastname Sparrow \
  --role Admin \
  --email example@mail.org
```

Y añadimos el DAG
```
cp /home/ibdn/practica_creativa/resources/airflow/setup.py /home/ibdn/airflow/dags/
```

Ahora abrimos un terminal, donde se desplegará el scheduler
```
cd /home/ibdn/practica_creativa/resources/airflow
source env_airflow37/bin/activate
export AIRFLOW_HOME=/home/ibdn/airflow
export PROJECT_HOME=/home/ibdn/practica_creativa
```
Desplegamos el scheduler
```
airflow scheduler
```
Ahora abrimos otro terminal, donde se desplegará el servidor web
```
cd /home/ibdn/practica_creativa/resources/airflow
source env_airflow37/bin/activate
export AIRFLOW_HOME=/home/ibdn/airflow
```
Desplegamos el servidor
```
airflow webserver --port 8080
```
Entrar en http://localhost:8080/home para acceder a la web de Apache Airflow.
