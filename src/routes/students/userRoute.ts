import { addUser, deleteUser, getUser, updateUser } from "@src/controllers";
import  { Router } from "express";

const userRouter = Router();

userRouter
.route('/')
.post(addUser)
.get(getUser)
.put(updateUser)
.delete(deleteUser)

export {userRouter}