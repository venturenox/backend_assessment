const { mongoose } = require("mongoose");

const notificationSchema = new mongoose.Schema({
  eventType: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
