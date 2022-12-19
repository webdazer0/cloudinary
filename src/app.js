import express from "express";
import path from "path";
import { fileURLToPath } from "url";
//
import multer from "multer";
import morgan from "morgan";
import exphbs from "express-handlebars";
import photoRoutes from "./routes/photo.routes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log("__dirname =>", __dirname);

// Init
const app = express();
import "./database.js";

// Settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"), // /views/layouts
    partialsDir: path.join(app.get("views"), "partials"), // /views/partials
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/uploads"),
  filename: (req, file, callback) => {
    callback(null, new Date().getTime() + path.extname(file.originalname));
  },
});
app.use(multer({ storage }).single("image"));

// Routes
app.use(photoRoutes);

export default app;
