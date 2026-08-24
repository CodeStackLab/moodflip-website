const fs = require('fs');
const path = require('path');

const text = fs.readFileSync(path.join(__dirname, 'spec_v4_complete_formatted.txt'), 'utf8');

function getSnippet(headerName, endHeaderName) {
  console.log(`\n======================================================\n=== ${headerName} ===\n======================================================`);
  const pos = text.indexOf(headerName);
  if (pos === -1) return console.log('NOT FOUND');
  let endPos = text.length;
  if (endHeaderName) {
    const nextPos = text.indexOf(endHeaderName, pos + headerName.length);
    if (nextPos !== -1) endPos = nextPos;
  }
  console.log(text.substring(pos, endPos).trim());
}

getSnippet('9. Paid Products and Monetisation', '10. User Profiles, Email Capture and Data Storage');
getSnippet('10. User Profiles, Email Capture and Data Storage', '11. Privacy, Consent and Automatic Deletion');
getSnippet('11. Privacy, Consent and Automatic Deletion', '12. SEO, Google Setup and Traffic Growth');
getSnippet('16. Design Direction, and  Animation and Popup Messages', '17. Ownership, Handover and Intellectual Property');
getSnippet('19. Developer Offer Review and Required Clarifications', '20. Migration');

