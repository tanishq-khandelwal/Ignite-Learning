import { Router } from "express";
import {allPayments, buySubscription, cancelSubscription, getRazorpayApiKey, verifySubscription} from "../controllers/payment.controller.js"
import { authorizedRoles, isLoggedIn ,authorizeSubscribers} from "../middlewares/auth.middleware.js";


const router =Router();

router.route('/subscribe').post(buySubscription);
router.route('/verify').post(verifySubscription);
router.route('/unsubscribe').post(authorizeSubscribers,cancelSubscription);
router.route('/razorpay-key').get( getRazorpayApiKey);
router.route('/').get(allPayments);

export default router;
