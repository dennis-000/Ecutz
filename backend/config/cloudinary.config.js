import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// Check if CLOUDINARY_URL exists
// if (!process.env.CLOUDINARY_CLOUD_NAME) {
//   throw new Error('CLOUDINARY_CLUDNAME is not set in .env file');
// }
// Configure Cloudinary using the URL from .env
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default cloudinary