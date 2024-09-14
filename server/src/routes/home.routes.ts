import { Router } from "express";
import { health, home } from "../controllers/home.controller";
const router = Router();

router.route("/").get(home)
router.route("/health").get(health)

export default router;