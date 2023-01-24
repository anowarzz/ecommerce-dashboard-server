const express = require('express');
const cors = require('cors');
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000

// Middle Wares

app.use(cors());
app.use(express.json());







const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.v1rp4a3.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




async function run () {

try{

const productCollection = client.db("ecommerceDashboard").collection("products")
}

finally{


}
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