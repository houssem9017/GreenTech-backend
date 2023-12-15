import express from 'express';
import { register, login, test, getcookie, sendcode, verifycode, newPassword } from '../controllers/userController.js';
import { verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/signup', register);
router.post('/login', login);
router.post('/test', verifyUser, test); 
router.get('/getcookies', getcookie);
router.post('/sendcode', sendcode);
router.post('/verifycode', verifycode);
router.post('/newpassword', verifyUser, newPassword);

export default router;
