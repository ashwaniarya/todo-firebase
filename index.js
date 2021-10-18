const express = require("express");
const path = require('path');
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.static(path.resolve(__dirname, './build'),{
  cacheControl: true
}));
app.get('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname, './build/index.html'))
})

app.listen(PORT, () => {
  console.log("API server is running at ", PORT);
});
