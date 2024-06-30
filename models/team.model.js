import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
   leader: {
      type: String,
      required: true,
   },
   teamName: {
      type: String,
   },
   email: {
      type: String,
      required: true,
   },
   phone: {
      type: String,
      required: true,
   },
   image: {
      type: String,
      required: true,
   },
   members: {
      type: [],
   },
   files: {
      type: String,
   },
});

const Team = mongoose.model("Team", teamSchema);

export default Team;
