import { Router } from "express";
import { handleInstagram } from "../controllers/instagram.controller.js";
import { handleFacebook } from "../controllers/facebook.controller.js";
import { handleYouTube } from "../controllers/youtube.controller.js";

const router = Router();

router.post("/instagram", handleInstagram);
router.post("/facebook", handleFacebook);
router.post("/youtube", handleYouTube);

export default router;
