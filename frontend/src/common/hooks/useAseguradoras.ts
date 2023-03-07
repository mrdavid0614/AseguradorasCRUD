import { useEffect, useState } from "react";
import { getAllAseguradoras } from "../services/aseguradora";
import { Aseguradora } from "../types/models/aseguradora";

export function useAseguradoras() {
    const [aseguradoras, setAseguradoras] = useState<Aseguradora[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAseguradoras = () => {
        setIsLoading(true);
        getAllAseguradoras().then(res => {
            if (res) {
                setAseguradoras(res);
            }

            setIsLoading(false);
        });
    }

    useEffect(() => {
        fetchAseguradoras();
    }, []);

    return { aseguradoras, isLoading, refetch: fetchAseguradoras }
}