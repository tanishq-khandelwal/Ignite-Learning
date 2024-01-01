import {Router} from "express" ;
import { registerUser,loginUser,logoutUser,getLoggedInUserDetails,forgotPassword,resetPassword,changePassword, updateUser} from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";
const router=Router();

router.post('/register',upload.single("avatar"),registerUser);
router.post('/login',loginUser);
router.post('/logout',logoutUser);
router.get('/me',getLoggedInUserDetails);
router.post("/reset", forgotPassword);
router.post("/reset/:resetToken", resetPassword);
router.post('/change-password',changePassword);
router.put('/update/:id',upload.single("avatar"),updateUser);


export default router;

