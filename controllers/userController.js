import User from "../models/userModel.js";
import Assignment from "../models/assignmentModel.js";
import { hashPassword, comparePassword } from "../utils/hashUtils.js";
import { generateToken } from "../utils/jwtUtils.js";

export const register = async (req, res) => {
   const { username, email, password, role } = req.body;
   try {
      const hashedPassword = await hashPassword(password);
      const user = new User({
         username,
         email,
         password: hashedPassword,
         role,
      });
      await user.save();
      res.status(201).json({ message: "User registered successfully" });
   } catch (error) {
      res.status(500).json({ error: "Registration failed" });
   }
};

export const login = async (req, res) => {
   const { email, password } = req.body;
   try {
      const user = await User.findOne({ email });
      if (!user || !(await comparePassword(password, user.password))) {
         return res.status(401).json({ error: "Invalid credentials" });
      }
      const token = generateToken(user._id, user.role);
      res.status(200).json({ token });
   } catch (error) {
      res.status(500).json({ error: "Login failed" });
   }
};

export const uploadAssignment = async (req, res) => {
   const { task, adminId } = req.body;
   try {
      const assignment = new Assignment({
         userId: req.user._id,
         task,
         admin: adminId,
      });
      await assignment.save();
      res.status(201).json({ message: "Assignment uploaded successfully" });
   } catch (error) {
      res.status(500).json({ error: "Failed to upload assignment" });
   }
};

export const getAllAdmins = async (req, res) => {
   try {
      const admins = await User.find({ role: "admin" });
      res.status(200).json(admins);
   } catch (error) {
      res.status(500).json({ error: "Failed to fetch admins" });
   }
};
