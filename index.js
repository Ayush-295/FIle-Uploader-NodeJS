const express = require("express");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("homepage.ejs");
});

app.post("/upload", upload.single("profileImage"), (req, res) => {
  console.log(req.file);
  console.log(req.body);
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
