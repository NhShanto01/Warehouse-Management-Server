const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
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
