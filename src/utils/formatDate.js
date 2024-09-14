// Utility function to format date
export function formatDate(date, format = 'MM/DD/YYYY') {
    const options = {};
    
    if (format.includes('DD')) options.day = '2-digit';
    if (format.includes('MM')) options.month = '2-digit';
    if (format.includes('YYYY')) options.year = 'numeric';
    
    return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
  }
  
  // Example usage:
  // const formattedDate = formatDate('2024-09-13', 'MM/DD/YYYY');
  // console.log(formattedDate); // Outputs: 09/13/2024
  