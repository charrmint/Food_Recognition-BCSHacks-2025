import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({
    food_id: {
        type: String,
        required: true,
    }, timestamp: { 
        type: Date,
        default: Date.now
    }, refrigerator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Refrigerator'
    }
});

const foodModel = mongoose.model("Food", FoodSchema);

export default foodModel;