import {
  addTodo,
  deleteTodo,
  getLastRow,
  getOneTodo,
  getTodos,
  updateTodo,
} from "../serveces/dbSevices.js";
export const getAllTodos = (req, res) => {
  const userId = +req.params.userid;
  getTodos(userId, (err, data) => {
    err ? res.sendStatus(500) : res.send(data);
  });
};
export const getSingleTodo = (req, res) => {
  const id = +req.params.id;
  getOneTodo(id, (err, data) => {
    err || data.length === 0 ? res.sendStatus(500) : res.send(data[0]);
  });
};
export const createToDo = (req, res) => {
  const todo = req.body;
  const userId = +req.params.userid;
  if (todo.title) {
    addTodo(todo.title, false, userId, (err) => {
      if (err) {
        res.sendStatus(500);
      } else {
        getLastRow((err, data) => {
          err ? res.sendStatus(500) : res.status(200).send(data);
        });
      }
    });
  } else {
    res.sendStatus(400);
  }
};
export const changeTodo = (req, res) => {
  const todo = req.body;
  if (todo.title && todo.id && (todo.is_done === 1 || todo.is_done === 0)) {
    updateTodo(todo, (err) => {
      err ? res.sendStatus(500) : res.sendStatus(200);
    });
  }
};
export const removeTodo = (req, res) => {
  const id = +req.params.id;

  deleteTodo(id, (err) => {
    err ? res.sendStatus(500) : res.sendStatus(200);
  });
};
