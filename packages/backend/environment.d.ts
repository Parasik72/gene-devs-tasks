declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV?: string;
    PORT?: number;
    MONGO_URI?: string;
    JWT_ACCESS_SECRET?: string;
    JWT_ACCESS_EXPIRATION?: string;
    FRONTEND_URL?: string;
  }
}
