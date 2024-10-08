import express from "express";
import axios from "axios";
//伺服器疑似SSL憑證過期，因此在本地端測試時暫時加上此指令
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

//建立express application object 以及 server port
const app = express();
const port = 3000;

const API_URL = "https://api.quotable.io";

//用express處理HTML表單資料
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

//首頁渲染
app.get("/", (req,res) => {
    res.render("index.ejs");
})

app.post("/submit", async (req, res) => {
    const choice = req.body.choice;
    const result = await axios.get(API_URL + "/quotes?tags=" + choice);
    const resultContent = result.data.results;
    //用random從特定分類中隨機取quote
    const randomNumber = Math.floor(Math.random() * resultContent.length);
    console.log(randomNumber);
    const randomQuote = resultContent[randomNumber].content;
    const username = req.body.username;
    console.log(req.body, randomQuote);
    res.render("index.ejs", { content: randomQuote, username: username });
})

//監聽serever port
app.listen(port, () => {
    console.log(`server started at port ${port}`);
})