import mongoose from 'mongoose';

const categoryDataSchema = new mongoose.Schema({
    subcategory: {
        type: String,
        required: true,
    },
    preservationNeeds: {
        type: String,
        required: false,
    },
    modifiedAtmospherePackaging: {
        type: Boolean,
        required: false,
    },
    electrostaticDischargeProtection: {
        type: Boolean,
        required: false,
    },
    tamperProtection: {
        type: Boolean,
        required: false,
    },
    secureBatteriesForShipping: {
        type: Boolean,
        required: false,
    },
    separateCordsAndAccessories: {
        type: Boolean,
        required: false,
    },
    damageProtectionLevel: {
        type: String,
        required: false,
    },
    materialSensitivity: {
        type: String,
        required: false,
    },
    moistureProtection: {
        type: Boolean,
        required: false,
    },
    leakproofRequirements: {
        type: Boolean,
        required: false,
    },
    uvProtection: {
        type: Boolean,
        required: false,
    },
    fragilityLevel: {
        type: String,
        required: false,
    },
    assemblyInstructions: {
        type: String,
        required: false,
    },
    materialCare: {
        type: String,
        required: false,
    },
    outdoor: {
        type: String,
        required: false,
    },
    indoor: {
        type: String,
        required: false,
    },
    durability: {
        type: Boolean,
        required: false,
    },
    weatherproofing: {
        type: Boolean,
        required: false,
    },
});

const CategoryData = mongoose.model('CategoryData', categoryDataSchema);

export default CategoryData;
