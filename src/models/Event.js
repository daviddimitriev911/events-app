import mongoose from "mongoose";
import {Schema, model, models} from "mongoose";


const eventSchema = new mongoose.Schema({
  title: { type: "string", required: true },
  description: { type: "string", required: true },
  date: { type: Date, required: false },
  location: { type: "string", required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  attendees: [{ type: Schema.Types.ObjectId, ref: "User", required: true }]
}, {timestamps:true});

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;