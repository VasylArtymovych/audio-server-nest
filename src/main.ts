import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config/configuration';

async function start() {
  try {
    const PORT = config().port || 3001;
    const app = await NestFactory.create(AppModule);

    await app.listen(PORT, () =>
      console.log(`Server is running on PORT: ${PORT}`),
    );
  } catch (error) {
    console.log(error);
  }
}
start();
