/**
 * highlight_extra_drive_docs.js
 * Highlights all items in:
 * 1. MoodFlip_Defect_List_vs_Business_Spec_14AUG26 (1) (1BHU_upu1sMrHS0X06Hd_vNG1-giAtY8OUAA46M-5uYU)
 * 2. Colour_Codes_ChatGPT (1) (1r1rUCnaYjxmiXAD0I2G9Yl468yLsPtFuUuOPhHY14dc)
 */

const { execSync } = require('child_process');
const https = require('https');

const DEFECT_DOC_ID = '1BHU_upu1sMrHS0X06Hd_vNG1-giAtY8OUAA46M-5uYU';
const COLOR_DOC_ID = '1r1rUCnaYjxmiXAD0I2G9Yl468yLsPtFuUuOPhHY14dc';
const YELLOW = { red: 1, green: 1, blue: 0 };

function getToken() {
  return execSync('powershell -Command "gcloud auth application-default print-access-token"').toString().trim();
}

function apiRequest(hostname, method, path, body, token) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const req = https.request({
      hostname, path, method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {})
      }
    }, res => {
      let raw = '';
      res.on('data', c => raw += c);
      res.on('end', () => {
        if (res.statusCode === 204) return resolve({});
        try {
          const parsed = JSON.parse(raw);
          if (res.statusCode >= 200 && res.statusCode < 300) return resolve(parsed);
          reject(new Error(`HTTP ${res.statusCode}: ${JSON.stringify(parsed).substring(0, 300)}`));
        } catch (e) {
          reject(new Error(`HTTP ${res.statusCode}: ${raw.substring(0, 300)}`));
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function highlightDocTable(docId, docTitle, token) {
  console.log(`\n=============================================`);
  console.log(`🎨 Processing Table in: "${docTitle}" (${docId})`);
  console.log(`=============================================`);

  const doc = await apiRequest('docs.googleapis.com', 'GET', `/v1/documents/${docId}`, null, token);
  const requests = [];

  for (const el of doc.body.content || []) {
    if (el.table) {
      console.log(`Found table with ${el.table.rows} rows.`);
      
      for (let r = 0; r < el.table.tableRows.length; r++) {
        const row = el.table.tableRows[r];
        for (const cell of row.tableCells) {
          for (const cEl of cell.content || []) {
            if (cEl.paragraph) {
              for (const pe of cEl.paragraph.elements || []) {
                if (pe.textRun && pe.textRun.content && pe.textRun.content.trim().length > 0) {
                  requests.push({
                    updateTextStyle: {
                      range: {
                        startIndex: pe.startIndex,
                        endIndex: pe.endIndex
                      },
                      textStyle: {
                        backgroundColor: { color: { rgbColor: YELLOW } }
                      },
                      fields: 'backgroundColor'
                    }
                  });
                }
              }
            }
          }
        }
      }

      requests.push({
        updateTableCellStyle: {
          tableRange: {
            tableCellLocation: {
              tableStartLocation: { index: el.startIndex },
              rowIndex: 0,
              columnIndex: 0
            },
            rowSpan: el.table.rows,
            columnSpan: el.table.tableRows[0].tableCells.length
          },
          tableCellStyle: {
            backgroundColor: { color: { rgbColor: YELLOW } }
          },
          fields: 'backgroundColor'
        }
      });
    }
  }

  console.log(`Generated ${requests.length} styling requests for "${docTitle}".`);

  for (let i = 0; i < requests.length; i += 50) {
    const chunk = requests.slice(i, i + 50);
    await apiRequest(
      'docs.googleapis.com', 'POST',
      `/v1/documents/${docId}:batchUpdate`,
      { requests: chunk },
      token
    );
  }

  console.log(`✅ Table in "${docTitle}" fully styled in Yellow!`);
}

async function main() {
  const token = getToken();
  console.log('✅ Token obtained');

  await highlightDocTable(DEFECT_DOC_ID, 'MoodFlip_Defect_List_vs_Business_Spec_14AUG26 (1)', token);
  await highlightDocTable(COLOR_DOC_ID, 'Colour_Codes_ChatGPT (1)', token);

  console.log('\n=============================================');
  console.log('🎉 All extra/backup Google Docs highlighted in Yellow!');
  console.log('=============================================\n');
}

main().catch(e => {
  console.error('❌ Error:', e.message);
  process.exit(1);
});
