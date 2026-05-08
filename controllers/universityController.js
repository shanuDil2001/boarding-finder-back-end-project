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

export async function getUniversity(req, res) {}

export async function getAllUniversities(req, res) {}

export async function updateUniversity(req, res) {
  if (!isAdmin(req.user)) {
    return res.status(401).json({
      message: "You are not allowed to update universities!",
    });
  } else {
    try {
      const universityName = req.params.name;

      const university = await University.findOne({ name: universityName });

      if (university === null) {
        return res.status(404).json({
          message: "University is not found!",
        });
      } else {
        const newInformation = req.body;

        await University.updateOne({ name: universityName }, newInformation);

        return res.status(200).json({
          message: "University updated successful!",
        });
      }
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Failed to update university info!",
      });
    }
  }
}

export async function deleteUniversity(req, res) {
  if (!isAdmin(req.user)) {
    return res.status(401).json({
      message: "You are not allowed to delete universities!",
    });
  } else {
    try {
      const universityName = req.params.name;

      await University.deleteOne({ name: universityName });

      return res.status(200).json({
        message: "University deleted successful!",
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Failed university deletion!",
      });
    }
  }
}
