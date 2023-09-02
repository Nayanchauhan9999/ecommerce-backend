export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_URI: string;
      JWT_SECRET_KEY: string;
    }
  }
}
