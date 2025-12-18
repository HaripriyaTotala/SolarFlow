import jsPDF from 'jspdf'

// Helper to format date as "17th day of July 2025"
function formatLongDate(isoDateString) {
  if (!isoDateString) return ''
  const date = new Date(isoDateString)
  const day = date.getDate()
  const suffix = (d => (d > 3 && d < 21) ? 'th' : ['th','st','nd','rd'][Math.min(d % 10, 4)])(day)
  const month = date.toLocaleString('en-US', { month: 'long' })
  const year = date.getFullYear()
  return `${day}${suffix} day of ${month} ${year}`
}

export async function generateNetMeteringAgreementPdf({ name, date, address, uscNumber }) {
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
    const topMargin = 80
    const bottomMargin = 60
    const textWidth = pageWidth - leftMargin - rightMargin

    // PAGE 1
    // Title
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.text('Net Metering Connection Agreement', pageWidth/2, topMargin, { align: 'center' })

    // Main paragraphs
    doc.setFontSize(11)
    doc.setFont('helvetica', 'normal')
    let yPos = topMargin + 40

    // First paragraph - split into multiple lines
    doc.text(`This Agreement executed entered on this ${formattedDate}, between ${name}`, leftMargin, yPos)
    yPos += 15
    doc.text('which means their/his/its/theirs, successors as FIRST PARTY herein after called as', leftMargin, yPos)
    yPos += 15
    doc.text("'Eligible Consumer' and the Southern Power Distribution Company of Telangana Limited,", leftMargin, yPos)
    yPos += 15
    doc.text('a DISCOM incorporated under the provisions of Companies Act 1956 (which means its', leftMargin, yPos)
    yPos += 15
    doc.text('authorized representatives assigns, executors and its successors) as SECOND PARTY,', leftMargin, yPos)
    yPos += 15
    doc.text("hereinafter called the 'DISCOM').", leftMargin, yPos)
    yPos += 25

    // Second paragraph - split into multiple lines
    doc.text('Whereas, the Eligible Consumer has applied to the DSICOM for approval of a', leftMargin, yPos)
    yPos += 15
    doc.text(`Net Metering arrangement at ${address} having electrical Service Connection`, leftMargin, yPos)
    yPos += 15
    doc.text(`No. ${uscNumber} under TSERC (Net Metering Rooftop Solar PV Grid Interactive`, leftMargin, yPos)
    yPos += 15
    doc.text('System) Regulation No. 06 of 2016, dated 16.11.2016, which is effective from', leftMargin, yPos)
    yPos += 15
    doc.text('the date of its notification in the official gazette i.e., 23.11.2016.', leftMargin, yPos)
    yPos += 25

    // Third paragraph - split into multiple lines
    doc.text('And whereas, DISCOM agrees to provide grid connectivity to the Eligible Consumer', leftMargin, yPos)
    yPos += 15
    doc.text('for injection of electricity generated from the Rooftop Solar PV System of capacity', leftMargin, yPos)
    yPos += 15
    doc.text('Three kilowatts into the grid of DISCOM at (Voltage level), as per conditions', leftMargin, yPos)
    yPos += 15
    doc.text('of this agreement.', leftMargin, yPos)
    yPos += 25

    // Fourth paragraph
    doc.text('Any modification/ amendment in the Regulation made shall be applicable and', leftMargin, yPos)
    yPos += 15
    doc.text('corresponding amendment(s) shall be effective to this agreement from time to time.', leftMargin, yPos)
    yPos += 25

    // Concluding sentence
    doc.text('Both the parties hereby agree to as follows:', leftMargin, yPos)
    yPos += 30

    // Section 1
    doc.setFont('helvetica', 'bold')
    doc.text('1. Governing Provisions', leftMargin, yPos)
    yPos += 20
    doc.setFont('helvetica', 'normal')
    doc.text('We hereby undertake to comply with all the requirements of the Electricity Act, 2003,', leftMargin, yPos)
    yPos += 15
    doc.text('the Rules and Regulations framed there under, provisions of the tariffs, applicable', leftMargin, yPos)
    yPos += 15
    doc.text('Charges and the General Terms and Conditions of Supply approved by the Telangana', leftMargin, yPos)
    yPos += 15
    doc.text('State Electricity Regulatory Commission herein after called as "Commission" from', leftMargin, yPos)
    yPos += 15
    doc.text('time to time and agree not to dispute the same.', leftMargin, yPos)
    yPos += 25

    // Section 2
    doc.setFont('helvetica', 'bold')
    doc.text('2. Net metering facility', leftMargin, yPos)
    yPos += 20
    doc.setFont('helvetica', 'normal')
    
    doc.text('i) Eligible Consumer will generate solar power for self consumption and feed', leftMargin + 15, yPos)
    yPos += 15
    doc.text('excess power into the grid of DISCOM.', leftMargin + 15, yPos)
    yPos += 20
    doc.text('ii) In the premises of Eligible Consumer, a meter will be installed by DISCOM', leftMargin + 15, yPos)
    yPos += 15
    doc.text('having the feature of recording both the import and export values, besides', leftMargin + 15, yPos)
    yPos += 15
    doc.text('complying with other parameters notified in CEA metering regulations and', leftMargin + 15, yPos)
    yPos += 15
    doc.text('TRANSCO/DISCOM procedures for arriving net energy for the billing period.', leftMargin + 15, yPos)
    yPos += 25

    // Section 3
    doc.setFont('helvetica', 'bold')
    doc.text('3. Safety', leftMargin, yPos)
    yPos += 20
    doc.setFont('helvetica', 'normal')
    
    doc.text('3.1 The Eligible Consumer shall be responsible for safe operation, maintenance and', leftMargin, yPos)
    yPos += 15
    doc.text('rectification of defects in system upto the interconnection point beyond which the', leftMargin, yPos)
    yPos += 15
    doc.text('responsibility of safe operation, maintenance and rectification of any defect in the', leftMargin, yPos)
    yPos += 15
    doc.text('system including the net meter shall rest with the DISCOM.', leftMargin, yPos)
    yPos += 20
    doc.text('3.2 The Eligible Consumer shall be solely responsible for any accident to human being', leftMargin, yPos)
    yPos += 15
    doc.text('or animals (fatal / non-fatal / departmental / non- departmental) that may occur due to', leftMargin, yPos)
    yPos += 15
    doc.text('back feeding from the Rooftop Solar PV System when the grid supply is off. The', leftMargin, yPos)

    // Page number
    doc.setFontSize(10)
    doc.text('1/5', pageWidth - 50, pageHeight - 20)

    // PAGE 2
    doc.addPage()
    yPos = topMargin

    // Continue section 3.2
    doc.setFontSize(11)
    doc.setFont('helvetica', 'normal')
    doc.text('DISCOM shall not be responsible for any ex-gratia payment for fatal/non-fatal accidents to human beings or animals due to the Rooftop Solar PV System.', leftMargin, yPos)
    yPos += 30

    // Section 3.3
    doc.setFont('helvetica', 'bold')
    doc.text('3.3', leftMargin, yPos)
    yPos += 20
    doc.setFont('helvetica', 'normal')
    doc.text('The Eligible Developer shall adhere to the standards specified by CEA/MNRE and', leftMargin, yPos)
    yPos += 15
    doc.text('Indian Electricity rules, 1956 and shall follow power quality measures as per', leftMargin, yPos)
    yPos += 15
    doc.text('International or Indian standards and/or other measures in Clause 8 of TSERC', leftMargin, yPos)
    yPos += 15
    doc.text('(Net Metering Rooftop Solar PV Grid Interactive System) Regulation No. 06 of 2016', leftMargin, yPos)
    yPos += 15
    doc.text('and any modification/ amendment to the regulation from time to time.', leftMargin, yPos)
    yPos += 25

    // Section 4
    doc.setFont('helvetica', 'bold')
    doc.text('4. Access and Disconnection', leftMargin, yPos)
    yPos += 20
    doc.setFont('helvetica', 'normal')
    
    doc.text('4.1 DISCOM personnel may enter the premises of Eligible Consumer at any time to', leftMargin, yPos)
    yPos += 15
    doc.text('inspect the protective devices and to read/test the meter.', leftMargin, yPos)
    yPos += 20
    doc.text('4.2 DISCOM shall have the right to disconnect the Rooftop Solar PV System under the', leftMargin, yPos)
    yPos += 15
    doc.text('following conditions:', leftMargin, yPos)
    yPos += 20
    doc.text('(i). Emergency or maintenance of DISCOM electric system.', leftMargin + 15, yPos)
    yPos += 15
    doc.text('(ii). Hazardous conditions on DISCOM system due to the Rooftop Solar PV System', leftMargin + 15, yPos)
    yPos += 15
    doc.text('or protective equipment as determined by DISCOM/TRANSCO/State Load Dispatch', leftMargin + 15, yPos)
    yPos += 15
    doc.text('Centre (SLDC).', leftMargin + 15, yPos)
    yPos += 20
    doc.text('(iii). Adverse electrical effects (e.g., power quality problems) on other consumers', leftMargin + 15, yPos)
    yPos += 15
    doc.text('equipment caused by the Rooftop Solar PV System as determined by DISCOM.', leftMargin + 15, yPos)
    yPos += 25

    // Section 5
    doc.setFont('helvetica', 'bold')
    doc.text('5. Clearances and Approvals', leftMargin, yPos)
    yPos += 20
    doc.setFont('helvetica', 'normal')
    
    doc.text('5.1 Solar power can be injected into the DISCOM grid only after prior approval from', leftMargin, yPos)
    yPos += 15
    doc.text('the competent authority and meeting the departmental standards (protection switchgear,', leftMargin, yPos)
    yPos += 15
    doc.text('metering, feasibility approval etc.).', leftMargin, yPos)
    yPos += 20
    doc.text('5.2 The Eligible Consumer shall not start parallel operation of the net metering', leftMargin, yPos)
    yPos += 15
    doc.text('facility until approval is received from the competent authority of DISCOM.', leftMargin, yPos)
    yPos += 20
    doc.text('5.3 For systems above 75KW, the Eligible Consumer shall obtain statutory approvals', leftMargin, yPos)
    yPos += 15
    doc.text('from the safety authority (CEIG) for electrical equipment and solar panels before', leftMargin, yPos)
    yPos += 15
    doc.text('energization. For systems upto 75KW, the Eligible Consumer can self certify for', leftMargin, yPos)
    yPos += 15
    doc.text('safety and protection after inspection and testing.', leftMargin, yPos)
    yPos += 20
    doc.text('5.4 Any additional equipment or solar panels shall require prior written permission', leftMargin, yPos)
    yPos += 15
    doc.text('from DISCOM. In case of failure to obtain permission, DISCOM may cancel the Net', leftMargin, yPos)
    yPos += 15
    doc.text('Metering Agreement after giving an opportunity in writing.', leftMargin, yPos)
    yPos += 25

    // Section 6
    doc.setFont('helvetica', 'bold')
    doc.text('6. Date of enforceability of the Agreement', leftMargin, yPos)
    yPos += 20
    doc.setFont('helvetica', 'normal')
    doc.text('The agreement shall be valid for 25 years from the date of connection of the Rooftop', leftMargin, yPos)
    yPos += 15
    doc.text('Solar PV system with the Grid, provided all the requirements are fulfilled by the', leftMargin, yPos)
    yPos += 15
    doc.text('Eligible Consumer under the conditions of this agreement.', leftMargin, yPos)

    // Page number
    doc.setFontSize(10)
    doc.text('2/5', pageWidth - 50, pageHeight - 20)

    // PAGE 3
    doc.addPage()
    yPos = topMargin

    // Header
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text('Regulation No.6 of 2016 and its future amendments, if any', leftMargin, yPos)
    yPos += 30

    // Section 7
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text('7. Settlement of energy charges', leftMargin, yPos)
    yPos += 20
    doc.setFont('helvetica', 'normal')
    
    doc.text('The accounting shall be effective from the date of connectivity of the Roof-top Solar PV System with the distribution grid of the DISCOM.', leftMargin, yPos)
    yPos += 20
    
    doc.text('7.1 If the exported electricity exceeds the imported electricity during a billing period,', leftMargin, yPos)
    yPos += 15
    doc.text('the excess shall be carried forward as "credited Units" to the next billing period and', leftMargin, yPos)
    yPos += 15
    doc.text('the consumer shall receive monthly minimum bill. If the imported electricity exceeds', leftMargin, yPos)
    yPos += 15
    doc.text('the exported electricity, the DISCOM shall invoice the consumer for the net consumption', leftMargin, yPos)
    yPos += 15
    doc.text('adjusted by the credited units based on the applicable retail supply tariff.', leftMargin, yPos)
    yPos += 25
    
    doc.text('7.2 The unadjusted net credited units shall be settled twice a year (June and December).', leftMargin, yPos)
    yPos += 15
    doc.text('The net export units for the six month period shall be settled at the average cost of', leftMargin, yPos)
    yPos += 15
    doc.text('power purchase approved by the Commission or as per clause 10.3 of TSERC (Net Metering', leftMargin, yPos)
    yPos += 15
    doc.text('Rooftop Solar PV Grid Interactive System) Regulation No. 06 of 2016. The sum shall be', leftMargin, yPos)
    yPos += 15
    doc.text('adjusted in the next electricity bill or deposited in the bank account of the consumer.', leftMargin, yPos)
    yPos += 15
    doc.text('Provided that at the beginning of each Settlement Period, the cumulative injected', leftMargin, yPos)
    yPos += 15
    doc.text('electricity carried forward shall be reset to zero.', leftMargin, yPos)
    yPos += 25
    
    doc.text('7.3 Payment for excess units injected into the grid shall be effective from the date of', leftMargin, yPos)
    yPos += 15
    doc.text('connectivity till the validity of the agreement.', leftMargin, yPos)
    yPos += 20
    doc.text('7.4 If the tariff permits billing on kVAh, the net drawl or injection of energy shall also', leftMargin, yPos)
    yPos += 15
    doc.text('be measured in kVAh.', leftMargin, yPos)
    yPos += 20
    doc.text('7.5 If a consumer cancels the Net Metering Agreement (with one month notice), the unused', leftMargin, yPos)
    yPos += 15
    doc.text('electricity credits shall be paid at Rs 0.50/kWh by the DISCOM or at a rate notified by', leftMargin, yPos)
    yPos += 15
    doc.text('the Commission, after which they shall cease to be an eligible consumer.', leftMargin, yPos)
    yPos += 25

    // Section 8
    doc.setFont('helvetica', 'bold')
    doc.text('8. Metering Arrangement', leftMargin, yPos)
    yPos += 20
    doc.setFont('helvetica', 'normal')
    
    doc.text('Installation of meters (including CTs & PTs) shall be done as per departmental', leftMargin, yPos)
    yPos += 15
    doc.text('procedures with the permission of DISCOM. The Eligible Consumer shall bear the entire', leftMargin, yPos)
    yPos += 15
    doc.text('cost of CTs & PTs and their accessories. The DISCOM shall provide the Net Meter at the', leftMargin, yPos)
    yPos += 15
    doc.text('consumer premises as per Clause 9.2 of TSERC (Net Metering Rooftop Solar PV Grid', leftMargin, yPos)
    yPos += 15
    doc.text('Interactive System) Regulation No. 06 of 2016 and any amendments.', leftMargin, yPos)
    yPos += 25

    // Section 9
    doc.setFont('helvetica', 'bold')
    doc.text('9. Standards for Solar panels', leftMargin, yPos)
    yPos += 20
    doc.setFont('helvetica', 'normal')
    
    doc.text('9.1 Solar PV panels shall meet Indian and IEC standards and shall follow power quality', leftMargin, yPos)
    yPos += 15
    doc.text('measures as per International or Indian standards and/or other measures in Clause 8 of', leftMargin, yPos)
    yPos += 15
    doc.text('TSERC (Net Metering Rooftop Solar PV Grid Interactive System) Regulation No. 06 of 2016', leftMargin, yPos)
    yPos += 15
    doc.text('and any modification/ amendment to the regulation from time to time. Documentary', leftMargin, yPos)
    yPos += 15
    doc.text('evidence of the prescribed standards shall be furnished by the Eligible Consumer to', leftMargin, yPos)
    yPos += 15
    doc.text('DISCOM before operation of the plant.', leftMargin, yPos)

    // Page number
    doc.setFontSize(10)
    doc.text('3/5', pageWidth - 50, pageHeight - 20)

    // PAGE 4
    doc.addPage()
    yPos = topMargin

    // Continue section 9
    doc.setFontSize(11)
    doc.setFont('helvetica', 'normal')
    
    doc.text('9.2 If DISCOM finds that the installed net metering equipment does not conform to the', leftMargin, yPos)
    yPos += 15
    doc.text('standards (International Electro-technical Commission (IEC) or Bureau of Indian', leftMargin, yPos)
    yPos += 15
    doc.text('Standards (BIS)), the vendor of the equipment shall be blacklisted.', leftMargin, yPos)
    yPos += 20
    doc.text('9.3 DISCOM reserves the right to withdraw the permission for net metering and cancel the', leftMargin, yPos)
    yPos += 15
    doc.text('agreement after giving the eligible consumer an opportunity in writing.', leftMargin, yPos)
    yPos += 25

    // Section 10
    doc.setFont('helvetica', 'bold')
    doc.text('10. Interruption or Reduction of delivery', leftMargin, yPos)
    yPos += 20
    doc.setFont('helvetica', 'normal')
    
    doc.text('DISCOM shall not be obligated to accept interruptions but may require the Eligible', leftMargin, yPos)
    yPos += 15
    doc.text('Consumer to interrupt or reduce deliveries for construction, installation, repair,', leftMargin, yPos)
    yPos += 15
    doc.text('replacement, removal, investigation, or inspection of equipment, or due to emergencies,', leftMargin, yPos)
    yPos += 15
    doc.text('forced outages, or compliance with electrical practices. DISCOM shall give reasonable', leftMargin, yPos)
    yPos += 15
    doc.text('notice whenever possible.', leftMargin, yPos)
    yPos += 25

    // Section 11
    doc.setFont('helvetica', 'bold')
    doc.text('11. Obligation of Consumer to pay all charges levied by DISCOM', leftMargin, yPos)
    yPos += 20
    doc.setFont('helvetica', 'normal')
    
    doc.text('11.1 The Eligible Consumer shall abide by the rules and pay Maximum Demand Charges,', leftMargin, yPos)
    yPos += 15
    doc.text('energy charges, surcharges and other charges to DISCOM as per the notified Tariff and', leftMargin, yPos)
    yPos += 15
    doc.text('General Terms and Conditions of Supply.', leftMargin, yPos)
    yPos += 20
    doc.text('11.2 The Eligible Consumer shall pay minimum charges every month as prescribed in the', leftMargin, yPos)
    yPos += 15
    doc.text('retail supply Tariff and General Terms and Conditions, even if no electricity is consumed', leftMargin, yPos)
    yPos += 15
    doc.text('or if the consumed electricity charges are less than the minimum charges.', leftMargin, yPos)
    yPos += 25

    // Section 12
    doc.setFont('helvetica', 'bold')
    doc.text('12. Theft of electricity or unauthorised use of electricity', leftMargin, yPos)
    yPos += 20
    doc.setFont('helvetica', 'normal')
    
    doc.text('An Eligible Consumer found indulging in theft or unauthorised use of electricity shall', leftMargin, yPos)
    yPos += 15
    doc.text('pay penal/additional charges levied by DISCOM, in addition to disconnection of supply as', leftMargin, yPos)
    yPos += 15
    doc.text('per IE Act 2003 and General Terms and Conditions of Supply.', leftMargin, yPos)
    yPos += 25

    // Section 13
    doc.setFont('helvetica', 'bold')
    doc.text('13. Termination of the Agreement', leftMargin, yPos)
    yPos += 20
    doc.setFont('helvetica', 'normal')
    
    doc.text('13.1 If the LT/HT Agreement for Supply of an Eligible Consumer is terminated, then the', leftMargin, yPos)
    yPos += 15
    doc.text('Net Metering Connection Agreement is also deemed terminated.', leftMargin, yPos)

    // Page number
    doc.setFontSize(10)
    doc.text('4/5', pageWidth - 50, pageHeight - 20)

    // PAGE 5
    doc.addPage()
    yPos = topMargin

    // Continue section 13
    doc.setFontSize(11)
    doc.setFont('helvetica', 'normal')
    
    doc.text('13.2 The agreement will be terminated only after its completion period until all the safety', leftMargin, yPos)
    yPos += 15
    doc.text('standards are adhered to. The DISCOM has the right to terminate the agreement on', leftMargin, yPos)
    yPos += 15
    doc.text('breaching any of the rules agreed upon with one month notice. If Eligible Consumer', leftMargin, yPos)
    yPos += 15
    doc.text('intends to pre close or terminate the agreement, Eligible Consumer may do so with', leftMargin, yPos)
    yPos += 15
    doc.text('1 (one) month prior notice.', leftMargin, yPos)
    yPos += 35

    // Section 14
    doc.setFont('helvetica', 'bold')
    doc.text('14. Dispute Resolution', leftMargin, yPos)
    yPos += 20
    doc.setFont('helvetica', 'normal')
    
    doc.text('The Eligible Consumer shall have recourse, in case of any dispute with the DISCOM', leftMargin, yPos)
    yPos += 15
    doc.text('regarding the billing, to the mechanism specified in sub- Sections (5) to (7) of Section 42', leftMargin, yPos)
    yPos += 15
    doc.text('of the Act for the redressal of grievances.', leftMargin, yPos)
    yPos += 60

    // Signature blocks
    const signatureY = yPos
    doc.setFontSize(11)
    
    // Left column (Consumer)
    doc.text('Signature of Eligible Consumer', leftMargin, signatureY)
    doc.text('Witness', leftMargin, signatureY + 40)
    doc.text('Signature:', leftMargin, signatureY + 60)
    doc.text('Name & Address:', leftMargin, signatureY + 80)
    doc.text(name, leftMargin, signatureY + 100)
    doc.text(address, leftMargin, signatureY + 120)
    doc.text('Date:', leftMargin, signatureY + 160)
    doc.text(formattedDate, leftMargin, signatureY + 180)

    // Right column (DISCOM)
    doc.text('Competent Authority from Discom Date:', leftMargin + 250, signatureY)
    doc.text('(with stamp)', leftMargin + 250, signatureY + 20)
    doc.text('Witness', leftMargin + 250, signatureY + 40)
    doc.text('Signature:', leftMargin + 250, signatureY + 60)
    doc.text('Name & Address:', leftMargin + 250, signatureY + 80)
    doc.text('Date:', leftMargin + 250, signatureY + 160)
    doc.text(formattedDate, leftMargin + 250, signatureY + 180)

    // Page number
    doc.setFontSize(10)
    doc.text('5/5', pageWidth - 50, pageHeight - 20)

    // Save
    doc.save(`${name}_Net_Metering_Agreement.pdf`)
  } catch (error) {
    console.error('Error generating Net Metering PDF:', error)
    alert('Error generating PDF. Please check the console for details.')
  }
}
