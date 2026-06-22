// Download a DOM element as a PDF that looks exactly like the rendered element —
// edge to edge, no page margins or browser print headers. html2pdf is loaded
// lazily (only when the user actually downloads) so it stays out of the main bundle.

/** Render `el` to an A4 PDF with zero margin and trigger a file download. */
export async function downloadElementAsPdf(el: HTMLElement, filename: string): Promise<void> {
  const html2pdf = (await import('html2pdf.js')).default;
  await html2pdf()
    .set({
      margin: 0,
      filename: filename.endsWith('.pdf') ? filename : `${filename}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    })
    .from(el)
    .save();
}
