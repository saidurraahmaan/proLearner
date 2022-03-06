import express from 'express';
import {getAllTopicProblem,getATopicProblem,createAProblem,updateProblem} from '../controllers/problemController.js'

const router = express.Router();

router.route('/all/:id' ).get(getAllTopicProblem).post(createAProblem);
router.route('/:id' ).get(getATopicProblem);
router.route('/update/:id').put(updateProblem)


export default router;