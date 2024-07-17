import Programs from "../models/program.model.js";
import { sendEmail } from "../utils/emailsender.js";
import Events from "../models/event.model.js";
export const createProgram = async (req, res, next) => {
   console.log(req.body)
   const { programName,coordinatorName,coordinatorEmail,coordinatorPhone, date, eventId, email } = req.body;

   const program = new Programs({
      programName,
      date,
      eventId,
      coordinatorName,
      coordinatorEmail,
      coordinatorPhone,
   });
   const passCode = await program.createPassCode();
   try {
      const savedProgram = await program.save()
      await Events.findByIdAndUpdate(
         eventId,
         { $push: { programs: savedProgram._id } },
         { new: true, useFindAndModify: false }
     );
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
   // console.log(req);
   const query = {};
   req.query.programId && (query._id = req.query.programId);
   req.query.eventId && (query.eventId = req.query.eventId);
   // console.log(query);
   try {
      const programs = await Programs.find(query).populate("teams");
      // console.log(programs);
      return res.status(200).json({
         status: "success",
         data: programs,
      });
   } catch (err) {
      next(err);
   }
};


// edit the program

export const editProgram = async (req, res, next) => {
   const { programId } = req.params;
   const { programName, coordinatorName, coordinatorEmail, coordinatorPhone, date } = req.body;
   try {
      const program = await Programs.findById(programId);
      if (!program) {
         return res.status(404).json({
            status: "fail",
            message: "Program not found",
         });
      }
      program.programName = programName;
      program.coordinatorName = coordinatorName;
      program.coordinatorEmail = coordinatorEmail;
      program.coordinatorPhone = coordinatorPhone;
      program.date = date;
      await program.save();
      return res.status(200).json({
         status: "success",
         data: program,
      });
   } catch (err) {
      next(err);
   }
}
