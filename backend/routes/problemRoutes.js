import express from 'express';
import {getAllTopicProblem,getATopicProblem,createAProblem,updateProblem,deleteAProblem} from '../controllers/problemController.js'

const router = express.Router();

router.route('/all/:id' ).get(getAllTopicProblem).post(createAProblem);
router.route('/:id' ).get(getATopicProblem);
router.route('/update/:id').put(updateProblem)
router.route('/delete/:id').delete(deleteAProblem)


export default router;