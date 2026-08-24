const fs = require('fs');
const path = require('path');

const raw = JSON.parse(fs.readFileSync(path.join(__dirname, 'new_defect_doc_raw.json'), 'utf8'));

let currentHeading = 'Document Start';
let tableIndex = 0;

function getParagraphText(p) {
  let t = '';
  for (const pe of p.elements || []) {
    if (pe.textRun && pe.textRun.content) {
      t += pe.textRun.content;
    }
  }
  return t;
}

for (const item of raw.body.content || []) {
  if (item.paragraph) {
    const pText = getParagraphText(item.paragraph).trim();
    if (/^(\d+\.|\bSection\b|[A-Z][A-Za-z\s]{3,30}:)/.test(pText) && pText.length < 80) {
      currentHeading = pText;
    }
  } else if (item.table) {
    tableIndex++;
    if (tableIndex <= 5) {
      console.log(`\n======================================================`);
      console.log(`[Table ${tableIndex}] Under Heading: "${currentHeading}"`);
      console.log(`======================================================`);
      for (const row of item.table.tableRows || []) {
        const rowCells = [];
        for (const cell of row.tableCells || []) {
          let cellText = '';
          for (const cItem of cell.content || []) {
            if (cItem.paragraph) {
              cellText += getParagraphText(cItem.paragraph).trim() + ' ';
            }
          }
          rowCells.push(cellText.trim());
        }
        console.log(`Row: ${rowCells.join('  |  ')}`);
      }
    }
  }
}

