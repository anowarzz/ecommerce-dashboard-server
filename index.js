const express = require('express');
const cors = require('cors');
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000

// Middle Wares

app.use(cors());
app.use(express.json());











async function run () {


}

run().catch((error) => console.log(error));



















// Server api checkup
app.get('/', (req, res) => {
    res.send("Dashboard server running successfully")
})

// Server check on console

app.listen(port, () => {
    console.log(`Dashboard Server running on Port ${port}`);
    
})