import { Request, Response, NextFunction } from "express";
import { logger } from "@src/logger/index";
import Joi  from "joi";
import { addUserDetails, IAddUser } from "@src/validation-schema";
import { StatusCodes } from "http-status-codes";
import { userModel } from "@src/models";

export const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info(`addUser controller starts `, { __filename });

  const schema: Joi.ObjectSchema<IAddUser> = addUserDetails;
  try {
    let result = await schema.validateAsync(req.body);

    if (!result) {
      logger.info(`result is empty`);
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "req body is empty" });
    }

    let saveDetails = await userModel.create(result);

    return res
      .status(StatusCodes.OK)
      .json({ message: "user created successfully ", userId: saveDetails._id });
  } catch (error) {
    logger.error(`Exception occured at addUser ${JSON.stringify(error)}`, {
      __filename,
    });
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info(`getUser controller starts `, { __filename });

  try {
    let { userId } = req.query;

    let userDetails = await userModel
      .findOne({ _id: userId })
      .lean()
      .select({ __v: 0, createdAt: 0, updatedAt: 0 });
    if (!userDetails) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: `NO user found` });
    }

    return res.status(StatusCodes.OK).json({ userDetails });
  } catch (error) {
    logger.error(`Exception occured at getuser ${JSON.stringify(error)}`, {
      __filename,
    });
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info(`UpdateUser controller starts: `, { __filename });

  try {
    let { userId } = req.body;

    let { name, email, phone, enrollment_number, date_of_admission } = req.body;

     let previousDetails = await userModel.findOne({_id:userId}).lean();

     if(!previousDetails){
      return res.status(StatusCodes.BAD_REQUEST).json({message:`No user found `});
     }

     if(name!==null){
      previousDetails.name = name
     }

     if(email!==null){
      previousDetails.email = email;
     }
     
     if(phone!==null){
      previousDetails.phone=phone;
     }

     if(enrollment_number!==null){
      previousDetails.enrollment_number = enrollment_number;
     }

     if(date_of_admission!==null){
      previousDetails.date_of_admission = date_of_admission;
     }

     let userDetails = await userModel.findOneAndUpdate(
      { _id: userId },
      { $set: previousDetails }, // Spread previousDetails fields directly into $set
      { new: true }
    );

    return res.status(StatusCodes.OK).json({message:'user updated successfully ', userDetails})

  } catch (error) {
    logger.error(
      `Exception occured at updateUser controller ${JSON.stringify(error)}`,
      { __filename }
    );
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info(`deleteUser Controller starts `, { __filename });

  try {
    let { userId } = req.body;

    let user = await userModel.findByIdAndDelete({ _id: userId }).lean();

    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ messge: `Details not found ` });
    }

    return res
      .status(StatusCodes.OK)
      .json({ message: `User deleted successfully ` });
  } catch (error) {
    logger.error(`Exception occured at deleteUser ${JSON.stringify(error)}`, {
      __filename,
    });
    next(error);
  }
};
