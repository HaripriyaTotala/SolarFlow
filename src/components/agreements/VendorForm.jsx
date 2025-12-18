import { useState, useMemo } from 'react'
import { generateVendorAgreementPdf } from '../../utils/pdfVendor'

export default function VendorForm({ onBack }) {
  const [form, setForm] = useState({ name: '', date: '', address: '' })
  const isValid = useMemo(() => form.name && form.date && form.address, [form])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const generatePdf = async () => {
    try {
      await generateVendorAgreementPdf(form)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please check the console for details.')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">Vendor Agreement</h1>
          <button className="text-slate-600 hover:text-slate-900" onClick={onBack}>Back</button>
        </div>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Name</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Enter full name" className="mt-1 w-full rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Date</label>
                <input type="date" name="date" value={form.date} onChange={handleChange} className="mt-1 w-full rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Address</label>
                <textarea name="address" value={form.address} onChange={handleChange} rows="4" placeholder="Enter address" className="mt-1 w-full rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500" />
              </div>
              <button onClick={generatePdf} disabled={!isValid} className="w-full rounded-lg bg-indigo-600 text-white py-2.5 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700">Download PDF</button>
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow">
            <p className="text-sm text-slate-600">The generated PDF will match the provided vendor agreement template with your details placed in the correct positions on each page.</p>
            <ul className="list-disc pl-5 mt-3 text-sm text-slate-700 space-y-1">
              <li>Name, Date, and Address auto-filled</li>
              <li>Exact layout preserved using background images</li>
              <li>Multi-page PDF export</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
