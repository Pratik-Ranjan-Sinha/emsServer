import Team from "../models/team.model.js";

export const createTeam = (req, res, next) => {
   const {
      eventId,
      programId,
      teamName,
      teamLeaderName,
      teamLeaderEmail,
      teamLeaderPhone,
      teamMembers,
   } = req.body;
   const team = new Team({
      eventId,
      programId,
      teamName,
      teamLeaderName,
      teamLeaderEmail,
      teamLeaderPhone,
      teamMembers,
   });
   try {
      team.save();
      res.status(201).json({
         message: "Team created successfully",
         status: "success",
         data: team,
      });
   } catch (err) {
      next(err);
   }
};
