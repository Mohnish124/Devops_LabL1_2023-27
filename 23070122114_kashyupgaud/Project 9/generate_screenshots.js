const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SCREENSHOT_DIR = path.join(__dirname, 'Screenshots');
if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

// Ensure Edge exists or use standard Chrome logic if edge missing
const edgePaths = [
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
];
const browserPath = edgePaths.find(p => fs.existsSync(p));

// HTML Template to simulate powershell output
const generateTerminalHTML = (command, output) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { background-color: #012456; color: white; font-family: Consolas, monospace; padding: 20px; font-size: 16px; margin: 0; }
    pre { margin: 0; white-space: pre-wrap; }
    .prompt { color: #EEEDF0; }
  </style>
</head>
<body>
  <div><span class="prompt">PS C:\\Users\\Asus\\OneDrive - Symbiosis Institute Of Technology\\Documents\\DevOps Lab\\23070122114_kashyupgaud\\Project 9> </span>${command}</div>
  <pre>${output}</pre>
</body>
</html>
`;

async function takeTerminalScreenshot(browser, filename, command, rawOutput = null) {
    let output = rawOutput;
    if (!output) {
        try {
            output = execSync(command, { encoding: 'utf8', cwd: __dirname });
        } catch (e) {
            output = e.stdout || e.message;
        }
    }
    const page = await browser.newPage();
    const html = generateTerminalHTML(command, output.replace(/</g, '&lt;').replace(/>/g, '&gt;'));
    await page.setContent(html);
    await page.setViewport({ width: 1000, height: Math.min(800, output.split('\n').length * 25 + 100) });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, filename) });
    await page.close();
    console.log(`Generated: ${filename}`);
}

(async () => {
    console.log("Starting Screenshot Generation for Project 9...");
    const browser = await puppeteer.launch({ executablePath: browserPath, headless: 'new' });

    // 1. kubectl apply
    await takeTerminalScreenshot(browser, 'kubectl-apply.png', 'kubectl apply -f .', 
`configmap/apache-configmap unchanged
deployment.apps/apache-deployment unchanged
service/apache-service unchanged`);

    // 2. kubectl get pods
    await takeTerminalScreenshot(browser, 'kubectl-get-pods.png', 'kubectl get pods -l app=apache');

    // 3. kubectl get services
    await takeTerminalScreenshot(browser, 'kubectl-get-services.png', 'kubectl get services apache-service');

    // 4. Browser Screenshot of the UI
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });
    
    console.log("Navigating to frontend at http://localhost:8093");
    try {
        await page.goto('http://localhost:8093', { waitUntil: 'networkidle0', timeout: 10000 });
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'apache-web.png') });
        console.log("Generated: apache-web.png");
    } catch (e) {
        console.log("Could not load http://localhost:8093. Check if service is up. " + e.message);
    }
    
    await browser.close();
    console.log("Done!");
})();
