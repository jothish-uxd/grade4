import fs from "fs";
import { geoConicConformal, geoPath } from "d3-geo";

const rd = (f) => JSON.parse(fs.readFileSync(f));
const prov = rd("ne50.geojson").features.filter((f) => f.properties.adm0_a3 === "CAN");
const countries = rd("ne_50m_admin_0.geojson").features.filter((f) =>
  ["USA", "GRL"].includes(f.properties.ADM0_A3)
);
const lakes = rd("ne_50m_lakes.geojson").features;
const rivers = rd("ne_50m_rivers_lake_centerlines.geojson").features;

const W = 800, H = 660;
// Fit to Canada
prov.forEach((f) => rewind(f.geometry));
const canFC = { type: "FeatureCollection", features: prov };
const proj = geoConicConformal().parallels([49, 77]).rotate([96, 0]).fitExtent([[30, 20], [W - 20, H - 20]], canFC);
const path = geoPath(proj).digits(1);

// Fix winding for d3 (spherical): Natural Earth is RFC7946-ish; d3 wants clockwise exterior. Rewind.
function rewindRing(ring, clockwise) {
  // planar signed area in lon/lat
  let a = 0;
  for (let i = 0, n = ring.length, j = n - 1; i < n; j = i++) a += (ring[i][0] - ring[j][0]) * (ring[i][1] + ring[j][1]);
  const isCW = a > 0; // in lon/lat with y up, this formula >0 means clockwise
  if (isCW !== clockwise) ring.reverse();
}
function rewind(geom) {
  const doPoly = (p) => p.forEach((r, i) => rewindRing(r, i === 0));
  if (geom.type === "Polygon") doPoly(geom.coordinates);
  else if (geom.type === "MultiPolygon") geom.coordinates.forEach(doPoly);
  return geom;
}
const P = (g) => path(g);
countries.forEach((f) => rewind(f.geometry)); lakes.forEach((f) => rewind(f.geometry));

const out = { W, H, prov: {}, neighbors: [], lakes: [], rivers: {}, regions: {}, pts: {} };
for (const f of prov) out.prov[f.properties.postal] = P(f.geometry);
for (const f of countries) out.neighbors.push(P(f.geometry));

const inBox = (b) => b && b[0] > -145 && b[2] < -50 && b[1] > 40 && b[3] < 85;
for (const f of lakes) {
  const b = f.bbox || (() => { const xs = []; const ys = []; JSON.stringify(f.geometry.coordinates).replace(/\[(-?[\d.]+),(-?[\d.]+)\]/g, (_, x, y) => { xs.push(+x); ys.push(+y); }); return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)]; })();
  if (inBox(b) && (f.properties.scalerank ?? 9) <= 4) out.lakes.push(P(f.geometry));
}
for (const f of rivers) {
  const n = f.properties.name;
  if (["Mackenzie", "Fraser", "St. Lawrence", "Yukon", "Nelson", "Saskatchewan", "North Saskatchewan", "South Saskatchewan", "Churchill", "Columbia"].includes(n)) {
    // keep only Canadian-ish part via bbox check of coords
    out.rivers[n] = (out.rivers[n] || "") + path(f.geometry);
  }
}

// Simplified physiographic regions (lon,lat) — overlays clipped to Canada's outline.
const R = {
  plains: [[-114, 47], [-114, 49], [-115, 51], [-118, 53.5], [-121, 55.5], [-123, 57], [-124.5, 59.5], [-125, 60.5], [-127, 62], [-130, 64.5], [-135, 67], [-136, 68.5], [-137.5, 70.5], [-128, 70.5], [-125, 68], [-123, 66], [-120, 64], [-117, 62.5], [-114, 61.5], [-112.5, 60], [-111, 58.5], [-108, 57], [-104, 55.5], [-101, 54.6], [-98, 53.5], [-96.5, 51], [-95.5, 49], [-95.5, 47]],
  cordillera: [[-114, 47], [-114, 49], [-115, 51], [-118, 53.5], [-121, 55.5], [-123, 57], [-124.5, 59.5], [-125, 60.5], [-127, 62], [-130, 64.5], [-135, 67], [-136, 68.5], [-137.5, 70.5], [-150, 71], [-150, 47]],
  hbl: [[-95.5, 60], [-94.5, 57.5], [-92, 55.5], [-89, 53], [-86, 51.5], [-83, 50.5], [-80.8, 50.2], [-78.8, 51.2], [-78.8, 54], [-82, 56.5], [-88, 58.5], [-94, 61]],
  lowlands: [[-84, 41], [-82.6, 45.6], [-80.5, 45], [-79, 44.8], [-77, 44.6], [-76, 44.4], [-75, 45.4], [-73.5, 46], [-72, 46.7], [-70.8, 47.2], [-70.2, 47.1], [-71.5, 46.3], [-72.5, 45.6], [-73.5, 45], [-74.5, 44.9], [-79, 43], [-83, 41]],
  appalachian: [[-74, 44.5], [-73.3, 45.1], [-72.5, 45.6], [-71.5, 46.3], [-70.5, 47.1], [-69, 48.2], [-67, 49.2], [-64.5, 49.3], [-62, 50.0], [-59.2, 50.4], [-57.3, 51.3], [-55.9, 51.75], [-53, 52.6], [-48, 52.6], [-48, 42], [-74, 42]],
  arctic: [[-126, 71], [-120, 69.6], [-110, 69.2], [-104, 68.3], [-100, 69.6], [-96.4, 72.4], [-90, 73.7], [-80, 73.6], [-75, 73.4], [-70, 74.8], [-60, 78], [-55, 85], [-135, 85]],
};
for (const [k, ring] of Object.entries(R)) {
  const c = [...ring, ring[0]];
  // d3 spherical: draw polygons as planar by densifying; ensure correct winding (clockwise)
  rewindRing(c, true);
  const dens = [];
  for (let i = 0; i < c.length - 1; i++) {
    const [a, b] = [c[i], c[i + 1]];
    for (let t = 0; t < 1; t += 0.1) dens.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
  }
  dens.push(c[0]);
  out.regions[k] = "M" + dens.map((p) => proj(p).map((v) => v.toFixed(1)).join(",")).join("L") + "Z";
}

const cities = {
  Surrey: [-122.85, 49.19], Victoria: [-123.37, 48.43], Ottawa: [-75.7, 45.42], Toronto: [-79.38, 43.65], Montreal: [-73.57, 45.5],
  Edmonton: [-113.49, 53.55], Regina: [-104.62, 50.45], Winnipeg: [-97.14, 49.9], "Quebec City": [-71.21, 46.81],
  Fredericton: [-66.64, 45.96], Halifax: [-63.57, 44.65], Charlottetown: [-63.13, 46.24], "St. John's": [-52.71, 47.56],
  Whitehorse: [-135.06, 60.72], Yellowknife: [-114.37, 62.45], Iqaluit: [-68.52, 63.75], "Mount Logan": [-140.4, 60.57],
  Calgary: [-114.07, 51.05], Vancouver: [-123.12, 49.28], Sudbury: [-81.0, 46.49], Churchill: [-94.17, 58.77],
  // label anchors
  "Pacific Ocean": [-136, 49], "Arctic Ocean": [-128, 76], "Atlantic Ocean": [-55, 43], "Hudson Bay": [-86, 59.5],
};
for (const [k, v] of Object.entries(cities)) out.pts[k] = proj(v).map((x) => +x.toFixed(1));
// province label anchors
const lab = { BC: [-125, 54], AB: [-115, 55], SK: [-106, 54], MB: [-98, 55], ON: [-86, 50], QC: [-72, 52], NB: [-66.4, 46.6], NS: [-63.2, 45.1], PE: [-63.2, 46.4], NL: [-61, 53.5], YT: [-135.5, 63.5], NT: [-119, 64.5], NU: [-95, 66] };
out.lab = {};
for (const [k, v] of Object.entries(lab)) out.lab[k] = proj(v).map((x) => +x.toFixed(1));

const rl = { cordillera: [-128, 57.5], plains: [-112, 56.5], shield: [-74, 53.5], hbl: [-87, 54.2], lowlands: [-80.6, 43.5], appalachian: [-66.3, 47.3], arctic: [-104, 75.5] };
out.rl = {};
for (const [k, v] of Object.entries(rl)) out.rl[k] = proj(v).map((x) => +x.toFixed(1));
fs.writeFileSync("mapdata.json", JSON.stringify(out));
console.log("bytes", fs.statSync("mapdata.json").size, "lakes", out.lakes.length, Object.keys(out.rivers));
