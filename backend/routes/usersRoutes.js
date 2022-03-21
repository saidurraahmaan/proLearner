import express from 'express'
import {registerUser,loginUser,getMe,googleLogin,getUser} from '../controllers/userController.js'
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();
router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me',protect, getMe);
router.get('/getUser/:id',getUser);
router.post('/googleLogin',googleLogin);

export default router;