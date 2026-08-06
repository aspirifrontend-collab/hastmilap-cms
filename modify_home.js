const fs = require('fs');
const path = require('path');

const homePath = path.join(__dirname, 'frontend/src/components/Home.jsx');
let content = fs.readFileSync(homePath, 'utf8');

// 1. Add imports
content = content.replace("import api from '../api';", "import api from '../api';\\nimport Header from './Header';\\nimport Footer from './Footer';");

// 2. Remove header scroll logic
content = content.replace(/\\/\\/ Header scroll[\\s\\S]*?window\\.addEventListener\\('scroll', handleScroll\\);\\s*}/g, '');

// 3. Replace <header>...</header> with <Header content={content} />
content = content.replace(/<header className="header">[\\s\\S]*?<\\/header>/, '<Header content={content} />');

// 4. Replace <footer className="site-footer">...</footer> with <Footer content={content} />
content = content.replace(/<footer className="site-footer">[\\s\\S]*?<\\/footer>/, '<Footer content={content} />');

fs.writeFileSync(homePath, content);
console.log('Modified Home.jsx successfully.');
