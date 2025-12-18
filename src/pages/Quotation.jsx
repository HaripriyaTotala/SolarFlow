import { useState } from 'react'
import QuotationForm from '../components/quotation/QuotationForm'
import QuotationPreview from '../components/quotation/QuotationPreview'

export default function Quotation() {
  const [quotationData, setQuotationData] = useState(null)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            OmSolar Quotation Generator
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {!quotationData ? (
          <QuotationForm onSubmit={setQuotationData} />
        ) : (
          <QuotationPreview data={quotationData} onBack={() => setQuotationData(null)} />
        )}
      </main>
    </div>
  )
}
