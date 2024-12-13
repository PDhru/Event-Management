const database = require("./config/database");
const express = require("express");
const Config = require("./config");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use("/uploads", express.static("uploads"));


// OUR ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);


const PORT = Config.PORT || 5000;

app.listen(PORT, () => {
  database();
  console.log(`Server is running on localhost:${PORT}`);
});