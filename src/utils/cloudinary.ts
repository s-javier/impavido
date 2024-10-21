import { v2 as cloudinary } from 'cloudinary'

export const getCloudinary = () => {
  cloudinary.config({
    cloud_name: import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: import.meta.env.PUBLIC_CLOUDINARY_API_KEY,
    api_secret: import.meta.env.CLOUDINARY_API_SECRET,
    secure: true,
    // secure_distribution: 'mydomain.com',
    // upload_prefix: 'myprefix.com',
  })
  return cloudinary
}
