const knex = require('../config/db');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const privateKey = 'shhhhh'

const addUser = async (req, res) => {

    const { name, email, password } = req.body;

    try {
        bcrypt.hash(password, 10, async function (err, hash) {
            // Store hash in your password DB.
            const newData = await knex("users").insert({ name, email, password: hash });
            res.send({ status: 1, message: "data added" })
        });

    }
    catch (err) {
        res.send({ status: 0, message: "Internal server error" })
    }
}


const showData = async (req, res) => {
    const data = await knex('users').select("*")
    res.send(data);
}

const showById = async (req, res) => {
    const id = req.params.id
    const val = await knex("users")
        .select("*")
        .where("id", id)
    res.send(val)
};

const update = async (req, res) => {
    const { id, name } = req.body
    const query = await knex('users').update({ name: name }).where("id", id)
    res.send({ status: 1, message: "updated successfully" });
};

const dltt = async (req, res) => {
    const id = req.params.id
    const qry = await knex('users')
        .where("id", id)
        .del('name');
    res.send({ status: 1, message: "deleted successfully" })
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const db = await knex('users').where({ email: email }).select('*').first();
    // console.log(db)
    if (!db) {
        res.send({
            status: 0,
            message: "email not found"
        })
    }
    else {
        bcrypt.compare(password, db.password, function (err, result) {
            // result == true
            if (!result) {
                res.send({
                    status: 0,
                    message: "password incorrect"
                })
            }
            else {
                const token = jwt.sign({ 'id': db.id, 'name': db.name }, privateKey, async (err, result) => {
                    const query = await knex('users').where({ email: db.email }).update({ token: result })


                    res.send({
                        status: 1,
                        token: result,
                        message: "Login Success"
                    });

                });
                // console.log(result);
            }
        });

    }



};

function generateotp() {

    let otpcrt = Math.floor(Math.random() * 9999);
    // console.log(otp)
    return otpcrt;
}
// console.log(generateotp());


const otpGen = async (req, res) => {
    let otp = generateotp();
    const { email } = req.body
    try {
        const qry = await knex("otp").insert({ email, otp })
        res.send({ status: 1, message: "otp saved in db" })
    } catch (error) {
        res.send({ status: 0, message: error })
    }
}
const checkOtp = async (req, res) => {
    const { otp, email } = req.body

    const [qry] = await knex("otp").pluck("otp").where("email", email)
    if (qry != otp) {
        res.send({ status: 0, message: "otp incorrect" })
    } else {
         

        res.send({ status: 1, message: "otp verified" })
        // console.log(qry);
    }

}

const logout = async(req,res)=>{
    try {
        const query = await knex("users").update({token:null}).where("id",req.user_id)
        res.send({status:1, message:"logout successfully"})
    } catch (error) {
        res.send({status:0, message:error})
    }
    
}


const loginn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const db = await knex('users').where({ email: email }).select('*').first();

        if (!db) {
            res.send({
                status: 0,
                message: "email not found"
            });
        } else {
            bcrypt.compare(password, db.password, async function (err, result) {
                if (!result) {
                    res.send({
                        status: 0,
                        message: "password incorrect"
                    });
                } else {
                    const token = jwt.sign({ 'id': db.id, 'name': db.name }, privateKey);

                    // Use await with Knex update operation inside the callback
                    await knex('users').where({ email: db.email }).update({ token: result });

                    res.send({
                        status: 1,
                        token: result,
                        message: "Login Success"
                    });
                }
            });
        }
    } catch (error) {
        // Handle any errors that occur during the await operations
        console.error(error);
        res.status(500).send({
            status: 0,
            message: "An error occurred during login"
        });
    }
};




module.exports = { addUser, showData, showById, update, dltt, login, otpGen, checkOtp,logout }

