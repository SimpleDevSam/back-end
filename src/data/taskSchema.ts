import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UUID } from 'crypto';
import { Date, HydratedDocument } from 'mongoose';
import { TaskStatus } from 'src/enums/taskStatus';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
    @Prop({ required: true })
    id: UUID;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    keywords: string[];

    @Prop({ required: true })
    creationDate: Date;

    @Prop({ required: true })
    updatedDate: Date;

    @Prop({ required: true })
    status: TaskStatus;

}

export const TaskSchema = SchemaFactory.createForClass(Task);