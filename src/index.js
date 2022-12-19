import app from "./app.js";

const port = app.get("port");

app.listen(app.get("port"), () => {
  console.log("Server on port:", port);
  console.log("Environment:", process.env.NODE_ENV);
});
