import * as dotenv from "dotenv";

dotenv.config();

export const HOST_API =
  process.env.REACT_APP_HOST_API_KEY ??
  "https://bosolution-api.azurewebsites.net";

export const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
