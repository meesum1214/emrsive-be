require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.DB_PORT|| 8080;

// Body Parser
const bodyParser = express.json();
app.use(bodyParser);

// Cors
const cors = require('cors');
const db = require('./models');
app.use(cors());

// routes
const routes = require("./routes");
const { createRoles, createPlans } = require('./services/extra-service');
app.use("/api", routes);

db.sequelize.sync({ force: false, alter: true }).then(() => {
    console.log(">>>>> Synced");
    createRoles();
    createPlans();
});

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Emrsive Mobile Applications.' });
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});