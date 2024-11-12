// Import environment variables for Cloudinary configuration
const upload_preset =
    import.meta.env.VITE_UPLOAD_PRESET // Cloudinary upload preset (predefined settings)
const cloud_name =
    import.meta.env.VITE_CLOUD_NAME // Cloudinary cloud name (account identifier)

const uploadImageToCloudinary = async file => {
    try {
        // Create a new FormData instance to prepare the image for upload
        const uploadData = new FormData()

        // Append the necessary data to the FormData object:
        uploadData.append('file', file)

        uploadData.append('upload_preset', upload_preset)

        uploadData.append('cloud_name', cloud_name)

        // Make POST request to Cloudinary's upload API
        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
                method: 'POST',
                body: uploadData // Send the FormData containing the image and settings
            }
        )

        // Parse the JSON response from Cloudinary
        const data = await res.json()

        // If upload failed, throw an error
        if (!res.ok) {
            throw new Error(data.message || 'Image upload failed')
        }


        return data

    } catch (error) {
        // Log error for debugging
        console.error('Error uploading image:', error)
            // Re-throw error to be handled by the calling component
        throw new Error('Failed to upload image. Please try again.')
    }
}

export default uploadImageToCloudinary;

/* 
Usage Example:
--------------
try {
    const imageFile = event.target.files[0];  // Get file from input
    const uploadedImage = await uploadImageToCloudinary(imageFile);
    console.log('Image URL:', uploadedImage.secure_url);
} catch (error) {
    console.error('Upload failed:', error);
}

Environment Variables (.env):
---------------------------
VITE_UPLOAD_PRESET=your_upload_preset
VITE_CLOUD_NAME=your_cloud_name

Note: These environment variables must be prefixed with VITE_ to be accessible
in a Vite-based React application.
*/