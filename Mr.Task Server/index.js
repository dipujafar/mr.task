const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion } = require("mongodb");

// middleware
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());

const verifyToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "unauthorized access" });
  }

  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "unauthorized access" });
    }
    req.decoded = decoded;
    next();
  });
};

const uri = process.env.DB_URL;

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
    await client.connect();

    const userCollection = client.db("mrTask").collection("users");
    const tasksCollection = client.db("mrTask").collection("tasks");

    //jwt related apis
    app.post("/jwt", async (req, res) => {
      try {
        const user = req?.body;
        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "1h",
        });
        res.send({ token });
      } catch {
        (err) => {
          res.send(err);
        };
      }
    });

    // insert task
    app.post("/tasks", async (req, res) => {
      try {
        const task = req.body;
        const result = await tasksCollection.insertOne(task);
        res.send(result);
      } catch {
        next(err);
      }
    });

    // insert user
    app.post("/users", verifyToken, async (req, res, next) => {
      try {
        const user = req.body;
        const query = { email: user.email };
        const existingUser = await userCollection.findOne(query);
        if (existingUser) {
          return res.send({ message: "user already exist", insertedId: null });
        }
        const result = await userCollection.insertOne(user);
        res.send(result);
      } catch {
        (err) => {
          next(err);
        };
      }
    });

    app.all("*", (req, res) => {
      res.status(400).send("Route is not found");
    });

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
  res.send("Mr.Task is on");
});

// global error handling middleware
app.use((error, req, res, next) => {
  if (error) {
    res.status(400).send("Something went wrong");
  }
});

app.listen(port, () => {
  console.log(`Mr.Task is on port ${port}`);
});
