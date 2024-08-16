import express from "express";
import {
  changeTodo,
  createToDo,
  getAllTodos,
  getSingleTodo,
  removeTodo,
} from "../controllers/todoController.js";

export const todoRouter = express.Router();
todoRouter.get("/:userid/todos", (req, res, next) => {
  getAllTodos(req, res);
});
todoRouter.get("/:id", (req, res, next) => {
  getSingleTodo(req, res);
});
todoRouter.post("/:userid/todos", (req, res) => {
  createToDo(req, res);
});
todoRouter.put("/:userid/todos", (req, res) => {
  changeTodo(req, res);
});
todoRouter.delete("/:id", (req, res) => {
  removeTodo(req, res);
});
