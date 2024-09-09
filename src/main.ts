import { NestFactory } from "@nestjs/core";
import { configDotenv } from "dotenv";
import { AppModule } from "./app.module";

configDotenv()

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',  
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });
  await app.listen(3001);
}
bootstrap();
