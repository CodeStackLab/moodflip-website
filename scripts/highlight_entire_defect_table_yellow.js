/**
 * highlight_entire_defect_table_yellow.js
 * Applies complete solid yellow highlight (both cell background and text highlight)
 * to all rows (Rows 1 to 48) of the defect table in both Google Docs.
 */

const { execSync } = require('child_process');
const https = require('https');

const DOC_ID_1 = '12vozTZ8n1sO2GOG1R3MSrnQ6klte5ByFm6SrXGdFxCg';
const DOC_ID_2 = '1G01r_TJjjtPNvClHsBH4tMAXJJWou16r1X6WPgtTtik';
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
      
      // 1. Highlight all text runs in rows 1..end
      for (let r = 1; r < el.table.tableRows.length; r++) {
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

      // 2. Highlight table cell background for all rows 1..end
      requests.push({
        updateTableCellStyle: {
          tableRange: {
            tableCellLocation: {
              tableStartLocation: { index: el.startIndex },
              rowIndex: 1,
              columnIndex: 0
            },
            rowSpan: el.table.rows - 1,
            columnSpan: 4
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

  // Batch execute in chunks of 50 requests
  for (let i = 0; i < requests.length; i += 50) {
    const chunk = requests.slice(i, i + 50);
    await apiRequest(
      'docs.googleapis.com', 'POST',
      `/v1/documents/${docId}:batchUpdate`,
      { requests: chunk },
      token
    );
  }

  console.log(`✅ Entire Defect Table in "${docTitle}" fully styled in Yellow!`);
}

async function main() {
  const token = getToken();
  console.log('✅ Token obtained');

  await highlightDocTable(DOC_ID_1, 'MoodFlip_Defect_List_vs_Business_Spec_14AUG26 (2)', token);
  await highlightDocTable(DOC_ID_2, 'MoodFlip_Defect_List_vs_Business_Spec_14AUG26(14 Aug, 1336)', token);

  console.log('\n=============================================');
  console.log('🎉 All Defect Tables in Google Docs completely highlighted in solid Yellow!');
  console.log('=============================================\n');
}

main().catch(e => {
  console.error('❌ Error:', e.message);
  process.exit(1);
});
