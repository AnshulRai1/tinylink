import { Router } from "express";
import {
    deleteLink,
    generateShortUrl,
    getAllLinks,
    getSingleLinkStats
} from "../controllers/link.controller.js";

const router = Router()
router.route("/links").post(generateShortUrl)
router.route("/links").get(getAllLinks)
router.route("/links/:code").delete(deleteLink)
router.route("/links/:code").get(getSingleLinkStats)

export default router