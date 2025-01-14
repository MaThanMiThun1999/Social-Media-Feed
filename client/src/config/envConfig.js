// Set the site name
export const siteName = process.env.PUBLIC_SITE_NAME || 'PostPal';
//google analytics
export const googleTrackingId = process.env.PUBLIC_GOOGLE_TRACKING_ID;
export const googleClientId = process.env.PUBLIC_GOOGLE_CLIENT_ID;

// Set API URL
export const apiUrl =
  import.meta.env.MODE === 'development'
    ? process.env.PUBLIC_API_URL
    : process.env.PUBLIC_API_URL;
export const config = () => {
  if (!process.env.PUBLIC_SITE_NAME) {
    throw new Error(
      'Missing environment variables. Please check your .env file.'
    );
  }
};

config();
