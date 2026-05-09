import Boarding from "../models/boarding.js";
import generateId from "../utils/generateId.js";
import University from "../models/university.js";

export async function createBoardingHouse(req, res) {
  if (req.user === undefined) {
    return res.status(401).json({
      message: "You must login to add a boarding house!",
    });
  } else {
    try {
      const boardingHouses = await Boarding.find();

      let id;

      if (boardingHouses.length === 0) {
        id = generateId("BORD", null);
      } else {
        const sortedBoardingHouses = boardingHouses.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );

        id = generateId("BORD", sortedBoardingHouses[0].id);
      }

      const universityName = req.body.university;

      const university = await University.findOne({ name: universityName });

      const boardingHouse = new Boarding({
        id: id,
        name: req.body.name,
        owner: req.user._id,
        price: req.body.price,
        description: req.body.description,
        availableRooms: req.body.availableRooms,
        images: req.body.images,
        location: {
          type: req.body.location.type,
          coordinates: req.body.location.coordinates,
        },
        university: university._id,
        status: req.body.status,
      });

      await boardingHouse.save();

      return res.status(201).json({
        message: "Boarding house created successful!",
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Failed to create a boarding house!",
      });
    }
  }
}

export async function getBoardingHouse(req, res) {
  try {
    const boardingHouseId = req.params.id;

    const boarding = Boarding.findOne({ id: boardingHouseId });

    if (boarding === null) {
      return res.status(404).json({
        message: "Boarding house is not found!",
      });
    } else {
      return res.status(200).json(boarding);
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to get the boarding house!",
    });
  }
}

export async function getAllBoardingHouses(req, res) {
  try {
    const boardings = await Boarding.find();

    if (boardings.length === 0) {
      return res.status(404).json({
        message: "Boarding houses are not found!",
      });
    } else {
      return res.status(200).json(boardings);
    }
  } catch (error) {
    console.error(error);

    return res.status(200).json({
      message: "Failed to get boarding houses!",
    });
  }
}

export async function updateBoardingHouse(req, res) {
  if (req.user === undefined) {
    return res.status(401).json({
      message: "You must login to update the boarding house!",
    });
  } else {
    try {
      const boardingHouseId = req.params.id;

      const boarding = Boarding.findOne({ id: boardingHouseId });

      if (boarding === null) {
        return res.status(404).json({
          message: "Boarding house is not found!",
        });
      } else {
        const newInformation = req.body;

        await Boarding.updateOne({ id: boardingHouseId }, newInformation);

        return res.status(200).json({
          message: "Boarding house updated successful!",
        });
      }
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Failed to update the information!",
      });
    }
  }
}

export async function deleteBoardingHouse(req, res) {
  if (req.user === undefined) {
    return res.status(401).json({
      message: "You must login to delete the boarding house!",
    });
  } else {
    try {
      const boardingHouseId = req.params.id;

      await Boarding.deleteOne({ id: boardingHouseId });

      return res.status(200).json({
        message: "Boarding house deleted successful!",
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Failed to delete the boarding house!",
      });
    }
  }
}
