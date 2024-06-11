import Event from "../models/event.model.js";

export const createEvent = async (req, res, next) => {
   const { eventName, startDate, endDate, dis } = req.body;
   const userId = req.user.sub;

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
         dis,
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
