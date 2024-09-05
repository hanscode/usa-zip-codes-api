"use strict";

const express = require("express");
// Construct a router instance.
const router = express.Router();
const ZipCode = require("./models").ZipCode;
const { Op } = require("sequelize");

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

// Get all zip codes for a specific state with pagination
router.get(
  "/state/:state",
  asyncHandler(async (req, res) => {
    const state = req.params.state.toUpperCase();
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;
    const zipCodes = await ZipCode.findAndCountAll({
      where: { 
        state: {
          [Op.like]: state,
        },
       },
      limit,
      offset,
    });
    if (zipCodes.count > 0) {
      res.json(zipCodes);
    } else {
      res.status(404).json({ message: "No zip codes found for this state." });
    }
  })
);

// Get all zip codes for a specific city with pagination
router.get(
  "/city/:city",
  asyncHandler(async (req, res) => {
    const city = req.params.city.replace(/\+/g, " ");
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;
    const zipCodes = await ZipCode.findAndCountAll({
      where: { 
        city: {
          [Op.like]: city,
        },
       },
      limit,
      offset,
    });
    if (zipCodes.count > 0) {
      res.json(zipCodes);
    } else {
      res.status(404).json({ message: "No zip codes found for this city." });
    }
  })
);

module.exports = router;
