import {
  addTodo,
  deleteTodo,
  getLastRow,
  getOneTodo,
  getTodos,
  setTodoStatus,
  setTodoTitle,
} from "../serveces/dbSevices.js";
export const getAllTodos = (req, res) => {
  const id = req.user.userId; // Should be checked when it is time
  getTodos((err, data) => {
    err ? res.sendStatus(500) : res.send(data);
  });
};
export const getSingleTodo = (req, res) => {
  const id = +req.params.id;
  getOneTodo(id, (err, data) => {
    console.log(data);
    err || data.length === 0 ? res.sendStatus(500) : res.send(data[0]);
  });
};
export const createToDo = (req, res) => {
  const todo = req.body;
  if (todo.title) {
    addTodo(todo.title, false, (err) => {
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
export const updateTodoStatus = (req, res) => {
  const id = +req.params.id;
  setTodoStatus(id, (err) => {
    err ? res.sendStatus(500) : res.sendStatus(200);
  });
};
export const updateTodoTitle = (req, res) => {
  const todo = req.body;
  if (todo.id && todo.title !== undefined) {
    setTodoTitle(todo.id, todo.title, (err) => {
      err ? res.sendStatus(500) : res.sendStatus(200);
    });
  } else {
    res.sendStatus(400);
  }
};
export const removeTodo = (req, res) => {
  const id = +req.params.id;

  deleteTodo(id, (err) => {
    err ? res.sendStatus(500) : res.sendStatus(200);
  });
};
