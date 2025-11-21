import { Router } from "express";
import {
     generateShortUrl,
     getAllLinks,
     getOriginalUrl
} from "../controllers/link.controller.js";

const router = Router()
router.route("/links").post(generateShortUrl)
router.route("/links").get(getAllLinks)
router.route("/:code").get(getOriginalUrl)

export default router