import mongoose from "mongoose";

const contactUs = mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true},
        phoneNo: {type: String, required: true, minLength: 10, maxLength: 10},
        message: {type: String, required: true},
        address: {type: String},
        subject: {type: String, required: true},
    },
    {
        timestamps: true
    }
);

export const Contact = mongoose.model("Contact", contactUs);