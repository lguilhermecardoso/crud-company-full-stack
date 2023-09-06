'use client'

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect
} from 'react'

interface CompanyInfo {
  id?: number
  company_name: string
  cnpj: string
  opening_date: string
  address: string
}

interface CompanyContextType {
  companyInfo: CompanyInfo
  setCompanyInfo: React.Dispatch<React.SetStateAction<CompanyInfo>>
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined)

export function useCompany() {
  const context = useContext(CompanyContext)
  if (!context) {
    throw new Error('useCompany must be used within a CompanyProvider')
  }
  return context
}

interface CompanyProviderProps {
  children: ReactNode
}

export function CompanyProvider({ children }: CompanyProviderProps) {
  const defaultValues: CompanyInfo = {
    company_name: '',
    cnpj: '',
    opening_date: '',
    address: ''
  }

  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(defaultValues)

  return (
    <CompanyContext.Provider value={{ companyInfo, setCompanyInfo }}>
      {children}
    </CompanyContext.Provider>
  )
}
