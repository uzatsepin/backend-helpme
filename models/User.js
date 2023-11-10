import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true,
    },
    town: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true,
    }
)

export default mongoose.model('User', UserSchema)