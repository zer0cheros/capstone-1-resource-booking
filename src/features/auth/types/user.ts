export type Role = "admin" | "user";

export type User = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: Role
}