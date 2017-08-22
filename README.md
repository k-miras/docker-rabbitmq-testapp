Prerequesites

1) launched RabbitMQ Management image - ``` docker pull rabbitmq:3-management ```,  [how to run it](https://hub.docker.com/_/rabbitmq/)


How to run app

1)Go to [Ply With Docker](http://play-with-docker.com)
2)Create new Instance
3)Clone my repo and cd into it (using http)
4)Set "CONNECTION_URL" in Dockerfile
5)Create app image ```docker build ``` [instructions for Node.js](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
6)Run the image - there would be no output, you should attach into app container
