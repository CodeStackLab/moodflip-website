const fs = require('fs');
const path = require('path');

const raw = JSON.parse(fs.readFileSync(path.join(__dirname, 'new_defect_doc_raw.json'), 'utf8'));

let currentHeading = 'Document Start';
const sections = [];

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
    const tableData = [];
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
      tableData.push(rowCells);
    }
    sections.push({
      heading: currentHeading,
      table: tableData
    });
  }
}

console.log(`Found ${sections.length} tables in the document:`);
sections.forEach((s, idx) => {
  console.log(`\n======================================================`);
  console.log(`[Table ${idx + 1}] Under Heading: "${s.heading}" (${s.table.length} rows)`);
  console.log(`======================================================`);
  s.table.forEach((row, rIdx) => {
    console.log(`Row ${rIdx + 1}: ${row.join('  |  ')}`);
  });
});

