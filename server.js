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

db.sequelize.sync({ force: false, alter: false }).then(() => {
    console.log(">>>>> Synced");
    createRoles();
    createPlans();
});

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Emrsive Mobile Applications.' });
});

app.get('/roles', (req, res) => {
    db.roles.findAll().then((result) => {
        res.json(result);
    });

    // db.user.update({ role_id: 1, Role: "admin" }, {
    //     where: {
    //         id: 1
    //     }
    // })

    // db.user.update({ role_id: 2, Role: "user" }, {
    //     where: {
    //         id: 2
    //     }
    // })
        
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});