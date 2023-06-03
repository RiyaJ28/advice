const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  const url = "https://api.adviceslip.com/advice";
  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      const adviceData = JSON.parse(data);
      const adviceID = adviceData.slip.id;
      const advice = adviceData.slip.advice;
      res.render("advice" , {adviceID:adviceID , advice:advice});
    });
  });
  
});

app.listen(3000 || process.env.PORT , function () {
  console.log("Server is running on port 3000");
});
