import { Cloudinary } from '@cloudinary/url-gen'

export const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME,
    // apiKey: import.meta.env.PUBLIC_CLOUDINARY_API_KEY,
    // apiSecret: import.meta.env.CLOUDINARY_API_SECRET,
  },
  url: {
    secure: true, // force https, set to false to force http
  },
})

export const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`
