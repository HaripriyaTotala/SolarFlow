import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const PDFGenerator = ({ formData }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Page 1: Welcome Page
    doc.setFontSize(24);
    doc.setTextColor(0, 51, 102);
    doc.text('SolarFlow', pageWidth / 2, 40, { align: 'center' });
    
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('Thank you for choosing SolarFlow!', pageWidth / 2, 60, { align: 'center' });
    
    // Page 2: Quotation Summary
    doc.addPage();
    doc.setFontSize(20);
    doc.text('Quotation Summary', 20, 20);
    
    // Customer Details
    doc.setFontSize(12);
    doc.text('Customer Details:', 20, 40);
    doc.text(`Name: ${formData.customerInfo.fullName}`, 30, 50);
    doc.text(`Address: ${formData.customerInfo.address}`, 30, 60);
    doc.text(`Town: ${formData.customerInfo.town}`, 30, 70);
    doc.text(`State: ${formData.customerInfo.state}`, 30, 80);
    
    // Project Details
    doc.text('Project Details:', 20, 100);
    doc.text(`Monthly Bill: ₹${formData.projectDetails.monthlyBill}`, 30, 110);
    doc.text(`Annual Bill: ₹${formData.projectDetails.annualBill}`, 30, 120);
    doc.text(`Recommended Setup: ${formData.projectDetails.recommendedSetup} kWp`, 30, 130);
    
    // Cost Breakdown
    const totalBaseCost = Number(formData.costBreakdown.structureCost) + 
                         Number(formData.costBreakdown.wireCost) + 
                         Number(formData.costBreakdown.otherCosts);
    const gstAmount = (totalBaseCost * formData.costBreakdown.gstPercentage) / 100;
    const totalCost = totalBaseCost + gstAmount;
    
    doc.text('Cost Breakdown:', 20, 150);
    doc.text(`Structure Cost: ₹${formData.costBreakdown.structureCost}`, 30, 160);
    doc.text(`Wire Cost: ₹${formData.costBreakdown.wireCost}`, 30, 170);
    doc.text(`Other Costs: ₹${formData.costBreakdown.otherCosts}`, 30, 180);
    doc.text(`GST (${formData.costBreakdown.gstPercentage}%): ₹${gstAmount}`, 30, 190);
    doc.text(`Total Cost: ₹${totalCost}`, 30, 200);
    
    // Page 3: Solar Benefits
    doc.addPage();
    doc.setFontSize(20);
    doc.text('Solar Benefits', 20, 20);
    
    const benefits = [
      'Monthly & Annual Savings',
      'Environmental Impact (CO₂ saved)',
      'Low Maintenance',
      'Government Incentives'
    ];
    
    benefits.forEach((benefit, index) => {
      doc.text(`• ${benefit}`, 30, 40 + (index * 10));
    });
    
    // Page 4: About OmSolar
    doc.addPage();
    doc.setFontSize(20);
    doc.text('About SolarFlow', 20, 20);
    
    const aboutContent = [
      'Company Overview',
      'Vision & Mission',
      'Contact Information',
      'Website: www.SolarFlow.com',
      'WhatsApp: +91 123456789'
    ];
    
    aboutContent.forEach((content, index) => {
      doc.text(content, 30, 40 + (index * 10));
    });
    
    // Save the PDF
    doc.save('SolarFlow_Quotation.pdf');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Generate Quotation</h2>
      <button
        onClick={generatePDF}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Download Quotation PDF
      </button>
    </div>
  );
};

export default PDFGenerator; 