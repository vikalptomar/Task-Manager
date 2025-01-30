const express = require("express");
const env = require("dotenv").config();
const connectDb = require("./config/dbconnection");
const cors = require("cors");

const app = express();
connectDb();

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/api/todoTask", require("./routes/todoTaskRoute"));
app.use("/api/user", require("./routes/userRoute"));

// app.post("/userRegistration", (req, resp) => {
//   const { userName, email, password, phone } = req.body;
//   if (!userName || !email || !password || !phone) {
//     resp.send("error");
//     resp.status(400);
//     console.log("error");
//   } else {
//     resp.status(201);
//     resp.send("ok");
//     console.log("ok");
//   }
// });

app.listen(5000);
