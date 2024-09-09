import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UUID } from 'crypto';
import { v4 as uuidv4, validate as uuidValidate } from "uuid";
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { TaskStatus } from './enums/taskStatus';


export type TaskDocument = HydratedDocument<TaskDocumentSchema>;

@Schema({
    toJSON: { virtuals: true, versionKey: false, transform: (_, ret) => { delete ret._id; } },
    toObject: { virtuals: true, versionKey: false, transform: (_, ret) => { delete ret._id; } }
})
export class TaskDocumentSchema {
    _
    @Prop({ required: true, default: uuidv4,unique:true,immutable:true })
    id: UUID;

    @Prop({ required: true })
    title: string;

    @Prop({
        required: true,
        type: [String],
        validate: {
            validator: function (keywords: string[]) {
                return Array.isArray(keywords) &&
                keywords.length > 0 &&
                keywords.every(keyword => 
                    typeof keyword === 'string' && 
                    keyword.trim().length > 0 &&
                    !/^\d+$/.test(keyword)
                );
            },
            message: 'Keywords array cannot contain empty elements or be empty.',
            path: 'keywords'
        }
    })
    keywords: string[];

    @Prop({ required: true, type: SchemaTypes.Date})
    creationDate: Date;

    @Prop({ required: true,type: SchemaTypes.Date })
    updatedDate: Date;

    @Prop({ required: true, type: String, enum: [0, 1, 2] })
    status: TaskStatus;

}

export const TaskSchema = SchemaFactory.createForClass(TaskDocumentSchema);