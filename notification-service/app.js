const express = require("express");
const { consumeEvent } = require("./consumer");
const connectDB = require("./db");
const Notification = require("./model");

const app = express();
app.use(express.json());

app.get("/notifications", async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).send({ error: err });
  }
});

connectDB();
consumeEvent();
const PORT = 5000;
app.listen(PORT, () => console.log(`TodoList Service running on port ${PORT}`));
