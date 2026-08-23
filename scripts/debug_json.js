const fs = require("fs");
let content = fs.readFileSync("scripts/rotating_live.json", "utf8");
if (content.charCodeAt(0) === 0xFEFF) content = content.slice(1);
let data = JSON.parse(content);
// PowerShell ConvertTo-Json may produce object array or nested structure
console.log("isArray:", Array.isArray(data));
if (!Array.isArray(data)) {
  // Try to find the actual array
  if (data.value) data = data.value;
  else data = Object.values(data);
}
console.log("Length:", data.length);
console.log("Item0 type:", typeof data[0], Array.isArray(data[0]));
if (data[0]) console.log("Item0:", JSON.stringify(data[0]).substring(0,100));
