import { Schema, model, connect } from 'mongoose';

export interface IMethod {
    type: string;
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
    methods: IMethod[]
}

const methodSchema = new Schema({
    type: {
        type: Number,
    },
    active: {
        type: Boolean,
    },
    subscriptionName: {
        type: String,
    },
    filterSchema: {
        type: Object,
    },
    subscriptionBody: {
        type: Object,
    },
    responseSchema: {
        type: Object,
    },
});

const schema = new Schema<IEntity>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    methods: [methodSchema],
});

export default model<IEntity>('Entity', schema);
