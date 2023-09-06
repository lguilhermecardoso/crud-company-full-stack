'use client'

import api from '@/config/api'
import { useCompany } from '@/contexts/CompanyContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface ClientRequest {
  id: number
  company_name: string
  cnpj: string
  opening_date: string
  address: string
}

const ClientList = () => {
  const [company, setCompany] = useState<ClientRequest[]>([])
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  const { setCompanyInfo } = useCompany()

  const handleEditClient = (client: ClientRequest) => {
    setCompanyInfo(client)
    router.push('/empresas')
  }

  const handleDeleteClient = (id: number) => {
    setLoading(true)
    async function getCompanies() {
      try {
        setLoading(true)
        const response = await api.get('/clients')
        setCompany(response.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    async function deleteClient() {
      const response = await api.delete(`/clients/${id}`)
      if (response.status === 204) {
        getCompanies()
      }
    }

    deleteClient()
    setLoading(false)
  }

  useEffect(() => {
    async function getcompany() {
      try {
        setLoading(true)
        const response = await api.get('/clients')
        setCompany(response.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    getcompany()
  }, [])

  return (
    <div>
      <div>
        {loading ? (
          <div className="flex justify-center mt-2">
            <div
              className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
            <p className="ml-2 text-gray-600 whitespace-no-wrap text-center">
              Carregando ...
            </p>
          </div>
        ) : (
          <>
            {company.length > 0 ? (
              <>
                <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Empresa
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Endereço
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Data abertura
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"></th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {company.map((client) => (
                        <tr key={client.id}>
                          <td className="px-5 py-5 bg-white text-sm">
                            <div className="flex">
                              <div className="flex-shrink-0 w-10 h-10">
                                <img
                                  className="w-full h-full rounded-full"
                                  src="https://cdn-icons-png.flaticon.com/512/4465/4465629.png"
                                  alt=""
                                />
                              </div>
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {client.company_name}
                                </p>
                                <p className="text-gray-600 whitespace-no-wrap">
                                  {client.cnpj}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-5 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {client.address}
                            </p>
                          </td>
                          <td className="px-5 py-5 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {client.opening_date}
                            </p>
                          </td>
                          <td className="px-5 py-5 bg-white text-sm text-right"></td>
                          <td className="py-5 bg-white text-sm text-right">
                            <div className="flex">
                              <button
                                type="button"
                                className="inline-block text-green-500 hover:text-green-700 mr-2"
                                onClick={() => handleEditClient(client)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                  />
                                </svg>
                              </button>
                              <button
                                type="button"
                                className="inline-block text-red-200  hover:text-red-800 mr-2"
                                onClick={() => handleDeleteClient(client.id)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                  />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <>
                <p className="text-gray-600 whitespace-no-wrap">
                  Nenhum cliente cadastrado
                </p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export { ClientList }
