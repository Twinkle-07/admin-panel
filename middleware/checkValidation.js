const knex = require("../config/db")
const jwt = require("jsonwebtoken")


const checkValidation =async(req,res,next)=>{    
    const token = req.header('authorization');
    // console.log(token)
    
    const tokenParts = token?token.split(' '):res.send({status:0,message:"token empty"})
    // console.log(tokenParts[1])

  const decoded =   jwt.verify(tokenParts[1], 'shhhhh', function(err, result) {
      // console.log(decoded.foo) // bar
    //   console.log(decoded.id);
        if(err){
            res.send({
                status:0,
                message:err
            })
        }
        else{
            // console.log(result)
            return result;
        }
      });
    
      req.user_id = decoded.id;
      const [dbToken] = await knex('users').pluck('token').where("id",decoded.id)
    
    if(dbToken!=tokenParts[1]){
        res.send({
            status:0,
            message:"token invalid"
        })
        
    }
    else{
        // res.send({
        //     status:1,
        // message:"Token valid"
        // })
        next();
    }
      
}



module.exports= checkValidation;






