const express = require("express");
const app = express();

const Users = require("./routes/Users");
const Orders = require("./routes/Orders");

// 设置跨域访问
app.all("*",function(req,res,next){
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin","*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers","content-type");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
      res.sendStatus(200);  //让options尝试请求快速结束
  else
      next();
})

// 配置post解析
app.use(express.json());

app.use("/api/user",Users);
app.use("/api/order",Orders);


app.listen(5000,() => {
  console.log("Server is running on port 5000···");
})
