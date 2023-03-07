import { Link } from "react-router-dom";
import { Loading } from "../../common/components/Loading";
import Table from "../../common/components/Table";
import { useAseguradoras } from "../../common/hooks/useAseguradoras";
import { useToast } from "../../common/hooks/useToast";
import { deleteAseguradora } from "../../common/services/aseguradora";

export function Home() {
    const { aseguradoras, isLoading, refetch } = useAseguradoras();
    const { notify } = useToast();

    const handleDeleteAseguradora = (id: string, nombre: string) => {
        if (confirm(`¿Estás seguro de que deseas eliminar la aseguradora ${nombre}?`))
            deleteAseguradora(id)
                .then(() => {
                    notify("Aseguradora eliminada exitósamente", "success");
                    refetch();
                })
                .catch(() => notify("Error al intentar eliminar la aseguradora", "error"));
    };

    if (isLoading)
        return (
            <div className="h-screen flex justify-center items-center">
                <Loading />
            </div>
        );

    return (
        <main className="m-24">
            <h1 className="text-4xl mb-5 text-gray-200">Lista de aseguradoras</h1>
            <Table >
                <Table.THead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Comisión</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </Table.THead>
                <Table.TBody>
                    {aseguradoras.map((aseguradora, index) => {
                        return (
                            <tr key={aseguradora.id}>
                                <th>{index + 1}</th>
                                <td>{aseguradora.nombre}</td>
                                <td>{aseguradora.comision}</td>
                                <td className={aseguradora.estado ? "text-green-500" : "text-red-500"}>{aseguradora.estado ? "Activo" : "Inactivo"}</td>
                                <td className="flex justify-evenly">
                                    <Link to={`/editAseguradora/${aseguradora.id}`} className="btn btn-warning capitalize">Editar</Link>
                                    <button
                                        onClick={() => handleDeleteAseguradora(aseguradora.id, aseguradora.nombre)}
                                        className="btn bg-red-500 hover:bg-red-600 outline-none text-white capitalize"
                                    >
                                        Borrar
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </Table.TBody>
            </Table>
        </main>
    );
}