import express from 'express';
import {getAllTopics,getATopic , createATopic} from "../controllers/topicController.js";
import Topic from "../models/topicModel.js";
import Problem from "../models/problemModel.js";

const router = express.Router();

router.route('/all/:id').get(getAllTopics).post(createATopic);

router.route('/:id' ).get(getATopic);

export default router;
