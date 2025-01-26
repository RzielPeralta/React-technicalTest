import { z } from "zod";
import { userSchema } from "./schemas";

export type UserFormData = z.infer<typeof userSchema>;

export interface AddUserFormProps {
  userToEdit: Data | null;
  addUser: (user: {
    nombre: string;
    correo: string;
    telefono: string;
    rol: string;
    estado: string;
  }) => void;
  handleClose: () => void;
  handleUpdateUser: (updatedUser: Data) => void;
  title?: string;
}

export interface Data {
  nombre: string;
  correo: string;
  apellido?: string;
  telefono: string;
  rol: string;
  estado: string;
  foto?: string;
  actions?: () => void;
}

export interface UsersTableProps {
  users: Data[];
  setUsers: React.Dispatch<React.SetStateAction<Data[]>>;
}
