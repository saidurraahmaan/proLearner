import express from 'express';
import {getAllTopicProblem,getATopicProblem,createAProblem} from '../controllers/problemController.js'

const router = express.Router();


router.route('/all/:id' ).get(getAllTopicProblem).post(createAProblem);
router.route('/:id' ).get(getATopicProblem);


export default router;