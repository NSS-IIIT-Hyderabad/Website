FROM python:3.11-slim

RUN python -m venv venv
RUN venv/bin/pip install --upgrade pip
COPY . .
RUN venv/bin/pip install -r requirements.txt
RUN venv/bin/strawberry export-schema main > schema.graphql
EXPOSE 8000
ENTRYPOINT ["./init.sh"]