import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";

enum Role {
  admin="Admin",
  user="User"
}

interface IUser extends Document {
  name:string;
  email:string;
  password:string;
  tasks: Types.ObjectId;
  role: Role;
  refreshToken: string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.admin,
    },
    refreshToken :{
      type:String
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.genrateAccessToken =  function(){
    return jwt.sign({
        _id:this._id,
        name: this.name,
        email:this.email
    },process.env.ACCESS_TOCKEN,{
        expiresIn:process.env.ACCESS_TOCKEN_EXPIREY
    })
}

userSchema.methods.genrateRefreshToken =  function(){
    return jwt.sign({
        _id:this._id
    },process.env.REFRESH_TOKEN_KEY,{
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    })
}

const User = mongoose.model<IUser>("User", userSchema);
export default User;
