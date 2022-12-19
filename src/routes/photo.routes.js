import { Router } from "express";
const router = Router();

import photoController from "../controller/photo.controller.js";

router.route("/").get(photoController.getAll);

router
  .route("/images/add")
  .get(photoController.getAllForm)
  .post(photoController.create, (req, res) => res.redirect("/"));

router
  .route("/images/delete/:id")
  .get(photoController.deleteById, (req, res) => res.redirect("/"));

export default router;
