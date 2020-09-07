const express = require('express');
const app = express();
const port =process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("QuicKss app backend!");
});
app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});
