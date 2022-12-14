const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.m12jl.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const productsCollection = client.db('gear-up').collection('products');


        //get all products
        app.get('/products', async (req, res) => {
            const query = {};

            const cursor = productsCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        })

        //get a single products by id
        app.get('/product/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };

            const cursor = await productsCollection.findOne(query);
            res.send(cursor);
        })

    }

    finally {

    }
}

run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('E-Mart-BD server is Running')
})

app.listen(port, () => {
    console.log(`E-Mart-BD server is listening on port ${port}`)
})