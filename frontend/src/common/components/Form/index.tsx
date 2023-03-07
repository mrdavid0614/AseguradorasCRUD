import { ReactNode } from "react";

type FormProps = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> & {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    children: ReactNode;
}

export function Form({ onSubmit, children, ...props }: FormProps) {
    return (
        <form onSubmit={onSubmit} {...props} >
            {children}
        </form>
    );
}