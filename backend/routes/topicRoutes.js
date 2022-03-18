import express from 'express';
import {getAllTopics,getATopic , createATopic,updateTopic,getMyTopics,deleteMyTopic} from "../controllers/topicController.js";
import {protect} from "../middleware/authMiddleware.js";


const router = express.Router();

router.route('/all/:id').get(getAllTopics).post(createATopic);
router.route('/:id' ).get(getATopic);
router.route('/update/:id').put(updateTopic);
router.get('/list/my',protect, getMyTopics);
router.delete('/delete/:id',protect, deleteMyTopic);


export default router;
