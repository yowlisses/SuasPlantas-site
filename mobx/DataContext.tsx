import { createContext, useContext } from "react";
import { auth } from "../auth/auth";
import { hydrate } from "./hydrate";

const stores: { [key: string]: any } = { auth };

const DataContext = createContext(stores);

export function DataContextProvider({ children }) {
  hydrate("auth", auth);
  return <DataContext.Provider value={stores}>{children}</DataContext.Provider>;
}

export function useData() {
  return useContext(DataContext);
}