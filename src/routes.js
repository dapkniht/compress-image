import express from "express";
import compress from "./compress.js";
import session from "express-session";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("images"));
  },
  filename: function (req, file, cb) {
    const fileExt = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExt);
  },
});

const upload = multer({ storage: storage });

const routes = express.Router();

routes.use(
  session({
    secret: "lkdmoairnfauirpoakrpopoimesoiduye",
    resave: false,
    saveUninitialized: true,
  })
);

//Routes
routes.get("/", (req, res) => {
  res.render("index", { success: false });
});

routes.post("/", upload.single("image"), async (req, res) => {
  const fileName = req.file.path;
  const response = await compress(fileName);
  req.session.filename = response.file;
  res.render("index", { success: true, message: response.message });
});

routes.get("/download", (req, res) => {
  const file = req.session.filename;
  res.download(file);
});

export default routes;
