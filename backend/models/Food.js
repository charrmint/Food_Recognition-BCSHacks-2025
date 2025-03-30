import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    }, timestamp: { 
        type: Date,
        default: Date.now
    }, refrigerator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Refrigerator'
    }
}, { _id: false });

const foodModel = mongoose.model("Food", FoodSchema);

export default foodModel;