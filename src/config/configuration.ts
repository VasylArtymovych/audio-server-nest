import { IConfig } from 'src/types/configTypes';

export default (): IConfig => ({
  port: parseInt(process.env.PORT, 10) || 3001,
  database: {
    host: process.env.MONGO_URI,
  },
});
