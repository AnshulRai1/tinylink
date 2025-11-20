import { Router } from "express";
import { generateShortUrl } from "../controllers/link.controller.js";

const router = Router()
router.route("/links").post(generateShortUrl)

export default router