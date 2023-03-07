import { useEffect, useState } from "react";
import { getAseguradoraById } from "../services/aseguradora";
import { Aseguradora } from "../types/models/aseguradora";

export function useAseguradora(id: string) {
    const [aseguradora, setAseguradora] = useState<Aseguradora | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!id) return;

        setIsLoading(true);
        getAseguradoraById(id).then(res => {
            if (res) {
                setAseguradora(res);
            }

            setIsLoading(false);
        });
    }, [id]);

    return { aseguradora, isLoading }
}