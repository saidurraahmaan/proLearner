import express from 'express';
import {getAllTopicProblem,getATopicProblem,createAProblem,updateProblem,deleteAProblem,getMyProblem} from '../controllers/problemController.js'
import {protect} from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/all/:id",createAProblem);
router.get("/all/:id",getAllTopicProblem);
router.get('/:id',getATopicProblem );
router.put('/update/:id',updateProblem)
router.delete('/delete/:id',protect, deleteAProblem)
router.get('/list/my',protect,getMyProblem);


export default router;