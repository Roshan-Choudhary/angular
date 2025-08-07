const https = require('https');
const fs = require('fs');
const url = require('url');

const options = {
  key: fs.readFileSync('localhost.key'),
  cert: fs.readFileSync('localhost.crt')
};

https.createServer(options, (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  const code = queryObject.code;

  if (code) {
    const deeplink = `wos://deeplink?code=${code}`;

    const html = `
      <html>
        <head>
          <title>Continue to App</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              text-align: center;
              margin-top: 100px;
            }
            button {
              font-size: 18px;
              padding: 10px 20px;
              background-color: #2e86de;
              color: white;
              border: none;
              border-radius: 5px;
              cursor: pointer;
            }
            button:hover {
              background-color: #1b4f72;
            }
          </style>
        </head>
        <body>
          <h2>Authentication Successful</h2>
          <p>Click the button below to return to the app.</p>
          <button onclick="window.location.href='${deeplink}'">Continue to App</button>
        </body>
      </html>
    `;

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  } else {
    res.writeHead(400);
    res.end("No authorization code received.");
  }
}).listen(54321, () => {
  console.log("Server running at https://localhost:54321");
});

