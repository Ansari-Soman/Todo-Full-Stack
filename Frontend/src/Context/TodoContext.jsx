import { createContext } from "react";

export const TodoContext = createContext({
  user: null,
  updateUser: () => {},
  clearUser: () => {},
  isAuthLoading: true,
});
