import { useEffect, useRef } from 'react'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import solarimg from '../../assets/quotation/solarimg.jpeg'

// Helper to convert imported image to base64 at runtime
const getBase64 = (imgPath) => {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/jpeg'));
    };
    img.onerror = reject;
    img.src = imgPath;
  });
};

export default function QuotationPreview({ data, onBack }) {
  const pdfRef = useRef(null)

  // Use custom total/final cost if present
  const customTotal = data.customTotal !== undefined && data.customTotal !== null ? data.customTotal : (data.pricing?.total || 0);
  const customFinalCost = data.customFinalCost !== undefined && data.customFinalCost !== null ? data.customFinalCost : (data.pricing?.finalCost || 0);

  const generatePDF = async () => {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const margin = 20

    // Convert images to base64
    const logoBase64 = await getBase64(logo)
    const solarimgBase64 = await getBase64(solarimg)

    // --- PAGE 1: COVER WITH BACKGROUND ---
    // Add solar background with reduced opacity
    doc.setGState(new doc.GState({ opacity: 0.15 }))
    doc.addImage(solarimgBase64, 'JPEG', 0, 0, pageWidth, pageHeight)
    doc.setGState(new doc.GState({ opacity: 1 }))
    
    // Add logo
    doc.addImage(logoBase64, 'JPEG', margin, 10, 40, 25)
    
    // Add footer bar
    doc.setFillColor(255, 204, 102)
    doc.rect(0, pageHeight - 18, pageWidth, 18, 'F')
    doc.setTextColor(0, 51, 102)
    doc.setFontSize(10)
    doc.text('Call Us On +91 9481721501  |   www.omsolartdr.com', pageWidth / 2, pageHeight - 7, { align: 'center' })
    
    // Add main content
    doc.setFontSize(28)
    doc.setTextColor(40, 40, 40)
    doc.text(`Proposal for ${data.capacity} kWp Rooftop Solar System`, pageWidth / 2, 70, { align: 'center' })
    doc.setFontSize(13)
    doc.text(`${data.fullName}`, pageWidth / 2, 80, { align: 'center' })
    doc.text(`${data.town}, ${data.state}`, pageWidth / 2, 88, { align: 'center' })
    doc.setFontSize(10)
    doc.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth / 2, 96, { align: 'center' })

    // --- PAGE 2: PROPOSAL LETTER & SYSTEM TABLE ---
    doc.addPage()
    // Add solar background with reduced opacity
    doc.setGState(new doc.GState({ opacity: 0.15 }))
    doc.addImage(solarimgBase64, 'JPEG', 0, 0, pageWidth, pageHeight)
    doc.setGState(new doc.GState({ opacity: 1 }))
    
    // Add white overlay for better text readability
    doc.setFillColor(255, 255, 255)
    doc.setDrawColor(255, 255, 255)
    doc.setGState(new doc.GState({ opacity: 0.9 }))
    doc.rect(0, 0, pageWidth, pageHeight, 'F')
    doc.setGState(new doc.GState({ opacity: 1 }))

    // Logo top left
    doc.addImage(logoBase64, 'JPEG', margin, 10, 30, 18)
    
    // Contact info top right
    doc.setFontSize(9)
    doc.setTextColor(0,0,0)
    doc.text('Ph: 9481721501', pageWidth - margin - 2, 15, { align: 'right' })
    doc.text('Email: omsolartdr@gmail.com', pageWidth - margin - 2, 20, { align: 'right' })
    doc.text('Regd Address: Plot No 217, Mitra Nagar, Tandur, 501141', pageWidth - margin - 2, 25, { align: 'right' })
    // Date top right
    doc.setFontSize(10)
    doc.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - margin - 2, 32, { align: 'right' })
    // To block
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text('To', margin, 40)
    doc.setFont('helvetica', 'normal')
    doc.text(`${data.fullName}`, margin, 46)
    doc.text(`${data.address}`, margin, 52)
    doc.text(`${data.town}, ${data.state}`, margin, 58)
    doc.setFontSize(11)
    doc.text('Dear Sir,', margin, 66)
    // Subject
    doc.setFont('helvetica', 'bold')
    doc.text(`Sub: Proposal for Supply & Installation of ${data.numberOfSetups || 1} Nos. ${data.capacity} KWp rooftop solar plant for residential purposes under PM Suryaghar Yojana`, margin, 74, { maxWidth: pageWidth - 2 * margin })
    doc.setFont('helvetica', 'normal')
    // Customer usage summary - only show if user has entered data
    let y = 86
    const hasUsageData = data.uscNo || data.monthlyBill || data.unitsConsumed || data.recommendedKwp
    
    if (hasUsageData) {
      doc.setFontSize(10)
      doc.text('Understanding Customer usage:', margin, y)
      y += 6
      
      if (data.uscNo) {
        doc.text(`USC No: ${data.uscNo}`, margin, y)
        y += 6
      }
      
      if (data.unitsConsumed) {
        doc.text(`Units consumed (${new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1).toLocaleString('default', { month: 'long' })}): ${data.unitsConsumed}`, margin, y)
        y += 6
      }
      
      if (data.monthlyBill) {
        doc.text(`Bill amount: Rs. ${data.monthlyBill}`, margin, y)
        y += 6
      }
      
      if (data.recommendedKwp) {
        doc.text(`Recommended setup: ${data.recommendedKwp} KWp (120 Units/KWp/Month production)`, margin, y)
        y += 6
      }
      
      y += 4
    }
    doc.setFont('helvetica', 'bold')
    doc.text('Summary:', margin, y)
    y += 6
    doc.setFont('helvetica', 'normal')
    doc.text(`${data.capacity * (data.numberOfSetups || 1)} KWp Solar (${data.panelType}): Rs. ${customTotal.toLocaleString()}`, margin, y)
    y += 6
    doc.text(`Subsidy: Rs. ${data.pricing?.subsidy?.toLocaleString() || ''}`, margin, y)
    y += 6
    doc.text(`NET cost after Subsidy: Rs. ${customFinalCost.toLocaleString()}`, margin, y)
    y += 10
    // System Specifications Table
    doc.setFont('helvetica', 'bold')
    doc.text(`${data.capacity * (data.numberOfSetups || 1)} KWp 3 Phase DCR On Grid Solar System Specifications`, pageWidth / 2, y, { align: 'center' })
    doc.setFont('helvetica', 'normal')
    y += 2
    doc.autoTable({
      startY: y + 4,
      head: [['Item', 'Details', 'Make', 'Quantity']],
      body: [
        ['SPV Modules', 'TopCon Bifacial', 'Adani / Waaree / Any Tier 1 manufacturer', `${data.capacity * 1000 / 545 * (data.numberOfSetups || 1) || ''} No's`],
        ['Module Mounting Structure', `${data.structureSize === 'custom' ? `${data.customLength}x${data.customWidth} Ft` : data.structureSize}`, 'As Per MNRE Specs', `${data.numberOfSetups || 1} No`],
        ['Inverter', 'High efficiency 3-Phase', 'Ksolare / Microtek / Equivalent', `${data.numberOfSetups || 1} No`],
        ['Cables', 'Cu / Al - BIS Standard', 'Polycab / Equivalent', 'As per site'],
        ['Earthing', 'BIS Standard', 'As per Standard', `${data.numberOfSetups || 1} Set`],
        ['Other Electrical and structural components', 'As per site requirements', 'Polycab/Equivalent', `${data.numberOfSetups || 1} Set`]
      ],
      theme: 'grid',
      styles: { 
        fontSize: 9,
        font: 'helvetica'
      },
      headStyles: { 
        fillColor: [200, 200, 200],
        font: 'helvetica',
        fontStyle: 'bold'
      },
      margin: { left: margin, right: margin }
    })

    // --- PAGE 3: PRICING & ROI TABLE ---
    doc.addPage()
    // Add solar background with reduced opacity
    doc.setGState(new doc.GState({ opacity: 0.15 }))
    doc.addImage(solarimgBase64, 'JPEG', 0, 0, pageWidth, pageHeight)
    doc.setGState(new doc.GState({ opacity: 1 }))
    
    // Add white overlay for better text readability
    doc.setFillColor(255, 255, 255)
    doc.setDrawColor(255, 255, 255)
    doc.setGState(new doc.GState({ opacity: 0.9 }))
    doc.rect(0, 0, pageWidth, pageHeight, 'F')
    doc.setGState(new doc.GState({ opacity: 1 }))

    // Logo top left
    doc.addImage(logoBase64, 'JPEG', margin, 10, 30, 18)
    
    // Pricing Table
    let y2 = 40
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text('Pricing:', margin, y2)
    doc.setFont('helvetica', 'normal')
    y2 += 2
    doc.autoTable({
      startY: y2 + 2,
      head: [['', '', '']],
      body: [
        [`${data.capacity * (data.numberOfSetups || 1)} KWp System cost`, `Rs. ${data.pricing?.basePrice?.toLocaleString() || ''}`, ''],
        [`GST @ ${data.pricing?.gst ? '18%' : ''}`, `Rs. ${data.pricing?.gst?.toLocaleString() || ''}`, ''],
        ['Net Cost to the customer after Discount', `Rs. ${customTotal.toLocaleString()}`, '']
      ],
      theme: 'grid',
      styles: { 
        fontSize: 9,
        font: 'helvetica'
      },
      headStyles: { 
        fillColor: [200, 200, 200],
        font: 'helvetica',
        fontStyle: 'bold'
      },
      margin: { left: margin, right: margin }
    })
    // ROI Table
    y2 = doc.lastAutoTable.finalY + 6
    doc.setFont('helvetica', 'bold')
    doc.text(`${data.capacity * (data.numberOfSetups || 1)} KWp ROI for Solar On-grid Rooftop System`, margin, y2)
    doc.setFont('helvetica', 'normal')
    doc.autoTable({
      startY: y2 + 2,
      head: [['Item', 'Unit', 'Value']],
      body: [
        ['System Size', 'kWp', data.capacity * (data.numberOfSetups || 1) || ''],
        ['System cost', 'Rs', customTotal.toLocaleString()],
        ['Subsidy On the system', 'Rs', data.pricing?.subsidy?.toLocaleString() || ''],
        ['Net cost to client', 'Rs', customFinalCost.toLocaleString()],
        ['Avg. solar units generated', 'units/Years', (data.capacity * 4.5 * 365 * (data.numberOfSetups || 1)).toFixed(0)],
        ['Variable Cost of Power @ INR 8/-', 'Rs/ unit', '8'],
        ['Avg. savings per year', 'Rs/ year', ((data.capacity * 4.5 * 365 * (data.numberOfSetups || 1)) * 8).toLocaleString()],
        ['Assumed increase in EB+DG tariff', 'Rs', '2000'],
        ['Payback period', 'Years', (customFinalCost / ((data.capacity * 4.5 * 365 * (data.numberOfSetups || 1)) * 8)).toFixed(1)],
        ['Project life', 'Years', '30']
      ],
      theme: 'grid',
      styles: { 
        fontSize: 9,
        font: 'helvetica'
      },
      headStyles: { 
        fillColor: [200, 200, 200],
        font: 'helvetica',
        fontStyle: 'bold'
      },
      margin: { left: margin, right: margin }
    })
    // Notes and terms
    let y3 = doc.lastAutoTable.finalY + 6
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.text('NOTE:', margin, y3)
    doc.setFont('helvetica', 'normal')
    doc.text('1. We also facilitate loans with PSU banks for very low interest rates', margin, y3 + 5)
    doc.text('2. Feasibility charges payable directly to TSSPDCL included', margin, y3 + 10)
    doc.text('3. Installation, Liasoning and commissioning included', margin, y3 + 15)
    doc.setFont('helvetica', 'bold')
    doc.text('General Terms & Conditions:', margin, y3 + 22)
    doc.setFont('helvetica', 'normal')
    doc.text('1. Prices quoted are firm and valid for a period of 15 days from the date of this offer.', margin, y3 + 27)
    doc.text('2. Pricing is for Tandur town limits only. Transportation charges applicable for out of town sites.', margin, y3 + 32)
    doc.text('3. Payment terms - 80% with PO and 20% on installation date', margin, y3 + 37)
    doc.text('4. Warranty: 25 years from date of installation.', margin, y3 + 42)
    doc.text('5. Delivery: 4 weeks from the date of payment', margin, y3 + 47)

    // --- PAGE 4: CONTACT DETAILS & SOLAR USES ---
    doc.addPage()
    // Add solar background with reduced opacity
    doc.setGState(new doc.GState({ opacity: 0.15 }))
    doc.addImage(solarimgBase64, 'JPEG', 0, 0, pageWidth, pageHeight)
    doc.setGState(new doc.GState({ opacity: 1 }))
    
    // Add white overlay for better text readability
    doc.setFillColor(255, 255, 255)
    doc.setDrawColor(255, 255, 255)
    doc.setGState(new doc.GState({ opacity: 0.9 }))
    doc.rect(0, 0, pageWidth, pageHeight, 'F')
    doc.setGState(new doc.GState({ opacity: 1 }))

    // Logo top left
    doc.addImage(logoBase64, 'JPEG', margin, 10, 30, 18)
    // Why Go Solar section
    doc.setFontSize(16)
    doc.setTextColor(41, 128, 185)
    doc.setFont('helvetica', 'bold')
    doc.text('Why Go Solar?', margin, 40)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)
    const uses = [
      'Save up to 80% on your electricity bills',
      'Reduce your carbon footprint and help the environment',
      'Increase your property value with a modern solar system',
      'Get government subsidies and incentives',
      'Low maintenance and long system life',
      'Protection against rising electricity costs'
    ]
    let usesY = 50
    uses.forEach((point, idx) => {
      doc.text(`• ${point}`, margin, usesY + idx * 10)
    })

    // Contact details at the bottom
    let contactY = pageHeight - 60
    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)
    doc.setFont('helvetica', 'bold')
    doc.text('OmSolar', margin, contactY)
    doc.setFont('helvetica', 'normal')
    doc.text('HariKrishna Complex, Main Road, Tandur, Telangana, 501141 India', margin, contactY + 8)
    doc.text('Contact Us: 91+ 9481721501, 9449934105', margin, contactY + 16)
    doc.text('Mail: omsolartdr@gmail.com', margin, contactY + 24)
    doc.text('Website: www.omsolartdr.com', margin, contactY + 32)
    doc.addImage(logoBase64, 'JPEG', pageWidth - 50, contactY, 40, 27)

    pdfRef.current = doc
    const customerName = data.fullName ? data.fullName.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_') : 'customer'
    doc.save(`${customerName}_quotation.pdf`)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Quotation Preview</h2>
        <button
          onClick={onBack}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Back to Form
        </button>
      </div>
      <div className="bg-white shadow sm:rounded-lg p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Customer Information</h3>
            <p className="mt-1 text-sm text-gray-500">{data.fullName}</p>
            <p className="text-sm text-gray-500">{data.address}</p>
            <p className="text-sm text-gray-500">{data.town}, {data.state}</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">System Details</h3>
            <p className="mt-1 text-sm text-gray-500">Panel Type: {data.panelType}</p>
            <p className="text-sm text-gray-500">Capacity: {data.capacity} kWp</p>
            <p className="text-sm text-gray-500">Structure Size: {data.structureSize}</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">Pricing Summary</h3>
            <div className="mt-2 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Base Price</p>
                <p className="text-lg font-semibold">₹{data.pricing.basePrice.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">GST</p>
                <p className="text-lg font-semibold">₹{data.pricing.gst.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Subsidy</p>
                <p className="text-lg font-semibold">₹{data.pricing.subsidy.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Final Cost</p>
                <p className="text-lg font-semibold">₹{customFinalCost.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end space-x-4">
        <button
          onClick={generatePDF}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Download PDF
        </button>
      </div>
    </div>
  )
} 