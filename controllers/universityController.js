import University from "../models/university.js";
import isAdmin from "../utils/verifyAdmin.js";

export async function createUniversity(req, res) {
  if (!isAdmin(req.user)) {
    return res.status(401).json({
      message: "You are not allowed to create universities!",
    });
  } else {
    try {
      const university = new University({
        name: req.body.name,
        location: req.body.location,
      });

      await university.save();

      return res.status(201).json({
        message: "University created successful!",
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Failed university creation!",
      });
    }
  }
}

