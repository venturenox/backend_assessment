const { run, disconnectConsumer } = require('./consumer');

const start = async () => {
    console.log('Notification Service is starting...');

    try {
        await run();
        console.log('Notification Service is now consuming Kafka events.');
    } catch (err) {
        console.error('Failed to start Notification Service:', err);
        process.exit(1);  // Exit with failure code
    }
};
process.on('SIGINT', async () => {
    await disconnectConsumer();
    process.exit(0);
});

start();



