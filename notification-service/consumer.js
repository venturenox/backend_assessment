const { Kafka } = require("kafkajs");
const Notification = require("./model");

const kafka = new Kafka({
  clientId: "notification-service",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "consumer-1" });

const consumeEvent = async () => {
  await consumer.connect();
  await consumer.subscribe({ topics: ["task-events"], fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      try {
        const existingNotification = await Notification.findOne({
          eventType: message.key.toString(),
          value: message.value.toString(),
        });
        if (!existingNotification) {
          const notification = new Notification({
            eventType: message.key.toString(),
            value: message.value.toString(),
          });
          await notification.save();
          console.log(notification);
        }
      } catch (err) {
        console.log(err);
      }
    },
  });
};

module.exports = { consumeEvent };
