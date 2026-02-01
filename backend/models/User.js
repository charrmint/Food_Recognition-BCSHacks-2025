import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const providerSchema = new mongoose.Schema(
    {
        provider: { type: String, required: true },
        providerId: { type: String, required: true },
    },
    {_id: false}
);

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    }, 
    password: {
        type: String,
    }, 
    providers: {
        type: [providerSchema],
        default: [],
    },
    refrigeratorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Refrigerator',
    }
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if(!this.isModified('password') || !this.password) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next (error);
  }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
}

const userModel = mongoose.model('User', userSchema);

export default userModel;