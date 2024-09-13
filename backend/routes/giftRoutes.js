import { Router } from "express";
import {
  createGift,
  getGiftsByUserId,
  updateGift,
  deleteGift,
} from "../controllers/giftController.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";
import { check } from "express-validator";
import validateRequest from "../middlewares/validateRequest.js";

const router = Router();

// route to create a new gift (requires auth)
router.post(
  "/",
  authMiddleware,
  [
    check("userId", "User ID is required").not().isEmpty(),
    check("giftType", "Gift type is required").not().isEmpty(),
    check("message", "Message is required").not().isEmpty(),
    check("deliveryDate", "Delivery date is required").not().isEmpty(),
  ],
  validateRequest,
  createGift
);

// route to get all gifts for a specific user (requires auth)
router.get("/:userId", authMiddleware, getGiftsByUserId);

// route to update a specific gift by gift id (requires auth)
router.put(
  "/:giftId",
  authMiddleware,
  [
    check("giftType", "Gift type is required").not().isEmpty(),
    check("message", "Message is required").not().isEmpty(),
    check("deliveryDate", "Delivery date is required").not().isEmpty(),
  ],
  validateRequest,
  updateGift
);

// route to delete a specific gift by gift ID (requires auth)
router.delete("/:giftId", authMiddleware, deleteGift);

export default router;