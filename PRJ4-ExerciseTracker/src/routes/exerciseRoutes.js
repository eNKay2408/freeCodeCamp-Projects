const express = require("express");
const router = express.Router();
const exerciseController = require("../controllers/exerciseController");

router.post("/:_id/exercises", exerciseController.addExercise);
router.get("/:_id/logs", exerciseController.getExerciseLog);

module.exports = router;
