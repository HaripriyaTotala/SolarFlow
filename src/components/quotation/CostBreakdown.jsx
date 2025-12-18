import React, { useEffect } from 'react';

const CostBreakdown = ({ formData, setFormData }) => {
  const calculateTotalBaseCost = () => {
    const { structureCost, wireCost, otherCosts } = formData.costBreakdown;
    return Number(structureCost) + Number(wireCost) + Number(otherCosts);
  };

  const calculateGSTAmount = () => {
    const baseCost = calculateTotalBaseCost();
    const gstPercentage = formData.costBreakdown.gstPercentage;
    return (baseCost * gstPercentage) / 100;
  };

  const calculateTotalCost = () => {
    return calculateTotalBaseCost() + calculateGSTAmount();
  };

  const handleCostChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      costBreakdown: {
        ...prev.costBreakdown,
        [name]: value
      }
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Cost Breakdown</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="structureCost" className="block text-sm font-medium text-gray-700">
            Structure Cost (₹)
          </label>
          <input
            type="number"
            id="structureCost"
            name="structureCost"
            value={formData.costBreakdown.structureCost}
            onChange={handleCostChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="wireCost" className="block text-sm font-medium text-gray-700">
            Wire Cost (₹)
          </label>
          <input
            type="number"
            id="wireCost"
            name="wireCost"
            value={formData.costBreakdown.wireCost}
            onChange={handleCostChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="otherCosts" className="block text-sm font-medium text-gray-700">
            Other Costs (₹)
          </label>
          <input
            type="number"
            id="otherCosts"
            name="otherCosts"
            value={formData.costBreakdown.otherCosts}
            onChange={handleCostChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="gstPercentage" className="block text-sm font-medium text-gray-700">
            GST Percentage (%)
          </label>
          <input
            type="number"
            id="gstPercentage"
            name="gstPercentage"
            value={formData.costBreakdown.gstPercentage}
            onChange={handleCostChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-medium text-gray-700 mb-3">Cost Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Base Cost:</span>
              <span className="font-semibold">₹{calculateTotalBaseCost().toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">GST Amount:</span>
              <span className="font-semibold">₹{calculateGSTAmount().toLocaleString()}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-200">
              <span className="text-gray-800 font-medium">Total Cost (Including GST):</span>
              <span className="font-bold text-blue-600">₹{calculateTotalCost().toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostBreakdown; 