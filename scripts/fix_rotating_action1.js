const { execSync } = require("child_process");
const https = require("https");

const SPREADSHEET_ID = "1BKkG6VF8VbhOe7P1aR75yBCm_iTaZDEXpn7JvMRdTeM";
const token = execSync('powershell -Command "$env:Path = [System.Environment]::GetEnvironmentVariable(\'Path\',\'Machine\') + \';\' + [System.Environment]::GetEnvironmentVariable(\'Path\',\'User\'); gcloud auth application-default print-access-token"').toString().trim();

function apiRequest(method, path, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const options = { hostname: "sheets.googleapis.com", path, method, headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json", ...(data ? { "Content-Length": Buffer.byteLength(data) } : {}) } };
    const req = https.request(options, res => { let raw = ""; res.on("data", c => raw += c); res.on("end", () => { if (res.statusCode >= 200 && res.statusCode < 300) { resolve(raw ? JSON.parse(raw) : {}); } else { reject(new Error("HTTP " + res.statusCode + ": " + raw)); } }); });
    req.on("error", reject);
    if (data) req.write(data);
    req.end();
  });
}

async function main() {
  // Fix Rotating Actions sheet: update action 1 for serial 1 (Scared) - remove "enough"
  const result = await apiRequest("POST", "/v4/spreadsheets/" + SPREADSHEET_ID + "/values:batchUpdate", {
    valueInputOption: "USER_ENTERED",
    data: [
      { range: "Rotating Actions!E2", values: [['Put both feet on the floor. Look around and name 5 things you can see. Say: \u201cRight now, I am safe.\u201d']] }
    ]
  });
  console.log("Updated cells:", result.totalUpdatedCells);
  
  // Now re-fetch Rotating Actions fresh
  const ra = await apiRequest("GET", "/v4/spreadsheets/" + SPREADSHEET_ID + "/values/Rotating%20Actions!A1:E300");
  const fs = require("fs");
  fs.writeFileSync("scripts/rotating_live.json", JSON.stringify(ra.values, null, 2), "utf8");
  console.log("Rotating Actions re-saved:", ra.values.length - 1, "rows");
}
main().catch(e => { console.error("ERROR:", e.message); process.exit(1); });
