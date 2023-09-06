'use client'
import api from '@/config/api'
import { useCompany } from '@/contexts/CompanyContext'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'

export default function Organizations() {
  const [inputDate, setInputDate] = useState('')
  const [apiSuccess, setApiSuccess] = useState('')
  const [isValidDate, setIsValidDate] = useState(true)

  const { companyInfo, setCompanyInfo } = useCompany()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value
    setInputDate(newDate)
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/
    if (!dateRegex.test(newDate)) {
      setIsValidDate(false)
      return
    }
    const [day, month, year] = newDate.split('/').map(Number)
    const enteredDate = new Date(year, month - 1, day)
    const currentDate = new Date()
    if (!isNaN(enteredDate.getTime()) && enteredDate < currentDate) {
      setIsValidDate(true)
      const dateParts = newDate.split('/')
      const [d, m, y] = dateParts
      setCompanyInfo((prevInfo) => ({
        ...prevInfo,
        opening_date: `${y}/${m}/${d}`
      }))
    } else {
      setIsValidDate(false)
    }
  }

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (companyInfo.id) {
      try {
        const response = await api.patch(
          `clients/${companyInfo.id}`,
          companyInfo
        )

        setApiSuccess(response.data)
        setCompanyInfo({
          address: '',
          cnpj: '',
          company_name: '',
          opening_date: ''
        })
        setInputDate('')
      } catch (err: any) {
        if (err?.response?.data) {
          const key = Object.keys(err?.response?.data)[0]
          const description = err?.response?.data[key][0]

          const mensagemFormatada = `${key}: ${description}`
          alert(JSON.stringify(mensagemFormatada))
        } else {
          alert('Ocorreu algum erro desconhecido')
        }
      }
    }
  }
  useEffect(() => {
    if (companyInfo.opening_date) {
      const newDate = companyInfo.opening_date.split('-')
      const [y, m, d] = newDate
      setInputDate(`${d}/${m}/${y}`)
    }
  }, [])

  return (
    <div>
      <form
        className="w-full max-w-sm container mt-20 mx-auto"
        onSubmit={onSubmit}
      >
        <div className="w-full mb-5">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="name"
          >
            Nome da empresa
          </label>
          <input
            id="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
            value={companyInfo.company_name}
            onChange={(e) => {
              setCompanyInfo((prevInfo) => ({
                ...prevInfo,
                company_name: e.target.value
              }))
            }}
            type="text"
            placeholder="Informe o nome da empresa"
          />
        </div>
        <div className="w-full mb-5">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="cnpj"
          >
            CNPJ
          </label>
          <InputMask
            id="cnpj"
            mask="99.999.999/9999-99"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
            value={companyInfo.cnpj}
            onChange={(e) => {
              setCompanyInfo((prevInfo) => ({
                ...prevInfo,
                cnpj: e.target.value
              }))
            }}
            type="text"
            placeholder="00.000.000/00000-00"
          />
        </div>
        <div className="w-full mb-5">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="address"
          >
            Endereço
          </label>
          <input
            id="address"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
            value={companyInfo.address}
            onChange={(e) => {
              setCompanyInfo((prevInfo) => ({
                ...prevInfo,
                address: e.target.value
              }))
            }}
            type="text"
            placeholder="Qual o endereço"
          />
        </div>
        <div className="w-full mb-5">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="opened"
          >
            Data de abertura
          </label>
          <InputMask
            id="opened"
            mask="99/99/9999"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
            value={inputDate}
            onChange={handleInputChange}
            type="text"
            placeholder="Data de abertura da empresa"
          />
        </div>
        <div>
          {!isValidDate && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Data inválida</strong>
              <span className="block sm:inline">
                {' '}
                informe sua data com DD/MM/AAAA
              </span>
            </div>
          )}
        </div>
        <div>
          {!!apiSuccess && (
            <div
              className="bg-teal-100 border-t-4 text-center border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
              role="alert"
            >
              <div className="flex">
                <div className="py-1">
                  <svg
                    className="fill-current h-6 w-6 text-teal-500 mr-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold">Cliente salvo com sucesso!</p>
                  <p className="text-sm">
                    Seu cliente foi salvo com sucesso{' '}
                    <Link
                      href="/"
                      className="underline text-teal-500 text-center hover:text-teal-600"
                    >
                      Voltar
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            disabled={
              !isValidDate ||
              !companyInfo.company_name ||
              !companyInfo.cnpj ||
              !companyInfo.opening_date ||
              !companyInfo.address ||
              !!apiSuccess
            }
            className="mt-5 bg-green-400 w-full hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Salvar
          </button>
        </div>
        <div className="text-center mt-4 text-gray-500">
          <Link href="/">Cancel</Link>
        </div>
      </form>
    </div>
  )
}
