const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middle Wares

app.use(cors());
app.use(express.json());

// Connecting server with mongodb
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.v1rp4a3.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    // Collection of data in mongodb
    const productCollection = client
      .db("ecommerceDashboard")
      .collection("products");
    const cartProductCollection = client
      .db("ecommerceDashboard")
      .collection("productsInCart");
    const customerCollection = client
      .db("ecommerceDashboard")
      .collection("customers");

    // Loading all products from database
    app.get("/products", async (req, res) => {
      const query = {};
      const product = await productCollection
        .find(query)
        .sort({ addedOn: -1 })
        .toArray();
      res.send(product);
    });


    // Adding a product in cart in
    app.post("/cartProducts", async (req, res) => {
      const product = req.body;
      const id = product.id;
      const email = product.email;
      const query = {
        id: id,
        email: email,
      };
      const existedProduct = await cartProductCollection.find(query).toArray();

      if (existedProduct.length) {
        const message = `Product ${product.title} Is Already In Your Cart`;
        return res.send({ acknowledged: false, message });
      }
      const result = await cartProductCollection.insertOne(product);
      return res.send(result);
    });

    
    // Loading all the products added to the cart  by a specific user
    app.get("/myCart/:email", async (req, res) => {
      const email = req.params.email;
      console.log(req);
      const query = { email };
      const products = await cartProductCollection.find(query).toArray();
      res.send(products);
    });

    // loading all products that are added to the cart
    app.get("/cartProducts", async (req, res) => {
      const query = {};
      const products = await cartProductCollection.find(query).toArray();
      res.send(products);
    });

    // Loading single product details from the server
    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = {
        _id: ObjectId(id),
      };
      const product = await productCollection.findOne(query).toArray();

      res.send(product);
    });

    // Checking if a user is admin or not
    app.get("/users/admin/:email", async (req, res) => {
      const email = req.params.email;
      res.send({ isAdmin: email === "admin@gmail.com" });
    });

    // Loading all the customer from the database
    app.get("/customers", async (req, res) => {
      const query = {};
      const customers = await customerCollection
        .find(query)
        .sort({ addedOn: -1 })
        .toArray();
      res.send(customers);
    });

    // Adding a customer to the database
    app.post("/customers", async (req, res) => {
      const customer = req.body.customer;
      const result = await customerCollection.insertOne(customer);
      res.send(result);
    });

    // Adding a product to the database
    app.post("/products", async (req, res) => {
      const product = req.body.product;
      const result = await productCollection.insertOne(product);
      res.send(result);
    });

    // Deleting one product from user cart

    app.delete("/cartProducts/:id", async (req, res) => {
      const id = req.params.id;
      const query = {
        _id: ObjectId(id),
      };
      const result = await cartProductCollection.deleteOne(query);
      res.send(result);
    });


  } finally {
  }
}

run().catch((error) => console.log(error));

// Server api checkup
app.get("/", (req, res) => {
  res.send("Dashboard server running successfully");
});

// Server check on console

app.listen(port, () => {
  console.log(`Dashboard Server running on Port ${port}`);
});
