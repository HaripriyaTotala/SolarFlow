import React, { useEffect } from 'react';

const ProjectDetails = ({ formData, setFormData }) => {
  const calculateAnnualBill = (monthlyBill) => {
    return monthlyBill * 12;
  };

  const calculateRecommendedSetup = (annualBill) => {
    return (annualBill / 120).toFixed(2);
  };

  const handleMonthlyBillChange = (e) => {
    const monthlyBill = parseFloat(e.target.value) || 0;
    const annualBill = calculateAnnualBill(monthlyBill);
    const recommendedSetup = calculateRecommendedSetup(annualBill);

    setFormData(prev => ({
      ...prev,
      projectDetails: {
        ...prev.projectDetails,
        monthlyBill,
        annualBill,
        recommendedSetup
      }
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Project Details</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="monthlyBill" className="block text-sm font-medium text-gray-700">
            Monthly Electricity Bill (₹)
          </label>
          <input
            type="number"
            id="monthlyBill"
            name="monthlyBill"
            value={formData.projectDetails.monthlyBill}
            onChange={handleMonthlyBillChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Calculated Values</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Annual Bill</p>
              <p className="text-lg font-semibold">₹{formData.projectDetails.annualBill.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Recommended Setup</p>
              <p className="text-lg font-semibold">{formData.projectDetails.recommendedSetup} kWp</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails; 