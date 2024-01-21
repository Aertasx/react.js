export const API_BASE_URL = process.env.PROD === "true"
  ? process.env.PROD_BACKEND_SERVER + "api/"
  : process.env.LOCAL_BACKEND_SERVER + "api/";
export const BASE_URL = process.env.PROD === "true"
  ? process.env.PROD_BACKEND_SERVER
  : process.env.LOCAL_BACKEND_SERVER;
// export const ACCESS_TOKEN_NAME = "x-auth-token";
