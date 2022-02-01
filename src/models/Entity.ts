import { Schema, model, connect } from 'mongoose';

export interface IMethod {
    _id: string;
    active: boolean;
    subscriptionName: string;
    filterSchema: { [key: string]: string };
    subscriptionBody: { [key: string]: string };
    responseSchema: { [key: string]: string };
}

interface IEntity {
    _id: string;
    name: string;
    description: string;
    methods: [Schema.Types.Mixed]
}

const schema = new Schema<IEntity>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    methods: [
        { type: Schema.Types.ObjectId, ref: 'Equipment', required: true }
    ],
});

export default model<IEntity>('Entity', schema);
