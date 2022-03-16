import express from 'express'
import {getVerdict1,getVerdict2} from "../controllers/submissionController.js";

const router = express.Router();
router.post('/1',getVerdict1);
router.post('/2',getVerdict2);

export default router;