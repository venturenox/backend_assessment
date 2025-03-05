const { Kafka } = require("kafkajs");

const kafka = new Kafka({ clientId: "todolist", brokers: ["localhost:9092"] });
const producer = kafka.producer();

const publishEvent = async (eventType, task) => {
  await producer.connect();
  await producer.send({
    topic: "task-events",
    messages: [{ key: eventType, value: JSON.stringify(task) }],
  });
  await producer.disconnect();
};

module.exports = { publishEvent };
