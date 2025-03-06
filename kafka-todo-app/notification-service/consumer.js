const { Kafka } = require('kafkajs');
const { kafkaBrokers, kafkaClientId, kafkaGroupId, kafkaTopic } = require('./config');

const kafka = new Kafka({ clientId: kafkaClientId, brokers: kafkaBrokers });
const consumer = kafka.consumer({ groupId: kafkaGroupId });

const run = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: kafkaTopic, fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const eventType = message.key.toString();
            const task = JSON.parse(message.value.toString());
            console.log(`Received event: ${eventType}`, task);
            /*
                we can update the DB or send an email based on the event type
            */
            //CODE WILL BE HERE
        }
    });

    console.log('Kafka Consumer ready and listening');
};

const disconnectConsumer = async () => {
    await consumer.disconnect();
    console.log('Kafka Consumer disconnected');
};

module.exports = { run, disconnectConsumer };