import bcrypt from 'bcrypt'
import {getUsers,sortByName,getUser,addUser,editUser,deleteUser} from '../models/usersDB.js'
// import {getUsers,addUser,editUser,getUser,deleteUser} from '../models/usersDB.js'
const saltRounds = 10;
export default {

    getUsers: async (req,res)=>{
        try{
            res.send(await getUsers())
        }catch(err){
            console.error(err);
            res.json({
                msg: 'An error has occurred when retrieving the data.'
            }) 
        }
    },

    sortByName :async (req,res)=>{
        try{
            res.send(await getUsers())
        }catch(err){
            console.error(err);
            res.json({
                msg: 'An error has occurred while sorting the data.'
            }) 
        }
    },

    getUser :async(req,res)=>{
        try {
        res.send(await getUser(+req.params.id))
    }catch(err){
        console.log(err);
        res.json({
            msg: 'An error has occurred when retrieving the data.'
        })
    }
    },



    addUser : async(req,res)=>{
        
        try {
        const {username,email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        const post = await addUser(username,email, hashedPassword)
        res.send(await getUsers())
    }catch(err) {
        console.log(err);
        res.json({
            msg: 'An error has occured with posting new data.'
        })
    }
},

editUser : async(req,res)=>{
    try{
    const [user] = await getUser(+req.params.id)
    let {username,email, password} = req.body   
    usertname ? username = username: {username} = user
    email ? email = email: {email} = user
    if (password) {
        password = await bcrypt.hash(password,Rounds);
    } else {
        password = user.password
    }
    await editUser(username,email, password, +req.params.id)
    res.json(await editUser())
}catch(err) {
    console.log(err);
    res.json({
        msg: 'An error has occured with updating data.'
    })
}
},

deleteUser : async(req,res)=>{
    try{
    res.send(await deleteUser(+req.params.id))
    alert('user has been removed from the database')
}catch(err){
    console.log(err);
    res.json({
        msg: 'An error has occurred while removing the data.'
    })
}
}
}