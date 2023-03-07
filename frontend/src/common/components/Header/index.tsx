import { Link } from 'react-router-dom'

export function Header () {
    return <header className="flex p-4 justify-between">
        <Link className="text-2xl font-bold text-yellow-50" to="/">AseguradorasR.N</Link>
        <Link className="btn btn-success capitalize" to="/newAseguradora">Nueva aseguradora</Link>
    </header>
}