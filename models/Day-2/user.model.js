import mongoose from "mongoose";

const educationSchema = mongoose.Schema(
    {
        degree: {type: String, required: true},
        passingYear: {type: String, required: true},
        grade: {type: String, required: true},
    }
);

const userSchema = mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        phoneNo: {type: String, required: true, minLength: 10, maxLength: 10},
        education: {type: [educationSchema], required: true},
        profilePic: {type: String, required: true},
        city: {type: String, required: true},
        state: {type: String, required: true},
        pincode: {type: String, required: true},
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.model('User', userSchema);