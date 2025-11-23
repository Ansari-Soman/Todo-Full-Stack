import { z } from "zod";
import { objectIdField } from "./commonSchemas.js";

export const addTodoSchema = {
  body: z.object({
    todoName: z.string().min(1, "Todo name is required"),
    date: z.string().min(1, "Date is required"),
  }),
};

export const updateTodoSchema = {
  params: z.object({
    id: objectIdField,
  }),
  body: z.object({
    completed: z.boolean(),
  }),
};

export const todoIdParamSchema = {
  params: z.object({
    id: objectIdField,
  }),
};
