const fs = require('fs');
const path = require('path');
const tasksDir = 'C:/Users/C-131/.gemini/antigravity/brain/9c48f233-6db7-4aa8-bfc6-d1d2ed9e5053/.system_generated/tasks';

let foundAny = false;

const files = fs.readdirSync(tasksDir);
for (const file of files) {
  if (file.endsWith('.log')) {
    const content = fs.readFileSync(path.join(tasksDir, file), 'utf8');
    if (content.includes('"b2bHero"') && content.includes('"ourLegacy"')) {
      console.log('Found in task:', file);
      foundAny = true;
    }
  }
}

if (!foundAny) {
  console.log('Not found in any task log.');
}
