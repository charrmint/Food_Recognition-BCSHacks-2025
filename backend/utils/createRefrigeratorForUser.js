import Refrigerator from '../models/Refrigerator.js';

const createRefrigeratorForUser = async (user) => {
    const refrigerator = new Refrigerator({
        username: user.username,
        userList: [user._id],
        foodMap: {}
    });
    await refrigerator.save();
    
    user.refrigeratorId = refrigerator._id;
    await user.save();
    
    return refrigerator;
};

export default createRefrigeratorForUser;