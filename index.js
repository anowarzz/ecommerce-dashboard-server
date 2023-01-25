const express = require('express');
const cors = require('cors');
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000

// Middle Wares

app.use(cors());
app.use(express.json());







const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.v1rp4a3.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




async function run () {

try{

const productCollection = client.db("ecommerceDashboard").collection("products")
const cartProductCollection = client.db("ecommerceDashboard").collection("productsInCart")



// Loading all products from database
app.get("/products", async(req, res) => {
    const query = {}
    const product = await productCollection.find(query).toArray();
    res.send(product)
})




 // Adding a product in cart in 
 app.post("/cartProducts", async (req, res) => {
    const product = req.body;
    const id = product.id ;

    const query = {
      _id : ObjectId(id)
    };
    const existedProduct = await cartProductCollection.find(query).toArray();

    if (existedProduct.length) {
      const message = `Product ${product.title} Is Already In Your Cart`;
      return res.send({ acknowledged: false, message });
    }
    const result = await cartProductCollection.insertOne(product);
    return res.send(result);
  });








// Loading single product details from the server
app.get('/products/:id', async(req, res) => {

const id = req.params.id;
const query = {
    _id : ObjectId(id)
}
const product = await productCollection.findOne(query).toArray();

res.send(product)

})





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