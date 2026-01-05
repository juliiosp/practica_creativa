FROM python:3.10-slim

WORKDIR /practica_creativa

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

ENV PROJECT_HOME=/practica_creativa
EXPOSE 5001

CMD ["python3", "resources/web/predict_flask.py"]