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
### Genera .jar
```
cd flight_prediction
sbt package
```
### Levantar aplicación
```
docker compose up --build
```
Entrar en http://localhost:5001/flights/delays/predict_kafka para acceder a la aplicación web.

## Mejoras realizadas

### Aplicación disponible en Google Cloud
Para levantar la aplicación en Google Cloud, hay que crear una MV con Ubuntu 22.04 LTS y 100GB de memoria. Además hay que crear un firewall en el puerto 5001 para poder acceder a la web.
Una vez creada, nos conectamos por SSH y ejecutamos los siguientes comandos.
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
### Instalar Docker y Docker Compose
```
sudo apt update && sudo apt upgrade -y
sudo apt install -y docker.io docker-compose
```
### Levantar aplicación
```
sudo docker compose up --build
```
La aplicación está desplegada en Google Cloud y se puede acceder a la API Flask directamente desde la siguiente URL:
```
http://<IP_EXTERNA_MV>:5001/flights/delays/predict_kafka
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
mkdir -p $AIRFLOW_HOME/{dags,logs,plugins}
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
Desplegamos el scheduler
```
airflow scheduler
```
Ahora abrimos otro terminal, donde se desplegará el servidor web
```
cd /home/ibdn/practica_creativa/resources/airflow
source env_airflow37/bin/activate
```
Desplegamos el servidor
```
airflow webserver --port 8080
```
Entrar en http://localhost:8080/home para acceder a la web de Apache Airflow.
