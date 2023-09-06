import Link from 'next/link'
import { ClientList } from '../ClientList'

const Main = () => (
  <main className="flex flex-col p-24">
    <div className="flex justify-center text-3xl">
      <h1 className="text-center font-bold">Cadastro de empresas</h1>
    </div>
    <div className="flex-grow text-left px-4 py-2 m-2">
      <h5 className="text-gray-900 font-semibold text-xl">
        Empresas cadastradas
      </h5>
    </div>
    <div className="text-right">
      <Link href="/add">
        <button className="bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded inline-flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-plus-circle"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
          <span className="pl-2">Nova empresa</span>
        </button>
      </Link>
    </div>
    <hr className="mt-2" />

    <ClientList />
  </main>
)
export default Main
