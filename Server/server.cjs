const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');
const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_db',
});

db.connect(err => {
    if (err) console.log(err);
    console.log("Connected to MySQL!");
});

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

const uploads = multer({ storage: storage });

app.post('/signup', (req, res) => {
    const { username, password, department, designation, contact_number } = req.body;

    if (!username || !password || !department || !designation || !contact_number || !id) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }

    const query = 'INSERT INTO users (username, password, department, designation, contact_number) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [username, password, department, designation, contact_number], (err, result) => {
        if (err) {
            console.error('Failed to insert user:', err);
            return res.status(500).json({ message: 'Signup failed' });
        }
        return res.status(200).json({ message: 'Signup successful', userId: result.insertId });
    });
});

app.post('/send-message', uploads.none(), async (req, res) => {
    const { email, message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message cannot be empty." });
    }

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ganeshgowri1985@gmail.com', 
            pass: 'oycuugtsvzwuqgyx'
        }
    });

    let mailOptions = {
        from: 'ganeshgowri1985@gmail.com',
        to: email, 
        subject: 'Message from Employee Management System',
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send message." });
    }
});

app.post('/add-employee', upload.single('image'), (req, res) => {
    const { employee_id, employee_name, department, designation, project, type, status } = req.body;
    const image = req.file ? req.file.filename : null;

    const sql = `INSERT INTO employees (employee_id, employee_name, department, designation, project, type, status) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(sql, [employee_id, employee_name, department, designation, project, type, status], (err, result) => {
        if (err) {
            console.error("Error:", err);
            return res.status(500).send("Error inserting data.");
        }
        res.send("Employee added successfully!");
    });
});

app.get('/get-employees', (req, res) => {
    const sql = 'SELECT * FROM employees';
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching employees:", err);
            return res.status(500).send("Server error");
        }
        res.json(results);
    });
});

app.put('/api/employees/:id', (req, res) => {
    const id = req.params.id;
    const {
      employee_name,
      department,
      designation,
      project,
      type,
      status
    } = req.body;

    if (!employee_name || !department || !designation || !project || !type || !status) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const query = `
      UPDATE employees
      SET employee_name = ?, department = ?, designation = ?, project = ?, type = ?, status = ?
      WHERE employee_id = ?
    `;
    db.query(query, [employee_name, department, designation, project, type, status, id], (err, result) => {
      if (err) {
        console.error('Error updating employee:', err);
        res.status(500).json({ error: 'Failed to update employee' });
      } else {
        res.json({ message: 'Employee updated successfully' });
      }
    });
});

  
app.delete('/api/employees/:id', (req, res) => {
    const id = req.params.id;
    const query = `DELETE FROM employees WHERE employee_id = ?`;
  
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error('Error deleting employee:', err);
        return res.status(500).json({ error: 'Failed to delete employee' });
      }
      res.json({ message: 'Employee deleted successfully' });
    });
  });
  
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Login error:', err);
            return res.status(500).json({ success: false, message: 'Server error' });
        }

        if (results.length === 1) {
            const user = results[0];
            return res.json({ success: true, user }); 
        } else {
            return res.json({ success: false, message: 'Invalid credentials' });
        }
    });
});


app.listen(3001, () => {
    console.log('Server running on port 3001');
});
