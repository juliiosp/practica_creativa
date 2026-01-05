# Práctica Creativa BDFI
Para probar esta práctica hay que seguir estos pasos:

# Clonar repositorio
```
git clone https://github.com/juliiosp/practica_creativa.git
```
```
cd practica_creativa
```
# Descargar datos
```
resources/download_data.sh
```
## Levantar aplicación
```
docker compose up --build
```

### Mejoras realizadas

# Aplicación disponible en Google Cloud

La aplicación está desplegada en Google Cloud y se puede acceder a la API Flask directamente desde la siguiente URL:

### Entrenamiento con Apache Airflow

- The version of Apache Airflow used is the 2.1.4 and it is installed with pip. For development it uses SQLite as database but it is not recommended for production. For the laboratory SQLite is sufficient.

- Install python libraries for Apache Airflow (suggested Python 3.7)

```shell
cd resources/airflow
pip install -r requirements.txt -c constraints.txt
```
- Set the `PROJECT_HOME` env variable with the path of you cloned repository, for example:
```
export PROJECT_HOME=/home/user/Desktop/practica_creativa
```
- Configure airflow environment

```shell
export AIRFLOW_HOME=~/airflow
mkdir $AIRFLOW_HOME/dags
mkdir $AIRFLOW_HOME/logs
mkdir $AIRFLOW_HOME/plugins

airflow users create \
    --username admin \
    --firstname Jack \
    --lastname  Sparrow\
    --role Admin \
    --email example@mail.org
```
- Start airflow scheduler and webserver
```shell
airflow webserver --port 8080
airflow sheduler
```
Vistit http://localhost:8080/home for the web version of Apache Airflow.

- The DAG is defined in `resources/airflow/setup.py`.
- **TODO**: add the DAG and execute it to train the model (see the official documentation of Apache Airflow to learn how to exectue and add a DAG with the airflow command).
- **TODO**: explain the architecture of apache airflow (see the official documentation of Apache Airflow).
- **TODO**: analyzing the setup.py: what happens if the task fails?, what is the peridocity of the task?

![Apache Airflow DAG success](images/airflow.jpeg)








