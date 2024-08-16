import mysql from 'mysql2'
import { config } from 'dotenv'
import { pool } from '../config/config.js'
config()

const getUsers = async()=>{
    const[result] = await pool.query(`
    SELECT * FROM
    users
    `)
    return result
}

const sortByName = async() => {
    const [result] = await pool.query(`
    SELECT * FROM users ORDER BY name
    `)
    return result
}
const getUser = async(id) =>{
    const [result] = await pool.query(`
    SELECT *
    FROM users
    WHERE userID = ?;
    `,[id])
    return result[0]
}

const addUser = async(username,email, hashedPassword)=>{
    await pool.query(`
    INSERT INTO users (username,email, password) VALUES (?,?,?)
    `, [username, email, hashedPassword],
        (err, result) => {
          if (err) {
            return res.status(500).json({ message: 'Database error.' });
          }

          res.status(201).json({ message: 'User registered successfully!', user: { id: result.insertId, username, email }, });
        }
    )
}
const editUser = async(username,email,password,userID)=>{
    const [user] = await pool.query(`
        UPDATE users
        SET username=?,email=?,password=?
        WHERE userID = ${ req.params.id}
    `,[username,email, password, userID])
    return user[0]
}

const deleteUser = async(id) => { // pool helps connect to the database
    const [result] = await pool.query(` 
        DELETE FROM users WHERE (userID) = (?)
    `,[id])
    return result
}



const checkUser = async (email,userRole) => {
    const [[{userPass}]] = await pool.query(`
    SELECT userPass FROM admin WHERE email = ? AND userRole=?
    `,[email, userRole])
    return userPass
}

const checkRoleStatus = async (user) => {
    const [[{userRole}]] = await pool.query(`
       SELECT * FROM users WHERE userRole = ?
    ` , [user]);
       return userRole;
   }

   
export {getUsers,getUser,addUser,sortByName,editUser,deleteUser,checkUser,checkRoleStatus}