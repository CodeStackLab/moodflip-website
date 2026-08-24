const fs = require('fs');
const path = require('path');

const text = fs.readFileSync(path.join(__dirname, 'new_defect_doc_text.txt'), 'utf8');

function printSection(title, startMatch, endMatch) {
  console.log(`\n========================================\n=== SECTION: ${title} ===\n========================================`);
  const startIndex = text.indexOf(startMatch);
  if (startIndex === -1) {
    console.log(`Start match "${startMatch}" not found.`);
    return;
  }
  let endIndex = text.length;
  if (endMatch) {
    const endPos = text.indexOf(endMatch, startIndex + startMatch.length);
    if (endPos !== -1) endIndex = endPos;
  }
  console.log(text.substring(startIndex, endIndex).trim());
}

printSection('9. Paid Products and Monetisation', '9. Paid Products and Monetisation', '10. User Profiles');
printSection('10. User Profiles, Email Capture and Data Storage', '10. User Profiles, Email Capture and Data Storage', '11. Privacy, Consent');
printSection('11. Privacy, Consent and Automatic Deletion', '11. Privacy, Consent and Automatic Deletion', '12. SEO');
printSection('16. Design Direction, and  Animation and Popup Messages', '16. Design Direction, and  Animation and Popup Messages', '17. Ownership');
printSection('8. Rotating 60-Second Actions', '8. Rotating 60-Second Actions', '9. Paid Products');
printSection('19. Developer Offer Review and Required Clarifications', '19. Developer Offer Review and Required Clarifications', '20. Migration');

