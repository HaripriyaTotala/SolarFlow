import { useState } from 'react'
import VendorForm from '../components/agreements/VendorForm'
import NetMeteringForm from '../components/agreements/NetMeteringForm'

function Welcome({ onNavigate }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-indigo-50 px-4">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8 border border-slate-200">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Agreements Generator</h1>
          <p className="mt-2 text-slate-600">Create polished PDFs from official templates</p>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button onClick={() => onNavigate('vendor')} className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 text-left shadow hover:shadow-lg transition">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-50 to-sky-50 opacity-0 group-hover:opacity-100 transition"/>
            <div className="relative">
              <h2 className="text-xl font-semibold text-slate-900">Vendor Agreement</h2>
              <p className="mt-1 text-slate-600 text-sm">Auto-fill template and download as PDF</p>
            </div>
          </button>
          <button onClick={() => onNavigate('netmeter')} className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 text-left shadow hover:shadow-lg transition">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-50 to-lime-50 opacity-0 group-hover:opacity-100 transition"/>
            <div className="relative">
              <h2 className="text-xl font-semibold text-slate-900">Net Metering Agreement</h2>
              <p className="mt-1 text-slate-600 text-sm">Auto-fill template and download as PDF</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Agreements() {
  const [route, setRoute] = useState('home')
  return route === 'home' ? (
    <Welcome onNavigate={setRoute} />
  ) : route === 'vendor' ? (
    <VendorForm onBack={() => setRoute('home')} />
  ) : route === 'netmeter' ? (
    <NetMeteringForm onBack={() => setRoute('home')} />
  ) : (
    <div className="min-h-screen flex items-center justify-center">
      <button className="underline" onClick={() => setRoute('home')}>Back</button>
    </div>
  )
}
