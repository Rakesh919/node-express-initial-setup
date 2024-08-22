import {Request,Response,NextFunction} from 'express';
import {logger } from '@src/logger'
import { userModel } from '@src/models';
import { StatusCodes } from 'http-status-codes';

export const getStudetsList=async(req:Request,res:Response,next:NextFunction)=>{
     
    logger.info(`getStudentsList started :`,{__filename});

    try{
     
        let userDetails = await userModel.find({}).select({__v:0,createdAt:0,updatedAt:0}).lean();

        return res.status(StatusCodes.OK).json({students_list:userDetails});
    }
    catch(error){
        logger.error(`Exception occured at getStudentsList ${JSON.stringify(error)}`,{__filename});
        next(error);
    }
}