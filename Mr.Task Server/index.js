const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "https://mrtask-d0594.web.app"],
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
    // await client.connect();

    const userCollection = client.db("mrTask").collection("users");
    const tasksCollection = client.db("mrTask").collection("tasks");

    //middleware
    const verifyAdmin = async (req, res, next) => {
      const email = req?.decoded?.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      const isAdmin = user?.role === "admin";
      if (!isAdmin) {
        return res.status(403).send({ message: "forbidden" });
      }
      next();
    };

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
    app.post("/tasks", verifyToken, async (req, res) => {
      try {
        const task = req.body;
        const result = await tasksCollection.insertOne(task);
        res.send(result);
      } catch {
        next(err);
      }
    });

    //get tasks
    app.get("/tasks", verifyToken, async (req, res) => {
      try {
        const result = await tasksCollection.find().toArray();
        res.send(result);
      } catch {
        next(err);
      }
    });

    app.get("/tasks/:email", async (req, res) => {
      try {
        const email = req.params.email;
        const result = await tasksCollection.find({ email: email }).toArray();
        res.send(result);
      } catch {
        next(err);
      }
    });

    //change status
    app.put("/tasks/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const status = req.body.status;
        console.log(status);
        const query = { _id: new ObjectId(id) };
        const options = { upsert: true };
        const updateDoc = {
          $set: {
            status: status,
          },
        };
        const result = await tasksCollection.updateOne(
          query,
          updateDoc,
          options
        );
        console.log(result);
        res.send(result);
      } catch {
        (err) => {
          next(err);
        };
      }
    });

    app.delete("/tasks/:id", verifyToken, verifyAdmin, async (req, res) => {
      try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const result = await tasksCollection.deleteOne(query);
        res.send(result);
      } catch {
        (err) => {
          next(err);
        };
      }
    });

    // insert user
    app.post("/users", async (req, res, next) => {
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

    // admin related api
    app.get("/users/admin/:email", verifyToken, async (req, res) => {
      try {
        const email = req.params.email;
        if (email !== req.decoded.email) {
          return res.status(403).send({ message: "forbidden" });
        }

        const query = { email: email };
        const user = await userCollection.findOne(query);
        let admin = false;
        if (user) {
          admin = user?.role === "admin";
        }
        res.send({ admin });
      } catch {
        (err) => {
          res.send(err);
        };
      }
    });

    // Send a ping to confirm a successful connection

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
