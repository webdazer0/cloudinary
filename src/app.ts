import express, { Express, Request } from "express";
import path from "path";
//
import multer, { DiskStorageOptions, StorageEngine } from "multer";
import morgan from "morgan";
import { create, ExpressHandlebars } from "express-handlebars";
import photoRoutes from "./routes/photo.routes";
// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Init
const app: Express = express();
import "./database";


// Settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", ".hbs");
const hbs: ExpressHandlebars = create({
  defaultLayout: "main",
  layoutsDir: path.join(app.get("views"), "layouts"), // /views/layouts
  partialsDir: path.join(app.get("views"), "partials"), // /views/partials
  extname: ".hbs",
})
app.engine(".hbs", hbs.engine);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const diskStorageOptions: DiskStorageOptions = {
  destination: path.join(__dirname, "public/uploads"),
  filename: (req: Request, file: Express.Multer.File, callback) => {
    const fileName = new Date().getTime() + path.extname(file.originalname);
    callback(null, fileName);
  },
};
const storage: StorageEngine = multer.diskStorage(diskStorageOptions);
app.use(multer({ storage }).single("image"));

// Routes
app.use(photoRoutes);

export default app;
