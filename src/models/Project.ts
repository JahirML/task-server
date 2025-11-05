import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import { ITask } from "./Task";
import { IUser } from "./User";

export interface IProject extends Document {
  projectName: string;
  clientName: string;
  description: string;
  tasks: PopulatedDoc<ITask & Document>[];
  // con populatedoc , le decimos a ts y moongose lo que almacenaremos
  // en el subdocumento y le pasamos la herencia de document
  manager: PopulatedDoc<IUser & Document>;
}

const ProjectSchema: Schema = new Schema(
  {
    projectName: {
      type: String,
      require: true,
      trim: true,
    },
    clientName: {
      type: String,
      require: true,
      trim: true,
    },
    description: {
      type: String,
      require: true,
      trim: true,
    },
    tasks: [
      {
        type: Types.ObjectId,
        ref: "Task",
      },
    ],
    manager: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Project = mongoose.model<IProject>("Project", ProjectSchema);
export default Project;
