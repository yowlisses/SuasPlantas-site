import { Plant } from "../types/Plant";

export interface User {
  id: UserId;
  name: string;
  lastName: string;
  firstName: string;
  description: string;
  plantSet: Plant[];
  image: string;
  createdAt: string;
  updatedAt: string;
}

export type UserId = number;
