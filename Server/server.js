import app from './app.js';
import { config } from 'dotenv';
import connectToDB from './config/dbConnection.js';
import cloudinary from 'cloudinary';
import Razorpay from 'razorpay'; // Correct import statement for Razorpay
config();

const PORT = process.env.PORT || 5000;

// Cloudinary Configuration
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Razorpay Configuration
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET, // Corrected the variable name
});

app.listen(PORT, async (err) => {
    await connectToDB();
    if (err) {
        console.error(`Error starting the server: ${err}`);
    } else {
        console.log(`App is running at http://localhost:${PORT}`);
    }
});

export default app;
export { razorpay }; // Exporting the razorpay instance for use in other parts of your application
