# Práctica Creativa BDFI
Para probar esta práctica hay que seguir estos pasos.

### Entrenamiento con Apache Airflow (Mejora)
Se ha implementado el entrenamiento con Apache AirFlow. Para conseguirlo hay que realizar los siguientes pasos:
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
### Vamos al directorio de airflow
```
cd ../resources/airflow
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
Entrar en http://localhost:8080/home para acceder a la web de Apache Airflow e iniciar sesión.

<img width="647" height="335" alt="image" src="https://github.com/user-attachments/assets/57a6c4a4-dac0-437f-8897-fb1241795fa3" />

Activamos el DAG recuadrado y el modelo se empezará a entrenar.

<img width="647" height="332" alt="image" src="https://github.com/user-attachments/assets/7222cb19-f57e-49dd-be39-5bcccde56dd3" />

Esperamos a que se termine de entrenar, generando distintos ficheros en el directorio models/.

<img width="646" height="334" alt="image" src="https://github.com/user-attachments/assets/b2d3f10b-aa90-4d97-b63e-c13d5b180ceb" />

Salimos de ambas terminales con Ctrl+C.

### Levantar aplicación
```
docker compose up --build
```
Entrar en http://localhost:5001/flights/delays/predict_kafka para acceder a la aplicación web.

### Aplicación disponible en Google Cloud
Para levantar la aplicación en Google Cloud, hay que crear una MV con Ubuntu 22.04 LTS y 100GB de memoria. Además hay que crear un firewall en el puerto 5001 para poder acceder a la web.
Una vez creada, nos conectamos por SSH y ejecutamos los siguientes comandos.
### Clonar repositorio previamente entrenado.
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
sudo docker-compose up --build
```
La aplicación está desplegada en Google Cloud y se puede acceder a la API Flask directamente desde la siguiente URL:
```
http://<IP_EXTERNA_MV>:5001/flights/delays/predict_kafka
```
Una vez dentro, la aplicación está disponible para usar.



