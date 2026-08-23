const fs = require("fs");

// Fix rotating JSON: strip BOM, normalize PowerShell format, re-save clean
let content = fs.readFileSync("scripts/rotating_live.json", "utf8");
if (content.charCodeAt(0) === 0xFEFF) content = content.slice(1); // strip BOM
let rawData = JSON.parse(content);

// Normalize: each item is {value:[...], Count:N} from PowerShell ConvertTo-Json
const normalized = rawData.map(r => r.value || (Array.isArray(r) ? r : Object.values(r)));
console.log("Rows:", normalized.length);
console.log("Header:", JSON.stringify(normalized[0]));
console.log("Row1:", JSON.stringify(normalized[1]).substring(0, 100));

// Re-save as clean array of arrays
fs.writeFileSync("scripts/rotating_live.json", JSON.stringify(normalized, null, 2), {encoding: "utf8"});
console.log("Saved clean rotating_live.json");
