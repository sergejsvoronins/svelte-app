import express from "express";
import {
  createToDo,
  getAllTodos,
  getSingleTodo,
  removeTodo,
  updateTodoStatus,
  updateTodoTitle,
} from "../controllers/todoController.js";

export const todoRouter = express.Router();
todoRouter.get("/", (req, res, next) => {
  getAllTodos(req, res);
});
todoRouter.get("/:id", (req, res, next) => {
  getSingleTodo(req, res);
});
todoRouter.post("/", (req, res) => {
  createToDo(req, res);
});
todoRouter.put("/:id", (req, res) => {
  updateTodoStatus(req, res);
});
todoRouter.patch("/", (req, res) => {
  updateTodoTitle(req, res);
});
todoRouter.delete("/:id", (req, res) => {
  removeTodo(req, res);
});
