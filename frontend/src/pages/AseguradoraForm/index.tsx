import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { aseguradoraFormSchema } from "../../common/validators/aseguradora";
import { Form } from "../../common/components/Form";
import { RenderIf } from "../../common/components/RenderIf";
import { useAseguradora } from "../../common/hooks/useAseguradora";
import { createAseguradora, updateAseguradora } from "../../common/services/aseguradora";
import { Loading } from "../../common/components/Loading";
import { Aseguradora } from "../../common/types/models/aseguradora";
import { useToast } from "../../common/hooks/useToast";

type AseguradoraFormProps = {
    mode: "add" | "edit";
}

export function AseguradoraForm({ mode }: AseguradoraFormProps) {
    const { id } = useParams();
    const navigate = useNavigate();
    const { notify } = useToast();
    const { aseguradora, isLoading } = useAseguradora(id ?? '');
    const {
        register,
        reset,
        setValue,
        formState,
        handleSubmit
    } = useForm({
        defaultValues: {
            nombre: '',
            comision: 0,
            estado: false,
        },
        shouldFocusError: true,
        resolver: yupResolver(aseguradoraFormSchema)
    });

    const onSubmit = (data: Omit<Aseguradora, "id">) => {
        if (mode === "edit" && id) {
            updateAseguradora({ id, ...data })
                .then((res) => {
                    notify(typeof res === "string" ? res : "Aseguradora actualizada", "success");
                    navigate("/");
                })
                .catch(() => {
                    notify("Error al intentar actualizar aseguradora", "error");
                });

            return;
        }
        
        createAseguradora(data)
            .then(() => {
                notify("Aseguradora creada exitósamente", "success");
                navigate("/");
            })
            .catch(() => {
                notify("Error al intentar crear aseguradora", "error");
            })
    }

    useEffect(() => {
        if (aseguradora && mode === "edit") {
            const {nombre, comision, estado} = aseguradora;
            reset({ nombre, comision, estado });
        }
    }, [aseguradora]);

    if (isLoading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <Loading />
            </div>
        );
    }

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
            className="grid place-content-center gap-5"
        >
            <div className="form-control w-96">
                <label htmlFor="nombre" className="mb-2">Nombre</label>
                <input
                    { ...register("nombre") }
                    type="text"
                    id="nombre"
                    placeholder="Aseguradora Fulano"
                    className="input input-bordered w-full focus:input-accent text-gray-200 placeholder:text-gray-500"
                />
            </div>

            <RenderIf condition={!!formState.errors.nombre}>
                <span className="text-red-500">{ formState.errors.nombre?.message }</span>
            </RenderIf>

            <div className="form-control w-96">
                <label htmlFor="comision" className="mb-2">Comisión</label>
                <input
                    { ...register("comision", {
                        pattern: /^\d+\.\d{2}/,
                        onChange: (e) => {
                            const newValue = e.target.value;

                            if (newValue.includes(".") && newValue.split(".")[1].length > 2)
                                setValue("comision", +parseFloat(newValue).toFixed(2));
                        }
                    })}
                    step=".01"
                    type="number"
                    id="comision"
                    placeholder="10.00"
                    className="input input-bordered w-full focus:input-accent text-gray-200 placeholder:text-gray-500"
                />
            </div>
            <RenderIf condition={!!formState.errors.comision}>
                <span className="text-red-500">{ formState.errors.comision?.message }</span>
            </RenderIf>

            <div className="form-control">
                <label htmlFor="estado" className="cursor-pointer label">
                    <span className="label-text text-lg">Activo</span>
                    <input
                        { ...register("estado") }
                        type="checkbox"
                        id="estado"
                        className="checkbox checkbox-primary"
                    />
                </label>
            </div>

            <section className="flex justify-between">
                <button
                    type="reset"
                    className="btn btn-secondary capitalize text-gray-50 w-40 font-bold"
                >
                    Limpiar
                </button>
                <button
                    type="submit"
                    className="btn btn-success capitalize w-40 font-bold"
                    disabled={!formState.isDirty && !formState.isValid}
                >
                    {mode === "add" ? "Agregar" : "Actualizar"}
                </button>
            </section>
        </Form>
    );
}