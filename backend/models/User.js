import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, email: {
        type: String,
        required: true
    }, password: {
        type: String,
        required: true
    }, refrigerator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Refrigerator'
    }
});

const userModel = mongoose.model('User', UserSchema);

export default userModel;