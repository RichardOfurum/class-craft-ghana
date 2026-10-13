// Generates components/galleryData.ts from public/images_v3.
//
// What it does (idempotent, safe to re-run):
//   1. Converts every non-JPG image (.heic / .heif / .png) to .jpg using macOS `sips`.
//   2. Normalises uppercase .JPG -> .jpg.
//   3. Deletes the original non-JPG files after a successful conversion.
//   4. Derives clean, human-readable titles from the (balanced) filenames.
//   5. Auto-categorises each image by keyword.
//
// The brand logo ("Class Craft Ghana Logo.jpg") is intentionally EXCLUDED from
// the gallery list (it is a brand mark, not a product photo).
//
// Run with:  node scripts/build-gallery.mjs
import { readdirSync, statSync, existsSync, unlinkSync, renameSync, writeFileSync, mkdirSync } from "node:fs";
import { join, extname } from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const IMG_DIR = join(ROOT, "public", "images_v3");
const OUT_FILE = join(ROOT, "components", "galleryData.ts");
const LOGO_NAME = "Class Craft Ghana Logo.jpg";

const IMAGE_EXTS = [".jpg", ".jpeg", ".png", ".heic", ".heif"];
const lower = (s) => s.toLowerCase();
const extOf = (f) => {
  const i = f.lastIndexOf(".");
  return i === -1 ? "" : f.slice(i);
};
const isImage = (f) => IMAGE_EXTS.includes(lower(extOf(f)));

// ---------------------------------------------------------------------------
// Title cleaning — "Balanced" rule
//   * drop bracketed pure-number / decor groups:  Badge (111222) -> Badge
//   * keep meaningful words inside brackets:       Key (Chain)  -> Key (Chain)
//   * keep bare trailing numbers:                  Badge 0333   -> Badge 0333
//   * underscores -> spaces, tidy spacing, strip emoji
// ---------------------------------------------------------------------------
function cleanImageTitle(filename) {
  let name = String(filename);
  name = name.replace(/\.(jpe?g|png|heic|heif)$/i, "");
  name = name.replace(/\(([^)]*)\)/g, (_m, inner) => {
    const cleaned = inner
      .replace(/[\d_]+/g, " ")
      .replace(/[^\p{L}\p{N}\s]/gu, " ")
      .replace(/\s+/g, " ")
      .trim();
    return /\p{L}/u.test(cleaned) ? "(" + cleaned + ")" : " ";
  });
  name = name.replace(/\s*\.(heic|heif|jpe?g|png)\s*$/i, " ");
  name = name.replace(/[^\p{L}\p{N}\s()&.,'’\-\/]/gu, " ");
  name = name.replace(/_+/g, " ");
  name = name.replace(/\s+/g, " ").trim();
  name = name.replace(/\(\s+/g, "(").replace(/\s+\)/g, ")");
  name = name.replace(/\s+/g, " ").trim();
  return name || "Gallery Image";
}

// ---------------------------------------------------------------------------
// Category rules (first match wins)
// ---------------------------------------------------------------------------
const CATEGORY_RULES = [
  { category: "badges", categoryLabel: "Badges & Crests", keywords: ["badge", "crest", "brooch"] },
  { category: "uniforms", categoryLabel: "Uniforms & Wear", keywords: ["uniform", "tracksuit", "vest", "jacket", "sweater", "belt"] },
  { category: "fabrics", categoryLabel: "Fabrics & Prints", keywords: ["cloth", "denim", "woven", "anniversary"] },
  { category: "sports", categoryLabel: "Jerseys & Sports", keywords: ["jersey", "sport", "pe kit", "pe-kit", "athletic"] },
  { category: "supplies", categoryLabel: "Supplies & Branding", keywords: ["logo", "keychain", "key", "chain", "charm", "pen", "holder", "sash", "book"] },
];
const MISC = { category: "misc", categoryLabel: "Miscellaneous" };

function categorize(title) {
  const t = lower(title);
  for (const rule of CATEGORY_RULES) {
    if (rule.keywords.some((k) => t.includes(k))) {
      return { category: rule.category, categoryLabel: rule.categoryLabel };
    }
  }
  return MISC;
}

// ---------------------------------------------------------------------------
// 1) Convert / normalise non-JPG -> JPG
// ---------------------------------------------------------------------------
const files = readdirSync(IMG_DIR).filter((f) => statSync(join(IMG_DIR, f)).isFile());
const existingLower = new Map();
for (const f of files) if (!existingLower.has(lower(f))) existingLower.set(lower(f), f);

const plan = [];
for (const f of files) {
  const ext = extOf(f);
  const el = lower(ext);
  if (!IMAGE_EXTS.includes(el)) continue;
  if (el === ".jpg" && f.endsWith(".jpg")) continue; // already good
  const base = f.slice(0, f.length - ext.length);
  plan.push({ f, el, base, target: base + ".jpg" });
}

const seenTargets = new Map();
for (const { f, target } of plan) {
  const tl = lower(target);
  const clash = seenTargets.get(tl);
  if (clash && clash !== f) throw new Error("Conversion collision: " + f + " and " + clash + " both -> " + target);
  const existing = existingLower.get(tl);
  if (existing && existing !== f) throw new Error("Conversion collision: " + f + " -> " + target + " already exists as " + existing);
  seenTargets.set(tl, f);
}

for (const { f, el, target } of plan) {
  const src = join(IMG_DIR, f);
  const dst = join(IMG_DIR, target);
  if (el === ".jpg" || el === ".jpeg") {
    const tmp = dst + ".__rename__";
    renameSync(src, tmp);
    renameSync(tmp, dst);
    console.log("normalised: " + f + " -> " + target);
  } else {
    execFileSync("sips", ["-s", "format", "jpeg", src, "--out", dst], { stdio: "ignore" });
    if (!existsSync(dst)) throw new Error("sips failed to convert " + f);
    unlinkSync(src);
    console.log("converted:   " + f + " -> " + target);
  }
}


// ---------------------------------------------------------------------------
// 2) Generate gallery data
// ---------------------------------------------------------------------------
const finalFiles = readdirSync(IMG_DIR)
  .filter((f) => statSync(join(IMG_DIR, f)).isFile())
  .filter(isImage)
  .filter((f) => f !== LOGO_NAME);

const items = finalFiles
  .map((f) => {
    const title = cleanImageTitle(f);
    const { category, categoryLabel } = categorize(title);
    return { file: f, title, category, categoryLabel };
  })
  .sort((a, b) => a.title.localeCompare(b.title) || a.file.localeCompare(b.file));

const counts = {};
for (const it of items) counts[it.category] = (counts[it.category] || 0) + 1;

const tsItems = items
  .map((it, i) => {
    const src = encodeURI("/images_v3/" + it.file);
    return (
      "\t{ id: " + (i + 1) + ", src: " + JSON.stringify(src) + ", title: " + JSON.stringify(it.title) +
      ", category: " + JSON.stringify(it.category) + ", categoryLabel: " + JSON.stringify(it.categoryLabel) +
      ", tag: " + JSON.stringify(it.title) + " },"
    );
  })
  .join("\n");

const header =
  "// AUTO-GENERATED by scripts/build-gallery.mjs - do not edit by hand.\n" +
  "// Regenerate with:  node scripts/build-gallery.mjs\n";

const out =
  header + "\n" +
  "export type GalleryCategory =\n" +
  '\t| "fabrics"\n' +
  '\t| "uniforms"\n' +
  '\t| "badges"\n' +
  '\t| "sports"\n' +
  '\t| "supplies"\n' +
  '\t| "misc";\n\n' +
  "export interface GalleryItem {\n" +
  "\tid: number;\n" +
  "\tsrc: string;\n" +
  "\ttitle: string;\n" +
  "\tcategory: GalleryCategory;\n" +
  "\tcategoryLabel: string;\n" +
  "\ttag: string;\n" +
  "}\n\n" +
  "export const GALLERY_ITEMS: GalleryItem[] = [\n" +
  tsItems + "\n" +
  "];\n";

mkdirSync(join(ROOT, "components"), { recursive: true });
writeFileSync(OUT_FILE, out, "utf8");

// ---------------------------------------------------------------------------
// 3) Homepage picks (labels derived with the SAME cleaner)
// ---------------------------------------------------------------------------
const HOMEPAGE_PICKS = {
  hero: ["Anniversary Cloth.jpg", "Ceremonial Uniforms (01100).jpg", "Badges (22).jpg"],
  featureCards: ["Tracksuits (555).jpg", "School Uniforms_.jpg", "Cloth (68).jpg", "Crest (100).jpg"],
  fabricTiles: ["School Cloth (_5).jpg", "Anniversary Cloth(009999).jpg", "Ceremonial Cloth (02223).jpg", "Denim Customization .jpg"],
  products: ["Woven .jpg", "Vest (0008).jpg", "Jackets (909777).jpg", "Badges (777).jpg", "Ceremonial Cloth (000887).jpg", "Custom pens (3).jpg"],
  recommended: ["Custom Badge_LG.jpg", "Brooches (000008).jpg", "Woven Crest .jpg", "Keychain (00889).jpg", "Charms Bag LoGo_.jpg", "Holders (0444)_.jpg", "Custom Sweaters (55000).jpg", "Belt (00777).jpg"],
  kvBand: "Ceremonial cloth_.jpg",
};

console.log("\n=== HOMEPAGE LABELS (copy into app/page.tsx) ===");
console.log("logo:", JSON.stringify(LOGO_NAME));
for (const [key, val] of Object.entries(HOMEPAGE_PICKS)) {
  const arr = Array.isArray(val) ? val : [val];
  console.log("\n" + key + ":");
  for (const file of arr) {
    console.log("  " + file + '  ->  src="' + encodeURI("/images_v3/" + file) + '"  label="' + cleanImageTitle(file) + '"');
  }
}

console.log("\n=== SUMMARY ===");
console.log("gallery items: " + items.length);
console.log("category counts:", counts);
const misc = items.filter((i) => i.category === "misc").map((i) => i.title);
console.log("misc items (" + misc.length + "):", misc);

