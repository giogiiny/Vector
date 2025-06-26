import React from 'react';

const DownloadButton: React.FC = () => {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = '/downloads/relatorio.pdf';
        link.download = 'relatorio.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <button
        onClick={handleDownload}
        className='bg-blue-500'> oieeeer</button>
    );
};

export default DownloadButton;