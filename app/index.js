"use strict";

var amqp = require("amqplib"),
  bunyan = require("bunyan"),
  log = bunyan.createLogger({
    name: "test"
  }),
  config = require("config"),
  request = require("request");

function main() {
  amqp
    .connect(process.env.CONNECTION_URL)
    .then(function(conn) {
      log.info(
        "Successfully connected to RabbitMQ server: " +process.env.CONNECTION_URL );
      return conn.createChannel();
    })
    .then(function(ch) {
      log.info("Successfully created channel");

      var q = config.get("READ_Q");
      var x = config.get("INPUT_X");
      var outx = config.get("OUTPUT_X");
      ch.assertQueue(q, {
        durable: true,
        autoDelete: false
      });
      ch.assertExchange(x, "direct", {
        durable: true,
        autoDelete: false
      });
      ch.assertExchange(outx, "direct", {
                durable: true,
                autoDelete: false
            });
      ch.bindQueue(q, config.get("INPUT_X"), config.get("INPUT_ROUTING_KEY"));
      ch.prefetch(config.get("PREFETCH_COUNT"));
      log.info("Settings - OK\nStarting consume");
      
      ch.consume(q, function(message) {
        var msg = message.content.toString();
        console.log("Received: "+msg);
        ch.publish(
          outx,
          config.get("OUTPUT_ROUTING_KEY"),
          new Buffer(msg)
        );
        console.log("published: "+msg);
        ch.ack(message, false);
      });
    })
    .catch(function(err) {
      log.error(err, "There was an error while working with RabbitMQ server");
    });
}

main();
