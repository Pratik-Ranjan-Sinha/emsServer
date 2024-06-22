import Programs from "../models/program.model.js";
import { sendEmail } from "../utils/emailsender.js";

export const createProgram = async (req, res, next) => {
   const { programName, date, eventId, email } = req.body;

   const program = new Programs({
      programName,
      date,
      eventId,
      passCode,
      coordinatorName,
      coordinatorEmail,
      coordinatorPhone,
   });
   const passCode = await program.createPassCode();
   try {
      await program.save();
      sendEmail(
         coordinatorEmail,
         "Program assigned",
         `You have been assigned to the program ${programName}, with passcode ${passCode}`
      );
      sendEmail(email, "Program Created", "Your program has been created");
      return res.status(201).json({
         message: `Program created successfully name: ${programName}`,
         staus: "success",
         data: program,
      });
   } catch (err) {
      next(err);
   }
};

// getPrograms wiht id or give all the programs

export const getPrograms = async (req, res, next) => {
   // get prrogra where eventid is equal to the eventid

   const query = {};
   req.query.programId && (query._id = req.query.programId);
   req.query.eventId && (query.eventId = req.query.eventId);
   try {
      const programs = await Programs.find(query);
      return res.status(200).json({
         status: "success",
         data: programs,
      });
   } catch (err) {
      next(err);
   }
};
