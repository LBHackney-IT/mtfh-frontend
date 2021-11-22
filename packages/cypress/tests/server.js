const path = require("path");

const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/import-map.json", (req, res) => {
  res.status(200);
  res.json({
    imports: {
      "@test/project": "http://localhost:3000/index.js",
    },
  });
});

app.get("/test/api/dev/configuration", (req, res) => {
  console.log(req.url);
  res.status(200);
  res.json([
    {
      type: "test",
      featureToggles: {
        feature: true,
      },
    },
  ]);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
