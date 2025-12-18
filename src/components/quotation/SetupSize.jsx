import React, { useState } from 'react';

const SetupSize = ({ formData, setFormData }) => {
  const [isCustom, setIsCustom] = useState(false);

  const structureSizes = [
    { id: '3x5', label: '3x5' },
    { id: '5x7', label: '5x7' },
    { id: '7x8', label: '7x8' },
    { id: 'custom', label: 'Custom' }
  ];

  const handleSetupSizeChange = (e) => {
    setFormData(prev => ({
      ...prev,
      setupSize: {
        ...prev.setupSize,
        size: e.target.value
      }
    }));
  };

  const handleStructureSizeChange = (e) => {
    const value = e.target.value;
    setIsCustom(value === 'custom');
    
    setFormData(prev => ({
      ...prev,
      setupSize: {
        ...prev.setupSize,
        structureSize: value,
        customWidth: value === 'custom' ? prev.setupSize.customWidth : '',
        customHeight: value === 'custom' ? prev.setupSize.customHeight : ''
      }
    }));
  };

  const handleCustomDimensionsChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      setupSize: {
        ...prev.setupSize,
        [name]: value
      }
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Setup Size Configuration</h2>
      <div className="space-y-6">
        <div>
          <label htmlFor="setupSize" className="block text-sm font-medium text-gray-700">
            Setup Size (kWp)
          </label>
          <input
            type="number"
            id="setupSize"
            name="setupSize"
            value={formData.setupSize.size}
            onChange={handleSetupSizeChange}
            step="0.1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Structure Size
          </label>
          <select
            value={formData.setupSize.structureSize}
            onChange={handleStructureSizeChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select Structure Size</option>
            {structureSizes.map(size => (
              <option key={size.id} value={size.id}>
                {size.label}
              </option>
            ))}
          </select>
        </div>

        {isCustom && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="customWidth" className="block text-sm font-medium text-gray-700">
                Width
              </label>
              <input
                type="number"
                id="customWidth"
                name="customWidth"
                value={formData.setupSize.customWidth}
                onChange={handleCustomDimensionsChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="customHeight" className="block text-sm font-medium text-gray-700">
                Height
              </label>
              <input
                type="number"
                id="customHeight"
                name="customHeight"
                value={formData.setupSize.customHeight}
                onChange={handleCustomDimensionsChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SetupSize; 