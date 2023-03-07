import { toast } from "react-toastify";

type NotificationType = "success" | "error" | "warn" | "info";

export function useToast() {
    const notify = (message: string, type: NotificationType) => {
        toast[type](message, {
            position: toast.POSITION.TOP_RIGHT,
        });
    }

    return { notify };
}