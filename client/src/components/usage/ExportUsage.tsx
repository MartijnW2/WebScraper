import React from 'react';
import './ExportUsage.scss';

const ExportUsageButton: React.FC = () => {
  const handleExport = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/export-usage-csv');

      if (!response.ok) {
        throw new Error('Failed to fetch CSV');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'usage.xlsx';
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting usage data:', error);
      alert('Failed to export usage data.');
    }
  };

  return (
    <button className='exportUsageButton' onClick={handleExport} data-testid="export-usage-button">
      Export Usage Data
    </button>
  );
};

export default ExportUsageButton;
