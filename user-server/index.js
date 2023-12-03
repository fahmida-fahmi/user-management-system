const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 2000;
const app = express();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cmyv688.mongodb.net/?retryWrites=true&w=majority`;

// console.log(uri);
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)

    const database = client.db("usersManagementDB").collection("userManagement");

    app.get("/users", async (req, res) => {
      const cursor = database.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.post("/users", async (req, res) => {
      const users = req.body;
      const result = await database.insertOne(users);
      res.send(result);
    });

    app.get('/users/:id', async(req,res)=>{
        const id = req.params.id 
        // const user = req.body 
        const query = {_id: new ObjectId(id)}
        const result = await database.findOne(query)
        res.send(result)
    })

    app.put('/users/:id', async(req,res)=>{
        const id = req.params.id
        const user = req.body 
        const options = {upsert: true} 
        const filter = { _id : new ObjectId(id)}
        const updateUser = {
            $set : {
                name: user.name,
                email: user.email,
                gender: user.gender,
                status: user.status
            }
        }
        const result = database.updateOne(filter, updateUser,options)
        res.send(result)
    })

    app.delete('/users/:id', async(req,res)=>{
        const id = req.params.id 
        const filter = { _id: new ObjectId(id)}
        const  result = await database.deleteOne(filter)
        res.send(result)
    })
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("The user is running not funning hehehe");
});

app.listen(port, () => {
  console.log(`the port is running in ${port}`);
});
