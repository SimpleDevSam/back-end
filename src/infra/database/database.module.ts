import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({imports:[MongooseModule.forRoot('mongodb+srv://samuelufop121035:Y5OEcDJnDdSoGGjo@desafioradixdb.thd2n.mongodb.net/?retryWrites=true&w=majority&appName=DesafioRadixDb')]})
export class DatabaseModule {}
