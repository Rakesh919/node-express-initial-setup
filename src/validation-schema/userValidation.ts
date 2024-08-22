import Joi from "joi";

const name = Joi.string().required().messages({
      "string.empty":`name can't be empty`,
      "string.base":`name is of type string`,
      "any.required":`name is required`
})

const email = Joi.string().allow('').messages({
    "string.base":`email is of type string`,
})

const phone = Joi.string().allow('').messages({
    "string.base":`Phone number is of type string`,
})

const enrollment_number = Joi.number().allow('').messages({
    "number.base":`enrollment number is of type Number`
});

const date_of_admission = Joi.string().allow('').messages({
    "string.base":`Admission date is of type string`
})


export const addUserDetails = Joi.object().keys({
    name,
    email,
    phone,
    enrollment_number,
    date_of_admission
})

export interface IAddUser{
    name:string,
    email:string,
    phone:string,
    enrollment_number:number,
    date_of_admission:string
}