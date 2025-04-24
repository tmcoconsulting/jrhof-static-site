pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';
const url = 'program_2010.pdf';
let pdfDoc = null,
    currentPage = 1,
    totalPages = 0,
    canvas = document.getElementById('pdf-canvas'),
    ctx = canvas.getContext('2d');

function renderPage(num) {
  pdfDoc.getPage(num).then(page => {
    const scale = 1.5;
    const viewport = page.getViewport({ scale: scale });

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    let renderCtx = {
      canvasContext: ctx,
      viewport: viewport
    };
    page.render(renderCtx);
    document.getElementById('page-info').textContent = `Page ${num} of ${totalPages}`;
    document.getElementById('page-slider').value = num;
  });
}

pdfjsLib.getDocument(url).promise.then(pdf => {
  pdfDoc = pdf;
  totalPages = pdf.numPages;
  document.getElementById('page-slider').max = totalPages;
  renderPage(currentPage);
}).catch(error => {
  console.error('PDF load error:', error);
});

document.getElementById('prev').addEventListener('click', () => {
  if (currentPage > 1) renderPage(--currentPage);
});

document.getElementById('next').addEventListener('click', () => {
  if (currentPage < totalPages) renderPage(++currentPage);
});

document.getElementById('page-slider').addEventListener('input', (e) => {
  currentPage = parseInt(e.target.value);
  renderPage(currentPage);
});