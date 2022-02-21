import express from 'express'

const router = express.Router();
import {
    getLanguages,
    getLanguageById
} from "../controllers/languageController.js";



router.route('/').get(getLanguages);
router.route('/:id').get(getLanguageById);


export default router;
