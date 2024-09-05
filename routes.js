"use strict";

const express = require("express");
// Construct a router instance.
const router = express.Router();
const ZipCode = require("./models").ZipCode;

/**
 * Handler function to wrap each route with. Reduces try.. catch blocks.
 * @param {function} cb
 * @returns callback
 */
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      // Forward error to the global error handler
      next(error);
    }
  };
}

/**
 * Zip Code Routes
 */

// Get details for a specific zip code
router.get(
  "/zipcode/:zip",
  asyncHandler(async (req, res) => {
    const zipCode = await ZipCode.findByPk(req.params.zip);
    if (zipCode) {
      res.json(zipCode);
    } else {
      res.status(404).json({ message: "Zip code not found." });
    }
  })
);

module.exports = router;
