import Programs from "../models/program.model.js";
import Team from "../models/team.model.js";

export const createTeam =async (req, res, next) => {
   const {
      eventId,
      programId,
      teamName,
      leader,
      email,
      phone,
      image,
      members,
   } = req.body;
   const team = new Team({
      eventId,
      programId,
      teamName,
      email,
      leader,
      phone,
      image,
      members,
   });
   try {
      const savedTeam = await team.save();

      await Programs.findByIdAndUpdate(programId, {
         $push: { teams: savedTeam._id } // Push the new team's ID into the program's teams array
      });

      res.status(201).json({
         message: "Team created successfully",
         status: "success",
         data: team,
      });
   } catch (err) {
      next(err);
   }
};
