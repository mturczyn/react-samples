import { Link } from '@tanstack/react-router'

export default function Header() {
    return (
        <header className="p-2 flex gap-2 bg-white text-black justify-between">
            <nav className="[&_a]:p-2 flex flex-row [&>div]:px-2 [&>div]:font-bold [&>div]:border-r">
                <div>
                    <Link to="/">Home</Link>
                </div>

                <div>
                    <Link to="/demo/start/server-funcs">
                        Start - Server Functions
                    </Link>
                </div>

                <div>
                    <Link to="/demo/start/api-request">
                        Start - API Request
                    </Link>
                </div>

                <div>
                    <Link to="/playground">Playground</Link>
                </div>

                <div>
                    <Link to="/hydration-mismatches">Hydration Mismatches</Link>
                </div>

                <div>
                    <Link to="/error-boundary">Error Boundary</Link>
                </div>

                <div>
                    <Link to="/middleware">Middleware</Link>
                </div>

                <div>
                    <Link to="/server-routes">Server Routes</Link>
                </div>

                <div>
                    <Link to="/selective-ssr">Selective SSR</Link>
                </div>

                <div>
                    <Link to="/server-entry-point">Server Entry Point</Link>
                </div>

                <div>
                    <Link to="/client-entry-point">Client Entry Point</Link>
                </div>

                <div>
                    <Link to="/auth">Auth Overview</Link>
                </div>

                <div>
                    <Link to="/test-data-from-db">Database</Link>
                </div>
            </nav>
        </header>
    )
}
