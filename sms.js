// SMS Template & Modal Functions
window.buildMessageFromTemplate = function(templateName, vars) {
  switch ((templateName || '').toString()) {
    case 'quote_sent':
      return `Hi ${vars.clientName || 'Customer'}, your quote is ready!\nView: ${vars.quoteUrl || ''}\n- ${vars.vendorName || 'Company'} (${vars.vendorNumber || ''})`;
    case 'quote_reminder':
      return `Hi ${vars.clientName || 'Customer'},\nQuote expires soon – view: ${vars.quoteUrl || ''}\n- ${vars.vendorName || 'Company'} (${vars.vendorNumber || ''})`;
    case 'service_scheduled':
      return `Hi ${vars.clientName || 'Customer'}, service booked for ${vars.dateTime || 'TBA'}.\nChanges? Call ${vars.vendorNumber || ''}\n- ${vars.vendorName || 'Company'}`;
    case 'service_cancelled':
      return `Hi ${vars.clientName || 'Customer'}, today's service cancelled.\nQuestions? Call ${vars.vendorNumber || ''}\n- ${vars.vendorName || 'Company'}`;
    case 'invoice_sent':
      return `Hi ${vars.clientName || 'Customer'}, invoice ${vars.amount || ''} sent.\nView & pay: ${vars.invoiceUrl || ''}\n- ${vars.vendorName || 'Company'} (${vars.vendorNumber || ''})`;
    case 'invoice_reminder':
      return `Hi ${vars.clientName || 'Customer'}, invoice due ${vars.dueDate || 'soon'}.\nPay here: ${vars.invoiceUrl || ''}\n- ${vars.vendorName || 'Company'} (${vars.vendorNumber || ''})`;
    default:
      return vars && vars.message ? vars.message : '';
  }
};

window.showSmsModal = function(clientName, phone, message, logPayload) {
  const phoneClean = (phone || '').toString().replace(/[^+0-9]/g, '');
  if (!phoneClean) {
    alert('No phone number available');
    return;
  }
  
  const finalMsg = message || '';
  
  // Try to log activity to backend (non-blocking)
  try {
    if (window.WORKER_URL && logPayload) {
      fetch(`${window.WORKER_URL}/api/sms-log`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipient: phoneClean, message: finalMsg, meta: logPayload || {} })
      }).catch(() => {});
    }
  } catch (e) {}

  // Open SMS link directly
  const link = `sms:${phoneClean}?body=${encodeURIComponent(finalMsg)}`;
  window.location.href = link;
};
