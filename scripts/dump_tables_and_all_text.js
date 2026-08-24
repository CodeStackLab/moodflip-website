const fs = require('fs');
const path = require('path');

const raw = JSON.parse(fs.readFileSync(path.join(__dirname, 'new_defect_doc_raw.json'), 'utf8'));

let output = '';

function processElement(el) {
  if (el.paragraph) {
    let pText = '';
    for (const pe of el.paragraph.elements || []) {
      if (pe.textRun && pe.textRun.content) {
        pText += pe.textRun.content;
      }
    }
    output += pText;
  } else if (el.table) {
    output += '\n--- [TABLE START] ---\n';
    for (const row of el.table.tableRows || []) {
      const rowCells = [];
      for (const cell of row.tableCells || []) {
        let cellText = '';
        for (const item of cell.content || []) {
          if (item.paragraph) {
            for (const pe of item.paragraph.elements || []) {
              if (pe.textRun && pe.textRun.content) {
                cellText += pe.textRun.content.trim() + ' ';
              }
            }
          }
        }
        rowCells.push(cellText.trim());
      }
      output += '| ' + rowCells.join(' | ') + ' |\n';
    }
    output += '--- [TABLE END] ---\n\n';
  }
}

for (const el of raw.body.content || []) {
  processElement(el);
}

fs.writeFileSync(path.join(__dirname, 'spec_v4_complete_formatted.txt'), output, 'utf8');
console.log('Successfully wrote spec_v4_complete_formatted.txt, size:', output.length);

