import { Router } from "express";
import { getOriginalUrl } from "../controllers/link.controller.js";

const router = Router()
router.route("/:code").get(getOriginalUrl)

export default router