export const API_BASE_URL = process.env.PROD === "true"
  ? process.env.PROD_BACKEND_SERVER + "api/"
  : process.env.LOCAL_BACKEND_SERVER + "api/";
export const BACK_BASE_URL = process.env.NEXT_PUBLIC_PROD === "true"
  ? process.env.NEXT_PUBLIC_PROD_BACKEND_SERVER
  : process.env.NEXT_PUBLIC_LOCAL_BACKEND_SERVER;
export const FRONT_BASE_URL = process.env.PROD === "true"
  ? process.env.PROD_FRONTEND_SERVER
  : process.env.LOCAL_FRONTEND_SERVER;
// export const ACCESS_TOKEN_NAME = "x-auth-token";
