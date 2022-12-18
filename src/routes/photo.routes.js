const { Router } = require("express");
const router = Router();

const photoController = require("../controller/photo.controller");

router.route("/").get(photoController.getAll);

router
  .route("/images/add")
  .get(photoController.getAllForm)
  .post(photoController.create, (req, res) => res.redirect("/"));

router
  .route("/images/delete/:id")
  .get(photoController.deleteById, (req, res) => res.redirect("/"));

module.exports = router;
