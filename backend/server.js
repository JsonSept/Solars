import express from 'express';
import bcrypt from 'bcrypt';
import mysql from 'mysql2';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import { config } from 'dotenv'
config()
const app = express();

const port = 9000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());
// Set up the database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'users'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to database');
        return;
    }
    console.log('Connected to the database')
});

// Secret key for JWT
// const SECRET_KEY = "gvadcgiCOY8wgyocHCBCQ";


app.get('/users', (req, res) => {
    // Query the database for all users
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error.' });
        }

        // Check if there are any users in the database
        if (results.length === 0) {
            return res.status(404).json({ message: 'No users found.' });
        }

        // Send the list of users as a response
        res.status(200).json(results);
    });
});

app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
  try {
    
    // Validate the data
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    // Check if the user already exists
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Database error.' });
      }

      if (results.length > 0) {
        return res.status(400).json({ message: 'User already exists.' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the new user
      db.query(
        'INSERT INTO users (username, email, password) VALUES (?,?,?)',
        [username, email, hashedPassword],
        (err, result) => {
          if (err) {
            return res.status(500).json({ message: 'Database error.' });
          }

          res.status(201).json({ message: 'User registered successfully!', user: { id: result.insertId, username, email }, });
        }
      );
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ success: false, message: 'User not found' });
  }

    //Validate the data
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields.' });
    }

     const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
  
 // Assuming successful login, send a success response
    res.status(200).json({ success: true, message: 'Login successful', token: 'SECRET_KEY' });

    // Check if the user exists
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error.' });
        }
         
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }
         
        const user = results[0];
        //compare the provided password with the hashed password in the database
        const Matching = await bcrypt.compare(password, user.password);

        if (!Matching) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Create a JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email }, // Payload
            process.env.SECRET_KEY, // Secret Key
            { expiresIn: '1h' } // Token expiration time
        );

        // Send the token to the client
        res.status(200).json({
            message: 'Login successful!',
            token,
            user: { id: user.id, username: user.username, email: user.email}
        });
    });
});
app.get('/', (req, res) => {
  const data = { message: 'Here is your data!' };
  res.json(data);
});

// Middleware to verify the JWT token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401); // Unautherized
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }

        req.user = user;
        next(); // Pass control to the next handler
    });
}

app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});



app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});