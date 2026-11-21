/* Original watercolour-style SVG drawings for the Matter lessons.
   Each drawing is wobbled by the #wc filter defined in index.html; labels are drawn outside the filter so they stay crisp. */
const W = (inner, alt, labels = '', vb = '0 0 200 160') =>
  `<svg viewBox="${vb}" role="img" aria-label="${alt}"><g filter="url(#wc)">${inner}</g>${labels}</svg>`;
const T = (x, y, t, o = {}) =>
  `<text x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" font-size="${o.s || 13}" font-weight="${o.w || 700}" fill="${o.c || '#1f2a37'}" stroke="#fff" stroke-width="3" paint-order="stroke" font-family="var(--head-font)">${t}</text>`;
const arrow = (x1, y1, x2, y2, c = '#6b4fa0', w = 4) => {
  const a = Math.atan2(y2 - y1, x2 - x1), h = 9;
  const p1 = [x2 - h * Math.cos(a - 0.5), y2 - h * Math.sin(a - 0.5)], p2 = [x2 - h * Math.cos(a + 0.5), y2 - h * Math.sin(a + 0.5)];
  return `<path d="M${x1},${y1} L${x2},${y2}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/><path d="M${p1.join(',')} L${x2},${y2} L${p2.join(',')}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
};
const qm = (x, y, r = 20) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="#6b4fa0" stroke-width="3"/><text x="${x}" y="${y + r * 0.42}" text-anchor="middle" font-size="${r * 1.25}" font-weight="800" fill="#c8553d" font-family="var(--head-font)">?</text>`;

/* --- small reusable pieces --- */
const iceCube = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})">
  <path d="M0,14 L24,4 L48,14 L24,24Z" fill="#dff1fb" stroke="#8cc0e0" stroke-width="1.5"/>
  <path d="M0,14 L24,24 V52 L0,42Z" fill="#b6dcf2" stroke="#8cc0e0" stroke-width="1.5"/>
  <path d="M24,24 L48,14 V42 L24,52Z" fill="#94c8ea" stroke="#8cc0e0" stroke-width="1.5"/>
  <path d="M6,20 L11,22 V36 L6,34Z" fill="#fff" opacity=".8"/></g>`;
const cup = (x, y, h, fill = '#3e95d6', w = 60, H = 90) => `<g transform="translate(${x},${y})">
  <path d="M0,0 H${w} L${w - 6},${H} H6Z" fill="#eef6fb" stroke="#8a96a3" stroke-width="2.5"/>
  <path d="M${(H - h) / H * 6},${H - h} H${w - (H - h) / H * 6} L${w - 6},${H} H6Z" fill="${fill}"/>
  <path d="M8,6 L12,${H - 6}" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".6"/></g>`;
const flame = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M0,0 C-14,-10 -8,-26 0,-38 C2,-26 14,-22 12,-8 C10,0 4,2 0,0Z" fill="#f08a3c"/><path d="M0,-4 C-6,-10 -3,-18 1,-24 C3,-16 8,-14 6,-6Z" fill="#f9c74f"/></g>`;
const snowflake = (x, y, r = 14, c = '#5aa6d6') => `<g stroke="${c}" stroke-width="3" stroke-linecap="round">${[0, 60, 120].map(d => `<path d="M${x},${y - r} V${y + r}" transform="rotate(${d} ${x} ${y})"/>`).join('')}${[0, 60, 120, 180, 240, 300].map(d => `<path d="M${x - 5},${y - r + 6} L${x},${y - r + 2} L${x + 5},${y - r + 6}" fill="none" transform="rotate(${d} ${x} ${y})"/>`).join('')}</g>`;
const sun = (x, y, r = 18) => `${Array.from({ length: 10 }, (_, i) => { const a = i * Math.PI / 5; return `<path d="M${(x + Math.cos(a) * (r + 5)).toFixed(1)},${(y + Math.sin(a) * (r + 5)).toFixed(1)} L${(x + Math.cos(a) * (r + 14)).toFixed(1)},${(y + Math.sin(a) * (r + 14)).toFixed(1)}" stroke="#f4b43a" stroke-width="4" stroke-linecap="round"/>`; }).join('')}<circle cx="${x}" cy="${y}" r="${r}" fill="#f9c74f"/>`;
const wisp = (x, y, c = '#b7c4dd', w = 7, h = 50) => `<path d="M${x},${y} C${x - 12},${y - h * 0.3} ${x + 12},${y - h * 0.55} ${x},${y - h * 0.8} S${x + 6},${y - h} ${x - 2},${y - h * 1.1}" stroke="${c}" stroke-width="${w}" fill="none" stroke-linecap="round" opacity=".75"/>`;
const thermo = (x, y, level, c = '#d64545', H = 110) => `<g transform="translate(${x},${y})">
  <rect x="-9" y="0" width="18" height="${H}" rx="9" fill="#fff" stroke="#8a96a3" stroke-width="2.5"/>
  <circle cx="0" cy="${H + 8}" r="15" fill="${c}" stroke="#8a96a3" stroke-width="2.5"/>
  <rect x="-4" y="${H - level}" width="8" height="${level + 8}" fill="${c}"/>
  ${[0.2, 0.4, 0.6, 0.8].map(f => `<path d="M9,${H * f} h6" stroke="#8a96a3" stroke-width="2"/>`).join('')}</g>`;
const balance = (tilt, leftItem, rightItem) => { // tilt: + means left side down
  const y1 = 70 + tilt, y2 = 70 - tilt;
  return `<path d="M100,140 V62" stroke="#6b5a4a" stroke-width="6"/><path d="M70,146 H130" stroke="#6b5a4a" stroke-width="8" stroke-linecap="round"/>
  <path d="M40,${y1} L160,${y2}" stroke="#6b5a4a" stroke-width="5" stroke-linecap="round"/><circle cx="100" cy="70" r="6" fill="#6b5a4a"/>
  <path d="M40,${y1} L24,${y1 + 30} M40,${y1} L56,${y1 + 30} M160,${y2} L144,${y2 + 30} M160,${y2} L176,${y2 + 30}" stroke="#8a7a6a" stroke-width="2"/>
  <path d="M18,${y1 + 30} H62 Q60,${y1 + 40} 40,${y1 + 40} Q20,${y1 + 40} 18,${y1 + 30}Z" fill="#c9a56b"/>
  <path d="M138,${y2 + 30} H182 Q180,${y2 + 40} 160,${y2 + 40} Q140,${y2 + 40} 138,${y2 + 30}Z" fill="#c9a56b"/>
  ${leftItem(40, y1 + 30)}${rightItem(160, y2 + 30)}`;
};
const balloon = (cx, base, r, c = '#e0483b') => `<ellipse cx="${cx}" cy="${base - r * 1.15}" rx="${r}" ry="${r * 1.15}" fill="${c}"/><path d="M${cx - 3},${base} h6 l-3,-5Z" fill="${c}"/><ellipse cx="${cx - r * 0.35}" cy="${base - r * 1.5}" rx="${r * 0.22}" ry="${r * 0.32}" fill="#fff" opacity=".55"/>`;
const flatBalloon = (cx, base) => `<path d="M${cx - 14},${base} Q${cx - 16},${base - 14} ${cx - 4},${base - 18} Q${cx + 12},${base - 20} ${cx + 14},${base - 6} Q${cx + 10},${base} ${cx - 14},${base}Z" fill="#e0483b"/>`;

/* Particle boxes: kind = solid | liquid | gas; temp = hot | cold | undefined */
function particleBox(kind, o = {}) {
  const x0 = o.x ?? 20, y0 = o.y ?? 20, w = o.w ?? 160, h = o.h ?? 120;
  const col = o.color || { solid: '#3d86cf', liquid: '#2ba3c9', gas: '#8f7cc3' }[kind];
  let pts = [];
  if (kind === 'solid') { const r = 10; for (let row = 0; row < 4; row++) for (let c = 0; c < 6; c++) pts.push([x0 + 30 + c * 20, y0 + h - 18 - row * 20]); }
  if (kind === 'liquid') { const J = [[0, 0], [3, -2], [-2, 3], [2, 2], [-3, -1], [1, -3]]; let k = 0; for (let row = 0; row < 3; row++) for (let c = 0; c < 6; c++) { const j = J[k++ % 6]; pts.push([x0 + 28 + c * 21 + (row % 2) * 8 + j[0] * 2, y0 + h - 16 - row * 21 + j[1] * 2]); } pts.splice(8, 1); pts.splice(13, 1); }
  if (kind === 'gas') pts = [[0.15, 0.25], [0.5, 0.18], [0.82, 0.3], [0.3, 0.6], [0.68, 0.55], [0.12, 0.85], [0.52, 0.86], [0.86, 0.8]].map(([a, b]) => [x0 + a * w, y0 + b * h]);
  const fast = o.temp === 'hot', slow = o.temp === 'cold';
  let marks = '';
  if (kind === 'solid') marks = [[0, 0], [3, 1], [5, 2]].map(([c, r]) => { const [x, y] = pts[r * 6 + c]; return `<path d="M${x - 15},${y - 4} q-3,4 0,8 M${x + 15},${y - 4} q3,4 0,8" stroke="#6b5a4a" stroke-width="1.5" fill="none"/>`; }).join('');
  else {
    const L = (kind === 'gas' ? 22 : 13) * (fast ? 1.6 : slow ? 0.55 : 1);
    const dirs = [[1, -0.4], [-1, 0.3], [0.3, 1], [-0.6, -1], [1, 0.6], [-1, -0.5], [0.4, -1], [-0.3, 1]];
    marks = pts.filter((_, i) => i % 2 === 0).map((p, i) => { const d = dirs[i % 8], n = Math.hypot(d[0], d[1]); return arrow(p[0] + d[0] / n * 12, p[1] + d[1] / n * 12, p[0] + d[0] / n * (12 + L), p[1] + d[1] / n * (12 + L), '#6b5a4a', 2); }).join('');
  }
  const frame = fast ? '#f2b3a0' : slow ? '#a9cde8' : '#c9c3b6';
  return `<rect x="${x0}" y="${y0}" width="${w}" height="${h}" rx="12" fill="#fffdf8" stroke="${frame}" stroke-width="3"/>
    ${pts.map(([x, y]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="9" fill="${col}"/><circle cx="${(x - 3).toFixed(1)}" cy="${(y - 3).toFixed(1)}" r="3" fill="#fff" opacity=".45"/>`).join('')}${marks}`;
}

const ART = {
  /* Q1 */
  weight: W(`<ellipse cx="50" cy="90" rx="34" ry="5" fill="#000" opacity=".12"/><circle cx="50" cy="22" r="10" fill="none" stroke="#3b3f45" stroke-width="6"/><path d="M30,34 H70 L84,86 Q85,90 80,90 H20 Q15,90 16,86Z" fill="#5a5f66"/><path d="M34,38 H48 L40,84 H24Z" fill="#7b8189" opacity=".7"/>`, 'A heavy kilogram weight', `<text x="50" y="72" text-anchor="middle" font-size="22" font-weight="700" fill="#fff" font-family="var(--head-font)">kg</text>`, '0 0 100 100'),
  cube: W(`<ellipse cx="50" cy="90" rx="34" ry="5" fill="#000" opacity=".1"/><path d="M22,34 L52,22 L82,34 L52,46Z" fill="#7cb8ec"/><path d="M22,34 L52,46 V86 L22,74Z" fill="#3d86cf"/><path d="M52,46 L82,34 V74 L52,86Z" fill="#2a69ad"/>`, 'A blue cube taking up space', '', '0 0 100 100'),
  sun: W(sun(100, 80, 34), 'The sun shining'),
  /* Q2 */
  ice: W(`<ellipse cx="100" cy="140" rx="60" ry="8" fill="#9cc9e8" opacity=".35"/>${iceCube(50, 34, 2.1)}`, 'An ice cube'),
  glass: W(`<ellipse cx="100" cy="146" rx="48" ry="6" fill="#7fb6e6" opacity=".35"/>${cup(60, 20, 80, '#3e95d6', 80, 124)}`, 'A glass of water'),
  steam: W(`${wisp(60, 150, '#b9b2d6', 10, 120)}${wisp(100, 150, '#a9c6e6', 12, 130)}${wisp(140, 150, '#c7c1e0', 9, 116)}<g fill="#9fb3d9" opacity=".6"><circle cx="40" cy="40" r="4"/><circle cx="162" cy="30" r="5"/><circle cx="124" cy="58" r="3"/><circle cx="76" cy="54" r="3"/><circle cx="170" cy="96" r="3"/><circle cx="28" cy="96" r="4"/></g>`, 'Gas spreading out as wisps of steam'),
  pot: W(`${wisp(70, 78, '#b7c4dd', 8, 56)}${wisp(100, 74, '#b7c4dd', 8, 60)}${wisp(130, 78, '#b7c4dd', 8, 56)}<rect x="40" y="88" width="120" height="58" rx="10" fill="#c34a3a"/><rect x="28" y="82" width="144" height="12" rx="6" fill="#d95b49"/><path d="M28,88 H14 M172,88 H186" stroke="#3b3f45" stroke-width="7" stroke-linecap="round"/><ellipse cx="100" cy="86" rx="60" ry="5" fill="#5aa6d6"/><rect x="30" y="148" width="140" height="8" rx="4" fill="#4b5058"/>${flame(80, 168, 0.4)}${flame(100, 168, 0.45)}${flame(120, 168, 0.4)}`, 'A pot of boiling water on a stove with steam rising', '', '0 0 200 170'),

  /* Q3 mass */
  scaleApple: W(balance(10, (x, y) => `<circle cx="${x}" cy="${y - 13}" r="14" fill="#d9483b"/><path d="M${x},${y - 27} q2,-8 8,-10" stroke="#6b4426" stroke-width="3" fill="none"/><ellipse cx="${x + 6}" cy="${y - 33}" rx="6" ry="3" fill="#6fbf73"/>`, (x, y) => `<rect x="${x - 10}" y="${y - 16}" width="20" height="16" rx="3" fill="#7b8189"/>`), 'A balance scale with an apple on one side and a small weight on the other', T(40, 155, 'apple') + T(160, 155, 'weights')),
  /* Q4 volume */
  measuringCup: W(`<path d="M50,24 H140 L134,140 Q133,146 126,146 H64 Q57,146 56,140Z" fill="#eef6fb" stroke="#8a96a3" stroke-width="3"/><path d="M140,40 Q166,44 162,74 Q158,96 136,98" fill="none" stroke="#8a96a3" stroke-width="6"/><path d="M54,74 H136 L134,140 Q133,144 126,144 H64 Q57,144 56,140Z" fill="#5aa6d6"/>${[50, 74, 98, 122].map(y => `<path d="M60,${y} h18" stroke="#6b7480" stroke-width="2"/>`).join('')}`, 'A measuring cup of water with millilitre markings', T(84, 54, '750 mL', { a: 'start', s: 11 }) + T(84, 78, '500 mL', { a: 'start', s: 11 }) + T(84, 102, '250 mL', { a: 'start', s: 11 })),
  /* Q5 air has mass */
  balloonsScale: W(balance(9, (x, y) => balloon(x, y, 15), (x, y) => flatBalloon(x, y)), 'A balance with a full balloon on the left side, which is lower, and an empty balloon on the right', T(40, 156, 'full of air') + T(160, 156, 'empty')),
  balloonsScaleQ: W(balance(9, (x, y) => balloon(x, y, 15), (x, y) => flatBalloon(x, y)), 'A balance with a full balloon on one side and an empty balloon on the other', qm(100, 30, 18)),
  /* Q6 particles */
  magnifier: W(`<rect x="30" y="80" width="52" height="52" rx="4" fill="#fff" stroke="#c9c3b6" stroke-width="2"/><path d="M30,80 L46,68 H98 L82,80Z" fill="#f4f1ea" stroke="#c9c3b6" stroke-width="2"/><path d="M82,80 L98,68 V120 L82,132Z" fill="#ebe6dc" stroke="#c9c3b6" stroke-width="2"/>
    <circle cx="132" cy="62" r="40" fill="#fffdf8" stroke="#6b5a4a" stroke-width="6"/>${[[112, 46], [130, 44], [148, 48], [118, 62], [136, 62], [152, 66], [114, 80], [132, 80], [148, 82]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="#c9c3e6"/>`).join('')}<path d="M104,92 L74,128" stroke="#6b5a4a" stroke-width="10" stroke-linecap="round"/>`, 'A magnifying glass over a sugar cube, showing that it is made of tiny particles', T(56, 150, 'sugar cube') + T(140, 116, 'tiny particles')),
  sugar: W(`<rect x="62" y="56" width="70" height="70" rx="4" fill="#fff" stroke="#c9c3b6" stroke-width="2.5"/><path d="M62,56 L84,40 H154 L132,56Z" fill="#f4f1ea" stroke="#c9c3b6" stroke-width="2.5"/><path d="M132,56 L154,40 V110 L132,126Z" fill="#ebe6dc" stroke="#c9c3b6" stroke-width="2.5"/>`, 'A sugar cube'),
  /* Q7–9 particle boxes */
  pSolid: W(particleBox('solid'), 'Particles in a solid packed tightly in rows, only wiggling in place', T(100, 154, 'solid: packed tight, wiggle in place')),
  pLiquid: W(particleBox('liquid'), 'Particles in a liquid close together but sliding past each other', T(100, 154, 'liquid: close, slide past each other')),
  pGas: W(particleBox('gas'), 'Particles in a gas far apart and zooming in all directions', T(100, 154, 'gas: far apart, move fast')),
  pThree: W(`<rect x="4" y="20" width="60" height="100" rx="10" fill="#fffdf8" stroke="#c9c3b6" stroke-width="3"/>${[0, 1, 2].map(r => [0, 1, 2].map(c => `<circle cx="${18 + c * 16}" cy="${106 - r * 16}" r="7" fill="#3d86cf"/>`).join('')).join('')}
    <rect x="70" y="20" width="60" height="100" rx="10" fill="#fffdf8" stroke="#c9c3b6" stroke-width="3"/>${[[82, 108], [98, 110], [114, 106], [88, 94], [106, 92], [120, 96]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="#2ba3c9"/>`).join('')}
    <rect x="136" y="20" width="60" height="100" rx="10" fill="#fffdf8" stroke="#c9c3b6" stroke-width="3"/>${[[148, 34], [180, 46], [160, 70], [186, 98], [146, 104]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="#8f7cc3"/>`).join('')}`, 'Three boxes of particles: a solid, a liquid and a gas', T(34, 140, 'solid') + T(100, 140, 'liquid') + T(166, 140, 'gas')),
  /* Q10 temperature */
  hotCold: W(particleBox('liquid', { x: 6, y: 16, w: 88, h: 110, temp: 'cold' }) + particleBox('liquid', { x: 106, y: 16, w: 88, h: 110, temp: 'hot' }), 'Two boxes of water particles: in cold water they move slowly, in hot water they move fast', T(50, 146, 'cold: slow', { c: '#2f6fa8' }) + T(150, 146, 'hot: fast', { c: '#c0392b' })),
  dye: W(`${cup(20, 30, 84, '#9fd0ee', 66, 104)}<path d="M50,58 q4,10 0,20 q-4,8 2,14" stroke="#c0392b" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="50" cy="52" r="5" fill="#c0392b"/>${cup(114, 30, 84, '#f2b3a0', 66, 104)}<ellipse cx="147" cy="98" rx="26" ry="28" fill="#d9584a" opacity=".55"/>${wisp(130, 26, '#d8cfe6', 5, 22)}${wisp(160, 26, '#d8cfe6', 5, 22)}`, 'Food colouring dropped into cold water stays in a thin line, but in hot water it spreads out quickly', T(53, 152, 'cold water', { c: '#2f6fa8' }) + T(147, 152, 'hot water', { c: '#c0392b' })),
  /* Q11 phase change overview */
  waterThree: W(`${iceCube(8, 56, 1)}${cup(78, 50, 52, '#3e95d6', 44, 70)}${wisp(160, 120, '#b9b2d6', 7, 70)}${wisp(176, 120, '#a9c6e6', 6, 60)}`, 'Water as ice, as liquid water in a glass, and as steam', arrow(60, 86, 74, 86) + arrow(126, 86, 142, 86) + T(32, 140, 'ice') + T(100, 140, 'water') + T(168, 140, 'steam')),
  /* Q12 melting */
  melting: W(`${sun(166, 30, 14)}<ellipse cx="90" cy="134" rx="62" ry="12" fill="#9fd0ee"/>${iceCube(64, 72, 1.1)}<path d="M70,128 q6,-10 4,-20 M118,130 q4,-8 2,-16" stroke="#9fd0ee" stroke-width="5" stroke-linecap="round"/>`, 'An ice cube melting into a puddle of water in the warm sun'),
  /* Q13 freezing */
  freezing: W(`<rect x="24" y="76" width="152" height="54" rx="10" fill="#e8eef3" stroke="#8a96a3" stroke-width="3"/>${[0, 1, 2, 3].map(i => `<rect x="${34 + i * 36}" y="86" width="28" height="34" rx="6" fill="#cfe8f7" stroke="#8cc0e0" stroke-width="2"/><path d="M${40 + i * 36},92 l5,0" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`).join('')}${snowflake(50, 40, 14)}${snowflake(150, 34, 11)}${snowflake(100, 26, 9)}`, 'An ice cube tray in the freezer turning water into ice cubes'),
  /* Q14 evaporation */
  evaporation: W(`${sun(160, 30, 16)}<rect y="124" width="200" height="36" fill="#a99f96"/><ellipse cx="90" cy="132" rx="56" ry="9" fill="#7fb6e6"/>${wisp(66, 120, '#c7d5ea', 5, 50)}${wisp(92, 118, '#c7d5ea', 5, 60)}${wisp(118, 120, '#c7d5ea', 5, 48)}`, 'A puddle on the ground in the sun with water vapour rising from it'),
  /* Q15 boiling */
  boiling: W(`${wisp(66, 70, '#b7c4dd', 8, 50)}${wisp(96, 66, '#b7c4dd', 8, 54)}<rect x="24" y="80" width="110" height="56" rx="10" fill="#c34a3a"/><rect x="14" y="74" width="130" height="12" rx="6" fill="#d95b49"/><ellipse cx="79" cy="78" rx="54" ry="5" fill="#5aa6d6"/><rect x="16" y="140" width="126" height="8" rx="4" fill="#4b5058"/>${flame(60, 160, 0.4)}${flame(80, 160, 0.45)}${flame(100, 160, 0.4)}${thermo(170, 14, 96)}`, 'A pot of water boiling on the stove next to a thermometer showing 100 degrees Celsius', T(170, 10, '100 °C', { s: 12 })),
  /* Q16 condensation */
  condensation: W(`${cup(62, 24, 100, '#9fd0ee', 76, 120)}${iceCube(76, 54, 0.5)}${iceCube(100, 70, 0.45)}<g fill="#5aa6d6">${[[66, 60], [70, 88], [64, 112], [134, 54], [138, 82], [132, 106], [136, 126], [68, 132]].map(([x, y]) => `<path d="M${x},${y - 6} q-4,6 0,8 q4,-2 0,-8Z"/>`).join('')}</g>${wisp(20, 90, '#d8dff0', 4, 40)}${wisp(176, 96, '#d8dff0', 4, 40)}`, 'A cold glass of ice water with water droplets forming on the outside'),
  /* Q17 sublimation */
  sublimation: W(`<path d="M50,96 L110,84 L160,96 L100,110Z" fill="#eef3f7"/><path d="M50,96 L100,110 V138 L50,124Z" fill="#d9e2ea"/><path d="M100,110 L160,96 V124 L100,138Z" fill="#c4d0db"/>${[40, 70, 100, 130, 160].map((x, i) => `<ellipse cx="${x}" cy="${88 - i % 2 * 10}" rx="26" ry="12" fill="#fff" opacity=".85"/>`).join('')}${wisp(80, 76, '#e3e8f0', 9, 50)}${wisp(120, 74, '#e3e8f0', 9, 54)}`, 'A block of dry ice giving off a cloud of white fog', T(100, 156, 'dry ice: never touch it!', { s: 12, c: '#b3261e' })),
  /* Q18 deposition */
  deposition: W(`<rect x="30" y="14" width="140" height="132" rx="6" fill="#bcd8ee" stroke="#8a7a6a" stroke-width="8"/><path d="M100,14 V146 M30,80 H170" stroke="#8a7a6a" stroke-width="6"/>${[[52, 34], [76, 56], [132, 36], [150, 60], [56, 108], [84, 128], [130, 104], [152, 128], [118, 56], [64, 66]].map(([x, y], i) => snowflake(x, y, 7 + i % 3 * 2, '#fff')).join('')}<path d="M34,140 Q60,126 96,140 M104,140 Q140,126 166,140" stroke="#fff" stroke-width="6" fill="none" opacity=".9"/>`, 'A window covered in feathery frost crystals on a cold morning'),
  /* Q19 temperatures */
  thermoScale: W(`${thermo(56, 12, 100, '#d64545', 116)}`, 'A thermometer marked at 0 degrees where water freezes and 100 degrees where water boils', `<path d="M66,14 h14 M66,98 h14" stroke="#1f2a37" stroke-width="2"/>` + T(84, 12, '100 °C', { a: 'start', s: 13, c: '#c0392b' }) + T(84, 26, 'water boils', { a: 'start', s: 11, c: '#c0392b' }) + T(84, 96, '0 °C', { a: 'start', s: 13, c: '#2f6fa8' }) + T(84, 110, 'water freezes', { a: 'start', s: 11, c: '#2f6fa8' })),
  /* Q20 mass stays the same */
  sameMass: W(`<rect x="8" y="112" width="80" height="18" rx="5" fill="#7b8189"/><rect x="18" y="130" width="60" height="10" rx="3" fill="#5a5f66"/>${iceCube(24, 58, 1)}<rect x="112" y="112" width="80" height="18" rx="5" fill="#7b8189"/><rect x="122" y="130" width="60" height="10" rx="3" fill="#5a5f66"/>${cup(130, 52, 40, '#5aa6d6', 44, 60)}`, 'An ice cube on a scale reading 100 grams, and the melted water on a scale also reading 100 grams', arrow(92, 84, 108, 84) + T(48, 126, '100 g', { c: '#fff', s: 12 }) + T(152, 126, '100 g', { c: '#fff', s: 12 }) + T(48, 154, 'ice') + T(152, 154, 'melted water')),
  sameMassQ: W(`<rect x="8" y="112" width="80" height="18" rx="5" fill="#7b8189"/><rect x="18" y="130" width="60" height="10" rx="3" fill="#5a5f66"/>${iceCube(24, 58, 1)}<rect x="112" y="112" width="80" height="18" rx="5" fill="#7b8189"/><rect x="122" y="130" width="60" height="10" rx="3" fill="#5a5f66"/>${cup(130, 52, 40, '#5aa6d6', 44, 60)}`, 'An ice cube on a scale reading 100 grams, and the melted water on a scale with a question mark', arrow(92, 84, 108, 84) + T(48, 126, '100 g', { c: '#fff', s: 12 }) + T(152, 126, '? g', { c: '#fff', s: 12 })),
  /* Q21 sand */
  sand: W(`<path d="M20,140 Q60,70 100,64 Q140,70 180,140Z" fill="#e3c07a"/><g fill="#c9a256">${Array.from({ length: 30 }, (_, i) => `<circle cx="${40 + (i * 37) % 120}" cy="${92 + (i * 23) % 44}" r="1.6"/>`).join('')}</g><circle cx="150" cy="44" r="30" fill="#fffdf8" stroke="#6b5a4a" stroke-width="5"/>${[[138, 36], [154, 32], [162, 48], [146, 54], [134, 50]].map(([x, y]) => `<path d="M${x - 6},${y} l4,-6 l7,1 l2,6 l-5,5 l-7,-1Z" fill="#d9b166" stroke="#b18a45"/>`).join('')}<path d="M128,66 L112,84" stroke="#6b5a4a" stroke-width="8" stroke-linecap="round"/>`, 'A pile of sand, with a magnifying glass showing that each grain is a tiny solid with its own shape', T(100, 156, 'each grain keeps its own shape', { s: 12 })),
  /* Q22 same volume different shape */
  sameVolume: W(`${cup(24, 20, 70, '#3e95d6', 44, 120)}<path d="M100,70 H184 L178,140 H106Z" fill="#eef6fb" stroke="#8a96a3" stroke-width="2.5"/><path d="M103,104 H181 L178,140 H106Z" fill="#3e95d6"/>`, 'The same amount of water in a tall, thin glass and in a short, wide bowl', T(46, 156, '250 mL') + T(142, 156, '250 mL')),
  /* Q23 smell spreading */
  smell: W(`<rect x="10" y="90" width="64" height="50" rx="6" fill="#4b5058"/><rect x="18" y="100" width="48" height="30" rx="4" fill="#f2b35a"/>${[[28, 112], [44, 116], [56, 108]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#8b5a32"/>`).join('')}${[0, 1, 2].map(i => `<path d="M${70 + i * 8},${84 - i * 14} q20,-10 40,0 t40,0" stroke="#d8a6c8" stroke-width="4" fill="none" stroke-linecap="round" opacity=".8"/>`).join('')}<circle cx="170" cy="74" r="14" fill="#f2c9a0"/><path d="M164,72 h2 M174,72 h2" stroke="#1f2a37" stroke-width="2"/><path d="M166,80 q4,3 8,0" stroke="#1f2a37" stroke-width="2" fill="none"/><rect x="156" y="90" width="28" height="40" rx="10" fill="#6b4fa0"/>`, 'Cookies baking in an oven, with the smell drifting across the room to a person'),
  /* Q24 compress */
  syringe: W(`<rect x="20" y="50" width="120" height="34" rx="6" fill="#eef6fb" stroke="#8a96a3" stroke-width="3"/><rect x="140" y="62" width="40" height="10" fill="#8a96a3"/><rect x="176" y="48" width="8" height="38" rx="2" fill="#6b7480"/><rect x="60" y="54" width="8" height="26" fill="#6b7480"/><path d="M20,67 H8" stroke="#8a96a3" stroke-width="4"/><circle cx="6" cy="67" r="4" fill="#1f2a37"/>${[[30, 60], [44, 74], [36, 70], [52, 60], [26, 76]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.4" fill="#8f7cc3"/>`).join('')}
    <rect x="20" y="106" width="120" height="34" rx="6" fill="#eef6fb" stroke="#8a96a3" stroke-width="3"/><rect x="20" y="108" width="100" height="30" fill="#5aa6d6" opacity=".7"/><rect x="120" y="110" width="8" height="26" fill="#6b7480"/><rect x="128" y="118" width="52" height="10" fill="#8a96a3"/><rect x="176" y="104" width="8" height="38" rx="2" fill="#6b7480"/><path d="M20,123 H8" stroke="#8a96a3" stroke-width="4"/><circle cx="6" cy="123" r="4" fill="#1f2a37"/>`, 'Two sealed syringes: the plunger pushes far in when full of air, but barely moves when full of water', T(100, 40, 'air: squeezes into less space') + T(100, 156, 'water: hardly squeezes at all')),
  /* Q25 water cycle */
  waterCycle: W(`${sun(170, 26, 14)}<path d="M0,128 Q50,118 100,128 T200,128 V160 H0Z" fill="#4b93c4"/><path d="M110,160 L150,100 L200,104 V160Z" fill="#7d9b6a"/><g fill="#fff" stroke="#c9d4e0" stroke-width="2"><ellipse cx="88" cy="36" rx="34" ry="14"/><ellipse cx="66" cy="44" rx="20" ry="12"/><ellipse cx="110" cy="44" rx="22" ry="12"/></g><g stroke="#5aa6d6" stroke-width="3" stroke-linecap="round">${[100, 112, 124, 136].map(x => `<path d="M${x},62 l-4,10"/>`).join('')}</g>${wisp(40, 118, '#c7d5ea', 4, 50)}${wisp(56, 120, '#c7d5ea', 4, 46)}`, 'The water cycle: water evaporates from the ocean, condenses into clouds and falls as rain', T(34, 84, 'evaporation', { s: 10 }) + T(60, 18, 'condensation', { s: 10 }) + T(150, 80, 'rain', { s: 10 })),
  /* Q26 add or remove heat */
  heatArrows: W(`${iceCube(8, 64, 0.9)}${cup(84, 56, 40, '#3e95d6', 36, 56)}${wisp(172, 120, '#b9b2d6', 6, 56)}${flame(64, 56, 0.45)}${flame(146, 56, 0.45)}${snowflake(64, 140, 9)}${snowflake(146, 140, 9)}`, 'Adding heat changes ice to water and water to steam; removing heat changes them back', `<path d="M50,82 H78" stroke="#c0392b" stroke-width="4"/><path d="M72,76 L80,82 L72,88" fill="none" stroke="#c0392b" stroke-width="4"/><path d="M126,82 H154" stroke="#c0392b" stroke-width="4"/><path d="M148,76 L156,82 L148,88" fill="none" stroke="#c0392b" stroke-width="4"/><path d="M78,122 H50" stroke="#2f6fa8" stroke-width="4"/><path d="M56,116 L48,122 L56,128" fill="none" stroke="#2f6fa8" stroke-width="4"/><path d="M154,122 H126" stroke="#2f6fa8" stroke-width="4"/><path d="M132,116 L124,122 L132,128" fill="none" stroke="#2f6fa8" stroke-width="4"/>` + T(100, 20, 'add heat →', { c: '#c0392b', s: 12 }) + T(100, 158, '← remove heat', { c: '#2f6fa8', s: 12 })),
  /* Q27 thermometer */
  twoThermos: W(`${thermo(60, 14, 30, '#d64545', 110)}${thermo(140, 14, 90, '#d64545', 110)}${snowflake(28, 40, 10)}${sun(176, 34, 10)}`, 'Two thermometers: on a cold day the red liquid is low, and on a hot day it rises high', T(60, 156, 'cold day', { c: '#2f6fa8' }) + T(140, 156, 'hot day', { c: '#c0392b' })),
  /* Q28 chocolate */
  chocolate: W(`<g fill="#f2c9a0" stroke="#d9a77a" stroke-width="2">
      ${[[66, 30, 48], [86, 22, 56], [106, 24, 54], [126, 34, 44]].map(([x, y, h]) => `<rect x="${x}" y="${y}" width="18" height="${h + 20}" rx="9"/>`).join('')}
      <rect x="62" y="64" width="86" height="76" rx="26"/>
      <rect x="36" y="86" width="44" height="18" rx="9" transform="rotate(-35 58 95)"/></g>
      <rect x="78" y="80" width="54" height="34" rx="4" fill="#6b3f22" transform="rotate(-6 105 97)"/>
      <path d="M84,84 h40 M84,96 h40 M98,80 v32 M112,80 v32" stroke="#4f2c16" stroke-width="1.5" transform="rotate(-6 105 97)"/>
      <path d="M88,112 q2,14 -3,22 M120,110 q5,12 1,20" stroke="#6b3f22" stroke-width="6" stroke-linecap="round" fill="none"/>
      ${[[30, 50], [170, 60], [160, 30]].map(([x, y]) => `<path d="M${x - 6},${y} q6,-8 12,0 q-6,8 -12,0Z" fill="#f4b43a" opacity=".6"/>`).join('')}`, 'A square of chocolate melting and dripping in an open, warm hand'),
  /* Q29 not matter */
  notMatter: W(`<rect x="10" y="64" width="40" height="22" rx="5" fill="#4b5058"/><path d="M50,62 L96,40 V110 L50,88Z" fill="#fbe7a1" opacity=".75"/>
    <circle cx="140" cy="60" r="20" fill="#e0483b"/><ellipse cx="146" cy="122" rx="28" ry="8" fill="#5b5f66" opacity=".45"/>
    <g stroke="#6b4fa0" stroke-width="3" fill="none" stroke-linecap="round"><path d="M22,120 q8,-8 0,-16 M32,124 q14,-12 0,-24"/></g><circle cx="12" cy="112" r="6" fill="#6b4fa0"/>`, 'A flashlight beam, a ball and its shadow, and sound waves coming from a speaker', T(74, 132, 'light', { s: 11 }) + T(140, 30, 'ball', { s: 11 }) + T(146, 146, 'shadow', { s: 11 }) + T(30, 146, 'sound', { s: 11 })),
  /* Q30 review diagram */
  cycle: (q) => {
    const S = [100, 26], L = [30, 132], G = [170, 132];
    const node = ([x, y], c) => `<circle cx="${x}" cy="${y}" r="24" fill="${c}"/>`;
    const lab = (t, x, y, a, c) => T(x, y, t, { s: 10, a, c });
    const hot = '#c0392b', cold = '#2f6fa8';
    return W(`${node(S, '#b6dcf2')}${node(L, '#7cc0ec')}${node(G, '#d8cfe6')}
      ${arrow(84, 46, 46, 110, hot, 3)}${arrow(56, 118, 92, 54, cold, 3)}
      ${arrow(56, 140, 144, 140, hot, 3)}${arrow(144, 124, 56, 124, cold, 3)}
      ${arrow(118, 52, 156, 108, hot, 3)}${arrow(146, 112, 108, 56, cold, 3)}`, q ? 'A diagram of the phase changes between solid, liquid and gas, with a question mark on the arrow from gas to liquid' : 'A diagram of all six phase changes between solid, liquid and gas',
      T(S[0], S[1] + 4, 'SOLID', { s: 11 }) + T(L[0], L[1] + 4, 'LIQUID', { s: 10 }) + T(G[0], G[1] + 4, 'GAS', { s: 11 }) +
      lab('melting', 54, 74, 'end', hot) + lab('freezing', 54, 90, 'end', cold) + lab('evaporation', 100, 158, 'middle', hot) +
      lab('sublimation', 148, 74, 'start', hot) + lab('deposition', 148, 90, 'start', cold) + (q ? qm(100, 112, 10) : lab('condensation', 100, 117, 'middle', cold)),
      '-30 0 260 170');
  },
};
