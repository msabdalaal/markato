import { Link } from 'react-router-dom'

export default function Dashboard() {

  return (
    <div>

      <section className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-3xl font-bold mb-20">Dashboard</h1>
        <div className="grid grid-cols-2 gap-3 text-center">
          <Link
            to={'/products'}
            className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-5 border-2 border-slate-500 hover:bg-slate-500 hover:text-white"
          >
            Manage Products
          </Link>
          <Link
            to={'/Sales'}
            className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-5 border-2 border-slate-500 hover:bg-slate-500 hover:text-white"
          >
            Manage Sales
          </Link>
        </div>
      </section>
    </div>
  )
}
