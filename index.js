const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());

//user: sportsuser01
//pass: 3xkOqeDo3E0lopnd


var uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-shard-00-00.ezvwb.mongodb.net:27017,cluster0-shard-00-01.ezvwb.mongodb.net:27017,cluster0-shard-00-02.ezvwb.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-13yb0z-shard-0&authSource=admin&retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const productCollection = client.db('sportsZone').collection('product');


        app.get('/products', async (req, res) => {
            const query = {};
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        });

        // [PUT - METHOD]

        app.put('/update/:id', async (req, res) => {
            const id = req.params.id;
            const user = req.body;
            console.log(user);
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    quantity: user.newQuantity
                },
            };
            result = await productCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        });

        app.put('/delivered/:id', async (req, res) => {
            const id = req.params.id;
            const user = req.body;

            console.log(user);

            const deliver = user.quantity - 1;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    quantity: deliver
                },
            };
            result = await productCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        });

    }
    finally {

    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running This Warehouse Server');
});

app.listen(port, () => {
    console.log('Listening this port', port);
})
