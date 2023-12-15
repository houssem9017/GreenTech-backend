import mongoose from 'mongoose';

const merchandiseTypeOptions = [
    'Food & Beverages',
    'Electronics',
    'Clothing & Apparel',
    'Cosmetics & Personal Care',
    'Home & D�cor',
    'Toys & Games',
    'Sports & Outdoor Equipment',
    'Other'
];

const packageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: false
    },
    producer: {
        type: Boolean,
        default: false
    },
    category: {
        type: String,
        enum: merchandiseTypeOptions,
        required:true
    },
    estimatedSize: {
        type: String,
        required: false
    },
    length: {
        type: Number,
        required: true
    },
    width: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    biodegradable: {
        type: Boolean,
        default: null,
    },
    compostable: {
        type: Boolean,
        default: null,
    },
    recyclable: {
        type: Boolean,
        default: null,
    },
    reusable: {
        type: Boolean,
        default: null,
    },
    otherSustainability: {
        type: String,
        required: false
    },
    liquid: {
        type: Boolean,
        default: null,
    },
    solid: {
        type: Boolean,
        default: null,
    },
    powder: {
        type: Boolean,
        default: null,
    },
    granules: {
        type: Boolean,
        default: null,
    },
    fragile: {
        type: Boolean,
        default: null,
    },
    perishable: {
        type: Boolean,
        default: null,
    },
    otherType: {
        type: String,
        required: false,
    },
    flexible: {
        type: Boolean,
        default: null,
    },
    rigid: {
        type: Boolean,
        default: null,
    },
    protective: {
        type: Boolean,
        default: null,
    },
    transparent: {
        type: Boolean,
        default: null,
    },
    opaque: {
        type: Boolean,
        default: null,
    },
    otherPackagingType: {
        type: String,
        required: false,
    },
    categoryData: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CategoryData',
        required: false
    },
},
    { timestamps: true }
);

export default mongoose.model('Package', packageSchema);