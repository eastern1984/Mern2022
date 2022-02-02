import { Schema, model, connect, Types } from 'mongoose';

interface IUser {
    email: string;
    password: string;
    entities: string[]
}

const schema = new Schema<IUser>({
    email: { type: String, required: true },
    password: { type: String, required: true },
    entities: [{ type: Types.ObjectId, ref: 'Entity' }],
});

export default model<IUser>('User', schema);

