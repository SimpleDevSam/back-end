import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, HydratedDocument } from 'mongoose';
import { TaskDocumentSchema } from './taskSchema';
import { UUID } from 'crypto';

export type LinkDocument = HydratedDocument<Link>;

@Schema()
export class Link {

    @Prop({ required: true })
    id: UUID;

    @Prop({ required: true })
    link: string;

    @Prop({ type: Types.ObjectId, ref: TaskDocumentSchema.name, required: true })
    taskId: Types.ObjectId; 
}

export const LinkSchema = SchemaFactory.createForClass(Link);
