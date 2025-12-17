#!/usr/bin/env node

import fs from "fs";
import path from "path";

const variants = [
  { id: "vitesse-dark", bg: "#121212", fg: "#eee" },
  { id: "vitesse-light", bg: "#FFFFFF", fg: "#333" }
];

const ICONS_DIR = path.resolve("icons");
const OUT_DIR = path.resolve("previews");

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR);
}

for (const variant of variants) {
  const iconsPath = path.join(ICONS_DIR, variant.id, "icons");

  if (!fs.existsSync(iconsPath)) {
    console.warn(`⚠️ Pasta não encontrada: ${iconsPath}`);
    continue;
  }

  const icons = fs
    .readdirSync(iconsPath)
    .filter(f => f.endsWith(".svg"))
    .sort();

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>${variant.id} – Icon Preview</title>
<style>
  body {
    margin: 0;
    padding: 32px;
    background: ${variant.bg};
    color: ${variant.fg};
    font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  }

  h1 {
    margin-bottom: 24px;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
  }

  .grid {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
  }

  .item {
    padding: 16px;
  }

  .item img {
    width: 32px;
    height: 32px;
    display: block;
  }
</style>
</head>
<body>
<h1>${variant.id}</h1>
<div class="grid">
  ${icons
    .map(
      icon => `
    <div class="item">
      <img src="../icons/${variant.id}/icons/${icon}" />
    </div>`
    )
    .join("")}
</div>
</body>
</html>
`;

  const outFile = path.join(OUT_DIR, `${variant.id}.html`);
  fs.writeFileSync(outFile, html.trim());
  console.log(`✅ Preview gerado: ${outFile}`);
}

console.log("✨ Tudo pronto! Abra os HTMLs e faça os screenshots.");

