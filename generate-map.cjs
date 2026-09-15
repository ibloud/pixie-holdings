const fs = require('fs');

const USERNAME = 'ibloud';
const OUTPUT_PATH = './public/generated-radar.html';

async function generateGTAMap() {
  console.log(`Fetching repositories for ${USERNAME}...`);
  try {
    const response = await fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100`);
    const repos = await response.json();

    if (!Array.isArray(repos)) {
      console.error('API Error or user not found:', repos);
      return;
    }

    const repoNodes = repos.map((repo, index) => {
      const angle = (index / repos.length) * 2 * Math.PI;
      const radius = 140 + (index % 3) * 45;
      const x = Math.round(400 + radius * Math.cos(angle));
      const y = Math.round(300 + radius * Math.sin(angle));

      return {
        name: repo.name,
        url: repo.html_url,
        language: repo.language || 'DATA',
        x,
        y
      };
    });

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LOPTR LABS // GENERATED RADAR SITEMAP</title>
  <style>
    body { background: #080a0f; color: #00ff66; font-family: monospace; margin: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; overflow: auto; }
    h2 { letter-spacing: 3px; margin-bottom: 10px; text-shadow: 0 0 8px #00ff66; }
    #radar-container { position: relative; width: 800px; height: 600px; border: 2px solid #00ff66; border-radius: 50%; background: radial-gradient(circle, #0f172a 0%, #020617 100%); box-shadow: 0 0 25px rgba(0,255,102,0.2); }
    .node { position: absolute; width: 10px; height: 10px; background: #00ff66; border-radius: 2px; transform: translate(-50%, -50%); cursor: pointer; box-shadow: 0 0 8px #00ff66; transition: all 0.2s; }
    .node:hover { transform: translate(-50%, -50%) scale(2); background: #ffffff; box-shadow: 0 0 15px #ffffff; }
    .label { position: absolute; font-size: 10px; color: #a7f3d0; pointer-events: none; white-space: nowrap; transform: translate(12px, -6px); text-shadow: 0 0 4px #000; }
    #center-hub { position: absolute; top: 50%; left: 50%; width: 16px; height: 16px; background: #ff0055; border-radius: 50%; transform: translate(-50%, -50%); box-shadow: 0 0 15px #ff0055; }
  </style>
</head>
<body>
  <h2>SYS_RADAR // GENERATED REPOSITORY MAP</h2>
  <div id="radar-container">
    <div id="center-hub" title="Downtown HQ"></div>
    ${repoNodes.map(node => `
      <a href="${node.url}" target="_blank" rel="noopener noreferrer">
        <div class="node" style="left: ${node.x}px; top: ${node.y}px;" title="${node.name}">
          <span class="label">${node.name}</span>
        </div>
      </a>
    `).join('')}
  </div>
</body>
</html>`;

    if (!fs.existsSync('./public')) {
      fs.mkdirSync('./public', { recursive: true });
    }

    fs.writeFileSync(OUTPUT_PATH, htmlContent);
    console.log(`✅ Generated repository radar at ${OUTPUT_PATH}`);
    console.log('ℹ️ public/radar.html remains the PIXIE OS wrapper and is not overwritten.');
  } catch (err) {
    console.error('Execution error:', err);
    process.exitCode = 1;
  }
}

generateGTAMap();
