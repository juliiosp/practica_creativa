FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

ENV PROJECT_HOME=/app
EXPOSE 5001

CMD ["python3", "resources/web/predict_flask.py"]