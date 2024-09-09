import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
      MongooseModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          uri: configService.get<string>('NODE_ENV') === 'test'
          ? configService.get<string>('MONGODB_URI_TEST')
          : configService.get<string>('MONGODB_URI_PROD')
        }),
      }),
    ],
  })
  export class DatabaseModule {}