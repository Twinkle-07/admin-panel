const knex = require("../config/db")

const addProduct = async(req,res)=>{
    const {product,price,quantity}= req.body

    try {
        const query = await knex("products").insert({product,price,quantity});
        res.send({status:1, message:"Added product Successfully"})
    } catch (error) {
        res.send({status:0, message:error})
    }
}

const showpdct = async(req,res)=>{
    try {
        const sdata = await knex("products").select("*");
        console.log(req.user_id);
        res.send(sdata);
        
    } catch (error) {
        res.send({status:1,message:error })
    }
}

const showpdById = async(req,res)=>{
    const id = req.params.id
    const Ndata = await knex("products")
    .where("id",id).select("*")
    res.send(Ndata)
    
}

const updatePrd = async(req,res)=>{
    const {product,id, price} = req.body
    
    try {
        const query = await knex("products").update({product:product, price:price}).where("id",id)
        res.send({status:1, message:"Product updated successfully"})
    } catch (error) {
        res.send({status:0, message:error})
    }
}

const dltprd = async(req,res)=>{
    const id = req.params.id
    try {
        const data = await knex("products")
    .where("id",id)
    .del()
    res.send({status:1, message:"product deleted successfully"})
    } catch (error) {
        res.send({status:0, message:error})
    }
}





//by body method
const showpByIdd = async(req,res)=>{
    const {id} = req.body;
    console.log(id);
   try {
    const [data] = await knex("products")
    .where('id',id).select("*")
    res.send(data)
    // const qry = await knex("products")
    // .select("*")
    // .where("id",id)
    // res.send(qry)

   } catch (error) {
    res.send({status:0, message:error})
   }
}
//by body method

module.exports={addProduct,showpdct,showpdById,updatePrd,dltprd}