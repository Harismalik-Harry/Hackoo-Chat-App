import bcryptjs from "bcryptjs";
import userModel from "../models/userModel.js";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).send("All fields are required");
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email already exists");
    }

    if (password.length < 8) {
      return res.status(400).send("Password must be at least 8 characters");
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new userModel({
      fullName,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      return res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).send("Invalid User data");
    }
  } catch (error) {
    console.log("Error in signup Controller ", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const User = await userModel.findOne({ email });

    if (!User || !(await bcryptjs.compare(password, User.password))) {
      return res
        .status(400)
        .json({ message: "Email or Password is incorrect" });
    }

    generateToken(User._id, res);
    return res.status(200).json({
      _id: User._id,
      fullName: User.fullName,
      email: User.email,
      profilePic: User.profilePic,
    });
  } catch (error) {
    console.log("Error in Login Controller ", error.message);

    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "Logged out succesfully" });
  } catch (error) {
    console.log("Error in Logout Controller ", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user?._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      profilePic: updatedUser.profilePic,
    });
  } catch (error) {
    console.error("Error in updateProfile:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const checkAuth=(req,res)=>{
  try{
    res.status(200).json(req.user);

  }catch(error)
  {
   console.log ("Error in CheckAuth Controller",error.message)
   res.status(200).json({message:"Internal Server Error"}); 
  }
}