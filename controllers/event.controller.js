import Event from "../models/event.model.js";
import Team from "../models/team.model.js";
export const createEvent = async (req, res, next) => {
   const { eventName, startDate, endDate, disc } = req.body;
   const userId = req.user.sub;
   // console.log(req);
   if (!eventName) {
      res.status(400).json({
         sucess: failure,
         message: "All field are required ",
      });
   }
   try {
      const event = new Event({
         eventName,
         startDate,
         endDate,
         disc,
         userId,
      });
      await event.save();
      res.status(201).json({
         success: true,
         message: "Event created successfully",
         event,
      });
   } catch (err) {
      next(err);
   }
};

export const getEvents = async (req, res, next) => {
   const userId = req.user.sub;
   try {
      const events = await Event.find({ userId });
      res.status(200).json({
         success: true,
         message: "Events fetched successfully",
         events,
      });
   } catch (err) {
      console.log(err);
   }
};

export const getSingleEvent = async (req, res, next) => {
   const { eventId } = req.params;
   const userId = req.user.sub;
   try {
      const event = await Event.findOne({ _id: eventId, userId })
         .populate("userId") // This populates the teams array with the actual team documents from the Team collection
         .exec();
      if (!event) {
         res.status(404).json({
            success: false,
            message: "Event not found",
         });
      }
      res.status(200).json({
         success: true,
         message: "Event fetched successfully",
         event,
      });
   } catch (err) {
      next(err);
   }
};
