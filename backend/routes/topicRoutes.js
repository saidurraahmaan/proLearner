import express from 'express';
import {getAllTopics,getATopic , createATopic,updateTopic} from "../controllers/topicController.js";

const router = express.Router();

router.route('/all/:id').get(getAllTopics).post(createATopic);
router.route('/:id' ).get(getATopic);
router.route('/update/:id').put(updateTopic);


export default router;
