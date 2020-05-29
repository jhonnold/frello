import { model, Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface User extends Document {
    username: string;
    password: string;
    validatePassword(password: string): Promise<boolean>;
    generateToken(): string;
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

UserSchema.pre<User>('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 8);

    this.password = hash;
    next();
});

UserSchema.methods.validatePassword = async function (password): Promise<boolean> {
    const compare = await bcrypt.compare(password, this.password);

    return compare;
};

UserSchema.methods.generateToken = function (): string {
    const token = jwt.sign({ username: this.username }, process.env['JWT_SECRET']);

    return token;
};

const UserModel = model<User>('user', UserSchema);
export default UserModel;
