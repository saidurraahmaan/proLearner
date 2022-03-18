import express from 'express'
import {getVerdict,postSubmission,getMySubmission} from "../controllers/submissionController.js";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();
router.post('/',postSubmission);
router.get('/',protect,getMySubmission);

export default router;