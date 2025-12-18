import jsPDF from 'jspdf'

// Helper to format date as "11th August 2025"
function formatLongDate(isoDateString) {
  if (!isoDateString) return ''
  const date = new Date(isoDateString)
  const day = date.getDate()
  const suffix = (d => (d > 3 && d < 21) ? 'th' : ['th','st','nd','rd'][Math.min(d % 10, 4)])(day)
  const month = date.toLocaleString('en-US', { month: 'long' })
  const year = date.getFullYear()
  return `${day}${suffix} ${month} ${year}`
}

export async function generateVendorAgreementPdf({ name, date, address }) {
  try {
    const formattedDate = formatLongDate(date)

    const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' })
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()

    // Set default font
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(0, 0, 0)

    // Set margins
    const leftMargin = 60
    const rightMargin = 60
    const topMargin = 140  // Increased top margin for first page
    const bottomMargin = 60
    const textWidth = pageWidth - leftMargin - rightMargin

    // PAGE 1 - Exact replica of template
    // Title - Split into multiple lines to fit properly
    doc.setFontSize(12)  // Reduced font size for title
    doc.setFont('helvetica', 'bold')
    doc.text('Agreement between Consumer & Vendor for installation of grid connected rooftop solar (RTS) project', pageWidth/2, topMargin, { align: 'center' })
    doc.text('under PM - Surya Ghar: Muft Bijli Yojana', pageWidth/2, topMargin + 20, { align: 'center' })

    // Execution paragraph
    doc.setFontSize(9.5)
    doc.setFont('helvetica', 'normal')
    let yPos = topMargin + 50
    const executionLines = doc.splitTextToSize(`This agreement is executed on ${formattedDate} for design, supply, installation, commissioning and 5-year comprehensive maintenance of RTS project/system along with warranty under PM Surya Ghar: Muft Bijli Yojana`, textWidth)
    doc.text(executionLines, leftMargin, yPos)
    yPos += (executionLines.length * 13) + 25

    // Between section
    doc.setFontSize(9.5)
    doc.setFont('helvetica', 'bold')
    doc.text('Between', leftMargin, yPos)
    yPos += 25

    // First Party (Consumer)
    doc.setFont('helvetica', 'normal')
    const firstPartyLines = doc.splitTextToSize(`${name.toUpperCase()} having address at ${address} (hereinafter referred to as first Party i.e. /consumer/consumer/purchaser /owner of system).`, textWidth)
    doc.text(firstPartyLines, leftMargin, yPos)
    yPos += (firstPartyLines.length * 13) + 25

    // And section
    doc.setFont('helvetica', 'bold')
    doc.text('And', leftMargin, yPos)
    yPos += 25

    // Second Party (Vendor)
    doc.setFont('helvetica', 'normal')
    const secondPartyLines = doc.splitTextToSize('OM SOLAR having registered office at PLOT NO. 217, MITRA NAGAR, OFF KOKAT ROAD, TANDUR, 501141 (hereinafter referred to as second Party i.e. Vendor/ contractor/System Integrator).', textWidth)
    doc.text(secondPartyLines, leftMargin, yPos)
    yPos += (secondPartyLines.length * 13) + 25

    // Whereas clauses
    doc.setFont('helvetica', 'bold')
    doc.text('Whereas', leftMargin, yPos)
    yPos += 25
    doc.setFont('helvetica', 'normal')
    const whereas1Lines = doc.splitTextToSize('First Party wishes to install a Grid Connected Rooftop Solar Plant on the rooftop of the residential building of the Consumer under PM Surya Ghar: Muft Bijli Yojana.', textWidth)
    doc.text(whereas1Lines, leftMargin, yPos)
    yPos += (whereas1Lines.length * 13) + 25

    doc.setFont('helvetica', 'bold')
    doc.text('Whereas', leftMargin, yPos)
    yPos += 25
    doc.setFont('helvetica', 'normal')
    const whereas2Lines = doc.splitTextToSize('Second Party has verified availability of appropriate roof and found it feasible to install a Grid Connected Roof Top Solar plant and that the second party is willing to design, supply, install, test, commission and carry out Operation & Maintenance of the Rooftop Solar plant for 5 year period On this day, the First Party and Second Party agree to the following:', textWidth)
    doc.text(whereas2Lines, leftMargin, yPos)
    yPos += (whereas2Lines.length * 13) + 30

    // First Party Undertakings
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9.5)
    doc.text('The First Party hereby undertakes to perform the following activities:', leftMargin, yPos)
    yPos += 30

    const firstPartyActivities = [
      'Submission of online application at National Portal for installation of RTS project/system, Submission of application for net-metering and system inspection and upload of the relevant documents on the National Portal of the scheme',
      'Provide secure storage of the material of the RTS plant delivered at the premises till handover of the system.',
      'Provide access to the Roof Top during installation of the plant, operation & maintenance, testing of the plant and equipment and for meter reading from solar meter, inverter etc.',
      'Provide electricity during plant installation and water for cleaning of the panels.',
      'Report any malfunctioning of the plant to the Vendor during the warranty period.',
      'Pay the amount as per the payment schedule as mutually agreed with the vendor, including any additional amount to the second party for any additional work /customization required depending upon the building condition'
    ]

    firstPartyActivities.forEach((activity, index) => {
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9.5)
      const textLines = doc.splitTextToSize(`${index + 1}. ${activity}`, textWidth - 15)
      doc.text(textLines, leftMargin + 15, yPos)
      yPos += (textLines.length * 12) + 20  // Calculate actual height + spacing
    })

   
    // Page number
    doc.setFontSize(10)
    doc.text('1/4', pageWidth - 50, pageHeight - 20)

    // PAGE 2
    doc.addPage()
    yPos = 80  // Standard top margin for subsequent pages

    // Second Party Undertakings
    yPos += 30  // Add proper spacing after First Party activities
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.text('The Second Party hereby undertakes to perform the following activities:', leftMargin, yPos)
    yPos += 25  // Add spacing after the heading


    const secondPartyActivities = [
      'The Vendor must follow all the standards and safety guidelines prescribed under state regulations and technical standards prescribed by MNRE for RTS projects, failing which the vendor is liable for blacklisting from participation in the govt. project/ scheme and other penal actions in accordance with the law. The responsibility of supply, installation and commissioning of the rooftop solar project/system in complete compliance with MNRE scheme guidelines lies with the Vendor.',
      'Site Survey: Site visit, survey and development of detailed project report for installation of RTS system. This also includes, feasibility study of roof, strength of roof and shadow free area. If any additional work or customization is involved for the plant installation as per site condition and requirement of the consumer building, the Vendor shall prepare an estimate and can raise a separate invoice including GST in addition to the amount towards standard plant cost. The consumer shall pay the amount for such additional work directly to the Vendor.',
      'Design & Engineering: Design of plant along with drawings and selection of components as per standard provided by the DISCOM/SERC/MNRE for best performance and safety of the plant.',
      'Module and Inverter: The solar modules, including the solar cells, should be manufactured in India. Both the solar modules and inverters shall conform to the relevant standards and specifications prescribed by MNRE. Any other requirement, viz. star labelling (solar modules), quality control orders and standards & labelling (inverters) etc., shall also be complied.',
      'Procurement & Supply: Procurement of complete system as per BIS/IS/IEC standard (whatever applicable) & safety guidelines for installation of rooftop solar plants. The supplied materials should comply with all MNRE standards for release of subsidy.',
      'Installation & Civil work: Complete civil work, structure work and electrical work (including drawings) following all the safety and relevant BIS standards.',
      'Documentation (Technical Catalogues/Warranty Certificates/BIS certificates/other test reports etc): All such documents shall be provided to the consumer for online uploading and submission of technical specifications, IEC/BIS report, Sr. Nos, Warranty card of Solar Panel & Inverter, Layout & Electrical SLD, Structure Design and Drawing, Cable and other detailed documents.',
      'Project completion report (PCR): Assisting the consumer in filling and uploading of signed documents (Consumer & Vendor) on the national portal.',
      'Warranty: System warranty certificates should be provided to the consumer. The complete system should be warranted for 5 years from the date of commissioning by DISCOM. Individual component warranty documents provided by the manufacturer shall be provided to the consumer and all possible assistance should be extended to the consumer for claiming the warranty from the manufacturer.',
      'NET meter & Grid Connectivity: Net meter supply/procurement, testing and approvals shall be in the scope of vendor. Grid connection of the plant shall be in the scope of the vendor.',
      'Testing and Commissioning: The vendor shall be present at the time of testing and commissioning by the DISCOM.'
    ]

    secondPartyActivities.forEach((activity, index) => {
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(10)
      const textLines = doc.splitTextToSize(`${index + 1}. ${activity}`, textWidth)
      doc.text(textLines, leftMargin, yPos)
      yPos += (textLines.length * 12) + 20  // Calculate actual height + spacing
    })

    // Page number
    doc.setFontSize(10)
    doc.text('2/4', pageWidth - 50, pageHeight - 20)

    // PAGE 3
    doc.addPage()
    yPos = 80  // Standard top margin for subsequent pages

    const additionalClauses = [
      'Operation & Maintenance: Five (5) years Comprehensive Operation and Maintenance including overhauling, wear and tear, and regular health checks within the vendor\'s scope. The vendor is also responsible for educating the consumer on best practices for cleaning modules and system maintenance.',
      'Insurance: Any insurance cost related to material transfer/storage before system commissioning is within the vendor\'s scope.',
      'Applicable Standard: The system must meet technical standards and specifications notified by MNRE. The vendor is solely responsible for supplying components and services that comply with the technical standards and specifications prescribed by MNRE and State DISCOMS.',
      'Project/system cost & payment terms: The plant cost and payment schedule should be mutually discussed and decided between the vendor and consumer. The consumer has the option for milestone-based payments, which must be included in the agreement.',
      'Dispute: Any dispute between the consumer and vendor (regarding supply/installation/maintenance or payment terms) must be settled mutually or as per law. MNRE/DISCOM will not be liable for or a party to any such dispute.',
      'Subsidy / Project Related Documents: The vendor must provide all necessary documents to the consumer and assist in uploading them to the National Portal for the smooth release of subsidies.',
      'Performance of Plant: The Performance Ratio (PR) of the plant must be 75% at the time of commissioning by DISCOM or its authorized agency. The vendor must provide a (returnable basis) radiation sensor with a valid calibration certificate from an NABL/International laboratory during commissioning/testing. The vendor must maintain the plant\'s PR until the project warranty expires, which is 5 years from the commissioning date.',
      'Mutually Agreed Terms of Payment: Payment terms as "80% on Signing agreement, 20% on Installation and liasoning".'
    ]

    additionalClauses.forEach((clause, index) => {
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(10)
      const textLines = doc.splitTextToSize(`${index + 12}. ${clause}`, textWidth)
      doc.text(textLines, leftMargin, yPos)
      yPos += (textLines.length * 12) + 25  // Calculate actual height + spacing
    })

    // Signature blocks
    const signatureY = pageHeight - 220
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text('First Party:', leftMargin, signatureY)
    doc.setFont('helvetica', 'normal')
    doc.text('Name:', leftMargin, signatureY + 20)
    doc.text(name, leftMargin + 50, signatureY + 20)
    doc.text('Address:', leftMargin, signatureY + 40)
    doc.text(address, leftMargin + 50, signatureY + 40, { maxWidth: 200 })
    doc.text('Sign:', leftMargin, signatureY + 80)
    doc.text('Date:', leftMargin, signatureY + 100)
    doc.text(formattedDate, leftMargin + 50, signatureY + 100)

    doc.setFont('helvetica', 'bold')
    doc.text('Second Party:', leftMargin + 250, signatureY)
    doc.setFont('helvetica', 'normal')
    doc.text('Name:', leftMargin + 250, signatureY + 20)
    doc.text('SolarFlow', leftMargin + 300, signatureY + 20)
    doc.text('Address:', leftMargin + 250, signatureY + 40)
    doc.text(' MITRA NAGAR, xyz, Hyderabad, 000111', leftMargin + 300, signatureY + 40, { maxWidth: 200 })
    doc.text('Sign:', leftMargin + 250, signatureY + 80)
    doc.text('Date:', leftMargin + 250, signatureY + 100)
    doc.text(formattedDate, leftMargin + 300, signatureY + 100)

    // Disclaimer
    doc.setFontSize(9)
    doc.text('Disclaimer: This agreement is between vendor and consumer and any dispute related to the same shall not involve any third party including MNRE and Distribution Utilities.', leftMargin, pageHeight - 40, { maxWidth: textWidth })

    // Page number
    doc.setFontSize(10)
    doc.text('3/4', pageWidth - 50, pageHeight - 20)

    // Save
    doc.save(`${name}_Vendor_Agreement.pdf`)
  } catch (error) {
    console.error('Error generating PDF:', error)
    alert('Error generating PDF. Please check the console for details.')
  }
}



