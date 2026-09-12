import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/dxj0gqv8e/image/upload/v1698256785/default-avatar.png"
    },
    coverImage: {
        type: String,
        default: "https://res.cloudinary.com/dxj0gqv8e/image/upload/v1698256785/default-cover-image.png"
    },
    watchHistory : [{
        type: Schema.Types.ObjectId,
        ref: "Video"
    }],
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 6
    },
    refreshToken: {
        type: String
    }
},{
    timestamps: true
});

userSchema.pre("save", async function (next) {
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
   return await bcrypt.compare(password, this.password);
} 

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        { userId: this._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION }
    );
}
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { userId: this._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION }
    );
}

export const User = mongoose.model("User", userSchema);