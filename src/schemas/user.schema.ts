import mongoose, { Schema, Document } from "mongoose";

export interface IUserDocument extends Document {
    name: string;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
});

export default mongoose.model<IUserDocument>("User", UserSchema);
