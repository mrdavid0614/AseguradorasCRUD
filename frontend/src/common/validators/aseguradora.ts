import * as yup from "yup";


export const aseguradoraFormSchema = yup.object({
    nombre: yup.string().max(45, "El nombre no puede exceder 45 caracteres").required("El nombre es requerido"),
    comision: yup.number().min(1, "La comisión debe ser mayor que 0").max(25, "La comisión no puede ser mayor que 25%").required("La comisión es requerida").typeError("La comisión debe ser un número"),
    estado: yup.boolean()
});