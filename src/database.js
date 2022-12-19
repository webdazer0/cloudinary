import * as mongoose from "mongoose";
import { dbConfig } from "./config.js";

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .set("strictQuery", false)
  .connect(dbConfig.MONGODB_URI, dbOptions)
  .then((db) => console.log(`DB '${db.connection.name}' is connected`))
  .catch((err) => console.log(err));

// console.log(db.connection._connectionOptions);
// console.log(db.connection.base.options);
