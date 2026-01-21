const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/upload", (req, res) => {
  const id = Date.now();
  fs.writeFileSync(`storage/${id}.enc`, req.body.data);
  res.json({ success: true });
});

app.get("/files", (req, res) => {
  const files = fs.readdirSync("storage");
  res.json(files);
});

app.get("/file/:name", (req, res) => {
  const data = fs.readFileSync(`storage/${req.params.name}`);
  res.json({ data });
});

app.listen(3000, () => console.log("Server running"));
