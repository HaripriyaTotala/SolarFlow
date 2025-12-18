import React from 'react';
import { FaFileInvoiceDollar, FaFileContract } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 mb-4">
          SolarFlow Document Generator
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Access your essential solar business tools in one place. Generate professional quotations and legal agreements with ease.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
        {/* Quotation Generator Card */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/quotation')}
          className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 cursor-pointer hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20 transition-all group"
        >
          <div className="h-16 w-16 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
            <FaFileInvoiceDollar className="text-3xl text-blue-400" />
          </div>
          <h2 className="text-2xl font-semibold mb-3 text-white group-hover:text-blue-400 transition-colors">
            Quotation Generator
          </h2>
          <p className="text-slate-400">
            Create detailed solar installation quotations including cost breakdown, project details, and ROI calculations.
          </p>
        </motion.div>

        {/* Agreements Generator Card */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/agreements')}
          className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 cursor-pointer hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/20 transition-all group"
        >
          <div className="h-16 w-16 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-colors">
            <FaFileContract className="text-3xl text-emerald-400" />
          </div>
          <h2 className="text-2xl font-semibold mb-3 text-white group-hover:text-emerald-400 transition-colors">
            Agreements Generator
          </h2>
          <p className="text-slate-400">
            Generate standardized vendor and net metering agreements. Auto-fill templates and export to PDF.
          </p>
        </motion.div>
      </div>

      <footer className="mt-20 text-slate-500 text-sm">
        © {new Date().getFullYear()} Solar Tools Suite. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;
