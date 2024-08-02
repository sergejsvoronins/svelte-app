import sqlite from "sqlite3";

export const db = new sqlite.Database("database.db");

const createTables = [
  `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            hashedPassword TEXT,
            CONSTRAINT uniqueUsername UNIQUE(username)
        )
    `,
  `
        CREATE TABLE IF NOT EXISTS todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            is_done boolean,
            user_id INTEGER,
            FOREIGN KEY(user_id) REFERENCES users(id)
        )
    `,
];

createTables.forEach((t) => {
  db.run(t);
});

export const createUser = (username, hashedPassword, callback) => {
  const query = `
    INSERT INTO users (username, hashedPassword)
    VALUES (?,?)
  `;
  const values = [username, hashedPassword];
  db.run(query, values, callback);
  // db.run(query, values, (err) => {
  //   if (err) {
  //     callback(err, null); // Send error status
  //   } else {
  //     callback(null, "User created successfully"); // Send success status
  //   }
  // });
};

export const getUser = (username, callback) => {
  const query = `
    SELECT * FROM users WHERE username = ?
  `;
  const values = [username];
  db.get(query, values, callback);
};

export const getTodos = (id, callback) => {
  const query = `
        SELECT * FROM todos WHERE user_id = ?
    `;
  const values = [id];
  db.all(query, values, callback);
};
export const getOneTodo = (id, callback) => {
  const query = `
        SELECT * FROM todos WHERE id = ?
    `;
  const values = [id];
  db.all(query, values, callback);
};
export const addTodo = (title, is_done, callback) => {
  const query = `
        INSERT INTO todos (title, is_done)
        VALUES (?,?)
    `;
  const values = [title, is_done];
  db.run(query, values, callback);
};
export const setTodoStatus = (id, callback) => {
  const query = `
        UPDATE todos SET is_done = CASE WHEN is_done = 0 THEN 1 ELSE 0 END WHERE id = ?
    `;
  const values = [id];
  db.run(query, values, callback);
};
export const setTodoTitle = (id, title, callback) => {
  const query = `
        UPDATE todos SET title = ? WHERE id = ?
    `;
  const values = [title, id];
  db.run(query, values, callback);
};
export const deleteTodo = (id, callback) => {
  const query = `
        DELETE FROM todos WHERE id=?
    `;
  const values = id;
  db.run(query, values, callback);
};

export const getLastRow = (callback) => {
  const query = `
        SELECT id FROM todos ORDER BY id DESC LIMIT 1
    `;
  db.get(query, callback);
};
