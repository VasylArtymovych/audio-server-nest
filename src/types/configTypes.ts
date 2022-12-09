export interface EnvironmentVariables {
  PORT: number;
  MONGO_URI: string;
}

export interface IConfig {
  port: number;
  database: { host: string };
}
