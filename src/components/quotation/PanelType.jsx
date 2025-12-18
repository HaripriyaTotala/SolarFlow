import React from 'react';

const PanelType = ({ formData, setFormData }) => {
  const handlePanelTypeChange = (e) => {
    setFormData(prev => ({
      ...prev,
      panelType: {
        ...prev.panelType,
        type: e.target.value
      }
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Panel Type Selection</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="panelType"
              value="DCR"
              checked={formData.panelType.type === 'DCR'}
              onChange={handlePanelTypeChange}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="ml-2 text-gray-700">DCR</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="panelType"
              value="Non-DCR"
              checked={formData.panelType.type === 'Non-DCR'}
              onChange={handlePanelTypeChange}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="ml-2 text-gray-700">Non-DCR</span>
          </label>
        </div>
        
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Panel Type:</h3>
          <p className="text-lg font-semibold text-blue-600">
            {formData.panelType.type || 'Not selected'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PanelType; 