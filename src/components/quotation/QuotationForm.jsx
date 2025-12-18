import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FaEdit } from 'react-icons/fa'

const PRICING_DATA = {
  2: { actualKwp: 2.2, basePrice: 140598, gst: 19402, total: 160000, subsidy: 60000, finalCost: 100000, },
  3: { actualKwp: 3.24, basePrice: 188928, gst: 26072, total: 215000, subsidy: 78000, finalCost: 137000, },
  4: { actualKwp: 4.32, basePrice: 228471, gst: 31529, total: 260000, subsidy: 78000, finalCost: 182000, },
  5: { actualKwp: 5.4, basePrice: 268014, gst: 36986, total: 305000, subsidy: 78000, finalCost: 227000,  },
  6: { actualKwp: 6.48, basePrice: 369069, gst: 50931, total: 420000, subsidy: 156000, finalCost: 264000,},
  7: { actualKwp: 7.56, basePrice: 399824, gst: 55176, total: 455000, subsidy: 156000, finalCost: 299000,},
  8: { actualKwp: 8.64, basePrice: 439367, gst: 60633, total: 500000, subsidy: 156000, finalCost: 344000,}
}

const STRUCTURE_SIZES = [
  { value: '3x5', label: '3x5 (Default)' },
  { value: '5x7', label: '5x7' },
  { value: '7x8', label: '7x8' },
  { value: 'custom', label: 'Custom' }
]

// Helper function to generate capacity combinations
const generateCapacityOptions = (numberOfSetups) => {
  if (numberOfSetups === 1) {
    return Array.from({ length: 7 }, (_, i) => ({
      value: `${i + 2}`,
      label: `${i + 2} kWp`
    }))
  }

  if (numberOfSetups === 2) {
    const options = []
    for (let i = 2; i <= 8; i++) {
      for (let j = 2; j <= 8; j++) {
        if (i + j <= 8) {
          options.push({
            value: `${i}+${j}`,
            label: `${i}+${j} kWp`
          })
        }
      }
    }
    return options
  }

  if (numberOfSetups === 3) {
    const options = []
    for (let i = 2; i <= 8; i++) {
      for (let j = 2; j <= 8; j++) {
        for (let k = 2; k <= 8; k++) {
          if (i + j + k <= 8) {
            options.push({
              value: `${i}+${j}+${k}`,
              label: `${i}+${j}+${k} kWp`
            })
          }
        }
      }
    }
    return options
  }

  return []
}

// Helper function to calculate total pricing for multiple capacities
const calculateTotalPricing = (capacityString) => {
  if (!capacityString) return null

  const capacities = capacityString.split('+').map(cap => parseInt(cap))
  const totalPricing = {
    actualKwp: 0,
    basePrice: 0,
    gst: 0,
    total: 0,
    subsidy: 0,
    finalCost: 0
  }

  capacities.forEach(capacity => {
    const pricing = PRICING_DATA[capacity]
    if (pricing) {
      totalPricing.actualKwp += pricing.actualKwp
      totalPricing.basePrice += pricing.basePrice
      totalPricing.gst += pricing.gst
      totalPricing.total += pricing.total
      totalPricing.subsidy += pricing.subsidy
      totalPricing.finalCost += pricing.finalCost
    }
  })

  return totalPricing
}

export default function QuotationForm({ onSubmit }) {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm()
  const [showCustomStructure, setShowCustomStructure] = useState(false)
  const [lastMonth, setLastMonth] = useState('')
  
  const monthlyBill = watch('monthlyBill')
  const selectedCapacity = watch('capacity')
  const structureSize = watch('structureSize')
  const numberOfSetups = watch('numberOfSetups') || 1
  const unitsConsumed = watch('unitsConsumed')

  // Generate capacity options based on number of setups
  const capacityOptions = generateCapacityOptions(parseInt(numberOfSetups))

  useEffect(() => {
    // Calculate last month's date
    const now = new Date()
    const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    setLastMonth(monthNames[lastMonthDate.getMonth()])
  }, [])

  // Calculate annual bill and recommended kWp
  const annualBill = monthlyBill ? monthlyBill * 12 : 0
  let recommendedKwp = 0;
  if (unitsConsumed) {
    const raw = unitsConsumed / 120;
    const decimal = raw - Math.floor(raw);
    if (decimal <= 0.5) {
      recommendedKwp = Math.floor(raw);
    } else {
      recommendedKwp = Math.ceil(raw);
    }
  }

  // Calculate pricing based on selected capacity
  const pricing = selectedCapacity ? calculateTotalPricing(selectedCapacity) : null

  // State for editing total
  const [isEditingTotal, setIsEditingTotal] = useState(false)
  const [customTotal, setCustomTotal] = useState(null)

  // Calculate the final cost based on custom total if set
  const displayTotal = customTotal !== null ? customTotal : (pricing ? pricing.total : 0)
  const displayFinalCost = pricing ? (displayTotal - pricing.subsidy) : 0

  const handleStructureSizeChange = (e) => {
    const value = e.target.value
    setValue('structureSize', value)
    setShowCustomStructure(value === 'custom')
  }

  const onFormSubmit = (data) => {
    onSubmit({
      ...data,
      annualBill,
      recommendedKwp,
      pricing,
      customTotal: customTotal !== null ? customTotal : undefined,
      customFinalCost: pricing ? (customTotal !== null ? (customTotal - pricing.subsidy) : pricing.finalCost) : undefined
    })
  }

  // Animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit(onFormSubmit)} 
      className="space-y-8 max-w-4xl mx-auto font-['Inter'] relative z-10 pb-24"
    >
      {/* Customer Details Section */}
      <motion.div 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="bg-gray-800/90 backdrop-blur-sm shadow-lg rounded-xl p-8 border border-gray-700"
      >
        <h2 className="text-2xl font-semibold text-gray-100 mb-6 font-['Playfair_Display']">Customer Details</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Full Name</label>
            <input
              type="text"
              {...register('fullName', { required: 'Full name is required' })}
              className="w-full px-4 py-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-700 text-gray-100 placeholder-gray-400"
            />
            {errors.fullName && <p className="text-sm text-red-400">{errors.fullName.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">USC No</label>
            <input
              type="text"
              {...register('uscNo')}
              className="w-full px-4 py-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-700 text-gray-100 placeholder-gray-400"
            />
            {errors.uscNo && <p className="text-sm text-red-400">{errors.uscNo.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Address</label>
            <input
              type="text"
              {...register('address', { required: 'Address is required' })}
              className="w-full px-4 py-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-700 text-gray-100 placeholder-gray-400"
            />
            {errors.address && <p className="text-sm text-red-400">{errors.address.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Town</label>
            <input
              type="text"
              {...register('town', { required: 'Town is required' })}
              className="w-full px-4 py-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-700 text-gray-100 placeholder-gray-400"
            />
            {errors.town && <p className="text-sm text-red-400">{errors.town.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">State</label>
            <input
              type="text"
              {...register('state', { required: 'State is required' })}
              className="w-full px-4 py-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-700 text-gray-100 placeholder-gray-400"
            />
            {errors.state && <p className="text-sm text-red-400">{errors.state.message}</p>}
          </div>
        </div>
      </motion.div>

      {/* Usage Details Section */}
      <motion.div 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="bg-gray-800/90 backdrop-blur-sm shadow-lg rounded-xl p-8 border border-gray-700"
      >
        <h2 className="text-2xl font-semibold text-gray-100 mb-6 font-['Playfair_Display']">Usage Details</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Monthly Electricity Bill (₹)</label>
            <input
              type="number"
              {...register('monthlyBill')}
              className="w-full px-4 py-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-700 text-gray-100 placeholder-gray-400"
            />
            {errors.monthlyBill && <p className="text-sm text-red-400">{errors.monthlyBill.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Units Consumed ({lastMonth})</label>
            <input
              type="number"
              {...register('unitsConsumed')}
              className="w-full px-4 py-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-700 text-gray-100 placeholder-gray-400"
              placeholder={`Enter units consumed for ${lastMonth}`}
            />
            {errors.unitsConsumed && <p className="text-sm text-red-400">{errors.unitsConsumed.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Annual Bill (₹)</label>
            <input
              type="number"
              value={annualBill}
              readOnly
              className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-gray-300 cursor-not-allowed"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Recommended kWp</label>
            <input
              type="number"
              value={recommendedKwp}
              readOnly
              className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-gray-300 cursor-not-allowed"
            />
          </div>
        </div>
      </motion.div>

      {/* System Configuration Section */}
      <motion.div 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="bg-gray-800/90 backdrop-blur-sm shadow-lg rounded-xl p-8 border border-gray-700"
      >
        <h2 className="text-2xl font-semibold text-gray-100 mb-6 font-['Playfair_Display']">System Configuration</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Panel Type</label>
            <div className="flex space-x-6 mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  {...register('panelType', { required: 'Panel type is required' })}
                  value="DCR"
                  className="form-radio h-4 w-4 text-blue-500 transition duration-150 ease-in-out"
                />
                <span className="ml-2 text-gray-300">DCR</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  {...register('panelType')}
                  value="Non-DCR"
                  className="form-radio h-4 w-4 text-blue-500 transition duration-150 ease-in-out"
                />
                <span className="ml-2 text-gray-300">Non-DCR</span>
              </label>
            </div>
            {errors.panelType && <p className="text-sm text-red-400">{errors.panelType.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Number of Setups</label>
            <select
              {...register('numberOfSetups', { required: 'Number of setups is required' })}
              className="w-full px-4 py-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-700 text-gray-100"
            >
              <option value="1">1 Setup</option>
              <option value="2">2 Setups</option>
              <option value="3">3 Setups</option>
            </select>
            {errors.numberOfSetups && <p className="text-sm text-red-400">{errors.numberOfSetups.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Selected Capacity (kWp)</label>
            <select
              {...register('capacity', { required: 'Capacity is required' })}
              className="w-full px-4 py-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-700 text-gray-100"
            >
              <option value="">Select capacity</option>
              {capacityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.capacity && <p className="text-sm text-red-400">{errors.capacity.message}</p>}
          </div>
        </div>
      </motion.div>

      {/* Structure Size Section */}
      <motion.div 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="bg-gray-800/90 backdrop-blur-sm shadow-lg rounded-xl p-8 border border-gray-700"
      >
        <h2 className="text-2xl font-semibold text-gray-100 mb-6 font-['Playfair_Display']">Structure Size</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Structure Size</label>
            <select
              {...register('structureSize', { required: 'Structure size is required' })}
              onChange={handleStructureSizeChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-700 text-gray-100"
            >
              {STRUCTURE_SIZES.map((size) => (
                <option key={size.value} value={size.value}>
                  {size.label}
                </option>
              ))}
            </select>
            {errors.structureSize && <p className="text-sm text-red-400">{errors.structureSize.message}</p>}
          </div>
          {showCustomStructure && (
            <>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Length (m)</label>
                <input
                  type="number"
                  {...register('customLength', { required: showCustomStructure ? 'Length is required' : false })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-700 text-gray-100 placeholder-gray-400"
                />
                {errors.customLength && <p className="text-sm text-red-400">{errors.customLength.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Width (m)</label>
                <input
                  type="number"
                  {...register('customWidth', { required: showCustomStructure ? 'Width is required' : false })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-700 text-gray-100 placeholder-gray-400"
                />
                {errors.customWidth && <p className="text-sm text-red-400">{errors.customWidth.message}</p>}
              </div>
            </>
          )}
        </div>
      </motion.div>

      {/* Pricing Summary Section */}
      {pricing && (
        <motion.div 
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="bg-gray-800/90 backdrop-blur-sm shadow-lg rounded-xl p-8 border border-gray-700 mb-12"
        >
          <h2 className="text-2xl font-semibold text-gray-100 mb-6 font-['Playfair_Display']">Pricing Summary</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-gray-700/80 backdrop-blur-sm p-6 rounded-xl border border-gray-600"
            >
              <h3 className="text-sm font-medium text-gray-400 font-['Playfair_Display']">Base Price</h3>
              <p className="mt-2 text-2xl font-bold text-gray-100">₹{pricing.basePrice.toLocaleString()}</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-gray-700/80 backdrop-blur-sm p-6 rounded-xl border border-gray-600"
            >
              <h3 className="text-sm font-medium text-gray-400 font-['Playfair_Display']">GST</h3>
              <p className="mt-2 text-2xl font-bold text-gray-100">₹{pricing.gst.toLocaleString()}</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-gray-700/80 backdrop-blur-sm p-6 rounded-xl border border-gray-600 flex items-center justify-between"
            >
              <h3 className="text-sm font-medium text-gray-400 font-['Playfair_Display']">Total</h3>
              {isEditingTotal ? (
                <input
                  type="number"
                  value={displayTotal}
                  min={0}
                  onChange={e => setCustomTotal(Number(e.target.value))}
                  onBlur={() => setIsEditingTotal(false)}
                  className="mt-2 text-2xl font-bold text-gray-900 bg-gray-200 rounded px-2 py-1 w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              ) : (
                <div className="flex items-center gap-2">
                  <p className="mt-2 text-2xl font-bold text-gray-100">₹{displayTotal.toLocaleString()}</p>
                  <button type="button" onClick={() => setIsEditingTotal(true)} className="text-blue-400 hover:text-blue-600" title="Edit Total"><FaEdit /></button>
                </div>
              )}
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-gray-700/80 backdrop-blur-sm p-6 rounded-xl border border-gray-600"
            >
              <h3 className="text-sm font-medium text-gray-400 font-['Playfair_Display']">Subsidy</h3>
              <p className="mt-2 text-2xl font-bold text-gray-100">₹{pricing.subsidy.toLocaleString()}</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-gray-700/80 backdrop-blur-sm p-6 rounded-xl border border-gray-600"
            >
              <h3 className="text-sm font-medium text-gray-400 font-['Playfair_Display']">Final Cost</h3>
              <p className="mt-2 text-2xl font-bold text-gray-100">₹{displayFinalCost.toLocaleString()}</p>
            </motion.div>
          </div>
        </motion.div>
      )}

      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm py-4 px-4 z-50 border-t-4 border-blue-500">
        <motion.div 
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex justify-end"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-auto py-3 px-6 bg-white text-gray-900 text-lg font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 font-['Playfair_Display'] shadow-lg hover:shadow-xl"
          >
            Generate Quotation
          </motion.button>
        </motion.div>
      </div>
    </motion.form>
  )
} 