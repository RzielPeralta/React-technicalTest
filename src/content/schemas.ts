import { z } from "zod";
//schema for validate form
export const userSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  segundoNombre: z.string().optional(),
  apellido: z.string().min(1, "El apellido es obligatorio"),
  email: z.string().email("Correo electrónico inválido"),
  telefono: z
    .string()
    .min(1, "El número de teléfono es obligatorio")
    .regex(/^\d+$/, "El número de teléfono solo puede contener números"),
  rol: z.string().min(1, "El rol es obligatorio"),
  calle: z.string().min(1, "La calle es obligatoria"),
  numero: z.string().min(1, "El número es obligatorio"),
  barrio: z.string().min(1, "El barrio es obligatorio"),
  ciudad: z.string().min(1, "La ciudad es obligatoria"),
  codigoPostal: z.string().min(1, "El código postal es obligatorio"),
});
