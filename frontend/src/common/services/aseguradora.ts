import { Aseguradora } from "../types/models/aseguradora";
import { AseguradoraCreateRequest } from "../types/requests/aseguradora-create.request";
import { AseguradoraUpdateRequest } from "../types/requests/aseguradora-update.request";
import { aseguradoraApi } from "./axios-instance";

export async function getAllAseguradoras() {
    try {
        const res = await aseguradoraApi.get<Aseguradora[]>(`/aseguradora`);
        return res.data;
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

export async function getAseguradoraById(id: string) {
    try {
        const res = await aseguradoraApi.get<Aseguradora>(`/aseguradora/${id}`);
        return res.data;
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

export async function createAseguradora(dto: AseguradoraCreateRequest) {
    try {
        const res = await aseguradoraApi.post<Aseguradora>(`/aseguradora`, dto);
        return res.data;
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

export async function updateAseguradora(dto: AseguradoraUpdateRequest) {
    try {
        const res = await aseguradoraApi.put<string>(`/aseguradora`, dto);
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

export async function deleteAseguradora(id: string) {
    try {
        const res = await aseguradoraApi.delete(`/aseguradora/${id}`);
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}