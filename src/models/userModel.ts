import mongoose from "mongoose";
import {userInterface} from '@src/interface'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      default:''
    },
    phone:{
       type:String,
       default:''
    },
   enrollment_number:{
    type:Number,
    default:''
   },
   date_of_admission:{
    type:String,
    default:''
   }
  },
  { timestamps: true }
);

const userModel = mongoose.model<userInterface>("user", userSchema);
export { userModel };


