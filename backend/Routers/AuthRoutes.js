import express from "express";
import { RegisterUser } from "../Controlers/AuthControler.js";

const router = express.Router();

router.post("/register", RegisterUser);

export default router;