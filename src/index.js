import express from 'express';
const app = express();
const port =process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.status(200).send("QuicKss app backend!");
});
app.listen(port, () => {
  // if (err) {
  //   return console.error(err);
  // }
  return console.log(`server is listening on ${port}`);
});
export default app;