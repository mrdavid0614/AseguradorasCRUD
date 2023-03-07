import { Aseguradora } from "../models/aseguradora";

export type AseguradoraCreateRequest = Omit<Aseguradora, "id">;