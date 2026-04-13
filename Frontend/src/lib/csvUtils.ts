/**
 * Converts JSON data to CSV and triggers a browser download
 * @param data Array of objects to export
 * @param filename Name of the file to download
 */
export function exportToCSV(data: any[], filename: string = "export.csv") {
  if (data.length === 0) return;

  // Header keys (flattened paths if needed, but we'll manually define them for clarity)
  const headers = [
    "Name",
    "Email",
    "Phone",
    "City",
    "Country",
    "Education",
    "Domain",
    "Target Role",
    "QPI Score",
    "Date"
  ];

  // Map data to rows
  const csvRows = [
    headers.join(","), // Header row
    ...data.map(item => {
      const row = [
        item.name || "N/A",
        item.email || "N/S",
        item.phone || "N/A",
        item.city || "N/A",
        item.country || "N/A",
        item.educationLevel || "N/A",
        item.careerDomain || item.domain || "N/A",
        item.careerRole || "N/A",
        item.scores?.qpi || 0,
        item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "N/A"
      ];
      // Escape commas and quotes for CSV safety
      return row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(",");
    })
  ].join("\n");

  // Create blob and download link
  const blob = new Blob([csvRows], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
