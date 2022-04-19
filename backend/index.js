require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const db = mysql.createPool({
  host: 'mysql',
  user: 'root',
  password: 'mySecret1234',
  database: 'users_db',
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
  res.send('Hello World! :D');
});

app.get(
  '/users',
  async (_req, res) => {
    const getAllUsersNamesQuery = 'SELECT * FROM users;';
    db.query(getAllUsersNamesQuery, (err, rows) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ message: 'Something went wrong :(' });
      } else {
        return res.status(200).json(rows);
      }
    });
  },
);

app.get(
  '/users/:id',
  async (req, res) => {
    const { id } = req.params;
    const getUserByIdQuery = "SELECT name FROM users WHERE id = ?;";
    db.query(getUserByIdQuery, [id], (err, rows) => {
      if (err) {
        console.log(err);
        return res.status(404).json({ message: 'User not found' });
      } else {
        return res.status(200).json(rows[0]);
      }
    });
  },
);

app.post(
  '/users',
  async (req, res) => {
    const { name } = req.body;
    const createNewUserQuery = "INSERT INTO users (name) VALUES (?);";
    db.query(createNewUserQuery, [name], (err, _rows) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ message: 'Something went wrong :(' });
      } else {
        return res.status(201).json({ message: `User ${name} created!` });
      }
    });
  },
);

const PORT = 3001;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
