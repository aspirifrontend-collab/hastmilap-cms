const fs = require('fs');

const srcFile = 'C:/Users/C-131/Downloads/deploy-6a071c612bee490b2885da32/index.html';
const htmlContent = fs.readFileSync(srcFile, 'utf-8');

// Extract Body
const bodyRegex = /<body>([\s\S]*?)<script>/i;
let bodyMatch = htmlContent.match(bodyRegex);
if (bodyMatch) {
  let jsx = bodyMatch[1];
  
  // Basic HTML to JSX conversions
  jsx = jsx.replace(/class=/g, 'className=');
  jsx = jsx.replace(/style="([^"]*)"/g, (match, p1) => {
    // Basic inline style conversion
    const styleObj = p1.split(';').filter(Boolean).map(s => {
      const parts = s.split(':');
      if (parts.length === 2) {
        const key = parts[0].trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
        let val = parts[1].trim();
        // Handle CSS variables in style if any
        if (key.startsWith('--')) {
           return `'${key}': "${val}"`;
        }
        return `${key}: "${val}"`;
      }
      return '';
    }).filter(Boolean).join(', ');
    return `style={{ ${styleObj} }}`;
  });
  
  // Close some self-closing tags
  jsx = jsx.replace(/<img(.*?)>/g, (m, p1) => {
    if (p1.endsWith('/')) return m;
    return `<img${p1} />`;
  });
  jsx = jsx.replace(/<br>/g, '<br />');
  jsx = jsx.replace(/<hr(.*?)>/g, (m, p1) => {
    if (p1.endsWith('/')) return m;
    return `<hr${p1} />`;
  });
  jsx = jsx.replace(/<source(.*?)>/g, (m, p1) => {
    if (p1.endsWith('/')) return m;
    return `<source${p1} />`;
  });

  // SVG attributes fix
  jsx = jsx.replace(/stroke-width/g, 'strokeWidth');
  jsx = jsx.replace(/stroke-linecap/g, 'strokeLinecap');
  jsx = jsx.replace(/stroke-linejoin/g, 'strokeLinejoin');
  jsx = jsx.replace(/fill-rule/g, 'fillRule');
  jsx = jsx.replace(/clip-rule/g, 'clipRule');
  jsx = jsx.replace(/clip-path/g, 'clipPath');

  // Comments
  jsx = jsx.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');

  // Input elements
  jsx = jsx.replace(/<input(.*?)>/g, (m, p1) => {
    if (p1.endsWith('/')) return m;
    return `<input${p1} />`;
  });

  const componentStr = `
import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Home() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    api.get('/content').then(res => setContent(res.data)).catch(console.error);
  }, []);

  return (
    <>
      ${jsx}
    </>
  );
}
`;
  
  fs.writeFileSync('C:/Users/C-131/.gemini/antigravity/scratch/hastmilap-cms/frontend/src/components/Home.jsx', componentStr);
  console.log('Home.jsx regenerated');
}
