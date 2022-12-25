import * as mongoose from "mongoose";
import { dbConfig } from "./config";

// this options not needed anymore
// const dbOptions = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

mongoose
  .set("strictQuery", false)
  .connect(dbConfig.MONGODB_URI)
  .then((db) => console.log(`DB '${db.connection.name}' is connected`))
  .catch((err) => console.log(err));

// console.log(db.connection._connectionOptions);
// console.log(db.connection.base.options);
