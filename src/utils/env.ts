export const config = {
  BASE_URL: process.env.NEXT_PUBLIC_VERCEL_URL ? "https://" : "http://",
  URL: process.env.NEXT_PUBLIC_VERCEL_URL ?? "localhost:3000",
};

export const paths = {
  RESET_PASSWORD: `${config.BASE_URL}${config.URL}/resetpw`,
  VERIFY_EMAIL: `${config.BASE_URL}${config.URL}/verify`,
  OAUTH_FAILURE: `${config.BASE_URL}${config.URL}/signup`,
  OAUTH_SUCCESS: `${config.BASE_URL}${config.URL}/dashboard`,
};
