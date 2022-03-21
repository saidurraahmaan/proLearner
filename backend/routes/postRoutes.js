import express from 'express';
import {
    createAPost,
    createAComment,
    getAllPost,
    getAPost,
    updateMyPost,
    deleteMyPost,

} from "../controllers/postController.js";

import {protect} from "../middleware/authMiddleware.js";
const router = express.Router();

router.get('/',getAllPost);
router.get('/:id',getAPost);
router.post('/',protect,createAPost);
router.put('/:id',protect, updateMyPost);
router.delete('/:id',protect,deleteMyPost);

router.post('/comment/:id',protect,createAComment);

export default router;
