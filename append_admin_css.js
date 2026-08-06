const fs = require('fs');

const adminCssFile = 'C:/Users/C-131/.gemini/antigravity/scratch/hastmilap-cms/frontend/src/components/Admin.css';
let css = fs.readFileSync(adminCssFile, 'utf-8');

const newStyles = `
/* Sub-menu styles */
.nav-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
}

.group-toggle {
  justify-content: space-between;
}

.chevron-icon {
  margin-left: auto;
  font-size: 0.8rem;
  transition: transform 0.3s ease;
}

.sub-menu {
  display: flex;
  flex-direction: column;
  padding-left: 2.5rem;
  margin-top: 0.2rem;
  gap: 0.2rem;
  border-left: 2px solid #e2e8f0;
  margin-left: 1.25rem;
}

.sub-item {
  padding: 0.6rem 1rem !important;
  font-size: 0.9rem !important;
  border-radius: 6px !important;
  color: #64748b;
}

.sub-item.active {
  background: #f1f5f9;
  color: #3b82f6;
  font-weight: 600;
}
`;

if (!css.includes('.sub-menu')) {
  fs.appendFileSync(adminCssFile, '\\n' + newStyles);
  console.log('Appended sub-menu styles');
} else {
  console.log('Styles already exist');
}
