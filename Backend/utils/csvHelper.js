/**
 * Simple utility to convert JSON array to CSV string
 * @param {Array} data - Array of objects
 * @param {Array} fields - Array of field definitions { label: string, path: string }
 * @returns {string} - CSV formatted string
 */
const jsonToCsv = (data, fields) => {
  const header = fields.map(f => `"${f.label.replace(/"/g, '""')}"`).join(',');
  
  const rows = data.map(item => {
    return fields.map(f => {
      // Handle nested paths like 'scores.total'
      const value = f.path.split('.').reduce((obj, key) => obj && obj[key], item);
      const stringValue = value !== undefined && value !== null ? String(value) : '';
      return `"${stringValue.replace(/"/g, '""')}"`;
    }).join(',');
  });

  return [header, ...rows].join('\n');
};

module.exports = { jsonToCsv };
