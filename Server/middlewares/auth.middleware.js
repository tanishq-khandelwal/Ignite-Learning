import AppError from "../utils/error.utils.js";
import jwt from 'jsonwebtoken';

const isLoggedIn = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new AppError('Unauthenticated, Please Login', 401));
    }

    try {
        const userDetails = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = userDetails;

        // Setting the cookie within the context of the route handler
        const cookieOptions = {
            secure: true,
            sameSite: 'none',
            httpOnly: false
        };
        res.cookie('token', token, cookieOptions);
        console.log('Token set successfully');

        // Continue with the next middleware or route handler
        next();
    } catch (error) {
        return next(new AppError('Invalid or Expired Token', 401));
    }
};

const authorizedRoles=(...roles) => async(req,res,next) => {
    const currenUserRole = req.user.role;
    if(!roles.includes(currenUserRole)){
        return next(
            new AppError('You do not have permission to access',400)

        )
    }

}
    const authorizeSubscribers = async (req, _res, next) => {
        // If user is not admin or does not have an active subscription then error else pass
        if (req.user.role !== "ADMIN" && req.user.subscription.status !== "active") {
          return next(new AppError("Please subscribe to access this route.", 403));
        }
    next()
}


export{
    isLoggedIn,
    authorizedRoles,
    authorizeSubscribers,
}
