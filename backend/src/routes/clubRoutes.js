const express = require("express");
const router = express.Router();

const clubController = require("../controllers/clubController");
const auth = require("../middlewares/authMiddleware");
const roleCheck = require("../middlewares/rollcheckMiddleware");

// Create a new club (authenticated users only)
router.post("/", auth, clubController.createClub);

// Get all clubs (public)
router.get("/", clubController.getClubs);

// Get a single club by ID (public)
router.get("/:id", clubController.getClubById);

// Update a club (authenticated users, optionally add roleCheck for admin/owner)
router.put("/:id", auth, /* roleCheck(["admin"]) */ clubController.updateClub);

// Delete a club (authenticated users, optionally add roleCheck for admin/owner)
router.delete(
  "/:id",
  auth,
  /* roleCheck(["admin"]) */ clubController.deleteClub,
);

module.exports = router;
