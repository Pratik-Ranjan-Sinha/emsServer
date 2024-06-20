import mongoose from "mongoose";

const programSchema = new mongoose.Schema({
   eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
   },
   programName: {
      type: String,
      required: true,
   },
   coordinatorName: {
      type: String,
      required: true,
   },
   coordinatorEmail: {
      type: String,
      required: true,
   },
   coordinatorPhone: {
      type: String,
      required: true,
   },
   passCode: {
      type: String,
      required: true,
   },
   date: {
      type: Date,
   },
   teams: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Team",
      },
   ],
});

programSchema.methods.createPassCode = function () {
   const passCode = Math.random().toString(36).substr(2, 5);
   this.passCode = passCode;
   return passCode;
};

const Programs = mongoose.model("Programs", programSchema);

export default Programs;
