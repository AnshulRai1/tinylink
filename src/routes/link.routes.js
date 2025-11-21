import { Router } from "express";
import {
    deleteLink,
     generateShortUrl,
     getAllLinks,
     getOriginalUrl
} from "../controllers/link.controller.js";

const router = Router()
router.route("/links").post(generateShortUrl)
router.route("/links").get(getAllLinks)
router.route("/links/:code").delete(deleteLink)
router.route("/:code").get(getOriginalUrl)

export default router