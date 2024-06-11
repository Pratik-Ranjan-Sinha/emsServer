import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
   {
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
      },
      eventName: {
         type: String,
         required: true,
      },
      programs: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Programs",
         },
      ],
      judges: [
         {
            type: String,
         },
      ],
      disc: {
         type: String,
      },
      date: {
         start: {
            type: Date,
            default: Date.now(),
            required: true,
         },
         end: {
            type: Date,
            default: Date.now(),
            required: true,
         },
      },
   },
   { timestamps: true }
);

const Events = mongoose.model("Events", eventSchema);

export default Events;
