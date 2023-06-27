// Add an event listener to the button
/*const generatePdfButton = document.getElementById('generate-pdf-btn');
generatePdfButton.addEventListener('click', () => {
  // Make an AJAX request to the Express route that generates the PDF
  fetch('/generate-pdf', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.blob())
    .then(blob => {
      // Create a download link for the generated PDF
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'output.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    })
    .catch(error => {
      console.error('Error generating PDF:', error);
      // Handle error condition, e.g., show an error message to the user
    });
});*/