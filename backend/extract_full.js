const fs = require('fs');
const lines = fs.readFileSync('C:/Users/C-131/.gemini/antigravity/brain/9c48f233-6db7-4aa8-bfc6-d1d2ed9e5053/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');

let bestMatch = null;
let maxLen = 0;

lines.forEach(l => {
  if (!l) return;
  try {
    const obj = JSON.parse(l);
    if (obj.content && typeof obj.content === 'string') {
      if (obj.content.includes('"b2bHero"') && obj.content.includes('"ourLegacy"')) {
        // Try to find the JSON object starting with { and ending with }
        const start = obj.content.indexOf('{');
        const end = obj.content.lastIndexOf('}');
        if (start !== -1 && end !== -1) {
          const jsonStr = obj.content.substring(start, end + 1);
          try {
            const parsed = JSON.parse(jsonStr);
            // Verify it has the sections
            if (parsed.b2bHero && parsed.ourLegacy && jsonStr.length > maxLen) {
              bestMatch = parsed;
              maxLen = jsonStr.length;
            }
          } catch (e) {}
        }
      }
    }
  } catch (e) {}
});

if (bestMatch) {
  fs.writeFileSync('restored_everything.json', JSON.stringify(bestMatch, null, 2));
  console.log('Found full DB state! Length:', maxLen);
} else {
  console.log('Could not find full DB state.');
}
