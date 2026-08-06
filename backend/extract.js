const fs = require('fs');
const lines = fs.readFileSync('C:/Users/C-131/.gemini/antigravity/brain/9c48f233-6db7-4aa8-bfc6-d1d2ed9e5053/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');

let latestContent = null;

lines.forEach(l => {
  if (!l) return;
  try {
    const obj = JSON.parse(l);
    if (obj.content && typeof obj.content === 'string') {
      // look for the object payload
      if (obj.content.includes('"cpHero"') && obj.content.includes('"cpDiscovery"')) {
        try {
          // extract the JSON object from the string
          const jsonStrMatch = obj.content.match(/\{[\s\S]*"cpHero"[\s\S]*\}/);
          if (jsonStrMatch) {
            const parsed = JSON.parse(jsonStrMatch[0]);
            if (parsed.cpHero && parsed.cpDiscovery) {
              latestContent = parsed;
            }
          }
        } catch (e) {}
      }
    }
  } catch (e) {}
});

if (latestContent) {
  fs.writeFileSync('restored_content.json', JSON.stringify(latestContent, null, 2));
  console.log('Successfully found old DB state!');
} else {
  console.log('Could not find old DB state.');
}
