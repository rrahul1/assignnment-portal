import Assignment from "../models/assignmentModel.js";

export const getAssignments = async (req, res) => {
   try {
      const assignments = await Assignment.find({
         admin: req.user._id,
      }).populate("userId", "username");
      res.status(200).json(assignments);
   } catch (error) {
      res.status(500).json({ error: "Failed to fetch assignments" });
   }
};

export const acceptAssignment = async (req, res) => {
   try {
      await Assignment.findByIdAndUpdate(req.params.id, { status: "accepted" });
      res.status(200).json({ message: "Assignment accepted" });
   } catch (error) {
      res.status(500).json({ error: "Failed to accept assignment" });
   }
};

export const rejectAssignment = async (req, res) => {
   try {
      await Assignment.findByIdAndUpdate(req.params.id, { status: "rejected" });
      res.status(200).json({ message: "Assignment rejected" });
   } catch (error) {
      res.status(500).json({ error: "Failed to reject assignment" });
   }
};
