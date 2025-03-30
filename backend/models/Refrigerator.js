import mongoose from 'mongoose'

const RefrigeratorSchema = new mongoose.Schema({
    userList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }], foodList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food'
    }]
});

const RefrigeratorModel = mongoose.model('Refrigerator', RefrigeratorSchema);

export default RefrigeratorModel;