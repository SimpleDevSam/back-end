import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UUID } from 'crypto';
import { Date, HydratedDocument } from 'mongoose';
import { TaskStatus } from 'src/domain/enums/taskStatus';
import { v4 as uuidv4, validate as uuidValidate } from "uuid";

export type TaskDocument = HydratedDocument<Task>;

@Schema({
    toJSON: { virtuals: true, versionKey: false, transform: (_, ret) => { delete ret._id; } },
    toObject: { virtuals: true, versionKey: false, transform: (_, ret) => { delete ret._id; } }
})
export class Task {
    _
    @Prop({ required: true, default: uuidv4 })
    id: UUID;

    @Prop({ required: true })
    title: string;

    @Prop({
        required: true,
        type: [String],
        validate: {
            validator: function (keywords: string[]) {
                return keywords.length > 0 && keywords.every(keyword => keyword && keyword.trim().length > 0);
            },
            message: 'Keywords array cannot contain empty elements or be empty.',
            path: 'keywords'
        }
    })
    keywords: string[];

    @Prop({ required: true, type: Date })
    creationDate: Date;

    @Prop({ required: true, type: Date })
    updatedDate: Date;

    @Prop({ required: true, type: String, enum: [0, 1, 2] })
    status: TaskStatus;

}

export const TaskSchema = SchemaFactory.createForClass(Task);