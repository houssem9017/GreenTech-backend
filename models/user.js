import mongoose from 'mongoose';

const userTypeOptions = ['producer', 'customer']; // Options for the userType field

const userSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    adress: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    website: {
        type: String,
        default: 'not available'
    },
    userType: {
        type: String,
        required: true,
        enum: userTypeOptions
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    ConfirmationCode: {
        type: Number,
        required: false
    },
},
    { timestamps: true }
);

export default mongoose.model('User', userSchema);
