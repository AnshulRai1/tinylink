import { Router } from "express";
import {
     generateShortUrl,
     getAllLinks
} from "../controllers/link.controller.js";

const router = Router()
router.route("/links").post(generateShortUrl)
router.route("/links").get(getAllLinks)

export default router