/* Matter lessons. Each lesson: tag, q (question), answer (HTML), examples (HTML), remember (HTML), test {q, choices, a, art, right, hints}.
   To add a question, add an object to LESSONS. The page numbers and counts update automatically. */
const TAG = { found: 'Foundational concept', mv: 'Mass and volume', part: 'Particles', heat: 'Heat and particles', phase: 'Changing state', props: 'Properties of states', review: 'Review' };
const ans = (big, more = '') => `<p class="big">${big}</p>${more}`;
const pic = (title, art, cap = '') => `<section class="examples"><h3>${title}</h3><figure class="pic">${art}${cap ? `<figcaption>${cap}</figcaption>` : ''}</figure></section>`;
const remember = (note, words = []) => `<section class="box remember"><h3>Remember this!</h3><p class="rnote">${note}</p>${words.length ? `<ul class="vocab">${words.map(w => `<li>${w}</li>`).join('')}</ul>` : ''}</section>`;
const rem2 = (a, b) => `<section class="box remember"><h3>Remember this!</h3><div class="rgrid"><div>${a.art || ''}<b>${a.t}</b><span>${a.d}</span></div><div>${b.art || ''}<b>${b.t}</b><span>${b.d}</span></div></div></section>`;

const LESSONS = [
  /* 1 */ {
    tag: TAG.found, q: `What is matter?`,
    answer: ans(`Matter is anything that has <mark>mass</mark> and <mark>takes up space</mark>.`, `<p>Almost everything around us is made of matter. This includes things we can see and touch, and even things we cannot see, such as air.</p>`),
    examples: `<section class="examples" aria-label="Examples of matter"><h3>Examples of matter</h3>
      <img class="hero-img" src="images/rock-water-balloon-768.webp" srcset="images/rock-water-balloon-768.webp 768w, images/rock-water-balloon.webp 1536w" sizes="(max-width: 960px) 100vw, 920px" width="1536" height="1024"
        alt="A rock, a glass of water and a red balloon full of air, each with arrows showing it takes up space. A small picture shows air being pumped into the balloon.">
      <ul class="captions"><li><b>A rock</b>has mass and takes up space.</li><li><b>Water</b>has mass and takes up space.</li><li><b>Air</b>has mass and takes up space, even though we cannot see it!</li></ul></section>`,
    remember: rem2({ art: ART.weight, t: 'Mass', d: 'means how much matter something contains.' }, { art: ART.cube, t: 'Takes up space', d: 'means it occupies a place, or has volume.' }),
    test: { q: `Which of these is NOT matter?`, choices: ['A glass of water', 'The air inside a balloon', 'Sunlight', 'A wooden chair'], a: 2, art: ART.sun,
      right: `Sunlight is energy, not matter. It does not have mass or take up space.`,
      hints: { 0: `Water has mass and takes up space, so it is matter. Try again!`, 1: `Air is matter! It fills up the balloon, so it takes up space. Try again!`, 3: `A chair is made of wood, which has mass and takes up space. Try again!` } }
  },
  /* 2 */ {
    tag: TAG.found, q: `What are the three common states of matter?`,
    answer: ans(`The three common states of matter are <mark>solid</mark>, <mark>liquid</mark> and <mark>gas</mark>.`, `<ol class="states-list">
        <li><b>Solid:</b> has its own shape and takes up a fixed amount of space. Examples: ice, a rock or a pencil.</li>
        <li><b>Liquid:</b> takes up a fixed amount of space, but takes the shape of its container. Examples: water, milk or juice.</li>
        <li><b>Gas:</b> spreads out to fill the space available. Examples: air, water vapour or helium.</li></ol>`),
    examples: `<section class="compare" aria-label="Remember the difference"><h3>Remember the difference</h3><ul class="cards3">
        <li class="solid">${ART.ice}<b>SOLID</b><p>Keeps its own shape. Example: an ice cube.</p></li>
        <li class="liquid">${ART.glass}<b>LIQUID</b><p>Flows and takes the shape of its container. Example: water.</p></li>
        <li class="gas">${ART.steam}<b>GAS</b><p>Spreads out to fill the space available. Example: air.</p></li></ul></section>`,
    remember: `<section class="box remember"><h3>Vocabulary to remember</h3><ul class="vocab"><li>Solid</li><li>Liquid</li><li>Gas</li><li>Volume</li><li>State of matter</li></ul></section>`,
    test: { q: `When water boils, steam rises from the pot. What state of matter is the water vapour?`, choices: ['Solid', 'Liquid', 'Gas'], a: 2, art: ART.pot,
      right: `Water vapour is a gas. When water boils, it changes from a liquid into a gas that spreads out into the air.`,
      hints: { 0: `A solid keeps its own shape, like ice. Steam doesn't keep a shape. Try again!`, 1: `The water in the pot is a liquid, but the steam rising out of it has changed. Try again!` } }
  },
  /* 3 */ {
    tag: TAG.mv, q: `How do we measure mass?`,
    answer: ans(`We measure mass with a <mark>balance</mark> or a <mark>scale</mark>.`, `<p>Mass is measured in <b>grams (g)</b> and <b>kilograms (kg)</b>. There are 1,000 grams in 1 kilogram. A paper clip has a mass of about 1 g, and a big bag of flour is about 1 kg.</p>`),
    examples: pic(`A balance compares two masses`, ART.scaleApple, `The side with more mass goes down. Here the apple has more mass than the small weights, so they need more weights to balance it.`),
    remember: remember(`<b>More matter = more mass.</b> A bowling ball and a beach ball are about the same size, but the bowling ball has much more mass because it has more matter packed inside.`, ['Mass', 'Balance', 'Scale', 'Gram (g)', 'Kilogram (kg)']),
    test: { q: `Which tool would you use to measure the mass of an apple?`, choices: ['A ruler', 'A balance', 'A thermometer', 'A measuring cup'], a: 1, art: ART.scaleApple,
      right: `A balance (or a scale) measures mass, in grams or kilograms.`,
      hints: { 0: `A ruler measures length, like how long or tall something is. Try again!`, 2: `A thermometer measures temperature, how hot or cold something is. Try again!`, 3: `A measuring cup measures volume, how much space a liquid takes up. Try again!` } }
  },
  /* 4 */ {
    tag: TAG.mv, q: `What is volume, and how do we measure it?`,
    answer: ans(`<mark>Volume</mark> is the amount of space that matter takes up.`, `<p>We often measure the volume of liquids with a measuring cup, in <b>millilitres (mL)</b> and <b>litres (L)</b>. There are 1,000 millilitres in 1 litre. A big carton of milk holds about 2 L.</p>`),
    examples: pic(`Measuring volume`, ART.measuringCup, `The lines on a measuring cup show how much space the water takes up.`),
    remember: remember(`<b>Mass</b> is how much matter is in something. <b>Volume</b> is how much space it takes up. Everything that is matter has both!`, ['Volume', 'Millilitre (mL)', 'Litre (L)', 'Measuring cup']),
    test: { q: `Which unit would you use to measure the volume of juice in a glass?`, choices: ['Kilograms (kg)', 'Millilitres (mL)', 'Centimetres (cm)', 'Degrees (°C)'], a: 1, art: ART.measuringCup,
      right: `Millilitres (and litres) measure the volume of a liquid, which is how much space it takes up.`,
      hints: { 0: `Kilograms measure mass, not volume. Try again!`, 2: `Centimetres measure length. Try again!`, 3: `Degrees measure temperature. Try again!` } }
  },
  /* 5 */ {
    tag: TAG.mv, q: `Does air really have mass?`,
    answer: ans(`Yes! <mark>Air is matter</mark>, so it has mass and takes up space.`, `<p>Air is a mixture of gases. We can't see it, but we can feel it when the wind blows, and we can see it fill up a balloon. A balloon full of air has a little more mass than the same balloon when it's empty.</p>`),
    examples: pic(`Try it with a balance`, ART.balloonsScale, `Hang a full balloon and an empty balloon on a balance. The full balloon side goes down, because the air inside has mass.`),
    remember: remember(`Gases are matter too. Air takes up space (it fills the balloon) and has mass (it tips the balance).`, ['Air', 'Gas', 'Mass']),
    test: { q: `A full balloon and an empty balloon hang on a balance. What happens?`, choices: ['The full balloon side goes down', 'The empty balloon side goes down', 'They stay perfectly even', 'Both balloons float away'], a: 0, art: ART.balloonsScaleQ,
      right: `The full balloon side goes down, because the air inside the balloon has mass.`,
      hints: { 1: `The empty balloon has less matter in it. Which side has more matter? Try again!`, 2: `One balloon has extra matter inside it, so they won't stay even. Try again!`, 3: `These balloons are full of ordinary air, not helium, so they don't float. Try again!` } }
  },
  /* 6 */ {
    tag: TAG.part, q: `What is all matter made of?`,
    answer: ans(`All matter is made of tiny pieces called <mark>particles</mark>.`, `<p>Particles are much too small to see, even with a magnifying glass. A single grain of sugar is made of more particles than there are people on Earth! How the particles are arranged and how fast they move decides whether matter is a solid, a liquid or a gas.</p>`),
    examples: pic(`If we could zoom in…`, ART.magnifier, `This is a pretend picture. Real particles are far too small to see.`),
    remember: remember(`Every kind of matter, from rocks to water to air, is made of particles that are <b>always moving</b>, even in a solid.`, ['Particle', 'Matter']),
    test: { q: `Which sentence about particles is true?`, choices: ['Only solids are made of particles', 'Particles are big enough to see with your eyes', 'All matter is made of tiny particles', 'Particles never move'], a: 2, art: ART.sugar,
      right: `All matter, whether it's a solid, a liquid or a gas, is made of tiny particles.`,
      hints: { 0: `Liquids and gases are made of particles too. Try again!`, 1: `Particles are far too tiny to see, even with a magnifying glass. Try again!`, 3: `Particles are always moving, even in a solid. They just wiggle in place. Try again!` } }
  },
  /* 7 */ {
    tag: TAG.part, q: `How are the particles in a solid arranged?`,
    answer: ans(`In a solid, the particles are <mark>packed tightly together</mark> and can only <mark>wiggle in place</mark>.`, `<p>Because the particles are held tightly in their spots, a solid keeps its own shape. That's why a rock or an ice cube doesn't spread out or flow.</p>`),
    examples: pic(`Particles in a solid`, ART.pSolid),
    remember: remember(`<b>Solid:</b> particles are close together, in fixed spots, wiggling (vibrating) in place. Solids keep their shape.`, ['Solid', 'Vibrate', 'Fixed shape']),
    test: { q: `Why does an ice cube keep its shape?`, choices: ['Its particles are held tightly in place', 'Its particles are far apart', 'Its particles have stopped moving forever', 'It has no particles'], a: 0, art: ART.ice,
      right: `In a solid like ice, the particles are packed tightly and held in place, so it keeps its shape.`,
      hints: { 1: `Far-apart particles are what you find in a gas. Try again!`, 2: `Particles never stop moving completely. In a solid they wiggle in place. Try again!`, 3: `All matter has particles, including ice. Try again!` } }
  },
  /* 8 */ {
    tag: TAG.part, q: `How do the particles in a liquid move?`,
    answer: ans(`In a liquid, the particles are <mark>close together</mark> but can <mark>slide past each other</mark>.`, `<p>Because the particles can slide around, a liquid can flow and be poured. It takes the shape of whatever container it's in, but the amount of space it takes up (its volume) stays the same.</p>`),
    examples: pic(`Particles in a liquid`, ART.pLiquid),
    remember: remember(`<b>Liquid:</b> particles are close together but move around and slide past each other. Liquids flow and take the shape of their container.`, ['Liquid', 'Flow', 'Pour']),
    test: { q: `Why can you pour milk from a carton into a glass?`, choices: ['Milk particles are stuck in one place', 'Milk particles can slide past each other', 'Milk has no particles', 'Milk particles are very far apart'], a: 1, art: ART.glass,
      right: `Milk is a liquid. Its particles slide past each other, so it can flow and be poured.`,
      hints: { 0: `Particles stuck in one place make a solid, which can't be poured. Try again!`, 2: `Milk is matter, so it's made of particles. Try again!`, 3: `Very far-apart particles make a gas. Milk's particles are close together. Try again!` } }
  },
  /* 9 */ {
    tag: TAG.part, q: `How do the particles in a gas move?`,
    answer: ans(`In a gas, the particles are <mark>far apart</mark> and <mark>zoom around quickly</mark> in all directions.`, `<p>Gas particles keep moving until they bump into something, so a gas spreads out to fill whatever space it's in, whether that's a balloon, a bottle or a whole room.</p>`),
    examples: pic(`Particles in a gas`, ART.pGas),
    remember: `<section class="box remember"><h3>Remember this!</h3><p class="rnote">Compare the particles in all three states:</p>${ART.pThree}</section>`,
    test: { q: `In which state are the particles the farthest apart?`, choices: ['Solid', 'Liquid', 'Gas'], a: 2, art: ART.steam,
      right: `Gas particles are the farthest apart, and they move the fastest too.`,
      hints: { 0: `Solid particles are packed the closest together. Try again!`, 1: `Liquid particles are close together, even though they move around. Try again!` } }
  },
  /* 10 */ {
    tag: TAG.heat, q: `What happens to particles when matter is heated?`,
    answer: ans(`When matter is heated, its particles <mark>move faster</mark> and spread a little farther apart. When it cools, they <mark>slow down</mark>.`, `<p>Heat is a kind of energy. Adding heat gives particles more energy, so they move faster. Taking heat away makes them move more slowly.</p>`),
    examples: pic(`Cold water and hot water`, ART.hotCold, `The arrows show how fast the particles are moving.`),
    remember: remember(`<b>Hotter = faster particles. Colder = slower particles.</b> This is why heating and cooling can change the state of matter.`, ['Heat', 'Energy', 'Temperature']),
    test: { q: `You put a drop of food colouring into cold water and into hot water. In which one does the colour spread faster?`, choices: ['Cold water', 'Hot water', 'They spread at the same speed'], a: 1, art: ART.dye,
      right: `The colour spreads faster in hot water, because the hot water particles move faster and mix the colour around.`,
      hints: { 0: `In cold water the particles move slowly, so the colour spreads slowly. Try again!`, 2: `Temperature changes how fast particles move. Try again!` } }
  },
  /* 11 */ {
    tag: TAG.phase, q: `What is a phase change?`,
    answer: ans(`A <mark>phase change</mark> (or change of state) is when matter changes from one state to another, like from a solid to a liquid.`, `<p>Phase changes happen when matter is <b>heated</b> or <b>cooled</b>. The matter is still the same stuff: ice, liquid water and steam are all water!</p>`),
    examples: pic(`Water in three states`, ART.waterThree, `Heating changes ice to water, and water to steam.`),
    remember: remember(`In a phase change, the <b>state</b> changes but the <b>kind of matter</b> stays the same.`, ['Phase', 'Phase change', 'State', 'Heating', 'Cooling']),
    test: { q: `Ice melts into water. Is it still the same kind of matter?`, choices: ['Yes, it is still water', 'No, it turned into a new material', 'No, it turned into air'], a: 0, art: ART.waterThree,
      right: `Yes! Ice and liquid water are the same matter (water) in different states.`,
      hints: { 1: `Melting only changes the state. No new material is made. Try again!`, 2: `Melting ice turns into liquid water, not air. Try again!` } }
  },
  /* 12 */ {
    tag: TAG.phase, q: `What is melting?`,
    answer: ans(`<mark>Melting</mark> is when a solid changes into a liquid because it is <mark>heated</mark>.`, `<p>Heat makes the particles in the solid move faster until they break free from their fixed spots and start sliding past each other. Ice melts into water, and butter melts in a hot pan.</p>`),
    examples: pic(`Ice melting in the sun`, ART.melting),
    remember: remember(`<b>Melting:</b> solid → liquid, by adding heat.`, ['Melting', 'Solid', 'Liquid']),
    test: { q: `Which of these is an example of melting?`, choices: ['A puddle drying up', 'A snowman turning into water on a warm day', 'Water turning into ice in the freezer', 'Fog forming on a mirror'], a: 1, art: ART.melting,
      right: `When a snowman turns into water, solid snow is changing into a liquid. That's melting!`,
      hints: { 0: `A drying puddle is liquid turning into a gas, which is evaporation. Try again!`, 2: `Water turning into ice is freezing, the opposite of melting. Try again!`, 3: `Fog on a mirror is a gas turning into a liquid, which is condensation. Try again!` } }
  },
  /* 13 */ {
    tag: TAG.phase, q: `What is freezing?`,
    answer: ans(`<mark>Freezing</mark> is when a liquid changes into a solid because it is <mark>cooled</mark>.`, `<p>As a liquid loses heat, its particles slow down until they lock into place. Freezing is the opposite of melting. Water freezes into ice at <b>0 °C</b>.</p>`),
    examples: pic(`Making ice cubes`, ART.freezing),
    remember: remember(`<b>Freezing:</b> liquid → solid, by removing heat. It's the opposite of melting.`, ['Freezing', 'Liquid', 'Solid', '0 °C']),
    test: { q: `You pour juice into a mould and put it in the freezer. The next day it's a frozen treat. What phase change happened?`, choices: ['Melting', 'Freezing', 'Evaporation', 'Condensation'], a: 1, art: ART.freezing,
      right: `The liquid juice lost heat and turned into a solid. That's freezing!`,
      hints: { 0: `Melting turns a solid into a liquid. Here a liquid became a solid. Try again!`, 2: `Evaporation turns a liquid into a gas. Try again!`, 3: `Condensation turns a gas into a liquid. Try again!` } }
  },
  /* 14 */ {
    tag: TAG.phase, q: `What is evaporation?`,
    answer: ans(`<mark>Evaporation</mark> is when a liquid slowly changes into a gas.`, `<p>Some particles at the top of a liquid get enough energy to escape into the air as a gas. Evaporation happens faster when it's warm, sunny or windy. That's why puddles dry up and wet clothes dry on a line.</p>`),
    examples: pic(`A puddle drying in the sun`, ART.evaporation, `The water isn't gone. It has turned into water vapour in the air.`),
    remember: remember(`<b>Evaporation:</b> liquid → gas. Heat from the sun speeds it up.`, ['Evaporation', 'Water vapour', 'Gas']),
    test: { q: `Where does the water in a puddle go when it dries up on a sunny day?`, choices: ['It sinks into a hole forever', 'It evaporates into the air as water vapour', 'It turns into ice', 'It disappears and stops being matter'], a: 1, art: ART.evaporation,
      right: `The water evaporates. It changes from a liquid into water vapour, a gas in the air.`,
      hints: { 0: `Some water can soak into the ground, but on a sunny day most of it goes up into the air. Try again!`, 2: `Ice forms when water gets very cold, not on a sunny day. Try again!`, 3: `Matter doesn't disappear. It just changes state. Try again!` } }
  },
  /* 15 */ {
    tag: TAG.phase, q: `What is boiling?`,
    answer: ans(`<mark>Boiling</mark> is when a liquid is heated so much that it turns into a gas very quickly, with bubbles forming all through it.`, `<p>Water boils at <b>100 °C</b> (at sea level). The bubbles you see are water vapour (gas) forming inside the water and rising out. Boiling is a fast kind of evaporation.</p>`),
    examples: pic(`Water boiling on a stove`, ART.boiling),
    remember: remember(`<b>Evaporation</b> can happen slowly at any temperature. <b>Boiling</b> happens fast, at the boiling point (100 °C for water).`, ['Boiling', 'Boiling point', '100 °C']),
    test: { q: `At what temperature does water boil?`, choices: ['0 °C', '37 °C', '100 °C', '1,000 °C'], a: 2, art: ART.pot,
      right: `Water boils at 100 °C.`,
      hints: { 0: `0 °C is when water freezes. Try again!`, 1: `37 °C is about the temperature of your body. Try again!`, 3: `That's much too hot. Water boils long before that. Try again!` } }
  },
  /* 16 */ {
    tag: TAG.phase, q: `What is condensation?`,
    answer: ans(`<mark>Condensation</mark> is when a gas changes into a liquid because it is <mark>cooled</mark>.`, `<p>When water vapour in the air touches something cold, its particles slow down and come together as tiny drops of liquid water. Condensation is the opposite of evaporation.</p>`),
    examples: pic(`Drops on a cold glass`, ART.condensation, `The drops on the outside aren't leaking from the glass. They're water vapour from the air that cooled down and turned back into liquid.`),
    remember: remember(`<b>Condensation:</b> gas → liquid, by cooling. You see it on cold drinks, foggy mirrors and car windows.`, ['Condensation', 'Water vapour', 'Droplets']),
    test: { q: `After a hot shower, the bathroom mirror gets foggy. What's happening?`, choices: ['The mirror is melting', 'Water vapour is condensing on the cool mirror', 'The mirror is evaporating', 'Ice is forming on the mirror'], a: 1, art: ART.condensation,
      right: `The warm water vapour from the shower cools when it touches the mirror and condenses into tiny drops of water.`,
      hints: { 0: `A mirror is glass, and it doesn't melt in a bathroom. Try again!`, 2: `Evaporation turns a liquid into a gas. Here, a gas is turning into a liquid. Try again!`, 3: `A bathroom isn't cold enough for ice. Try again!` } }
  },
  /* 17 */ {
    tag: TAG.phase, q: `What is sublimation?`,
    answer: ans(`<mark>Sublimation</mark> is when a solid changes straight into a gas, without becoming a liquid first.`, `<p><b>Dry ice</b> (frozen carbon dioxide) does this. It turns straight into a gas and makes a spooky fog. Snow can sublimate too on cold, sunny, dry days, slowly shrinking without melting into puddles.</p><p><b>Safety:</b> dry ice is about −78 °C. Never touch it with bare hands.</p>`),
    examples: pic(`Dry ice making fog`, ART.sublimation),
    remember: remember(`<b>Sublimation:</b> solid → gas, skipping the liquid state.`, ['Sublimation', 'Dry ice', 'Solid', 'Gas']),
    test: { q: `Dry ice turns into a gas without ever becoming a liquid. What is this called?`, choices: ['Melting', 'Freezing', 'Sublimation', 'Condensation'], a: 2, art: ART.sublimation,
      right: `Going straight from a solid to a gas is called sublimation.`,
      hints: { 0: `Melting turns a solid into a liquid, but dry ice never becomes a liquid. Try again!`, 1: `Freezing turns a liquid into a solid. Try again!`, 3: `Condensation turns a gas into a liquid. Try again!` } }
  },
  /* 18 */ {
    tag: TAG.phase, q: `What is deposition?`,
    answer: ans(`<mark>Deposition</mark> is when a gas changes straight into a solid, without becoming a liquid first.`, `<p>On very cold mornings, water vapour in the air can turn straight into ice crystals on windows, car roofs and grass. That's <b>frost</b>! Deposition is the opposite of sublimation.</p>`),
    examples: pic(`Frost on a window`, ART.deposition),
    remember: remember(`<b>Deposition:</b> gas → solid, skipping the liquid state. Frost is a great example.`, ['Deposition', 'Frost', 'Ice crystals']),
    test: { q: `On a freezing morning, feathery frost covers the car window. What phase change made the frost?`, choices: ['Deposition', 'Melting', 'Evaporation', 'Boiling'], a: 0, art: ART.deposition,
      right: `Water vapour in the air turned straight into solid ice crystals. That's deposition.`,
      hints: { 1: `Melting turns a solid into a liquid. Here a gas became a solid. Try again!`, 2: `Evaporation turns a liquid into a gas. Try again!`, 3: `Boiling needs lots of heat, and this is a freezing morning. Try again!` } }
  },
  /* 19 */ {
    tag: TAG.heat, q: `At what temperatures does water change state?`,
    answer: ans(`Water <mark>freezes at 0 °C</mark> and <mark>boils at 100 °C</mark>.`, `<p>Below 0 °C, water is usually solid ice. Between 0 °C and 100 °C, it's usually liquid water. At 100 °C it boils and becomes water vapour. (Water can still slowly evaporate at lower temperatures, like a puddle drying.)</p>`),
    examples: pic(`Water's important temperatures`, ART.thermoScale),
    remember: remember(`<b>0 °C</b> = freezing point (and melting point) of water. <b>100 °C</b> = boiling point of water.`, ['Freezing point', 'Melting point', 'Boiling point', 'Degrees Celsius (°C)']),
    test: { q: `It's −10 °C outside. What will a puddle most likely look like?`, choices: ['Frozen into ice', 'Boiling', 'Warm liquid water'], a: 0, art: ART.thermoScale,
      right: `−10 °C is colder than 0 °C, the freezing point of water, so the puddle will be frozen solid.`,
      hints: { 1: `Water boils at 100 °C, and −10 °C is very cold. Try again!`, 2: `−10 °C is below the freezing point of water. Try again!` } }
  },
  /* 20 */ {
    tag: TAG.phase, q: `Does matter change its mass when it changes state?`,
    answer: ans(`No. When matter changes state, its <mark>mass stays the same</mark>.`, `<p>When 100 g of ice melts, you get 100 g of water. The particles don't disappear. They just move differently. Phase changes can also be <b>reversed</b>: you can freeze that water back into ice.</p>`),
    examples: pic(`Melt it and weigh it`, ART.sameMass),
    remember: remember(`Changing state changes the <b>shape and how particles move</b>, but not the <b>amount of matter</b>.`, ['Mass', 'Reversible change']),
    test: { q: `An ice cube has a mass of 100 g. It melts completely in a sealed cup. What is the mass of the water?`, choices: ['50 g', '100 g', '200 g', '0 g'], a: 1, art: ART.sameMassQ,
      right: `It's still 100 g. Melting changes the state, not the amount of matter.`,
      hints: { 0: `No matter was lost, because the cup is sealed. Try again!`, 2: `No new matter was added. Try again!`, 3: `The water is still there. It just changed state. Try again!` } }
  },
  /* 21 */ {
    tag: TAG.props, q: `Is sand a solid or a liquid?`,
    answer: ans(`Sand is a <mark>solid</mark>, even though you can pour it!`, `<p>Each grain of sand is a tiny solid that keeps its own shape and size. A pile of grains can be poured because the grains slide over each other, not because each grain flows like a liquid. Sugar, salt and rice are the same.</p>`),
    examples: pic(`Zooming in on sand`, ART.sand),
    remember: remember(`To decide if something is a solid, look at <b>one piece</b>. Does it keep its own shape? Then it's a solid.`, ['Solid', 'Grain']),
    test: { q: `You can pour rice into a bowl. Why is rice still a solid?`, choices: ['Each grain keeps its own shape', 'It takes the shape of the bowl', 'It spreads out to fill the room', 'It is wet'], a: 0, art: ART.sand,
      right: `Each grain of rice keeps its own shape and size, so rice is a solid, even though a pile of it can be poured.`,
      hints: { 1: `The pile takes the bowl's shape, but each grain keeps its own shape. Look at one grain! Try again!`, 2: `Spreading out to fill a space is what a gas does. Try again!`, 3: `Being wet doesn't decide whether something is a solid. Try again!` } }
  },
  /* 22 */ {
    tag: TAG.props, q: `If you pour a liquid into a different container, does its volume change?`,
    answer: ans(`No. A liquid's <mark>shape</mark> changes to fit the container, but its <mark>volume stays the same</mark>.`, `<p>If you pour 250 mL of water from a tall glass into a wide bowl, it looks lower, but there's still 250 mL. It's just spread out in a different shape.</p>`),
    examples: pic(`Same water, different shapes`, ART.sameVolume),
    remember: remember(`Liquids have a <b>fixed volume</b> but <b>no fixed shape</b>.`, ['Volume', 'Shape', 'Container']),
    test: { q: `You pour 250 mL of water from a tall glass into a wide bowl. How much water is in the bowl?`, choices: ['Less than 250 mL', 'Exactly 250 mL', 'More than 250 mL'], a: 1, art: ART.sameVolume,
      right: `There's still exactly 250 mL. The water changed shape, but not volume.`,
      hints: { 0: `It looks lower in the wide bowl, but no water was lost. Try again!`, 2: `No water was added. Try again!` } }
  },
  /* 23 */ {
    tag: TAG.props, q: `Why can you smell cookies baking from another room?`,
    answer: ans(`Because gases <mark>spread out to fill the space</mark> they're in.`, `<p>Baking cookies give off tiny gas particles that carry their smell. The particles move quickly in all directions and mix with the air, until they spread all the way to your nose in another room.</p>`),
    examples: pic(`A smell spreading through the house`, ART.smell),
    remember: remember(`Gases have <b>no fixed shape and no fixed volume</b>. They spread out to fill any space.`, ['Gas', 'Spread out']),
    test: { q: `Someone opens a bottle of perfume at the front of the classroom. Soon the whole class can smell it. Why?`, choices: ['The perfume gas spreads out to fill the room', 'The perfume turned into a solid', 'Smells don\'t move', 'Everyone walked to the front'], a: 0, art: ART.smell,
      right: `Perfume evaporates into a gas, and the gas particles spread out until they fill the whole room.`,
      hints: { 1: `A solid wouldn't spread across the room. Try again!`, 2: `Smells travel because gas particles move. Try again!`, 3: `Nobody had to move, because the smell came to them! Try again!` } }
  },
  /* 24 */ {
    tag: TAG.props, q: `Which state of matter can be squeezed into a smaller space?`,
    answer: ans(`<mark>Gases</mark> can be squeezed (compressed) into a smaller space. Solids and liquids hardly squeeze at all.`, `<p>Gas particles have lots of empty space between them, so you can push them closer together. That's how a bicycle pump puts lots of air into a tire. In solids and liquids, the particles are already close together.</p>`),
    examples: pic(`Squeezing air and water`, ART.syringe, `Cover the end of a syringe and push the plunger. The air squeezes into less space, but the water hardly moves.`),
    remember: remember(`<b>Gas:</b> lots of space between particles, so it can be compressed. <b>Liquid and solid:</b> particles already close, so they hardly compress.`, ['Compress', 'Squeeze']),
    test: { q: `Why can you pump lots of air into a bicycle tire?`, choices: ['Air is a gas that can be squeezed into a smaller space', 'Air is a liquid', 'Air has no mass', 'The tire makes more air'], a: 0, art: ART.syringe,
      right: `Air is a gas, and its particles have lots of space between them, so it can be squeezed tightly into the tire.`,
      hints: { 1: `Air is a gas, not a liquid. Try again!`, 2: `Air does have mass. Remember the balloons on the balance? Try again!`, 3: `The tire doesn't make air. The pump pushes it in. Try again!` } }
  },
  /* 25 */ {
    tag: TAG.phase, q: `How are phase changes part of the water cycle?`,
    answer: ans(`The water cycle uses <mark>evaporation</mark>, <mark>condensation</mark> and <mark>freezing and melting</mark> to move water around Earth.`, `<p>The sun heats water in oceans, lakes and rivers, and it <b>evaporates</b> into water vapour. High in the sky, the vapour cools and <b>condenses</b> into tiny drops that make clouds. When the drops get big enough, they fall as rain, or as snow if it's cold enough. Then the water flows back to the ocean, and the cycle repeats.</p>`),
    examples: pic(`The water cycle`, ART.waterCycle),
    remember: remember(`The same water has been cycling around Earth for billions of years, changing state again and again!`, ['Water cycle', 'Evaporation', 'Condensation', 'Precipitation']),
    test: { q: `Which phase change makes clouds form in the sky?`, choices: ['Melting', 'Condensation', 'Sublimation', 'Boiling'], a: 1, art: ART.waterCycle,
      right: `Water vapour cools high in the sky and condenses into tiny water drops. Billions of them together make a cloud.`,
      hints: { 0: `Melting is solid to liquid. Clouds form from water vapour, a gas. Try again!`, 2: `Sublimation is solid to gas. Try again!`, 3: `The sky isn't hot enough to boil water. Try again!` } }
  },
  /* 26 */ {
    tag: TAG.heat, q: `Which phase changes need heat added, and which need heat taken away?`,
    answer: ans(`<mark>Adding heat</mark> causes melting, evaporation and sublimation. <mark>Removing heat</mark> causes freezing, condensation and deposition.`, `<p>Adding heat makes particles move faster and spread out (solid → liquid → gas). Removing heat makes particles slow down and come closer together (gas → liquid → solid).</p>`),
    examples: pic(`Heating and cooling`, ART.heatArrows),
    remember: remember(`<b>Heat in:</b> particles speed up and spread out. <b>Heat out:</b> particles slow down and move closer.`, ['Add heat', 'Remove heat']),
    test: { q: `To turn liquid water into ice, what do you need to do?`, choices: ['Add heat', 'Remove heat', 'Add more water', 'Shake it'], a: 1, art: ART.heatArrows,
      right: `You need to remove heat (cool it down) so the particles slow down and lock into place as ice.`,
      hints: { 0: `Adding heat would make the particles move faster, not lock into place. Try again!`, 2: `More water doesn't change its state. Try again!`, 3: `Shaking doesn't freeze water. Try again!` } }
  },
  /* 27 */ {
    tag: TAG.heat, q: `How does a thermometer work?`,
    answer: ans(`The liquid inside a thermometer <mark>expands</mark> (takes up more space) when it warms up and <mark>contracts</mark> when it cools.`, `<p>When it's warm, the particles in the liquid move faster and spread a little farther apart, so the liquid rises up the tube. When it's cold, the particles slow down and the liquid drops. The numbers show the temperature in degrees Celsius (°C).</p>`),
    examples: pic(`A cold day and a hot day`, ART.twoThermos),
    remember: remember(`Most matter <b>expands when heated</b> and <b>contracts when cooled</b>, because the particles move faster or slower.`, ['Thermometer', 'Expand', 'Contract', 'Temperature']),
    test: { q: `You move a thermometer from a cold room into the hot sun. What happens to the liquid inside?`, choices: ['It rises', 'It drops', 'It freezes', 'It stays the same'], a: 0, art: ART.twoThermos,
      right: `It rises, because the warm liquid expands and takes up more space in the tube.`,
      hints: { 1: `The liquid drops when it gets colder, not warmer. Try again!`, 2: `The sun is warm, so nothing will freeze. Try again!`, 3: `A change in temperature makes the liquid move. Try again!` } }
  },
  /* 28 */ {
    tag: TAG.phase, q: `Where do we see phase changes in everyday life?`,
    answer: ans(`Phase changes happen <mark>all around us</mark>, every day!`, `<ul class="states-list"><li>Chocolate <b>melts</b> in your warm hand.</li><li>Water <b>freezes</b> into ice cubes in the freezer.</li><li>Wet hair <b>evaporates</b> dry.</li><li>A cold juice box gets drops on it from <b>condensation</b>.</li><li>Frost forms on the grass by <b>deposition</b>.</li></ul>`),
    examples: pic(`Chocolate melting in a warm hand`, ART.chocolate),
    remember: remember(`Next time you're in the kitchen, look for melting, freezing, boiling and condensation!`),
    test: { q: `You hold a chocolate bar in your hand for a long time and it gets soft and gooey. What's happening?`, choices: ['Freezing', 'Melting', 'Condensation', 'Deposition'], a: 1, art: ART.chocolate,
      right: `The heat from your hand is melting the chocolate, changing it from a solid towards a liquid.`,
      hints: { 0: `Freezing needs cold, and your hand is warm. Try again!`, 2: `Condensation turns a gas into a liquid. Try again!`, 3: `Deposition turns a gas into a solid. Try again!` } }
  },
  /* 29 */ {
    tag: TAG.review, q: `What kinds of things are NOT matter?`,
    answer: ans(`<mark>Light</mark>, <mark>sound</mark>, <mark>heat</mark> and <mark>shadows</mark> are not matter.`, `<p>Light, sound and heat are kinds of <b>energy</b>. A shadow is just a place where light is blocked. None of them have mass or take up space, so they aren't made of particles like matter is.</p>`),
    examples: pic(`Matter or not?`, ART.notMatter, `The ball is matter. The light, its shadow and the sound are not.`),
    remember: remember(`Ask two questions: <b>Does it have mass? Does it take up space?</b> If the answer to both is yes, it's matter.`, ['Matter', 'Energy', 'Light', 'Sound']),
    test: { q: `Which of these IS matter?`, choices: ['A shadow', 'The sound of a drum', 'The steam from a kettle', 'A rainbow'], a: 2, art: ART.notMatter,
      right: `Steam is water vapour, a gas. It has mass and takes up space, so it's matter.`,
      hints: { 0: `A shadow is just blocked light. It has no mass. Try again!`, 1: `Sound is energy, not matter. Try again!`, 3: `A rainbow is light, which is energy. Try again!` } }
  },
  /* 30 */ {
    tag: TAG.review, q: `Can you name all six phase changes?`,
    answer: ans(`The six phase changes are <mark>melting</mark>, <mark>freezing</mark>, <mark>evaporation</mark>, <mark>condensation</mark>, <mark>sublimation</mark> and <mark>deposition</mark>.`, `<ul class="states-list"><li><b>Melting:</b> solid → liquid</li><li><b>Freezing:</b> liquid → solid</li><li><b>Evaporation:</b> liquid → gas</li><li><b>Condensation:</b> gas → liquid</li><li><b>Sublimation:</b> solid → gas</li><li><b>Deposition:</b> gas → solid</li></ul>`),
    examples: pic(`All six phase changes`, ART.cycle(false), `Red arrows add heat. Blue arrows remove heat.`),
    remember: remember(`Each change has an <b>opposite</b>: melting ↔ freezing, evaporation ↔ condensation, sublimation ↔ deposition.`, ['Melting', 'Freezing', 'Evaporation', 'Condensation', 'Sublimation', 'Deposition']),
    test: { q: `Which phase change goes from a gas to a liquid?`, choices: ['Evaporation', 'Condensation', 'Sublimation', 'Melting'], a: 1, art: ART.cycle(true),
      right: `Condensation turns a gas into a liquid. You did it, you've finished all 30 questions about matter!`,
      hints: { 0: `Evaporation is the opposite: liquid to gas. Try again!`, 2: `Sublimation is solid to gas. Try again!`, 3: `Melting is solid to liquid. Try again!` } }
  },
];
