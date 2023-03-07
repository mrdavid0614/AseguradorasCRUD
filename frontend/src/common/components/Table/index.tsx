import React, { ReactNode } from "react";

type ComponentProps = {
    children: ReactNode;
}
type TableProps = React.DetailedHTMLProps<React.TableHTMLAttributes<HTMLTableElement>, HTMLTableElement> & ComponentProps;

function Table({ children, ...props }: TableProps) {
  return (
    <table className="table w-full border border-stone-700" {...props} >
        {children}
    </table>
  )
}

function THead ({ children }: ComponentProps) {
    return (
        <thead>
            {children}
        </thead>
    )
}

function TBody({ children }: ComponentProps) {
    return (
        <tbody>
            {children}
        </tbody>
    )
}

Table.THead = THead;
Table.TBody = TBody;

export default Table;