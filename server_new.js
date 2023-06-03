
const express=require("express");
const app = express();
const path=require("path");

app.use(express.static(path.join(__dirname,"public")))  //public is folder in current folder.

app.listen(3000, () => console.log("Express Server Started at 3000"));


// How to json respons :-


