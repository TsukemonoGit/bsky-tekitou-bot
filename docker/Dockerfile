FROM node:18

ENV TZ JST-9
ENV TERM xterm
ENV HOST 0.0.0.0
EXPOSE 3000

RUN apt-get update && \
    apt-get install -y vim less

WORKDIR /var/src