import axios from "axios";
import express from "express";
import bodyParser from "body-parser";


const app = express();
const PORT = 3000;
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
      const result = await axios.get("https://secrets-api.appbrewery.com/random");
      res.render("index.ejs", { secret: JSON.stringify(result.data.secret), user: JSON.stringify(result.data.username) });
    } catch (error) {
      console.log(error.response.data);
      res.status(500);
    }
  });

app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
});