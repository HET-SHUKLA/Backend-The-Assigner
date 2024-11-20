import mongoose from 'mongoose';

const otpSchema = mongoose.Schema(
    {
        otp: {type: String, required: true},
        otpExpiry: {type: Date, required: true},
        email: {type: String, required: true, unique: true}
    },
    {
        timestamps: true
    }
);

export const Otp = mongoose.model('Otp', otpSchema);