import { Schema, model, connect } from 'mongoose';

interface IUser {
    login: string;
    password: string;
}

const schema = new Schema<IUser>({
    login: { type: String, required: true },
    password: { type: String, required: true },
});

export default model<IUser>('User', schema);

