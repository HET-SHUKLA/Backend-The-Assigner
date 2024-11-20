import mongoose from 'mongoose';

const services = ['SEO', 'WebDevelopment', 'AndroidDevelopment', 'CyberSecurity', 'Marketing', 'IELTS', 'PTE', 'PPT', 'Essay', 'Case Study'];

const d3UserSchema = mongoose.Schema(
    {
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        verify: {type: Boolean, required: true},
        name: {type: String, required: true},
        service: {type: String, enum: services, required: true}
    },
    {
        timestamps: true
    }
);

export const D3User = mongoose.model('D3User', d3UserSchema);