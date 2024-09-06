import bcrypt from 'bcrypt';

export const encrypt=async(password:string)=>{
    try {
        const salt= await bcrypt.genSalt(10);
        const newHashPassword=await bcrypt.hash(password,salt); 
        return newHashPassword; 
    } catch (error) {
        console.log(error);
    }
    
}

// const match = await bcrypt.compare(password,hashPassword);

// export const comparePassword = async(password:string,hashPassword:string)=>{
//   try{
//     const match =await bcrypt.compare(password,hashPassword);
//     return match;
//   }
//   catch(error){
//     console.log(error);
//   }
//   }
    
