require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

app.get('/',(req,res)=>{
    res.send('Note Api Are Runing')
})
mongoose.connect(process.env.MONGO_URL)

  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server running on http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB connection error:", err));
