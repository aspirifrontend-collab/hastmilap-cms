const fs = require('fs');

const homeFile = 'C:/Users/C-131/.gemini/antigravity/scratch/hastmilap-cms/frontend/src/components/Home.jsx';
let jsx = fs.readFileSync(homeFile, 'utf-8');

// Replace the entire strengths-stats div contents for safety and completeness
const strengthsStats = `
      <div className="strengths-stats">
        <div className="stat-item reveal reveal-delay-1">
          <span className="stat-number" data-count={content?.strengths?.stat1Number || "20"} data-suffix={content?.strengths?.stat1Suffix || ""}>0</span>
          <span className="stat-label">{(content?.strengths?.stat1Label || "Years Experience").split(" ")[0]}<br />{(content?.strengths?.stat1Label || "Years Experience").substring((content?.strengths?.stat1Label || "Years Experience").indexOf(" ") + 1)}</span>
        </div>
        <div className="stat-item reveal reveal-delay-2">
          <span className="stat-number" data-count={content?.strengths?.stat2Number || "7"} data-suffix={content?.strengths?.stat2Suffix || "+"}>0</span>
          <span className="stat-label">{(content?.strengths?.stat2Label || "Exporting Countries").split(" ")[0]}<br />{(content?.strengths?.stat2Label || "Exporting Countries").substring((content?.strengths?.stat2Label || "Exporting Countries").indexOf(" ") + 1)}</span>
        </div>
        <div className="stat-item reveal reveal-delay-3">
          <span className="stat-number" data-count={content?.strengths?.stat3Number || "150"} data-suffix={content?.strengths?.stat3Suffix || " Cr+"}>0</span>
          <span className="stat-label">{(content?.strengths?.stat3Label || "Annual Turnover").split(" ")[0]}<br />{(content?.strengths?.stat3Label || "Annual Turnover").substring((content?.strengths?.stat3Label || "Annual Turnover").indexOf(" ") + 1)}</span>
        </div>
        <div className="stat-item reveal reveal-delay-4">
          <span className="stat-number" data-count={content?.strengths?.stat4Number || "2"} data-suffix={content?.strengths?.stat4Suffix || ""}>0</span>
          <span className="stat-label">{(content?.strengths?.stat4Label || "Manufacturing Facilities").split(" ")[0]}<br />{(content?.strengths?.stat4Label || "Manufacturing Facilities").substring((content?.strengths?.stat4Label || "Manufacturing Facilities").indexOf(" ") + 1)}</span>
        </div>
        <div className="stat-item reveal reveal-delay-5">
          <span className="stat-number" data-count={content?.strengths?.stat5Number || "250"} data-suffix={content?.strengths?.stat5Suffix || "+"}>0</span>
          <span className="stat-label">{(content?.strengths?.stat5Label || "Employees").split(" ")[0]}<br />{(content?.strengths?.stat5Label || "Employees").substring((content?.strengths?.stat5Label || "Employees").indexOf(" ") + 1)}</span>
        </div>
      </div>
`;

// Extract everything from <div className="strengths-stats"> up to its closing </div> which is right before </div>\n  </section>
const startIndex = jsx.indexOf('<div className="strengths-stats">');
const endIndexStr = '      </div>\n    </div>\n  </section>';
const endIndex = jsx.indexOf(endIndexStr);

if (startIndex !== -1 && endIndex !== -1) {
  jsx = jsx.substring(0, startIndex) + strengthsStats.trim() + '\n' + jsx.substring(endIndex);
  fs.writeFileSync(homeFile, jsx);
  console.log('Stats updated');
} else {
  console.log('Could not find boundaries');
}
