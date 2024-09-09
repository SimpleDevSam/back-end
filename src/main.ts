import { NestFactory } from "@nestjs/core";
import { configDotenv } from "dotenv";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

configDotenv()

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',  
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });
  const config = new DocumentBuilder()
    .setTitle('Gerenciador de Tarefas - Desafio Radix')
    .setDescription('API de gerenciamento de tarefas e busca de notícias relacionadas a esta tarefa.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3001);
}
bootstrap();
