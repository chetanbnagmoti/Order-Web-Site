//1.list t-shirt -json ,unique
//2.diff betw get and post ,admin:form to add t-shirt.

// This folowing are exported modeule from npm:- require is exported.
const express = require("express");
const app = express();
const path = require("path");
const feedbak_express = require("./feedback"); //object in  feedback.js file.
const orders = require("./orders");
const bodyParser = require("body-parser"); //object created bodyParser for constructiong data.
const ejs = require("ejs");

app.use(express.static(path.join(__dirname, "public"))); //"public" is folder in current folder.
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.listen(3000, () => console.log("Express Server Started at 3000"));

// How to json respons :- How To Printe "Feedbak.js" file requred on browser.

app.get("/feedback/total", (req, res) => {
  res.status(200);
  // res.json(feedbak_express);
  res.render("feedback_info", { feedback: feedbak_express });
});

app.get("/feedback/total/:feedbackId", (req, res) => {
  //jo serch karna hey uska name hum dalte hey for exam /product/trending,/product/:productId
  res.status(200); //ya ha pe o :productId for variable serching. for ex:-productId:1
  console.log("feedbackId:" + req.params.feedbackId); //params for changes string into numbers.
  // res.json(feedbak_express[req.params.feedbackId - 1]);
  res.render("feedback_Details", {
    feedback: feedbak_express[req.params.feedbackId - 1],
  });
});

app.get("/feedback", (req, res) => {
  //"/admin/new" => it is route coming form brouser. (hey khuch bhi ho sakata hey)
  res.sendFile(__dirname + "/public/contact-us.html"); //"/product/new-product.html" => file go to the response of broser.(open in broser.)
});

app.post("/admin/addFeedback", (req, res) => {
  //collect data here from brouser to your file.
  //"/admin/addProduct" => iit is also route.
  //"/admin/addFeedback" it is action and is is wrritten in when creat form then action is must be wrritern.
  console.log(req.body);
  const body = req.body;
  const new_Feedback = {
    id: feedbak_express.length + 1,
    fullName: body.name,
    address: body.address,
    mobiel_NO: body.mobiel_NO,
    email_Id: body.email_Id,
    state: body.state,
    pincode: body.pincode,
    experience: body.experience_Yes,
    experience: body.experience_No,
    e_commerc_player: body.e_commerc_player_Yes,
    e_commerc_player: body.e_commerc_player_No,
  };
  feedbak_express.push(new_Feedback); //push method used for store  data in
  res.send("Yes ! Youre Response Is Collected. !!!" + new_Feedback.fullName);
});

// Order ID

app.get("/orders-id", (req, res) => {
  res.status(200);
  // res.json(orders);
  res.render("order_Detail", { order_id: orders });
});



app.post("/info-order", (req, res) => {
  const body = req.body;
  console.log(req.body);

  const id = {
    d: body.order_id,
  };

  console.log(id.d);

  //22077219

  // res.json(orders[id.d]);

  res.render("order_specific", { order_id: orders[id.d - 1] });
});


