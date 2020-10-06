import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import { router } from "./routes";

import "reflect-metadata";

import "./database";

const app = express();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.single('sourceFile')); 
app.use(express.json());
app.use(router);

app.listen(3333, () => {
  console.log("Running on port 3333");
});
