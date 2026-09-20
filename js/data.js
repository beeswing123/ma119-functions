/* ============================================================
   Lesson scripts — one question per turn
============================================================ */
const T=(en,zh)=>zh?`${en} <span class="zh">（${zh}）</span>`:en;

/* Chapter grouping over the flat LESSONS array (indices [from,to)) */
const CHAPTERS=[
  {n:1, short:'Ch.1 · Functions',      name:'Chapter 1 · Functions',                 week:'Week 2', from:0, to:5},
  {n:2, short:'Ch.2 · Limits',         name:'Chapter 2 · Limits and Continuity',     week:'Week 3', from:5, to:12},
];
function chOfSec(i){return i<5?1:2;}
function chRange(n){const c=CHAPTERS.find(c=>c.n===n)||CHAPTERS[0];return [c.from,c.to];}
function secIndices(n){const [f,t]=chRange(n);const a=[];for(let i=f;i<t;i++)a.push(i);return a;}

const LESSONS=[
/* ---------------- §1.1 ---------------- */
{title:'§1.1 Functions & Graphs', steps:[
  {t:'say', html:`<p>Hi again! I'm <b>Ms. Lin 林老师</b>. Today's big idea is tiny:</p>
   <p>A <b>function</b> is a machine — one input goes in, <b>exactly one</b> output comes out.</p>
   <p class="muted">Think of a vending machine. Press one button, one drink drops. If a button sometimes dropped tea and sometimes coffee, the machine would be broken. Same for functions.</p>`,
   detail:'<b>Formal definition (Thomas §1.1):</b> a function from a set D to a set R assigns to each element x in D <b>exactly one</b> element y in R. D = domain (legal inputs), range = outputs actually hit. One button → two possible drinks breaks the contract, which is why y² = x is not a function of x.'},
  {t:'say', html:`<p>Formally: <span class="math">f : D → Y</span> assigns to every <span class="math">x ∈ D</span> a <b>unique</b> <span class="zh">唯一的</span> value <span class="math">f(x)</span>.</p>
   <div class="formula">Domain 定义域 D = all allowed inputs &nbsp;·&nbsp; Range 值域 = outputs actually produced</div>
   <p>For example <span class="math">y = x²</span> is fine: x = 3 gives only 9. But <span class="math">y² = x</span> is suspicious… let's test it.</p>`},
  {t:'ask', q:'For y² = x, when x = 4, which y-values work? (Remember: what numbers square to 4?)',
   choices:[
     {txt:'Only y = 2',ok:false},
     {txt:'y = 2 and y = −2',ok:true},
     {txt:'y = 2 and y = 4',ok:false}]},
  {t:'ask', q:'So one input x = 4 produces TWO outputs. Is y² = x a function of x?',
   ok:'Right — two outputs for one input breaks the “exactly one output” rule. y² = x is NOT a function of x.',
   fb:'Think back to the vending machine: one button, two different drinks… what did we call that?',
   reveal:'Not a function. The rule: every legal input must produce one — and only one — output.',
   choices:[{txt:'Yes, it is a function',ok:false},{txt:'No, it is not a function',ok:true}]},
  {t:'say', html:`<p>Good. Now: <b>which inputs is a formula allowed to eat?</b> The <b>natural domain</b> <span class="zh">自然定义域</span> is the largest set of real inputs giving real outputs. There are only two restrictions — ever:</p>
   <div class="mn"><b>Rule 1:</b> denominator ≠ 0 &nbsp;（分母不能为零）<br><b>Rule 2:</b> inside an even root ≥ 0 &nbsp;（偶次根号内非负）</div>`},
  {t:'ask', q:'Take f(x) = 1/(x − 2). Which danger do you spot?',
   choices:[
     {txt:'A denominator',ok:true},
     {txt:'An even root',ok:false},
     {txt:'Both',ok:false}],
   ok:'A denominator — Rule 1 it is.'},
  {t:'input', q:'Set that denominator ≠ 0: which single value of x must we exclude? Type the number.',
   accept:v=>norm(v)==='2',
   fb:'Solve x − 2 ≠ 0. What is x not allowed to be?',
   h2:'Solve x − 2 = 0. The excluded value is just one number — which?',
   scaffold:[
    {q:'We need x − 2 ≠ 0. Solve the equation x − 2 = 0. What is x?',
     choices:[{txt:'x = 2',ok:true},{txt:'x = −2',ok:false},{txt:'x = 0',ok:false}],
     fb:'Move the 2 across: x = …',oktxt:'x = 2 — exactly the value that turns the denominator into zero.'},
    {q:'So which input must f(x) = 1/(x − 2) reject?',
     choices:[{txt:'x = 2',ok:true},{txt:'x = −2',ok:false},{txt:'all x < 2',ok:false}],
     fb:'The dangerous one — not its opposite sign.',oktxt:'Reject x = 2; every other real number is fine.'}
   ],
   reveal:'x − 2 ≠ 0 means x ≠ 2.',
   placeholder:'x ≠ ?'},
  {t:'say', html:`<p>Domain: all reals except 2, written <span class="math">(−∞, 2) ∪ (2, ∞)</span>.</p>
   <p class="muted">Interval notation <span class="zh">区间记号</span>: ( ) excludes an endpoint, [ ] includes it; ∞ always gets a parenthesis; ∪ glues pieces together.</p>`},
  {t:'ask', q:'Now g(x) = √(4 − x). Rule 2 fires. What must we require?',
   choices:[
     {txt:'4 − x ≠ 0',ok:false},
     {txt:'4 − x ≥ 0',ok:true},
     {txt:'4 − x ≤ 0',ok:false}],
   ok:'Exactly — the inside of the square root must be non-negative.'},
  {t:'ask', q:'Solve 4 − x ≥ 0. The domain is…',
   choices:[
     {txt:'x ≥ 4',ok:false},
     {txt:'x ≤ 4, i.e. (−∞, 4]',ok:true},
     {txt:'x ≠ 4',ok:false}],
   ok:'Yes — and the endpoint 4 is included, so we use ].',
   h2:'Two moves: subtract 4, then divide by −1 (which flips the direction).',
   scaffold:[
    {q:'Step 1: subtract 4 from both sides. 4 − x ≥ 0 becomes…',
     choices:[{txt:'−x ≥ −4',ok:true},{txt:'x ≥ 4',ok:false},{txt:'x ≥ −4',ok:false}],
     fb:'Move the 4 across and watch the minus sign on x.',oktxt:'−x ≥ −4. The x is still negative — one more move.'},
    {q:'Step 2: divide both sides by −1. What happens to the inequality?',
     choices:[{txt:'It flips: x ≤ 4',ok:true},{txt:'It stays: x ≥ 4',ok:false},{txt:'It flips to x ≥ −4',ok:false}],
     fb:'Dividing by a negative flips the direction （负数翻边）.',oktxt:'x ≤ 4, i.e. (−∞, 4].'}
   ]},
  {t:'widget', id:'vlt',
   html:`<p>Meet the graphical version of our rule: the <b>Vertical Line Test</b> <span class="zh">垂直线检验</span> — a curve is a function iff every vertical line meets it at most once. Try all four curves in the panel.</p>`},
  {t:'ask', q:'Using the panel: the full circle FAILS. What about the upper semicircle y = √(1 − x²)?',
   choices:[
     {txt:'PASS — one height per x',ok:true},
     {txt:'FAIL — two heights per x',ok:false}],
   ok:'Right: slicing the circle into halves gives two perfectly good functions (branches).',
   detail:'Why the test works: a vertical line is the picture of <i>one single input</i>. Crossing twice means two outputs for that x. Circles and sideways parabolas fail — yet each single BRANCH (y = +√(x+1) alone) can still pass. Splitting a failed curve into branches is a standard trick.'},
  {t:'say', html:`<p>Quick vocabulary stop. Some formulas change rules mid-stream — <b>piecewise functions</b> <span class="zh">分段函数</span>:</p>
   <div class="formula">|x| = x (x ≥ 0), &nbsp;|x| = −x (x &lt; 0)</div>
   <p>Two special rounders: <b>floor</b> ⌊x⌋ walks LEFT to the nearest integer; <b>ceiling</b> ⌈x⌉ walks RIGHT. Parking fees run on ceilings: any fraction of an hour counts as a full one.</p>`,
   detail:'Floor has a sibling, ceiling ⌈x⌉, which walks RIGHT. Real life: a parking garage charging by the started hour uses ceiling; tax brackets and postage tiers behave like floor steps. The graph is flat segments with sudden jumps.'},
  {t:'ask', q:'Careful with negatives: ⌊−1.2⌋ = ?',
   choices:[{txt:'−2',ok:true},{txt:'−1',ok:false},{txt:'−1.2',ok:false}],
   ok:'Yes! Floor walks LEFT, past −1, down to −2. (−1 is the classic trap.)',
   h2:'−1.2 lies between −2 and −1; floor takes the LOWER one.',
   scaffold:[
    {q:'Floor is a staircase that only walks LEFT. Between which two integers does −1.2 sit?',
     choices:[{txt:'between −2 and −1',ok:true},{txt:'between −1 and 0',ok:false},{txt:'between 1 and 2',ok:false}],
     fb:'−1.2 sits just below −1 on the number line.',oktxt:'−2 < −1.2 < −1: it lives between −2 and −1.'},
    {q:'Floor picks the LOWER step. So ⌊−1.2⌋ = ?',
     choices:[{txt:'−2',ok:true},{txt:'−1',ok:false}],
     fb:'Lower on the number line = more negative.',oktxt:'−2. The tempting −1 is the CEILING answer.'}
   ]},
  {t:'say', html:`<p>Two more ideas:</p>
   <p><b>Increasing</b> <span class="zh">递增</span>: as x grows, f(x) grows. <b>Decreasing</b>: as x grows, f(x) falls. Always name the <i>interval</i> — 1/x is decreasing on each branch separately, but never on its whole domain (jump from −1 to 1 and watch it rise!).</p>
   <p><b>Even</b>: f(−x) = f(x), mirror across the y-axis. <b>Odd</b>: f(−x) = −f(x), spin 180° about the origin <span class="zh">偶/奇函数</span>.</p>`},
  {t:'ask', q:'f(x) = x³ − x. Compute f(−x): (−x)³ − (−x) = −x³ + x = −(x³ − x). So it is…',
   choices:[{txt:'Odd',ok:true},{txt:'Even',ok:false},{txt:'Neither',ok:false}],
   ok:'Odd — it matches −f(x).'},
  {t:'ask', q:'g(x) = x² + |x|? Both x² and |x| are even, so…',
   choices:[{txt:'Even',ok:true},{txt:'Odd',ok:false},{txt:'Neither',ok:false}],
   ok:'Even — adding two even functions keeps it even. And h(x) = x + 1 is “neither”: the +1 breaks both symmetries.'},
  {t:'recap', title:'§1.1 Takeaways', mn:'Machine rule: one input → exactly one output. Denom zero out; root keeps non-neg. Vertical line crosses once. Even mirrors y-axis; odd spins about origin.',
   items:['Function: each x in D maps to a unique f(x)',
          'Natural domain: denominator ≠ 0; even-root inside ≥ 0',
          'Intervals: ( ) open, [ ] closed, ∪ joins pieces',
          'Vertical Line Test: at most one crossing',
          '⌊−1.2⌋ = −2; floor left, ceiling right',
          'Even f(−x)=f(x); odd f(−x)=−f(x)']}
]},

/* ---------------- §1.2 ---------------- */
{title:'§1.2 Combining & Transforming', steps:[
  {t:'say', html:`<p>Functions can be added, subtracted, multiplied and divided — point by point, like numbers. The domain of any combination starts from the <b>intersection</b> <span class="zh">交集</span> D(f) ∩ D(g); both machines must accept the input.</p>
   <div class="formula">(f+g)(x)=f(x)+g(x) · (fg)(x)=f(x)g(x) · (f/g)(x)=f(x)/g(x), &nbsp;g(x)≠0</div>
   <p>For a quotient, also delete every x where g(x)=0.</p>`,
   detail:'Sums, products and quotients demand BOTH ingredient rules at once, so domains intersect. Quotients then subtract one more thing: every zero of the denominator — even if the numerator also vanishes there (0/0 is still banned). Bracket vs paren follows each piece\'s ≤/≥ or </> rule.'},
  {t:'ask', q:'f(x) = √x and g(x) = √(1 − x). What is D(f)?',
   choices:[{txt:'[0, ∞)',ok:true},{txt:'(−∞, 1]',ok:false},{txt:'(−∞, ∞)',ok:false}],
   ok:'And D(g) = (−∞, 1].'},
  {t:'ask', q:'So D(f) ∩ D(g) = ?',
   choices:[{txt:'[0, 1]',ok:true},{txt:'(0, 1)',ok:false},{txt:'[0, ∞)',ok:false}],
   ok:'[0,1] — every input must survive both square roots.',
   h2:'Draw both sets on one number line and keep only the shared part.',
   scaffold:[
    {q:'D(f) = [0, ∞) is the right ray from 0; D(g) = (−∞, 1] is everything up to 1. Where do they OVERLAP?',
     choices:[{txt:'[0, 1]',ok:true},{txt:'(0, 1)',ok:false},{txt:'(−∞, 1]',ok:false}],
     fb:'Overlap = points belonging to BOTH sets.',oktxt:'[0, 1] — 0 included (f needs it), 1 included (g allows it).'}
   ]},
  {t:'say', html:`<p>The star of this section: <b>composition</b> <span class="zh">复合</span> — the output of one machine feeds the next:</p>
   <div class="formula">(f ∘ g)(x) = f(g(x)) &nbsp;— apply g FIRST, then f (read right to left)</div>
   <p>Two gates must both open: x ∈ D(g), and g(x) ∈ D(f). Order matters — socks before shoes: f ∘ g is usually <b>not</b> g ∘ f.</p>`,
   detail:'Decomposing h(x) = cos²(5x), peel inside-out: g₁(x) = 5x → g₂(u) = cos u → f(v) = v². Verify by re-nesting: f(g₂(g₁(x))) = cos²(5x). ✓ Right-to-left reading of f ∘ g ∘ h is your friend.'},
  {t:'ask', q:'Let f(x) = x² + 1 and g(x) = x − 1. Compute (f ∘ g)(x) = f(g(x)).',
   choices:[
     {txt:'(x − 1)² + 1',ok:true},
     {txt:'x²',ok:false},
     {txt:'(x + 1)² − 1',ok:false}],
   ok:'Yes — feed x−1 into the square-plus-one machine. (This is homework Q3 — you just did the hard half.)',
   h2:'g first: replace every x in x² + 1 with (x − 1).',
   scaffold:[
    {q:'(f ∘ g)(x) reads: which machine runs FIRST?',
     choices:[{txt:'g runs first, its output feeds f',ok:true},{txt:'f runs first, then g',ok:false}],
     fb:'The machine written closest to x is the inner one.',oktxt:'g first: g(x) = x − 1.'},
    {q:'Now feed g(x) = x − 1 into f: f(something) = (something)² + 1. So (f ∘ g)(x) = ?',
     choices:[{txt:'(x − 1)² + 1',ok:true},{txt:'x² + 1 − 1',ok:false}],
     fb:'Replace the x inside f by the WHOLE thing (x − 1) — keep parentheses!',oktxt:'(x − 1)² + 1. Parentheses are the whole game.'}
   ]},
  {t:'ask', q:'Now the other order: (g ∘ f)(x) = g(f(x)) = ?',
   choices:[
     {txt:'x² + 1 − 1 = x²',ok:true},
     {txt:'(x² + 1)²',ok:false},
     {txt:'(x − 1)² + 1',ok:false}],
   ok:'x². Different formula — order matters again. Both domains here are all of ℝ.'},
  {t:'say', html:`<div class="mn"><b>Trap warning:</b> simplifying a formula never enlarges its domain. √(x²) = |x|, not x — squaring destroyed the sign. Always determine the domain <i>before</i> simplifying.</div>`},
  {t:'say', html:`<p>Now the geometry that makes sketching fast. From a known graph y = f(x):</p>
   <div class="mn"><b>Outside</b> the function behaves as expected: f(x) + k moves up/down; c·f(x) stretches vertically.<br>
   <b>Inside</b>, next to x, everything runs in reverse <span class="zh">左加右减</span>: f(x + h) with h &gt; 0 moves LEFT; f(cx) with c &gt; 1 squeezes horizontally.<br>A minus sign reflects: −f(x) across the x-axis, f(−x) across the y-axis.</div>`},
  {t:'ask', q:'y = (x − 4)² + 3 comes from y = x². Where is the vertex?',
   choices:[
     {txt:'(4, 3) — right 4, up 3',ok:true},
     {txt:'(−4, 3) — left 4, up 3',ok:false},
     {txt:'(4, −3) — right 4, down 3',ok:false}],
   ok:'Right 4 (inside minus), up 3 (outside plus).'},
  {t:'widget', id:'trans',
   html:`<p>Time to play. In the lab, build <span class="math">y = −2(x − 3)² + 5</span> from y = x². Say out loud what each slider does before you move it.</p>`},
  {t:'ask', q:'Reflection check: y = sin(2x) vs y = sin x. What happens to the period?',
   choices:[
     {txt:'It halves: 2π → π',ok:true},
     {txt:'It doubles',ok:false},
     {txt:'No change',ok:false}],
   ok:'It halves — multiplying inside by c &gt; 1 squeezes horizontally. You will use this for AC current and sound waves.'},
  {t:'recap', title:'§1.2 Takeaways', mn:'Outside moves as expected; inside moves in reverse. Composition remembers order.',
   items:['Combinations live on D(f) ∩ D(g); quotient also removes g(x)=0',
          '(f ∘ g)(x) = f(g(x)): g first, then f; two domain gates',
          'f(x)+k up/down; f(x+h) LEFT for h>0 （左加右减）',
          'c·f(x) vertical stretch; f(cx) horizontal compression for c>1',
          '−f(x) flips over x-axis; f(−x) over y-axis',
          'Simplifying never enlarges the domain']}
]},

/* ---------------- §1.3 ---------------- */
{title:'§1.3 Trigonometric Functions', steps:[
  {t:'say', html:`<p>Trig time — but in the units calculus actually uses: <b>radians</b> <span class="zh">弧度</span>.</p>
   <div class="formula">θ = s / r &nbsp;·&nbsp; on the unit circle θ equals the arc length &nbsp;·&nbsp; π rad = 180°</div>
   <p>Degree → radian: × π/180. Radian → degree: × 180/π.</p>`,
   detail:'One radian is the angle subtending an arc equal in length to the radius: s = rθ. A full turn is 2π rad because the circumference is 2πr. Radians are dimensionless (length/length) — and calculus identities like d/dx sin x = cos x hold ONLY in radians.'},
  {t:'ask', q:'Convert 225° to radians. (225 = 180 + 45…)',
   choices:[{txt:'5π/4',ok:true},{txt:'3π/4',ok:false},{txt:'7π/6',ok:false},{txt:'5π/6',ok:false}],
   ok:'225·π/180 = 5π/4. That lands in Quadrant III.',
   h2:'Multiply by π/180, then simplify the fraction 225/180.',
   scaffold:[
    {q:'The exchange rate: 180° = π. So multiply degrees by…',
     choices:[{txt:'π/180',ok:true},{txt:'180/π',ok:false}],
     fb:'Check units: degrees must cancel, radians must survive.',oktxt:'π/180 — degrees cancel, radians remain.'},
    {q:'225 · π/180 = 225π/180. Simplify 225/180 by dividing out 45.',
     choices:[{txt:'5/4 → 5π/4',ok:true},{txt:'4/5 → 4π/5',ok:false},{txt:'9/8 → 9π/8',ok:false}],
     fb:'225 = 5·45 and 180 = 4·45.',oktxt:'5π/4 — and that lands in Quadrant III.'}
   ]},
  {t:'ask', q:'Convert 7π/6 back to degrees.',
   choices:[{txt:'210°',ok:true},{txt:'240°',ok:false},{txt:'150°',ok:false},{txt:'300°',ok:false}],
   ok:'210° — π + π/6, again Quadrant III.'},
  {t:'widget', id:'circle',
   html:`<p>This is the master key: on the unit circle, the point P has coordinates <b>(cos θ, sin θ)</b>. Drag it around; use the snap buttons for special angles. Watch the signs flip by quadrant — that is the <b>CAST</b> rule.</p>`},
  {t:'say', html:`<p>All six functions come from one point P(x, y) on a circle of radius r:</p>
   <div class="formula">sin θ = y/r · cos θ = x/r · tan θ = y/x &nbsp;&nbsp; csc, sec, cot are their reciprocals</div>
   <p>tan and sec die where cos θ = 0 (θ = π/2 + kπ); cot and csc die where sin θ = 0. Memory trick: each function breaks where its denominator sibling breaks.</p>`},
  {t:'ask', q:'Let us evaluate sin(7π/6). Step 1 — which quadrant?',
   choices:[{txt:'Quadrant III',ok:true},{txt:'Quadrant II',ok:false},{txt:'Quadrant IV',ok:false}],
   ok:'QIII — one step past the negative x-axis.'},
  {t:'ask', q:'Step 2 — CAST in QIII: which sign does sine have there?',
   choices:[{txt:'Negative',ok:true},{txt:'Positive',ok:false}],
   ok:'Negative — in QIII only tan (and cot) are positive. Sine and cosine are both negative.'},
  {t:'ask', q:'Step 3 — the reference angle to the x-axis is π/6, so the SIZE comes from sin(π/6). What is sin(7π/6)?',
   choices:[{txt:'−1/2',ok:true},{txt:'−√3/2',ok:false},{txt:'1/2',ok:false}],
   ok:'−1/2. Size from the reference angle, sign from CAST — two separate decisions. cos(7π/6) = −√3/2 and tan = 1/√3.'},
  {t:'say', html:`<div class="mn"><b>Special values without memorizing the table:</b> two triangles — 45-45-90 with sides 1:1:√2, and 30-60-90 with 1:√3:2. Sine row reads 0, 1/2, √2/2, √3/2, 1; cosine runs it backwards.</div>
   <p>And the identity from which everything grows — Pythagoras on the unit circle <span class="zh">恒等式之母</span>:</p>
   <div class="formula">cos²θ + sin²θ = 1 &nbsp;·&nbsp; 1 + tan²θ = sec²θ</div>`},
  {t:'ask', q:'sin θ = 3/5 with θ in Quadrant II. The identity gives cos²θ = 1 − 9/25 = 16/25. Pick the sign with CAST — cos θ = ?',
   choices:[{txt:'−4/5',ok:true},{txt:'4/5',ok:false},{txt:'±4/5',ok:false}],
   ok:'−4/5: identity gives the size, quadrant gives the sign. Cosine is negative in QII.',
   h2:'First |cos θ| from the identity, then a separate CAST sign check.',
   detail:'CAST is unit-circle symmetry, tabulated: the point is (cos θ, sin θ); the x-coordinate goes negative on the left half, the y-coordinate goes negative on the bottom half. The reference angle (acute angle to the x-axis) supplies the SIZE; the quadrant supplies the SIGN — two independent decisions.',
   scaffold:[
    {q:'cos²θ = 1 − 9/25 = 16/25. So |cos θ| = ?',
     choices:[{txt:'4/5',ok:true},{txt:'16/25',ok:false},{txt:'5/4',ok:false}],
     fb:'Square root top and bottom separately.',oktxt:'|cos θ| = 4/5. The identity gives SIZE only.'},
    {q:'θ is in Quadrant II. What sign does CAST give cosine there?',
     choices:[{txt:'Negative',ok:true},{txt:'Positive',ok:false}],
     fb:'In QII only sine is positive.',oktxt:'Negative → cos θ = −4/5. Size from identity, sign from quadrant.'}
   ]},
  {t:'say', html:`<p>Three workhorses for later chapters:</p>
   <div class="formula">sin 2θ = 2 sin θ cos θ<br>cos 2θ = 2cos²θ − 1 = 1 − 2sin²θ<br><b>Law of Cosines</b> 余弦定理: c² = a² + b² − 2ab cos C</div>
   <p>When C = 90°, cos C = 0 and Pythagoras reappears as the special case.</p>`},
  {t:'ask', q:'Triangle: a = 2, b = 3, C = 60°. Compute c² using the Law of Cosines.',
   choices:[{txt:'7',ok:true},{txt:'13',ok:false},{txt:'1',ok:false},{txt:'√7',ok:false}],
   ok:'4 + 9 − 12·(1/2) = 13 − 6 = 7, so c = √7 ≈ 2.65. That is homework Q7 — done by your own hand.'},
  {t:'widget', id:'sine',
   html:`<p>Periodic phenomena all wear the same four-parameter coat: <span class="math">f(x) = A·sin(2π/B·(x − C)) + D</span>. |A| = amplitude 振幅, B = period, C = phase shift 相移, D = midline. Set up the Ferris wheel in the panel.</p>`},
  {t:'recap', title:'§1.3 Takeaways', mn:'Size from the reference angle; sign from CAST. On the unit circle, coordinates ARE (cos, sin).',
   items:['Radians: θ = s/r; π = 180°; check calculator RAD mode',
          'CAST signs: QI all+, QII sin+, QIII tan+, QIV cos+',
          'Periods: sin/cos/sec/csc = 2π; tan/cot = π',
          'cos²θ + sin²θ = 1 — the mother identity',
          'Law of Cosines: c² = a² + b² − 2ab cos C',
          'A, B, C, D: amplitude, period, phase, midline']}
]},

/* ---------------- §1.4 ---------------- */
{title:'§1.4 Graphing with Software', steps:[
  {t:'say', html:`<p>Software plots fast — but it can lie. Three traps to supervise like a careful doctor reading a chart:</p>
   <p><b>1. Clipping.</b> The default viewing window <span class="zh">视窗</span> may cut off key features. Zoom and pan until nothing new appears.</p>
   <p><b>2. Distortion.</b> Only a <b>square window</b> (equal unit scales) shows true angles and circles — otherwise a circle looks squashed.</p>`},
  {t:'widget', id:'alias',
   html:`<p><b>3. Aliasing</b> <span class="zh">混叠</span>. Try the windows below — watch the sampled dots invent a fake wave when the true oscillation is too fast.</p>`},
  {t:'ask', q:'In the wide window, the samples look like a slow gentle wave. Is that the true graph of sin(100x)?',
   choices:[
     {txt:'No — undersampling faked it; zoom in to see the fast wave',ok:true},
     {txt:'Yes — sin(100x) is really a slow wave',ok:false}],
   ok:'Exactly. A smooth-looking plot of a fast function is a warning sign, not a result. Same effect makes wagon wheels spin backward in films.',
   detail:'A screen samples the curve at finitely many pixels. With fewer than ~10 sample points per period, connecting the dots fabricates a slow fake wave — aliasing. Cure: zoom in so a period spans many pixels, or plot fewer periods per screen. The same effect makes car wheels spin backwards in videos.'},
  {t:'say', html:`<p><b>4. The missing branch.</b> Some software draws y = x^(1/3) only for x ≥ 0 because it computes via ln x, which dies for negatives. The real cube root exists everywhere; know the domain before you plot.</p>
   <p>When you have real <i>data</i> instead of a formula: <b>least-squares regression</b> <span class="zh">最小二乘回归</span> picks the curve minimizing Σ(yᵢ − f(xᵢ))². Workflow: scatterplot → choose a model family → fit → read the curve.</p>`},
  {t:'ask', q:'A quadratic fits tuberculosis data beautifully inside 1900–1980, but curves upward after 2000, predicting deaths rise again. Should we trust that prediction?',
   choices:[
     {txt:'Be careful: extrapolation beyond the data is a bet that the trend continues',ok:true},
     {txt:'Yes — the better fit inside the data guarantees the better prediction outside',ok:false}],
   ok:'Wise caution. Interpolation is constrained by data on both sides; extrapolation 外推 is riskier the farther out you go.'},
  {t:'recap', title:'§1.4 Takeaways', mn:'Software is the tool; your brain supervises. Know the domain and choose the window before trusting the picture.',
   items:['Never trust the default window; try several',
          'Use a square (1:1) window for angles, circles, symmetry',
          'Aliasing: zoom in on fast oscillations',
          'Know the true domain (cube root has two branches)',
          'Least squares minimizes squared vertical errors',
          'Extrapolation is riskier than interpolation']}
]},

/* ---------------- §1.5 Word Equations ---------------- */
{title:'Word Equations · 公式输入', intro:'Type math like a pro in Microsoft Word — for lab reports and write-ups.', steps:[
 {t:'say', html:`<p>New superpower: Word has a built-in equation editor <span class="zh">公式编辑器</span>. Windows: press <b>Alt + =</b>. Mac: press <b>Control + =</b>. Or Insert → Equation. Inside the slot you type math in <b>UnicodeMath</b> — and Word builds it up live. You can even switch the input to <b>LaTeX</b> mode (Equation ribbon → {} LaTeX).</p>`},
 {t:'ask', q:'You are on Windows. The fastest way to open an equation slot is…',
  choices:[{txt:'Alt + =',ok:true},{txt:'Ctrl + V',ok:false},{txt:'Shift + F3',ok:false},{txt:'Insert → Symbol',ok:false}],
  ok:'Alt+= opens the built-up equation slot. Mac users: Control+=. Two keystrokes and you are typing math.',
  fb:'Look for the one that involves the = key.'},
 {t:'say', html:`<p>Building blocks — all inside the equation slot:</p>
  <ul class="recap"><li><b>Fraction</b>: type <code>a/b</code> then Space → builds a stacked fraction. Brackets group: <code>(a+b)/(c+d)</code>.</li>
  <li><b>Superscript</b> 上标: <code>x^2</code> + Space. <b>Subscript</b> 下标: <code>x_1</code> + Space.</li>
  <li><b>Symbols by name</b>: <code>\\alpha</code> ␣ → α, <code>\\beta</code>, <code>\\pi</code> → π, <code>\\theta</code> → θ, <code>\\sqrt</code> ␣ → √.</li></ul>
  <p>The trick behind all of them: <b>Space triggers the build-up conversion</b>.</p>`},
 {t:'ask', q:'In UnicodeMath, how do you type x squared so it builds up?',
  choices:[{txt:'x^2 then Space',ok:true},{txt:'x2',ok:false},{txt:'x² then Enter',ok:false},{txt:'x^2 then Enter',ok:false}],
  ok:'Space is the trigger; Enter just ends the line. x^2␣ → x².',
  fb:'One key makes the conversion happen — it is not Enter.'},
 {t:'say', html:`<p>Calculus & symbols menu: <code>\\int</code> ␣ ∫, <code>\\sum</code> ␣ Σ, <code>\\lim</code> ␣ lim, <code>\\infty</code> ␣ ∞, <code>\\le</code> ␣ ≤, <code>\\ge</code> ␣ ≥, <code>\\ne</code> ␣ ≠, <code>\\pm</code> ␣ ±, <code>\\times</code> ␣ ×, <code>\\to</code> ␣ →. Type the backslash-name, hit Space, done.</p>`},
 {t:'ask', q:'Which keystrokes produce π in a Word equation?',
  choices:[{txt:'\\pi then Space',ok:true},{txt:'pi',ok:false},{txt:'3.14',ok:false},{txt:'Alt+P',ok:false}],
  ok:'Backslash + name + Space = symbol. Works for the whole Greek alphabet.',
  fb:'Symbols are summoned by their backslash names.'},
 {t:'say', html:`<p>Pro tier <span class="zh">进阶</span>: switch the ribbon to <b>LaTeX</b> mode and type <code>\\frac{a}{b}</code>, <code>\\sqrt[n]{x}</code>, auto-sizing <code>\\left( \\right)</code>. Touchscreen? <b>Ink Equation</b> converts your handwriting. Warning: ^ and _ only work <i>inside</i> an equation slot — in normal text they stay literal characters.</p>`},
 {t:'ask', q:'In LaTeX mode, the fraction a over b is written…',
  choices:[{txt:'\\frac{a}{b}',ok:true},{txt:'a/b',ok:false},{txt:'\\frac a b',ok:false},{txt:'(a)/(b)',ok:false}],
  ok:'\\frac{numerator}{denominator} — braces group. (a/b is the UnicodeMath way.)',
  fb:'LaTeX wants backslash-frac with two brace groups.'},
 {t:'recap', title:'Word Equations Takeaways', mn:'Alt+= to open · ^ _ + Space build up · \\name + Space summons symbols · LaTeX \\frac{}{} — four moves cover 90% of a lab report.'}
]},

/* ============================================================
   CHAPTER 2 — LIMITS AND CONTINUITY (Week 3)
============================================================ */

/* ---------------- Warm-up: Inverse Functions ---------------- */
{title:'Warm-up · Inverse Functions', steps:[
  {t:'say', html:`<p>Welcome to <b>Week 3</b>! I'm Ms. Lin 林老师 again. This week we meet the idea that powers all of calculus: the <b>limit</b> <span class="zh">极限</span>.</p>
   <p>Our route follows the order in which history actually figured it out:</p>
   <div class="formula">intuition → laws → rigor (ε–δ) → one-sided → continuity → infinity</div>
   <p>That is §2.1 → §2.6, one step at a time. Every section ends with a recap, and your Week-3 homework is built into the Homework Help tab.</p>`,
   detail:'<b>Why limits must come first (Thomas Ch.2 roadmap):</b> instantaneous speed and tangent lines both demand the ratio Δy/Δx <i>at a single point</i> — where Δx = 0. Ordinary arithmetic dies there (0/0), but a limit survives. By the end of Chapter 3, the derivative itself is defined entirely as a limit, so this chapter is the foundation wall.'},
  {t:'say', html:`<p>Before limits, a short warm-up on <b>inverse functions</b> <span class="zh">反函数</span> — functions that <b>undo</b> each other. You will need this mindset for logarithms later, and the "undo" theme matches limits: what does the operation look like run backwards?</p>
   <p>First: a function can have an inverse only if it is <b>one-to-one</b> <span class="zh">一一对应</span>: different inputs always give different outputs, <span class="math">f(x₁) ≠ f(x₂)</span> whenever <span class="math">x₁ ≠ x₂</span>.</p>
   <p>Graphically this is the <b>Horizontal Line Test</b>: no horizontal line meets the curve more than once.</p>`,
   detail:'One-to-one is stricter than being a function. A function passes the Vertical Line Test (one output per input). To also be reversible it passes the Horizontal Line Test (one input per output). Many useful functions fail it until we <b>restrict the domain</b> — a standard legal move used later for sin⁻¹ and for √x.'},
  {t:'ask', q:'Take f(x) = x². f(−2) = 4 and f(2) = 4 — two inputs, one output. Is f one-to-one on all of ℝ?',
   choices:[
     {txt:'No — two different inputs share output 4',ok:true},
     {txt:'Yes — every function is one-to-one',ok:false},
     {txt:'Yes, because 4 is positive',ok:false}],
   ok:'Right. Squaring merges −2 and 2, so no inverse exists on all of ℝ — yet.',
   fb:'Re-read the definition: what happens to x₁ = −2 and x₂ = 2?'},
  {t:'ask', q:'The fix: restrict the domain to x ≥ 0. On [0, ∞), does x² become one-to-one?',
   choices:[
     {txt:'Yes — non-negative inputs never share a square',ok:true},
     {txt:'No — restriction changes the formula',ok:false}],
   ok:'Exactly. Same formula, smaller domain — and now √x becomes its legal inverse. Restricting the domain is the standard rescue.'},
  {t:'say', html:`<p>If f and g satisfy <b>both</b> compositions below, they undo each other:</p>
   <div class="formula">(f ∘ g)(x) = x &nbsp;&nbsp;<b>and</b>&nbsp;&nbsp; (g ∘ f)(x) = x</div>
   <p>We write <span class="math">g = f⁻¹</span>, read "f inverse". Try numbers with <span class="math">f(x)=3x−2</span>: f(−1)=−5, then g(−5)=−1 — back where we started.</p>
   <div class="mn"><b>CAUTION:</b> the −1 in f⁻¹ is <b>not an exponent</b>. <span class="math">f⁻¹(x) ≠ 1/f(x)</span> — one of the most common mistakes in the course.</div>`},
  {t:'ask', q:'What does f⁻¹(x) actually mean?',
   choices:[
     {txt:'The function that undoes f — its reverse machine',ok:true},
     {txt:'1 divided by f(x)',ok:false},
     {txt:'−f(x), the negative of f',ok:false}],
   ok:'It is the reverse machine. The little −1 lives up near the function name, never as arithmetic.',
   fb:'Remember the caution on the board: is it an exponent?'},
  {t:'say', html:`<p>Finding an inverse — the reliable <b>4-step process</b> (plus a check):</p>
   <ul class="recap"><li><b>①</b> Replace f(x) with y.</li>
   <li><b>②</b> Swap: every x becomes y, every y becomes x.</li>
   <li><b>③</b> Solve for y (the error-prone step — take care with algebra).</li>
   <li><b>④</b> Rename y as f⁻¹(x).</li>
   <li><b>⑤</b> Verify: f(f⁻¹(x)) = x and f⁻¹(f(x)) = x.</li></ul>`,
   detail:'Step ② is not magic: an inverse swaps the roles of input and output, which is exactly why the domains and ranges swap, and why the graph reflects across the 45° line y = x.'},
  {t:'ask', q:'For f(x) = 3x − 2, after steps ① and ②, which equation are you holding?',
   choices:[
     {txt:'x = 3y − 2',ok:true},
     {txt:'y = 3x − 2',ok:false},
     {txt:'x = 2y − 3',ok:false}],
   ok:'x = 3y − 2 — every letter swapped. Now solve for y.',
   fb:'Start from y = 3x − 2, then swap the two letters.'},
  {t:'ask', q:'Step ③: solve x = 3y − 2 for y. f⁻¹(x) = ?',
   choices:[
     {txt:'x/3 + 2/3',ok:true},
     {txt:'3x + 2',ok:false},
     {txt:'(x − 2)/3',ok:false}],
   ok:'Add 2, then divide by 3: y = x/3 + 2/3.',
   h2:'Two moves: add 2 to both sides, then divide the whole side by 3.',
   scaffold:[
    {q:'First move on x = 3y − 2: get 3y by itself.',
     choices:[{txt:'x + 2 = 3y',ok:true},{txt:'x − 2 = 3y',ok:false}],
     fb:'The −2 crosses the equals sign.',oktxt:'x + 2 = 3y.'},
    {q:'Now divide by 3:',
     choices:[{txt:'y = x/3 + 2/3',ok:true},{txt:'y = 3x + 6',ok:false}],
     fb:'Divide BOTH terms by 3.',oktxt:'y = x/3 + 2/3 — the inverse.'}
   ]},
  {t:'ask', q:'Step ⑤ verify: f(f⁻¹(x)) = 3(x/3 + 2/3) − 2 = ?',
   choices:[
     {txt:'x + 2 − 2 = x ✓',ok:true},
     {txt:'3x',ok:false},{txt:'1/x',ok:false}],
   ok:'x — the machines cancel perfectly. That single letter is the whole verification.'},
  {t:'say', html:`<p><b>Graph fact (always true):</b> the graph of f⁻¹ is the <b>reflection of f across the line y = x</b> <span class="zh">关于 y=x 对称</span>. Swapping x and y swaps the axes — geometrically a mirror flip.</p>
   <p>Consequence: domain(f) = range(f⁻¹) and range(f) = domain(f⁻¹). The outputs of one machine are the inputs of its reverse.</p>`,
   detail:'Example from the lecture: g(x) = √(x − 3), domain x ≥ 3, range y ≥ 0. Solving by squaring gives g⁻¹(x) = x² + 3 — but the inverse\'s domain is the ORIGINAL range, x ≥ 0 (not all of ℝ). Squaring can reintroduce values the original never produced.'},
  {t:'ask', q:'g(x) = √(x − 3). Following the 4 steps gives g⁻¹(x) = x² + 3. What is the domain of g⁻¹?',
   choices:[
     {txt:'x ≥ 0 — it inherits the range of g',ok:true},
     {txt:'All real numbers ℝ',ok:false},
     {txt:'x ≥ 3',ok:false}],
   ok:'x ≥ 0. The inverse accepts only what g could output — domains and ranges swap. Warm-up done; limits begin next.',
   h2:'Ask first: what values can √(x−3) ever produce? Those become the legal inputs of g⁻¹.',
   scaffold:[
    {q:'A square root can output which kinds of numbers?',
     choices:[{txt:'Only y ≥ 0',ok:true},{txt:'Any real number',ok:false},{txt:'Only y ≥ 3',ok:false}],
     fb:'√ is never negative.',oktxt:'Range of g is [0, ∞).'},
    {q:'That range becomes the domain of g⁻¹. So…',
     choices:[{txt:'x ≥ 0',ok:true},{txt:'x ≥ 3',ok:false}],
     fb:'Range of the original = domain of the inverse.',oktxt:'x ≥ 0.'}
   ]},
  {t:'recap', title:'Warm-up Takeaways', mn:'Inverse = reverse machine, not reciprocal. One-to-one only; swap letters, solve, rename, verify; mirror across y = x.',
   items:['One-to-one: x₁ ≠ x₂ ⇒ f(x₁) ≠ f(x₂); Horizontal Line Test',
          'Failing the test? Restrict the domain (e.g. x² on x ≥ 0)',
          'f⁻¹ undoes f: f(f⁻¹(x)) = f⁻¹(f(x)) = x',
          'f⁻¹(x) is NOT 1/f(x)',
          '4 steps: y → swap x and y → solve for y → rename → verify',
          'Graph of f⁻¹ = reflection across y = x; domain and range swap']}
]},

/* ---------------- §2.1 ---------------- */
{title:'§2.1 Rates of Change & Tangents', steps:[
  {t:'say', html:`<p>Section 2.1 starts with a question you feel every day: <b>how fast are you going right now?</b></p>
   <p>Your speedometer says "130 km/h <i>now</i>". Your trip computer says "90 km/h <i>since Beijing</i>". One claims an <b>instant</b>; the other divides a whole <b>journey</b>.</p>
   <p>In health science the same pair appears: a heart-rate watch counts beats over a few seconds and rescales — short window, almost instantaneous; a 24-hour average is the blunt version. A glucose sensor even draws a trend <i>arrow</i>: rising fast, rising slowly, falling. That arrow is a rate of change.</p>`,
   detail:'Two quantities, one quotient. Average over [t₁, t₂]: total change ÷ elapsed time — honest and measurable, but blurry. The "right now" value has no classical meaning at all: over a zero-length interval you travel zero distance, and 0/0 is undefined. Making "speed at an instant" precise is the problem the whole chapter exists to solve.'},
  {t:'say', html:`<p>The experiment that began it all: Galileo (~1604) rolled bronze balls down inclined planes, timing them with a water clock and his own pulse. Free fall was simply too fast to measure — the ramp "diluted gravity".</p>
   <p>His distances came in the ratios 1 : 3 : 5 : 7…, and the odd numbers sum to squares. Conclusion, in modern SI units:</p>
   <div class="formula">y = 4.9 t² &nbsp;meters after t seconds &nbsp;(g ≈ 9.8 m/s²)</div>
   <p>Galileo could measure average speeds over intervals. What he could <i>not</i> give meaning to was the speed at a single instant. That gap is exactly where the limit walks in.</p>`,
   detail:'The Leaning Tower story (two masses landing together) was written up only later by his student Viviani — great story, shaky evidence. The inclined-plane data is the solid result: distance fallen proportional to time squared. Note 4.9 = g/2.'},
  {t:'say', html:`<p><b>Average speed</b> <span class="zh">平均速度</span> over [t₁, t₂]:</p>
   <div class="formula">Δy/Δt = ( y(t₂) − y(t₁) ) / ( t₂ − t₁ )</div>
   <p>For the rock: first 2 seconds give 19.6/2 = <b>9.8 m/s</b>; the single second from t=1 to t=2 gives (19.6 − 4.9)/1 = <b>14.7 m/s</b>.</p>
   <p>The number depends on the interval — and geometrically it is the <b>slope of the chord</b> joining the two points on the curve.</p>`},
  {t:'ask', q:'Compute the average speed over [2, 3]: (y(3) − y(2))/(3 − 2). y(3) = 4.9·9 = 44.1.',
   choices:[
     {txt:'24.5 m/s',ok:true},
     {txt:'44.1 m/s',ok:false},
     {txt:'9.8 m/s',ok:false}],
   ok:'(44.1 − 19.6)/1 = 24.5 m/s. Later intervals are faster — the rock keeps accelerating.',
   h2:'Subtract the two heights, then divide by the elapsed time (which is 1 here).',
   scaffold:[
    {q:'Height difference y(3) − y(2) = ?',
     choices:[{txt:'44.1 − 19.6 = 24.5',ok:true},{txt:'44.1 + 19.6 = 63.7',ok:false}],
     fb:'Change means later minus earlier.',oktxt:'24.5 meters covered in that second.'},
    {q:'Divide by elapsed time 3 − 2 = 1:',
     choices:[{txt:'24.5 m/s',ok:true},{txt:'2.45 m/s',ok:false}],
     fb:'Dividing by 1 changes nothing.',oktxt:'24.5 m/s.'}
   ]},
  {t:'say', html:`<p>Now the decisive experiment of the section — <b>shrink the interval</b>. Average speeds over [2, 2 + h]:</p>
   <div class="formula">h = 1 → 24.5 · h = 0.1 → 20.09 · h = 0.01 → 19.649 · h = 0.001 → 19.6049 …</div>
   <p>Every row is an honest average — h is <i>never zero</i>. But the column unmistakably <b>aims</b> at 19.6 without any row equalling it. That aiming is the limit idea, appearing in nature for the first time.</p>`,
   detail:'Zhuangzi (~300 BC): "Take a stick one chi long; cut away half each day, and ten thousand generations will not exhaust it." Day n leaves 1/2ⁿ — always positive, never 0, yet 1/2ⁿ → 0. "Approaches but never equals" is exactly h → 0 with h ≠ 0. Zeno\'s arrow and Achilles live in the same idea.'},
  {t:'ask', q:'For h = 0.1 on [2, 2.1]: (4.9·2.1² − 4.9·4)/0.1 = ?',
   choices:[
     {txt:'20.09 m/s',ok:true},
     {txt:'19.6 m/s',ok:false},
     {txt:'24.5 m/s',ok:false}],
   ok:'20.09 — already much closer to 19.6 than the h = 1 row (24.5). The column is settling fast.',
   fb:'2.1² = 4.41; compute the two heights first.'},
  {t:'say', html:`<p>Reading a table forever can only <i>suggest</i>. Algebra settles it. The three-step dance — memorize this rhythm, it is the embryo of every derivative:</p>
   <div class="mn"><b>① Expand</b> the difference quotient &nbsp;→&nbsp; <b>② cancel h</b> (legal, because h ≠ 0) &nbsp;→&nbsp; <b>③ let h → 0</b></div>`,
   detail:'Full algebra for y = 4.9t²: [4.9(t₀+h)² − 4.9t₀²]/h = 4.9(2t₀h + h²)/h = 9.8t₀ + 4.9h, true for every h ≠ 0 however tiny. Order matters absolutely: setting h = 0 FIRST gives 0/0, undefined. Cancel while h is nonzero, then watch what remains as h shrinks to nothing: 9.8t₀.'},
  {t:'ask', q:'After canceling: average speed = 9.8t₀ + 4.9h. At t₀ = 1, as h → 0 it becomes…',
   choices:[
     {txt:'9.8 m/s',ok:true},
     {txt:'4.9 m/s',ok:false},
     {txt:'0/0 — undefined',ok:false}],
   ok:'9.8 m/s — exactly the value the t₀ = 1 column was aiming at.',
   fb:'The 4.9h term dies; only 9.8t₀ survives.'},
  {t:'input', q:'Now your turn: v(t) = 9.8t. The instantaneous speed at t = 2 is what number (m/s)?',
   accept:v=>{const n=parseFloat(norm(v).replace('m/s',''));return !isNaN(n)&&Math.abs(n-19.6)<1e-9;},
   fb:'Substitute t = 2 into 9.8t.',
   h2:'9.8 × 2 — the 4.9h term has already gone to zero.',
   reveal:'v(2) = 19.6 m/s. Table and algebra agree.',
   placeholder:'e.g. 19.6'},
  {t:'say', html:`<p>Geometry now names the same idea. For a general curve y = f(x), the average rate over [x₁, x₂] is</p>
   <div class="formula">( f(x₁ + h) − f(x₁) ) / h &nbsp;— the slope of the <b>secant line</b> <span class="zh">割线</span></div>
   <p>"Secant" comes from Latin <i>secare</i>, to cut: the line cuts the curve at two points P and Q. Quick one: f(x) = x² on [1, 3] gives (9 − 1)/(3 − 1) = <b>4</b>.</p>`},
  {t:'widget', id:'secant',
   html:`<p>Time to see it. Drag h toward zero in the panel and watch the secant through P and Q <b>rotate into its limiting position</b>. Toggle between the parabola and Galileo's rock. The limiting line is the <b>tangent</b> <span class="zh">切线</span>.</p>`},
  {t:'ask', q:'For y = x² at P(2,4), the panel shows secant slopes 5, 4.5, 4.25 as Q approaches. What number do they target?',
   choices:[
     {txt:'4 — the tangent slope at P',ok:true},
     {txt:'2 — the x-coordinate',ok:false},
     {txt:'∞ — the line gets steeper',ok:false}],
   ok:'4. The tangent line is the limiting position of the secants — not arrived at, but aimed at.',
   fb:'Read the trend: 5 → 4.5 → 4.25 → ? The steps close by 0.5, 0.25…'},
  {t:'say', html:`<p><b>What is a tangent, exactly?</b> Not "a line that touches the curve once" — the Greeks\' test fails twice:</p>
   <ul class="recap"><li>The tangent to y = x³ at the origin is the x-axis — and it <b>crosses</b> the curve there.</li>
   <li>The y-axis meets y = x² only at the origin — yet is clearly not its tangent.</li></ul>
   <p>The modern definition: the tangent at P is the <b>limiting position of the secants</b>, equivalently the <b>best linear approximation</b> near P. Zoom in far enough on a smooth curve and it becomes indistinguishable from its tangent line — <b>local linearity</b> <span class="zh">局部线性</span>.</p>`,
   detail:'Fermat (~1629) already computed slopes by dividing a rise by his small quantity E and then setting E = 0 — critics screamed "you divide by E and then discard it?!" Right answers, no justification. The limit supplies the justification 200 years later: cancel while h ≠ 0, then let h → 0. Never set h = 0 before canceling.'},
  {t:'ask', q:'Do the dance at P(2,4): [(2+h)² − 4]/h = (4h + h²)/h = 4 + h. As h → 0 the tangent slope is…',
   choices:[
     {txt:'4',ok:true},{txt:'0',ok:false},{txt:'4 + h stays, no answer',ok:false}],
   ok:'4 — cancel first, h → 0 after. Same dance as the falling rock.',
   fb:'(4h+h²)/h = 4+h for every h ≠ 0; then the h-term dies.'},
  {t:'ask', q:'Point–slope form through P(2,4) with slope 4: y − 4 = 4(x − 2). Simplified, the tangent line is…',
   choices:[
     {txt:'y = 4x − 4',ok:true},{txt:'y = 4x + 4',ok:false},{txt:'y = 2x',ok:false}],
   ok:'y = 4x − 4. It even crosses the x-axis at x = 1, halfway to P — tangents need not stay on one side.',
   fb:'Expand the right: 4x − 8, then add 4.'},
  {t:'ask', q:'At P(−1, 1) on y = x² the same algebra gives slope −2. Why negative here, but +4 at x = 2?',
   choices:[
     {txt:'The function is decreasing at x = −1 and increasing at x = 2',ok:true},
     {txt:'Slopes are randomly negative on the left',ok:false},
     {txt:'Tangent slopes are always positive',ok:false}],
   ok:'Sign of the slope = direction of travel. Left of the vertex the curve falls as x grows; right of it, it rises. (Chapter 3: slope = 2x, which is negative exactly when x is.)',
   fb:'Trace the curve with your finger near each point: moving right, are you climbing or descending?'},
  {t:'say', html:`<p>Even <b>without a formula</b> the method works. Fruit-fly data: 150 flies on day 23, 255 on day 30, 340 on day 45.</p>
   <div class="formula">[23,45]: 190/22 ≈ 8.6 flies/day &nbsp;→&nbsp; [23,30]: 105/7 = 15 flies/day &nbsp;→&nbsp; tangent ≈ 16.7 flies/day</div>
   <p>Shorter intervals, steeper and settling estimates. Inputs read from a graph are approximate (16 or 17 both defensible) — the <i>method</i>, shrink and watch the trend, is the lesson.</p>`},
  {t:'say', html:`<p>One more life connection: interval speed cameras time your plate between two gantries. 20 km in 9 min ⇒ average 133 km/h — a ticket regardless of braking at fixed cameras. The speedometer and the camera compute the <b>same quotient</b>; they differ only in h: large h = average, h → 0 = instant.</p>
   <p class="muted">Teaser: if your segment average is 133 in a 120 zone, must the speedometer have shown ≥133 at some instant? Chapter 4\'s Mean Value Theorem says yes.</p>`},
  {t:'recap', title:'§2.1 Takeaways', mn:'Expand → cancel h (h≠0) → let h → 0. Average is a secant; the limit secant is the tangent, and its slope is the instantaneous rate.',
   items:['Average rate Δy/Δt = secant slope through P and Q',
          'Galileo: y = 4.9t² ⇒ instantaneous v(t) = 9.8t',
          'Never set h = 0 before canceling — 0/0 is undefined',
          'Tangent = limiting position of secants; NOT "touches once"',
          'Local linearity: zoom in, curve and tangent merge',
          'Method works on data too: shrink intervals and watch the trend']}
]},

/* ---------------- §2.2 ---------------- */
{title:'§2.2 Limits & Limit Laws', steps:[
  {t:'say', html:`<p>Section 2.2 names what §2.1 was doing. <b>Informal definition:</b> we write</p>
   <div class="formula">lim<sub>x→c</sub> f(x) = L</div>
   <p>if f(x) stays <b>arbitrarily close</b> to L for all x <b>sufficiently close</b> to c — with x ≠ c. Three phrases to lock in:</p>
   <ul class="recap"><li><b>arbitrarily close</b> — beat any tolerance you name, not merely "close enough"</li>
   <li><b>from both sides</b> — same destination from x &lt; c and x &gt; c</li>
   <li><b>x ≠ c</b> — the limit judges the neighborhood, never the point itself</li></ul>`,
   detail:'A limit is about the journey near c, not the arrival at c. Reading the arrows: x → c means the input slides toward c from both sides without landing on it; f(x) → L means the output is forced toward L. "Closer input ⇒ closer output" with no exceptions allowed. The precise ε–δ contract arrives in §2.3.'},
  {t:'say', html:`<p>Meet the most important picture in the chapter — a function with a <b>hole</b> <span class="zh">洞</span>:</p>
   <div class="formula">f(x) = (x² − 1)/(x − 1) = (x−1)(x+1)/(x−1) = x + 1 &nbsp;(for x ≠ 1)</div>
   <p>f(1) is undefined — division by zero — so the graph is the line y = x+1 with a hole punched at (1,2). But the table: 0.9→1.9, 0.99→1.999 from the left; 1.1→2.1, 1.01→2.01 from the right. Both sides aim at 2.</p>`},
  {t:'ask', q:'f(1) does not exist. What is lim x→1 f(x)?',
   choices:[
     {txt:'2 — the value both sides approach',ok:true},
     {txt:'Does not exist, because f(1) is undefined',ok:false},
     {txt:'0/0, so no answer',ok:false}],
   ok:'2. The hole does not hurt the limit at all — x ≠ 1 is built into the definition.',
   fb:'Remember phrase three: the limit never looks at the point itself.',
   h2:'Trace both sides toward x=1: heights 1.9, 1.99… and 2.1, 2.01… where do they meet?'},
  {t:'ask', q:'Now consider three functions near x = 1: (a) the hole above, (b) g(x)=x+1 except g(1)=1, (c) h(x)=x+1 everywhere. Compare their limits at 1.',
   choices:[
     {txt:'All three have limit 2 — the point value is irrelevant',ok:true},
     {txt:'Only (c) has a limit',ok:false},
     {txt:'(a) DNE, (b) = 1, (c) = 2',ok:false}],
   ok:'All three: 2. Undefined, wrong dot, right dot — the limit ignores f(c) completely. (That wrong-dot case will be a removable discontinuity in §2.5.)',
   detail:'This is why canceling a common factor is legal: (x²−1)/(x−1) and x+1 differ ONLY at x = 1 itself, and the limit deliberately excludes that point. Two functions differing at a single point have the same limit there.'},
  {t:'say', html:`<p>Two seed limits that generate everything else:</p>
   <div class="formula">lim<sub>x→c</sub> x = c &nbsp;&nbsp;·&nbsp;&nbsp; lim<sub>x→c</sub> k = k</div>
   <p>The identity copies its input; a constant has nowhere to move. Every polynomial is built from x and constants using + and ×, e.g. 3x² − 5x + 2 = 3·(x·x) − 5·x + 2. So if limits respect arithmetic, polynomial limits become routine.</p>`},
  {t:'say', html:`<p>Limits can also <b>fail to exist (DNE)</b> in three classic ways:</p>
   <ul class="recap"><li><b>Jump</b> — the unit step U(x): 0 on the left, 1 on the right. Two candidates, no agreement.</li>
   <li><b>Blow-up</b> — 1/x² near 0: values exceed every bound; no finite L exists.</li>
   <li><b>Oscillation</b> — sin(1/x) near 0: swings −1 to 1 infinitely often, never settling.</li></ul>`},
  {t:'ask', q:'As x → 0, sin(1/x) takes values +1 and −1 infinitely many times. Which failure mode?',
   choices:[{txt:'Oscillation',ok:true},{txt:'Jump',ok:false},{txt:'Blow-up',ok:false}],
   ok:'Oscillation — bounded but forever restless; no single L.'},
  {t:'ask', q:'1/x² near x = 0: 100, then 10,000, then 1,000,000… Which failure mode?',
   choices:[{txt:'Blow-up (infinite)',ok:true},{txt:'Jump',ok:false},{txt:'Oscillation',ok:false}],
   ok:'Blow-up — the values escape beyond every finite bound. §2.6 calls this "an informative DNE".'},
  {t:'ask', q:'U(x) approaches 0 from the left and 1 from the right. Which failure mode?',
   choices:[{txt:'Jump',ok:true},{txt:'Blow-up',ok:false},{txt:'Oscillation',ok:false}],
   ok:'Jump — each side is calm, but they disagree. §2.4 makes this exact idea systematic.'},
  {t:'say', html:`<p><b>Theorem 1 — the seven Limit Laws.</b> If lim f = L and lim g = M (both finite), and k is constant:</p>
   <div class="formula">sum L+M · difference L−M · constant multiple kL · product LM<br>quotient L/M (M ≠ 0) · power Lⁿ · root ⁿ√L</div>
   <p>In one sentence: <b>limits respect algebra</b> — provided every piece has a limit (and, for division, the bottom survives nonzero).</p>`,
   detail:'Fine print worth exam points: the laws run only when the individual limits EXIST. lim x·sin(1/x) = 0 is true, but splitting it into (lim x)(lim sin(1/x)) is illegal because sin(1/x) has no limit — the squeeze handles it instead. The quotient law needs M ≠ 0; L/M with M = 0 is exactly the 0/0 investigation below.'},
  {t:'ask', q:'To apply the quotient law lim f/g = L/M, what must you check?',
   choices:[
     {txt:'M ≠ 0 — the denominator limit survives',ok:true},
     {txt:'L ≠ 0 — numerator must be nonzero',ok:false},
     {txt:'Nothing — division always works',ok:false}],
   ok:'M ≠ 0. Zero numerator is harmless (0/6 = 0); a zero denominator blocks the law and demands algebra.',
   fb:'Recall the table on the board: which letter was forbidden to be 0?'},
  {t:'say', html:`<p><b>Theorem 2 — polynomials: just plug in.</b></p>
   <div class="formula">lim<sub>x→c</sub> P(x) = P(c)</div>
   <p>Worked: lim x→2 (x³ + 4x² − 3) = 8 + 16 − 3 = <b>21</b>. You don\'t write the laws each time; they are the license making substitution legal.</p>`},
  {t:'ask', q:'Quick plug-in: lim x→3 (x² − 2x + 5) = ?',
   choices:[
     {txt:'9 − 6 + 5 = 8',ok:true},
     {txt:'9 + 6 + 5 = 20',ok:false},
     {txt:'0',ok:false}],
   ok:'8. Polynomials are the easy case — always.',
   fb:'3² = 9; −2·3 = −6; then +5.'},
  {t:'say', html:`<p><b>Theorem 3 — rational functions: plug in IF the denominator survives.</b> Build the habit in this order:</p>
   <div class="mn"><b>Denominator first.</b> If Q(c) ≠ 0: lim P/Q = P(c)/Q(c).<br>
   Zero numerator is harmless: 0/6 = 0 is a perfectly good limit.<br>
   But numerator nonzero over denominator 0: blow-up, DNE.</div>
   <p>Example: lim x→−1 (x³ + 4x² − 3)/(x² + 5): denominator 1 + 5 = 6 ≠ 0 ✓, numerator −1 + 4 − 3 = 0, answer 0/6 = 0.</p>`},
  {t:'ask', q:'First move for ANY rational limit lim x→c P(x)/Q(x)?',
   choices:[
     {txt:'Compute Q(c) — it chooses your method',ok:true},
     {txt:'Factor everything immediately',ok:false},
     {txt:'Conjugate the numerator',ok:false}],
   ok:'15 seconds that choose your weapon: Q(c) ≠ 0 → substitute; Q(c) = 0 → investigate.',
   fb:'The board says denominator…?'},
  {t:'say', html:`<p>If plugging in gives <b>0/0</b>, do not panic and do not write a number: <b>0/0 is an indeterminate form</b> <span class="zh">不定式</span> — a <i>signal</i>, not a value. It does not equal 1, and it does not mean DNE. It means the quotient law is blocked, so do algebra first. Both top and bottom vanish ⇒ a common factor hides there.</p>
   <p>Strategy ①: <b>factor and cancel</b> the common zero-factor — legal because the limit only sees x ≠ c.</p>`,
   detail:'Why "indeterminate"? 0/0 alone tells you nothing about the answer: different 0/0 forms produce 3, or 0, or ∞, depending on HOW the top and bottom race to zero. Compare 2x/x → 2 versus x/x² → ∞. The form refuses to determine the answer — hence the name.'},
  {t:'ask', q:'Homework 2(a): lim x→1 (x² + x − 2)/(x − 1). Plugging in gives 0/0. Factor the numerator.',
   choices:[
     {txt:'(x + 2)(x − 1)',ok:true},
     {txt:'(x − 2)(x + 1)',ok:false},
     {txt:'(x + 1)(x + 2)',ok:false}],
   ok:'(x + 2)(x − 1) — and the (x − 1) matches the denominator. The villain is in sight.',
   h2:'Find two numbers multiplying to −2 and adding to +1.',
   scaffold:[
    {q:'Two numbers that multiply to −2 and add to +1:',
     choices:[{txt:'+2 and −1',ok:true},{txt:'−2 and +1',ok:false},{txt:'+2 and +1',ok:false}],
     fb:'Their product must be negative.',oktxt:'+2 and −1 → (x+2)(x−1).'},
    {q:'So the common factor with the denominator is…',
     choices:[{txt:'(x − 1) — cancel it',ok:true},{txt:'(x + 2) — cancel it',ok:false}],
     fb:'The denominator is exactly (x − 1).',oktxt:'Cancel (x − 1), leaving (x+2)/1.'}
   ]},
  {t:'ask', q:'After canceling, lim x→1 (x + 2)/1 = ?',
   choices:[
     {txt:'3',ok:true},{txt:'0',ok:false},{txt:'Still 0/0',ok:false}],
   ok:'3. The canceled function equals the original for all x ≠ 1, and Theorem 3 now applies. A failed substitution is not a failed limit.',
   fb:'The canceled expression is x + 2 — plug in x = 1.'},
  {t:'say', html:`<p>Strategy ② when a square root causes the 0/0: <b>rationalize with the conjugate</b>. Difference of squares: (a−b)(a+b) = a² − b² sweeps the root away.</p>
   <p>Homework 2(b): lim x→0 (√(x+4) − 2)/x. Multiply top and bottom by √(x+4) + 2:</p>
   <div class="formula">[(x+4) − 4] / [ x(√(x+4) + 2) ] = x / [x(√(x+4) + 2)] = 1/(√(x+4) + 2) → 1/4</div>
   <p>Cancel x (x ≠ 0), then substitute: 1/(2 + 2) = <b>1/4</b>.</p>`,
   detail:'Reach for the conjugate when (1) 0/0 is caused by "√something − constant", and (2) factoring cannot touch the root. Conjugate ⇒ root squared away ⇒ common factor appears ⇒ cancel ⇒ substitute. This same trick rescues computers from catastrophic cancellation on the next card.'},
  {t:'ask', q:'For lim x→0 (√(x+4) − 2)/x, the decisive first move is…',
   choices:[
     {txt:'Multiply top and bottom by the conjugate √(x+4) + 2',ok:true},
     {txt:'Declare DNE because plugging gives 0/0',ok:false},
     {txt:'Divide numerator and denominator by x²',ok:false}],
   ok:'Conjugate first — it converts the subtraction of roots into (x+4) − 4 = x, which then cancels.',
   fb:'0/0 with a square root: which of the two strategies?'},
  {t:'input', q:'Try one yourself: lim x→0 (√(x + 9) − 3)/x = ? (Multiply by √(x+9) + 3; give the fraction.)',
   accept:v=>{const s=norm(v);return s==='1/6'||s==='0.1667'||s==='0.1666667';},
   fb:'After conjugating and canceling: 1/(√(x+9) + 3). Let x = 0.',
   h2:'Conjugate gives 1/(√(x+9) + 3); at x = 0 the bottom is 3 + 3.',
   reveal:'1/(3 + 3) = 1/6.',
   placeholder:'e.g. 1/6'},
  {t:'say', html:`<p><b>Why tables can lie.</b> (√(x²+100) − 10)/x² honestly tends to 1/20 = 0.05, and a table shows it. But at x = 10⁻⁸ a computer stores x²+100 as exactly 100 (only ~16 digits are kept), gets 10−10 = 0, and reports limit 0 — wrong.</p>
   <div class="mn">Subtracting nearly equal numbers destroys significant digits. <b>Tables suggest; algebra decides.</b></div>`},
  {t:'say', html:`<p><b>Piecewise functions: choose the branch first.</b> A limit as x → c is <b>local</b> — only the formula living around c matters.</p>
   <p>For f(x) = x + 2 (x &lt; 1), f(x) = x² (x ≥ 1): away from the seam just use the local branch. AT the seam x = 1, caution — both branches vote, and we need §2.4 to count the vote.</p>`},
  {t:'ask', q:'For that piecewise f, lim x→−2 f(x) = ? (Which branch owns the neighborhood of −2?)',
   choices:[
     {txt:'−2 + 2 = 0',ok:true},
     {txt:'(−2)² = 4',ok:false},
     {txt:'DNE — it is piecewise',ok:false}],
   ok:'0 — far from the seam the line x + 2 is the only local formula. Being piecewise creates trouble only AT the seam.',
   fb:'−2 &lt; 1, so the neighborhood uses x + 2.'},
  {t:'say', html:`<p><b>Theorem 4 — the Sandwich (Squeeze) Theorem</b> <span class="zh">夹逼定理</span>.</p>
   <p>If g(x) ≤ f(x) ≤ h(x) near c (the point c itself exempt) and the two outer functions share the limit L, then the trapped middle has no choice: lim f = L.</p>
   <p>Elevator version: you are squeezed between two sumo wrestlers; both get out at floor L — you get out at floor L too.</p>`,
   detail:'Checklist before squeezing: ① the inequality holds on an open interval around c (c exempt — holes fine); ② both outer limits exist; ③ they are EQUAL. Different destinations give no conclusion. Corollary that suffocates oscillation: if |f(x)| ≤ g(x) and g → 0, then −g ≤ f ≤ g with both guards → 0, so f → 0.'},
  {t:'ask', q:'Homework 3: prove lim x→0 x² sin(1/x) = 0. Since −1 ≤ sin(1/x) ≤ 1, multiplying by x² gives bounds…',
   choices:[
     {txt:'−x² ≤ x² sin(1/x) ≤ x², and both → 0',ok:true},
     {txt:'−1 ≤ x² sin(1/x) ≤ 1, useless',ok:false},
     {txt:'No bounds — sin(1/x) has no limit',ok:false}],
   ok:'The shrinking envelope −x² … x² both collapse to 0, so the wild oscillation inside is crushed to 0. State "by the Sandwich Theorem" — exam marks live in naming it.',
   h2:'Multiply the whole known inequality −1 ≤ sin(1/x) ≤ 1 through by x².',
   scaffold:[
    {q:'What does −1 ≤ sin(1/x) ≤ 1 become after multiplying all three parts by x²?',
     choices:[{txt:'−x² ≤ x² sin(1/x) ≤ x²',ok:true},{txt:'−x ≤ x² sin(1/x) ≤ x',ok:false}],
     fb:'Multiply the sine itself: x²·(−1), x²·sin, x²·1.',oktxt:'−x² ≤ x² sin(1/x) ≤ x².'},
    {q:'lim x² as x → 0 = 0. Both guards reach floor 0, so the middle…',
     choices:[{txt:'Is forced to 0 by the Sandwich Theorem',ok:true},{txt:'Has no limit because sin(1/x) oscillates',ok:false}],
     fb:'Where both wrestlers go, you go.',oktxt:'lim = 0 — amplitude dies even though the wiggling never stops.'}
   ]},
  {t:'say', html:`<p>Two finishing details. <b>Theorem 5:</b> limits preserve ≤ but not strict &lt;. If f &lt; g everywhere near c, the limits may still be EQUAL (x² &lt; 2x², yet both → 0). Runners can tie at the finish line.</p>
   <div class="mn"><b>Four mistakes to never make:</b><br>① "0/0 = 1" — it is a signal, never a value<br>② "substitution failed, so DNE" — a failed method ≠ a failed limit<br>③ "my calculator proved it" — tables suggest, theorems prove<br>④ splitting laws when a piece has no limit — squeeze instead</div>`},
  {t:'recap', title:'§2.2 Takeaways', mn:'0/0 is a signal, not an answer. Check the denominator first; polynomials plug in; factor or conjugate for holes; sandwich the un-touchable.',
   items:['Limit: arbitrarily close, both sides, x ≠ c — the point value is ignored',
          'Hole (x²−1)/(x−1) → 2 even though f(1) is undefined',
          'Three DNE modes: jump, blow-up, oscillation',
          'Seven Limit Laws; quotient law needs M ≠ 0',
          'Polynomials: lim P = P(c); rationals if Q(c) ≠ 0',
          '0/0 toolbox: factor & cancel, or conjugate & cancel',
          'Sandwich: g ≤ f ≤ h, both guards → L ⇒ f → L',
          'Strict f < g may become lim f = lim g']}
]},

/* ---------------- §2.3 ---------------- */
{title:'§2.3 Precise Definition (ε–δ)', steps:[
  {t:'say', html:`<p>Section 2.3 answers a famous attack. In 1734 Bishop Berkeley mocked calculus: we divide by h (so h ≠ 0), then discard h (so h = 0) — "ghosts of departed quantities." Results were right; logic was missing for 150 years.</p>
   <p>Cauchy (1821) began the rescue; Weierstrass (1860s) finished it with pure inequalities. The payoff isn\'t pedantry — the ε–δ definition is <i>what makes the Limit Laws true</i>.</p>`},
  {t:'say', html:`<p>Read the definition as a <b>challenge-and-response game</b> <span class="zh">挑战与应答</span> with infinitely many rounds:</p>
   <ul class="recap"><li><b>Move 1 — Challenge:</b> a challenger names ANY ε &gt; 0, a tolerance on the OUTPUT: "keep f(x) within ε of L." No limit on how tiny.</li>
   <li><b>Move 2 — Response:</b> you produce a δ &gt; 0, a tolerance on the INPUT, promising 0 &lt; |x − c| &lt; δ ⇒ |f(x) − L| &lt; ε.</li>
   <li><b>Move 3 — Win:</b> win a round if the promise holds; win the game only if you can answer EVERY ε at once (usually with a formula δ(ε)).</li></ul>`,
   detail:'Machining makes it literal: a bearing spec "20.00 ± 0.01 mm" is the customer\'s epsilon; the machinist responds by controlling cutting speed, tool wear and coolant tightly enough (delta) that every shaft lands in band. GPS clock precision, camera exposure, weighing salt — every engineering discipline plays this game. Weierstrass just wrote the rules.'},
  {t:'ask', q:'In the game, who chooses ε and what is δ?',
   choices:[
     {txt:'The challenger chooses ε (output tolerance); I respond with δ (input tolerance)',ok:true},
     {txt:'I choose one fixed δ that works before seeing ε',ok:false},
     {txt:'The challenger chooses both ε and δ',ok:false}],
   ok:'Every lock gets its own key: δ may depend on ε. A formula like δ = ε/2 answers all rounds simultaneously.',
   fb:'Recall move 1 vs move 2 — which player makes which move?'},
  {t:'widget', id:'epsd',
   html:`<p>Play it for real. The graph is f(x) = 2x − 1 near c = 3, L = 5 (your Homework 5). Pick an ε, then adjust δ until every point in the blue x-band maps inside the green y-band. Press <b>Challenge me</b> for random rounds; toggle the quadratic to meet the min(1, ε/M) case.</p>`},
  {t:'ask', q:'For f(x) = 2x − 1 near c = 4 (lecture example, L = 7), with ε = 1: which δ wins? Slope is 2, so the input band must be half as wide.',
   choices:[
     {txt:'δ = 0.5',ok:true},{txt:'δ = 1',ok:false},{txt:'δ = 2',ok:false}],
   ok:'δ = 0.5: 3.5 < x < 4.5 maps to 6 < y < 8. General recipe for a line: δ = ε/|m|.',
   fb:'Error |f(x) − L| = 2|x − 4|; to keep that below 1, keep |x−4| below…?'},
  {t:'say', html:`<p><b>The definition, every symbol under the spotlight:</b></p>
   <div class="formula">lim<sub>x→c</sub> f(x) = L &nbsp;⟺&nbsp; ∀ ε &gt; 0 &nbsp;∃ δ &gt; 0 :<br>0 &lt; |x − c| &lt; δ &nbsp;⇒&nbsp; |f(x) − L| &lt; ε</div>
   <p><b>∀ ε</b> = the challenge, however small. <b>∃ δ</b> = your response, one exhibited window. <b>0 &lt; |x−c|</b> = the punctured neighborhood: x is near c but never equals it. <b>|f(x)−L| &lt; ε</b> = the promised output accuracy.</p>`},
  {t:'say', html:`<p>Three pieces of fine print:</p>
   <ul class="recap"><li><b>Order matters:</b> ∀ε ∃δ is "every lock has a key" (normal). ∃δ ∀ε would be one master key for all locks — a different, much stronger claim nobody demands.</li>
   <li><b>The puncture is deliberate:</b> excluding x = c is exactly what lets limits see through holes, and later lets continuity compare limit with value.</li>
   <li><b>Smaller δ always works:</b> if δ wins, any δ′ &lt; δ wins. That is why δ = min(1, ε/7)-style answers are legal.</li></ul>`},
  {t:'ask', q:'Why is the inequality 0 < |x − c| (strict at 0) instead of just |x − c| < δ?',
   choices:[
     {txt:'To exclude x = c itself — the limit ignores f(c)',ok:true},
     {txt:'To make the algebra easier',ok:false},
     {txt:'To require f(c) = L',ok:false}],
   ok:'The point c is punctured on purpose: holes, undefined values and wrong dots can never affect a limit.',
   fb:'Think of the hole (x²−1)/(x−1): what happens at exactly x=1?'},
  {t:'say', html:`<p><b>The proof template</b> — two documents. <b>Scratch work</b> (private, backwards): unwrap |f(x) − L| to discover δ. <b>Formal proof</b> (public, forwards):</p>
   <div class="mn">① Let ε &gt; 0 be given → ② choose δ = … → ③ assume 0 &lt; |x−c| &lt; δ → ④ compute |f(x)−L| &lt; ε. ■</div>
   <p>Lecture example, lim x→2 (5x − 3) = 7: scratch gives |(5x−3) − 7| = 5|x−2|, so δ = ε/5; the formal proof then reads 5|x−2| &lt; 5δ = ε.</p>`},
  {t:'ask', q:'Homework 5: lim x→3 (2x − 1) = 5. Scratch work — factor the slope out of the error: |(2x − 1) − 5| = ?',
   choices:[
     {txt:'|2x − 6| = 2|x − 3|',ok:true},
     {txt:'|2x − 4| = 2|x − 2|',ok:false},
     {txt:'2|x + 3|',ok:false}],
   ok:'2|x − 3| — the error in the output is exactly slope × input-error. To keep it below ε, require |x−3| < ε/2.',
   fb:'Simplify inside the bars: (2x − 1) − 5 = 2x − 6 = 2(x − 3).'},
  {t:'input', q:'So δ = ε/2 answers the whole game. What specific δ works for ε = 0.01? (Give the decimal.)',
   accept:v=>{const n=parseFloat(norm(v));return !isNaN(n)&&Math.abs(n-0.005)<1e-12;},
   fb:'δ = ε/2 = 0.01/2.',
   h2:'Half of 0.01 — divide by the slope.',
   reveal:'δ = 0.005.',
   placeholder:'e.g. 0.005'},
  {t:'say', html:`<p><b>The nonlinear case needs the min trick.</b> Proving lim x→3 x² = 9, factor the error:</p>
   <div class="formula">|x² − 9| = |x − 3| · |x + 3|</div>
   <p>The first factor is ours to control, but |x + 3| is a moving target. <b>Freeze it:</b> first require |x − 3| &lt; 1, forcing 2 &lt; x &lt; 4, so |x + 3| &lt; 7. Then the error &lt; 7|x−3|, below ε once |x−3| &lt; ε/7.</p>
   <div class="formula">δ = min(1, ε/7)</div>
   <p>Each condition inside the minimum pays for one line of the proof. Quadratic recipe: factor out |x−c| → bound the leftover factor by M under |x−c| &lt; 1 → δ = min(1, ε/M).</p>`,
   detail:'Formal finish: assume 0 < |x−3| < δ. Since δ ≤ 1: |x+3| < 7. Since δ ≤ ε/7: |x²−9| = |x−3||x+3| < (ε/7)·7 = ε. ■ The widget\'s quadratic mode checks exactly this numerically.'},
  {t:'ask', q:'Why do we first impose |x − 3| < 1 in the quadratic proof?',
   choices:[
     {txt:'To freeze the moving factor |x + 3| against a fixed bound M',ok:true},
     {txt:'Because δ must always equal 1',ok:false},
     {txt:'To make x² continuous',ok:false}],
   ok:'Bound the leftover factor by a constant, and the problem collapses to the linear case. min(1, ε/7) keeps both guarantees alive.',
   fb:'One factor |x−3| we control directly; what is troublesome about |x+3|?'},
  {t:'say', html:`<p>The definition also proves our Limit Laws. <b>Sum Law sketch:</b> to make two output-errors sum below ε, give each function a budget of ε/2; the definition supplies δ₁ and δ₂; choose δ = min(δ₁, δ₂); the triangle inequality |a+b| ≤ |a|+|b| finishes:</p>
   <div class="formula">|(f+g) − (L+M)| ≤ |f−L| + |g−M| &lt; ε/2 + ε/2 = ε</div>
   <p>One definition used twice, a minimum stitching the windows together.</p>`},
  {t:'say', html:`<p>Finally, proving a limit does NOT exist: exhibit ONE bad ε defeating every δ for every candidate L.</p>
   <p>For f(x) = |x|/x at 0: every window (−δ, δ) contains points where f = +1 AND points where f = −1. With ε = ½ no single L can sit within ½ of both values — every δ fails. (ε = 2 would be too weak: L = 0 would survive.)</p>`},
  {t:'recap', title:'§2.3 Takeaways', mn:'Challenger names ε; you exhibit δ(ε); win every round. Lines: δ = ε/|m|; curves: δ = min(1, ε/M); puncture at x = c.',
   items:['∀ ε > 0 ∃ δ > 0: 0 < |x−c| < δ ⇒ |f(x)−L| < ε',
          'Linear f(x) = mx + b: δ = ε/|m| (HW: δ = ε/2)',
          'Quadratics: bound the leftover factor, δ = min(1, ε/M)',
          'Scratch work backward; formal proof forward in four lines',
          'Quantifier order ∀ε∃δ; smaller δ always legal',
          'Sum Law: split the budget ε/2 + ε/2, take min, use triangle inequality',
          'DNE proof: one bad ε (½ for |x|/x) breaks all δ']}
]},

/* ---------------- §2.4 ---------------- */
{title:'§2.4 One-Sided Limits', steps:[
  {t:'say', html:`<p>At jumps and domain endpoints, approach from one side only.</p>
   <div class="formula">lim<sub>x→c⁺</sub> f(x) = L &nbsp;(x &gt; c, right-hand) &nbsp;·&nbsp; lim<sub>x→c⁻</sub> f(x) = M &nbsp;(x &lt; c, left-hand)</div>
   <p>Example: f(x) = √(4 − x²) has domain [−2, 2]. At x = −2 only the RIGHT-hand limit makes sense (0); at x = 2 only the LEFT-hand (0). Half the neighborhood simply doesn\'t exist there.</p>`},
  {t:'ask', q:'At the left endpoint x = −2 of that semicircle, which limit is meaningful?',
   choices:[
     {txt:'The right-hand limit x → −2⁺',ok:true},
     {txt:'The left-hand limit x → −2⁻',ok:false},
     {txt:'Neither — endpoints break calculus',ok:false}],
   ok:'Only x > −2 is in the domain, so the approach is one-sided: lim x→−2⁺ = 0.',
   fb:'Which side of −2 actually belongs to the domain [−2, 2]?'},
  {t:'say', html:`<p><b>Theorem 6 — the two sides must agree.</b></p>
   <div class="formula">lim<sub>x→c</sub> f(x) = L &nbsp;⟺&nbsp; lim<sub>x→c⁻</sub> f(x) = L &nbsp;<b>and</b>&nbsp; lim<sub>x→c⁺</sub> f(x) = L</div>
   <p>Sides agree ⇒ the two-sided limit exists (even if f(c) is undefined or wrong). Sides disagree, or either side fails ⇒ DNE. At a piecewise seam this theorem is your whole procedure: compute each side, compare.</p>`,
   detail:'Worked: f(x) = x+1 for x < 1, f(x) = 3−x for x ≥ 1. Left: 1+1 = 2. Right: 3−1 = 2. Agreement ⇒ lim x→1 f = 2. The precise one-sided definitions just replace 0 < |x−c| < δ by 0 < x−c < δ (right) or −δ < x−c < 0 (left).'},
  {t:'ask', q:'f(x) = |x|/x: for x > 0 it equals +1, for x < 0 it equals −1 (undefined at 0). The one-sided limits are…',
   choices:[
     {txt:'Left −1, right +1 ⇒ two-sided DNE',ok:true},
     {txt:'Both 0',ok:false},
     {txt:'Left +1, right −1 ⇒ limit 0',ok:false}],
   ok:'−1 and +1 disagree, so Theorem 6 says DNE. This is the cleanest jump in the chapter — and the same function ε–δ could not tame.',
   h2:'Simplify each branch: x>0 gives x/x; x<0 gives (−x)/x.',
   scaffold:[
    {q:'For x > 0, |x| = x, so |x|/x = ?',
     choices:[{txt:'1',ok:true},{txt:'−1',ok:false}],
     fb:'Positive over positive.',oktxt:'+1 on the right.'},
    {q:'For x < 0, |x| = −x, so |x|/x = ?',
     choices:[{txt:'−1',ok:true},{txt:'1',ok:false}],
     fb:'−x divided by x.',oktxt:'−1 on the left; disagreeing sides ⇒ DNE.'}
   ]},
  {t:'say', html:`<p>Oscillation defeats even the one-sided game: as x → 0⁺, 1/x → +∞ and sin(1/x) swings −1 to 1 infinitely often — sequences x = 1/(nπ) give 0 while others give 1, so no right-hand limit exists.</p>
   <p>The tame cousin tells a different story: g(x) = x sin(1/x) satisfies −|x| ≤ g(x) ≤ |x|, both guards → 0. <b>The oscillation stays; the amplitude dies.</b></p>`},
  {t:'ask', q:'lim x→0 x sin(1/x) = ? (Envelope: between −|x| and |x|.)',
   choices:[
     {txt:'0 — sandwich with both bounds → 0',ok:true},
     {txt:'DNE — sin(1/x) has no limit',ok:false},
     {txt:'1',ok:false}],
   ok:'0 by the Sandwich Theorem. Multiplying an anarchist by something that shrinks to zero can still produce a limit.',
   fb:'Both outer functions −|x| and |x| head to the same floor — which?'},
  {t:'say', html:`<p>The most-used limit in Chapter 3 — <b>Theorem 7:</b></p>
   <div class="formula">lim<sub>θ→0</sub> sin θ / θ = 1 &nbsp;&nbsp;(θ in RADIANS)</div>
   <p>A genuine 0/0: top and bottom race to zero and tie. Calculator in RAD mode: sin(0.1)/0.1 = 0.99833, sin(0.01)/0.01 = 0.99998 — the table smells the answer 1.</p>`},
  {t:'say', html:`<p><b>Why it is true — three nested areas.</b> On the unit circle for 0 &lt; θ &lt; π/2:</p>
   <div class="formula">area △OAP = ½ sin θ &nbsp;&lt;&nbsp; sector area = θ/2 &nbsp;&lt;&nbsp; area △OAT = ½ tan θ</div>
   <p>Divide by ½ sin θ, invert carefully: cos θ &lt; sin θ/θ &lt; 1. As θ → 0⁺, cos θ → 1, so the Sandwich pins sin θ/θ → 1. The function is even, so the left side agrees. ■</p>`,
   detail:'Why radians are mandatory: sector area = θ/2 is true only when θ is measured in radians (arc length s = rθ). In degrees the same limit is π/180, and every derivative formula in Chapter 3 would carry that ugly factor forever. Check RAD mode every time. Historical payoff: Huygens\' pendulum clock (1656) already relied on sin θ ≈ θ for small swings.'},
  {t:'ask', q:'The proof compares three areas. Which fact forces radians into Theorem 7?',
   choices:[
     {txt:'Sector area = θ/2 only in radians',ok:true},
     {txt:'Triangles only exist in radians',ok:false},
     {txt:'Sine is undefined in degrees',ok:false}],
   ok:'The sector-area formula uses arc length rθ, and that identity is radian-only. π/180 lurks in any degree computation.',
   fb:'Which of the three area formulas mentions the angle unit explicitly?'},
  {t:'say', html:`<p><b>Spending Theorem 7 — the matching-coefficient trick.</b> (a) Reshape until sin u over the SAME u appears:</p>
   <div class="formula">lim sin(3θ)/(5θ) = lim (3/5) · sin(3θ)/(3θ) = 3/5 &nbsp;(set u = 3θ → 0)</div>`},
  {t:'ask', q:'Homework 4(b): lim x→0 tan(2x)/x. Rewrite tan as sin/cos: sin(2x)/(x cos 2x) = 2 · [sin 2x/(2x)] · 1/cos 2x. The limit is…',
   choices:[
     {txt:'2 · 1 · 1 = 2',ok:true},{txt:'1',ok:false},{txt:'2x, so 0',ok:false}],
   ok:'2 — Theorem 7 charges sin 2x/(2x) to 1, and cos 2x → 1. Same trick, one extra factor.',
   h2:'Manufacture the same 2x inside sin and in the denominator: multiply by 2/2.',
   scaffold:[
    {q:'tan(2x) splits into which two trig pieces?',
     choices:[{txt:'sin(2x) / cos(2x)',ok:true},{txt:'cos(2x) / sin(2x)',ok:false}],
     fb:'tan = sin/cos, always.',oktxt:'sin(2x)/(x cos 2x).'},
    {q:'Force the shape sin u/u with u = 2x: rewrite as…',
     choices:[{txt:'2 · sin(2x)/(2x) · 1/cos(2x) → 2·1·1',ok:true},{txt:'(1/2) · sin(2x)/(2x) → 1/2',ok:false}],
     fb:'You multiplied denominator by 2 to make 2x, so numerator needs 2 too.',oktxt:'Factor 2 out; both brackets tend to 1, answer 2.'}
   ]},
  {t:'input', q:'Rapid-fire: lim θ→0 sin(5θ)/θ = ? (Integer.)',
   accept:v=>norm(v)==='5',
   fb:'Write sin(5θ)/θ = 5 · sin(5θ)/(5θ).',
   h2:'Match the coefficient: multiply by 5/5.',
   reveal:'5 · 1 = 5.',
   placeholder:'e.g. 5'},
  {t:'say', html:`<p><b>The cosine companion:</b> lim h→0 (cos h − 1)/h = 0 — zero, not one!</p>
   <p>Using 1 − cos h = 2 sin²(h/2): the quotient becomes −sin(h/2) · [sin(h/2)/(h/2)] → (−0)·1 = 0. Needed in Chapter 3 to differentiate cos x.</p>`},
  {t:'ask', q:'lim h→0 (cos h − 1)/h = ?',
   choices:[
     {txt:'0',ok:true},{txt:'1',ok:false},{txt:'DNE',ok:false}],
   ok:'0 — don\'t confuse it with sin h/h = 1. The two companions behave differently.',
   fb:'The board just showed the identity work: a sine factor → 0 multiplies a bracket → 1.'},
  {t:'say', html:`<p><b>Small-angle bargain</b> <span class="zh">小角近似</span>: for θ in radians near zero,</p>
   <div class="formula">sin θ ≈ θ &nbsp;·&nbsp; tan θ ≈ θ</div>
   <p>Huygens used sin θ ≈ θ to solve the pendulum: T = 2π√(L/g) — daily clock error dropped from ~15 minutes to ~15 seconds. At 10° the error is only about 0.5%. Bridge vibrations, parallax in astronomy, nursing syringes measured at shallow angles — the same linearization everywhere.</p>`},
  {t:'recap', title:'§2.4 Takeaways', mn:'Two sides agree or the limit dies. sin θ/θ → 1 in radians; match the inner coefficient; the cosine companion goes to 0.',
   items:['Right-hand x→c⁺ (x > c); left-hand x→c⁻ (x < c)',
          'Theorem 6: two-sided limit exists iff both one-sided limits agree',
          '|x|/x: −1 left, +1 right ⇒ DNE; sin(1/x) oscillates ⇒ DNE',
          'x sin(1/x) → 0 by sandwiching in −|x|, |x|',
          'Theorem 7: lim sin θ/θ = 1 — radians only, proved by three nested areas',
          'Technique: reshape to sin u/u with the SAME u; tan 2x/x → 2',
          '(cos h − 1)/h → 0; small angle: sin θ ≈ θ, tan θ ≈ θ']}
]},

/* ---------------- §2.5 ---------------- */
{title:'§2.5 Continuity', steps:[
  {t:'say', html:`<p><b>Continuity</b> <span class="zh">连续</span> in one image: you can draw the graph near c without lifting your pen. Three informal tests say the same thing:</p>
   <ul class="recap"><li><b>Pen test:</b> no hole, no jump near c.</li>
   <li><b>Sensitivity test:</b> a small change in input causes only a small change in output.</li>
   <li><b>Prediction test:</b> f(c) is exactly the value the neighbors lead you to expect.</li></ul>
   <p>Body temperature through a day, your height since birth, a car\'s position on the highway — nature mostly moves continuously. Even in a crash the car passes through every intermediate position.</p>`},
  {t:'say', html:`<p><b>The three-item checklist.</b> f is continuous at an interior point c iff ALL hold:</p>
   <div class="mn">(i) f(c) is <b>defined</b> &nbsp;·&nbsp; (ii) lim<sub>x→c</sub> f(x) <b>exists</b> &nbsp;·&nbsp; (iii) the limit <b>equals</b> f(c)</div>
   <p>At an included endpoint only the matching one-sided limit is required. Learn to diagnose by naming WHICH item fails — that diagnoses the disease.</p>`},
  {t:'ask', q:'A graph near x = 1 approaches height 2 from both sides, but f(1) is undefined (a hole). Which checklist item fails?',
   choices:[
     {txt:'(i) — f(1) is not defined',ok:true},
     {txt:'(ii) — the limit does not exist',ok:false},
     {txt:'(iii) — value ≠ limit',ok:false}],
   ok:'Item (i): the limit exists (2), but there is no value there. This failure is patchable — you will see how in a few cards.',
   fb:'Run the three questions in order: first, does a value f(1) even exist?'},
  {t:'ask', q:'At x = 2 the left limit is 1 and the right limit is 3. Which item fails?',
   choices:[
     {txt:'(ii) — the (two-sided) limit does not exist',ok:true},
     {txt:'(i) — f(2) is undefined',ok:false},
     {txt:'(iii)',ok:false}],
   ok:'Item (ii): by Theorem 6, disagreeing sides mean no limit exists. No value at x=2 could fix that.',
   fb:'Theorem 6 from §2.4: when do two one-sided limits make a two-sided limit?'},
  {t:'ask', q:'Near x = 3 the curve approaches 2 from both sides, but the plotted dot sits at f(3) = 3. Which item fails?',
   choices:[
     {txt:'(iii) — limit and value disagree',ok:true},
     {txt:'(i)',ok:false},{txt:'(ii)',ok:false}],
   ok:'Item (iii): everything else is fine, but the dot is misplaced. Also patchable — redefine f(3) as 2.',
   fb:'Value exists ✓, limit exists ✓ — do they match?'},
  {t:'say', html:`<p><b>The four discontinuity species:</b></p>
   <ul class="recap"><li><b>Removable</b> <span class="zh">可去间断点</span>: hole or misplaced dot; the limit EXISTS — fix by redefining f(c).</li>
   <li><b>Jump</b> <span class="zh">跳跃间断点</span>: one-sided limits exist but disagree — postage, parking fees, floor ⌊x⌋.</li>
   <li><b>Infinite</b> <span class="zh">无穷间断点</span>: blow-up near a vertical asymptote, e.g. 1/x² at 0.</li>
   <li><b>Oscillating</b> <span class="zh">振荡间断点</span>: sin(1/x) at 0 — wiggles without settling, no limit, no asymptote.</li></ul>`},
  {t:'ask', q:'Classify: f(x) = 1/x² at x = 0 — values exceed every bound.',
   choices:[
     {txt:'Infinite discontinuity',ok:true},
     {txt:'Removable',ok:false},
     {txt:'Jump',ok:false}],
   ok:'Infinite — item (ii) fails by blow-up; no redefinition can repair it.',
   fb:'Which species grows without bound near a wall?'},
  {t:'ask', q:'Classify: (x² − 1)/(x − 1) at x = 1 — undefined there, but both sides approach 2.',
   choices:[
     {txt:'Removable — the limit 2 exists, patch the hole',ok:true},
     {txt:'Infinite',ok:false},
     {txt:'Oscillating',ok:false}],
   ok:'Removable — a finite limit exists, so defining f(1) = 2 repairs it completely. The diagnosis "removable" is exactly "limit exists".',
   fb:'Ask the key question: despite the hole, does the limit exist finitely?'},
  {t:'say', html:`<p>Staircases: the unit step U(x) is 0 for x &lt; 0, 1 for x ≥ 0 — a jump at 0, but <b>right-continuous</b> there because lim x→0⁺ U = 1 = U(0). Floor ⌊x⌋ jumps at every integer n (left limit n−1, right n = ⌊n⌋) and is continuous on each open interval (n, n+1).</p>
   <p class="muted">Real staircases: postage brackets, started-hour parking, taxi flag-fall, letter grades at 90 vs 89.9.</p>`},
  {t:'say', html:`<p><b>Theorem 8 — algebra preserves continuity.</b> If f, g continuous at c, so are f+g, f−g, k·f, f·g, f/g (g(c) ≠ 0), powers and roots. Two corollaries follow immediately:</p>
   <div class="mn">Polynomials are continuous on ALL of ℝ.<br>Rational functions P/Q are continuous wherever Q ≠ 0 — i.e. on their whole domain.</div>
   <p>One-line reason: the Limit Laws push limits through each operation, so lim of the combination = combination of the values = the value of the combination. That equality IS continuity.</p>`},
  {t:'say', html:`<p><b>Theorem 9 — composites stay continuous</b> (continuous in, continuous out): lim g(f(x)) = g(f(c)). Example: |x| = √(x²) — polynomial inside, root outside — is continuous on all of ℝ, even at the corner x = 0.</p>
   <div class="mn"><b>Continuous ≠ smooth.</b> |x| has a kink at 0 (no tangent there) but passes the continuity checklist perfectly. Keep those two words separate.</div>`},
  {t:'ask', q:'Rapid-fire 4: is f(x) = x² + |x| continuous at x = 0?',
   choices:[
     {txt:'Yes — sum of two continuous functions, value = limit = 0',ok:true},
     {txt:'No — |x| has a corner',ok:false},
     {txt:'Only from the right',ok:false}],
   ok:'Yes. f(0) = 0 and lim f = 0; corners hurt differentiability (Chapter 3), not continuity.',
   fb:'Theorem 8 says sums of continuous functions are continuous. Does the corner create a HOLE or a jump?'},
  {t:'say', html:`<p><b>Theorem 10 — limits pass INSIDE continuous functions:</b> if lim f(x) = L and g is continuous at L,</p>
   <div class="formula">lim g(f(x)) = g(lim f(x)) = g(L)</div>
   <p>This is the hidden license behind every substitution you have done: lim x→π/2 sin(2x + cos x) = sin(π) = 0. Warning: if g has a jump at L, the swap is illegal.</p>`},
  {t:'say', html:`<p><b>Continuous extension — patching one point.</b> f(x) = (x²+x−6)/(x²−4) = (x+3)(x−2)/[(x−2)(x+2)] = (x+3)/(x+2) for x ≠ 2. At x = 2, f is undefined, but</p>
   <div class="formula">lim<sub>x→2</sub> f(x) = 5/4</div>
   <p>Define F(2) = 5/4 and the hole is sealed: F is the <b>continuous extension</b>. The patching rule: a discontinuity is removable iff the limit there exists finitely. At x = −2 the same function blows up (numerator 1 ≠ 0) — no patch exists.</p>`},
  {t:'ask', q:'A function has a discontinuity at c. What is the exact test that it is REMOVABLE?',
   choices:[
     {txt:'lim x→c f(x) exists and is finite — then set f(c) to that limit',ok:true},
     {txt:'f(c) is merely undefined',ok:false},
     {txt:'The two sides go to +∞',ok:false}],
   ok:'Finite limit exists ⇒ removable, full stop. A blow-up or a jump cannot be patched by choosing one value.',
   fb:'Think of the two patch examples: what single fact made the hole sealable?'},
  {t:'say', html:`<p><b>Theorem 11 — Intermediate Value Theorem (IVT)</b> <span class="zh">介值定理</span>. If f is continuous on the closed interval [a,b] and N lies strictly between f(a) and f(b), then some c ∈ (a,b) satisfies f(c) = N.</p>
   <p>Plain version: a continuous curve cannot travel from height f(a) to height f(b) without visiting EVERY height in between. "At least one" c — not "exactly one".</p>`,
   detail:'Both hypotheses are load-bearing. 1/x on [−1,1] takes −1 and 1 yet never 0 — but it is not continuous on [−1,1], so IVT stays silent. Bolzano first proved it in 1817, demanding a proof from the definition of continuity rather than a picture — rigor travels slowly.'},
  {t:'ask', q:'Does IVT guarantee a zero of f(x) = 1/x somewhere in [−1, 1] (f(−1) = −1, f(1) = 1)?',
   choices:[
     {txt:'No — 1/x is not continuous on [−1,1] (blows up at 0)',ok:true},
     {txt:'Yes — signs differ, so there must be a root',ok:false},
     {txt:'Yes, at x = 0',ok:false}],
   ok:'No: the continuity hypothesis fails at x = 0. Different signs alone prove nothing without continuity — check both hypotheses every time.',
   fb:'IVT has TWO requirements. Which one does 1/x violate inside [−1,1]?'},
  {t:'say', html:`<p><b>Root-existence corollary (sign-change test):</b> f continuous on [a,b] with f(a), f(b) of opposite signs ⇒ a root lies in (a,b).</p>
   <p>Lecture example, f(x) = x³ − x − 1: it\'s a polynomial, so continuous everywhere. f(1) = 1 − 1 − 1 = −1 &lt; 0; f(2) = 8 − 2 − 1 = 5 &gt; 0. IVT with N = 0 guarantees a root in (1,2) — existence proved without solving anything.</p>`},
  {t:'ask', q:'For f(x) = x³ − x − 1, from f(1) = −1 and f(2) = 5, IVT lets you conclude…',
   choices:[
     {txt:'Some c ∈ (1,2) has f(c) = 0 — a root exists there',ok:true},
     {txt:'There is exactly one root and it is 1.5',ok:false},
     {txt:'Nothing — endpoints must be integers',ok:false}],
   ok:'Existence, not uniqueness or location: IVT promises at least one root in (1,2). The next card locates it.',
   fb:'N = 0 lies strictly between −1 and 5. What does the theorem guarantee?'},
  {t:'say', html:`<p><b>Bisection</b> <span class="zh">二分法</span> turns IVT into an algorithm: take midpoint m, evaluate f(m), keep the half preserving the sign change, repeat.</p>
   <div class="formula">[1,2] → m 1.5, f = +0.875 → keep [1, 1.5]<br>[1,1.5] → m 1.25, f = −0.297 → keep [1.25, 1.5]<br>→ m 1.375 (+0.225) → [1.25, 1.375] → m 1.3125 (−0.051)</div>
   <p>Each step halves the uncertainty: error ≤ (b−a)/2ⁿ. Ten steps give 1/1024 &lt; 10⁻³ — three correct decimals. The true root 1.3247… is squeezed, never jumped to.</p>`},
  {t:'ask', q:'Homework 7(b): first midpoint of [1,2] is 1.5 with f(1.5) = 0.875. Which interval survives?',
   choices:[
     {txt:'[1, 1.5] — sign change between −1 and +0.875',ok:true},
     {txt:'[1.5, 2] — both positive',ok:false},
     {txt:'[1, 2] unchanged',ok:false}],
   ok:'Keep the half with opposite signs at its ends: f(1) = −1, f(1.5) = +0.875.',
   fb:'A sign change needs one negative and one positive endpoint — which half has that?'},
  {t:'ask', q:'Second midpoint: m = 1.25, f(1.25) ≈ −0.297. The narrowed interval is…',
   choices:[
     {txt:'[1.25, 1.5]',ok:true},{txt:'[1, 1.25]',ok:false},{txt:'[1.25, 2]',ok:false}],
   ok:'[1.25, 1.5]: −0.297 and +0.875 bracket the root. Then (c): need 1/2ⁿ < 0.001 ⇒ 2ⁿ > 1000 ⇒ n = 10 steps.',
   h2:'Compare signs at 1.25 (−) and 1.5 (+).',
   scaffold:[
    {q:'f(1.25) ≈ −0.297 is negative; f(1.5) = 0.875 is positive. A sign change means the root is…',
     choices:[{txt:'Between them: [1.25, 1.5]',ok:true},{txt:'Left of 1.25',ok:false}],
     fb:'Roots hide between opposite-signed endpoints (IVT).',oktxt:'[1.25, 1.5] after two steps.'},
    {q:'For error < 0.001 on an interval of length 1: need 1/2ⁿ < 0.001. Since 2¹⁰ = 1024, n = ?',
     choices:[{txt:'10',ok:true},{txt:'7',ok:false},{txt:'100',ok:false}],
     fb:'2¹⁰ = 1024 > 1000; 2⁹ = 512 < 1000.',oktxt:'10 bisections guarantee three-decimal accuracy.'}
   ]},
  {t:'say', html:`<p>Homework 6 preview — a seam to repair. f(x) = x² for x &lt; 1, f(x) = ax + 2 for x ≥ 1. Left limit at 1 is 1; right limit is a + 2. Continuity demands they agree: a + 2 = 1 → <b>a = −1</b>. With that choice both pieces are polynomials, so f is continuous on all of ℝ.</p>
   <p class="muted">IVT magic for the bonus problem: a rotating wobbly table always steadies within 90°, and right now two antipodal points on the equator share one temperature — define g(θ) = T(θ) − T(θ+180°), note g(θ+180°) = −g(θ), and let IVT find a zero.</p>`},
  {t:'recap', title:'§2.5 Takeaways', mn:'Continuity = defined + limit exists + they agree. A finite limit patches a hole; IVT turns a sign change into a guaranteed root; bisection halves the error each step.',
   items:['Checklist: (i) f(c) defined (ii) lim f exists (iii) lim f = f(c)',
          'Four species: removable / jump / infinite / oscillating',
          'Removable iff the finite limit exists — patch with f(c) := L',
          'Polynomials continuous on ℝ; rationals on their domain; composites continuous',
          'Theorem 10: limits pass inside continuous functions',
          'IVT: continuous on [a,b] ⇒ every intermediate height is hit (at least once)',
          'Sign-change test + bisection; error ≤ (b−a)/2ⁿ (10 steps < 10⁻³)']}
]},

/* ---------------- §2.6 ---------------- */
{title:'§2.6 Limits at Infinity · Asymptotes', steps:[
  {t:'say', html:`<p>Final section: what happens far, far out? <b>lim x→∞ f(x) = L</b> means: for every ε &gt; 0 there is a threshold M such that x &gt; M guarantees |f(x) − L| &lt; ε. Infinity plays the role of the point c; "close to c" becomes "beyond M."</p>
   <div class="formula">lim<sub>x→±∞</sub> 1/x = 0 &nbsp;&nbsp;·&nbsp;&nbsp; lim<sub>x→±∞</sub> k = k</div>
   <p>The line y = 0 that 1/x hugs forever is a <b>horizontal asymptote</b> <span class="zh">水平渐近线</span> — the first of three invisible guide lines in this section.</p>`,
   detail:'Physical picture: cooling coffee T(t) = Tᵣ + (T₀−Tᵣ)e^(−kt) slides toward room temperature Tᵣ ever closer without going below; a skydiver\'s speed caps at terminal velocity mg/k ≈ 53 m/s. Charging capacitors, drug washout, radioactive decay — the HA is a real ceiling nature approaches but never needs to reach.'},
  {t:'say', html:`<p><b>Theorem 12:</b> all seven Limit Laws still hold as x → ±∞ whenever the individual limits are finite, and for every integer n ≥ 1, lim 1/xⁿ = 0.</p>
   <p>Universal move: <b>divide top and bottom by the highest power of x</b>; every c/xⁿ term is crushed to zero, leaving the constant skeleton. Example: lim (5 + 11/x) = 5 + 0 = 5.</p>`},
  {t:'ask', q:'lim x→−∞ π³/x² = ? (Two copies of 1/x, each → 0.)',
   choices:[
     {txt:'π³ · 0 · 0 = 0',ok:true},
     {txt:'π³',ok:false},
     {txt:'−∞',ok:false}],
   ok:'0 — constants ride along, but 1/x² dies at either end.',
   fb:'Separate the constant from the two vanishing factors.'},
  {t:'say', html:`<p>For rational functions everything reduces to the <b>degree race</b> <span class="zh">次数竞赛</span> between numerator N and denominator D:</p>
   <div class="mn"><b>Case 1 deg N &lt; deg D:</b> denominator wins → ratio crushed to <b>0</b> (HA y = 0).<br>
   <b>Case 2 degrees equal:</b> tie → limit = <b>ratio of leading coefficients</b> (HA y = a/b).<br>
   <b>Case 3 deg N &gt; deg D:</b> numerator wins → <b>±∞</b>, no horizontal asymptote (watch the sign).</div>`},
  {t:'ask', q:'lim x→−∞ (11x + 2)/(2x³ − 1). Compare degrees…',
   choices:[
     {txt:'0 — degree 1 loses to degree 3',ok:true},
     {txt:'11/2',ok:false},
     {txt:'−∞',ok:false}],
   ok:'0: after dividing by x³, top goes 0 + 0 and bottom goes 2 − 0. HA y = 0.',
   fb:'Top degree 1, bottom degree 3 — which case of the race?'},
  {t:'ask', q:'lim x→∞ (5x² + 8x − 3)/(3x² + 2) = ?',
   choices:[
     {txt:'5/3 — equal degrees, leading coefficients',ok:true},
     {txt:'0',ok:false},{txt:'∞',ok:false}],
   ok:'5/3 — divide by x²: (5 + 8/x − 3/x²)/(3 + 2/x²) → 5/3. HA y = 5/3.',
   fb:'Both leading: x² and x², a tie. Who ties in a degree race?'},
  {t:'ask', q:'lim x→+∞ (2x³ + 1)/(x² + x) ≈ 2x³/x² = 2x → ?',
   choices:[
     {txt:'+∞ (and −∞ as x → −∞) — no HA',ok:true},
     {txt:'2',ok:false},{txt:'0',ok:false}],
   ok:'The numerator runs away: +∞ to the right, −∞ to the left. No horizontal asymptote exists — but watch for a slanted one later.',
   fb:'Degrees: 3 against 2. Case 3 says the fraction grows like 2x.'},
  {t:'say', html:`<p><b>HA fine print:</b> a function has at most two horizontal asymptotes (one per end; arctan x has y = ±π/2). And — students always find this shocking — <b>the curve may CROSS its asymptote</b>, even infinitely often: sin x/x crosses y = 0 endlessly, yet sin x/x → 0. The HA controls only the END behavior, never the middle of the graph.</p>`},
  {t:'ask', q:'A classmate says "y = 0 can\'t be the HA of sin x/x — the graph crosses y = 0 hundreds of times." Your reply?',
   choices:[
     {txt:'Crossing is allowed; an HA only describes the limit as x → ±∞',ok:true},
     {txt:'Correct — an asymptote can never be touched',ok:false},
     {txt:'Then the HA must be y = 1',ok:false}],
   ok:'Horizontal asymptotes may be crossed. Only vertical asymptotes are untouchable walls. The far ends settle to 0, which is all the definition asks.',
   fb:'Check the definition: does it say anything about crossings at finite x?'},
  {t:'say', html:`<p><b>The u = 1/x substitution:</b> infinity becomes zero. As x → +∞, u → 0⁺.</p>
   <div class="formula">lim<sub>x→∞</sub> x sin(1/x) = lim<sub>u→0⁺</sub> sin u/u = 1 &nbsp;(Theorem 7!)</div>
   <p>So y = x sin(1/x) has HA y = 1. One chapter\'s trick hands work to another\'s theorem.</p>`},
  {t:'say', html:`<p>Sandwich still works at infinity: 2 + sin x/x is bounded by 2 − 1/x and 2 + 1/x for x &gt; 0; both guards → 2, so the limit is 2 (HA y = 2). General pattern: a bounded wiggle riding on a growing denominator dies — |cos x| ≤ 1 gives (3 + cos x)/x → 0.</p>`},
  {t:'say', html:`<p><b>Infinite limits.</b> lim x→c f(x) = ∞ means: for EVERY ceiling B &gt; 0 some δ keeps f(x) &gt; B throughout the punctured window. For 1/x² choose δ = 1/√B. Crucial vocabulary:</p>
   <div class="mn">"The limit is infinity" still means the limit DOES NOT EXIST — infinity is a direction, not a number. It is a <b>informative DNE</b>: values escape above every level.</div>
   <p>Compare: 1/x² → +∞ from BOTH sides; 1/x → +∞ from the right but −∞ from the left, so its two-sided limit DNE.</p>`},
  {t:'ask', q:'For 1/x as x → 0⁻ (negative side), the values become large and…',
   choices:[
     {txt:'Negative: lim x→0⁻ 1/x = −∞',ok:true},
     {txt:'Positive: +∞',ok:false},
     {txt:'Zero',ok:false}],
   ok:'−∞ on the left, +∞ on the right — opposite infinities, so the two-sided limit DNE. (1/x² is +∞ both sides, but still DNE as a finite limit.)',
   fb:'1 divided by a small NEGATIVE number is a large…?'},
  {t:'say', html:`<p><b>Hunting vertical asymptotes</b> <span class="zh">垂直渐近线</span>: x = a is a VA if any one-sided limit there is ±∞. Suspects: zeros of the denominator — AFTER checking the numerator is nonzero there. (Also ln x → −∞ at 0⁺, tan x at π/2 + kπ.)</p>
   <div class="mn"><b>Classic trap:</b> (x²−1)/(x−1) at x = 1 gives 0/0 — factor and cancel, and it is a REMOVABLE HOLE, not a VA. Suspects are not verdicts; check the numerator before convicting.</div>`},
  {t:'ask', q:'(x² − 1)/(x − 1) at x = 1: vertical asymptote or hole?',
   choices:[
     {txt:'Hole — 0/0 factors to (x+1), limit 2 exists',ok:true},
     {txt:'VA — denominator zero, automatically',ok:false},
     {txt:'VA with limit ∞',ok:false}],
   ok:'A hole: both top and bottom vanish, the common factor cancels, a finite limit 2 exists. VA requires blow-up — numerator nonzero at a denominator zero.',
   fb:'0/0 was the signal. Do the factor-cancel dance and ask whether a finite limit remains.'},
  {t:'widget', id:'asymp',
   html:`<p>The great asymptote hunt, visualized. Zoom out on the Homework-8 rational function to see the HA y = 2 and the walls x = ±2; switch to the hole, the HA-crosser sin x/x, or the slant case. The skeleton draws first; the flesh obeys.</p>`},
  {t:'say', html:`<p>Now Homework 8 in the exact checklist order. f(x) = (2x² − 3x + 1)/(x² − 4).</p>
   <p><b>(a) Domain:</b> x² − 4 = 0 at x = ±2, so domain is (−∞,−2) ∪ (−2,2) ∪ (2,∞).</p>`},
  {t:'ask', q:'(b) Check the numerator at the suspects before declaring VAs: f_num(2) = 8 − 6 + 1 = 3; f_num(−2) = 8 + 6 + 1 = 15. The VAs are…',
   choices:[
     {txt:'x = 2 and x = −2 — numerator nonzero at both',ok:true},
     {txt:'Neither — they are holes',ok:false},
     {txt:'Only x = 2',ok:false}],
   ok:'Both x = ±2: nonzero numerator over zero denominator means genuine blow-ups (opposite one-sided infinities around each).',
   h2:'A denominator zero becomes a VA only if the numerator does NOT also vanish there.',
   scaffold:[
    {q:'At x = 2: numerator = 3, denominator = 0. Hole or blow-up?',
     choices:[{txt:'Blow-up → VA x = 2',ok:true},{txt:'0/0 → hole',ok:false}],
     fb:'0/0 is the hole case; 3/0 blows up.',oktxt:'Nonzero over zero → VA.'},
    {q:'At x = −2: numerator = 15, denominator = 0.',
     choices:[{txt:'Also a VA: x = −2',ok:true},{txt:'A hole',ok:false}],
     fb:'Same test, nonzero numerator.',oktxt:'VAs at BOTH x = ±2.'}
   ]},
  {t:'ask', q:'(c) Degree race for the HA: degrees equal (2 and 2), leading coefficients 2 and 1.',
   choices:[
     {txt:'HA y = 2',ok:true},{txt:'HA y = 0',ok:false},{txt:'No HA',ok:false}],
   ok:'HA y = 2 — the ends settle to 2/1. No slant asymptote: those require deg N = deg D + 1.',
   fb:'Equal degrees → leading coefficient ratio.'},
  {t:'ask', q:'(d) Intercepts: numerator factors as (2x − 1)(x − 1), and f(0) = 1/(−4). So…',
   choices:[
     {txt:'x-intercepts 1/2 and 1; y-intercept −1/4',ok:true},
     {txt:'x-intercepts 2, −2; y-intercept 2',ok:false},
     {txt:'No intercepts exist',ok:false}],
   ok:'x = 1/2, 1 (numerator zeros that are not excluded); y = −1/4. Skeleton complete: dashed guides first, then the branches.',
   fb:'x-intercepts solve numerator = 0; the y-intercept evaluates f(0).'},
  {t:'say', html:`<p><b>Dominant terms</b> rule the ends: x³ − 4x² + 7 ≈ x³ for large |x| because the bracket (1 − 4/x + 7/x²) → 1. g is an <i>end-behavior model</i> of f when f/g → 1.</p>
   <p><b>Oblique (slant) asymptote</b> <span class="zh">斜渐近线</span>: occurs when deg N = deg D + 1. Long-divide: f = (linear quotient) + remainder/denominator; the remainder dies, so the quotient line is the slant asymptote.</p>
   <div class="formula">(x² + 2x − 1)/(x + 1) = (x + 1) − 2/(x + 1) → slant HA? No: slant asymptote y = x + 1</div>`},
  {t:'ask', q:'Homework 9: the gap between that curve and its line is |−2/(x+1)|. As x → +∞ the gap…',
   choices:[
     {txt:'→ 0 — confirming y = x + 1 is the oblique asymptote',ok:true},
     {txt:'→ ∞ — the line is irrelevant',ok:false},
     {txt:'Equals 2 forever',ok:false}],
   ok:'Goes to 0: the curve glues itself to y = x + 1 at the ends while crossing no horizontal line as a limit. Exact definition: lim [f(x) − (mx+b)] = 0.',
   fb:'The remainder term −2/(x+1): where does a constant over a growing x head?'},
  {t:'recap', title:'§2.6 Takeaways', mn:'Degree race: smaller → 0, tie → coefficient ratio, bigger → ±∞. 0/0 at a denominator zero is a hole, not a VA; infinity is an informative DNE.',
   items:['lim 1/xⁿ = 0 at ±∞; divide by the highest power of x',
          'Degree race: degN<degD → 0; equal → lead ratio; greater → ±∞',
          'HA y = b may be CROSSED (sin x/x); at most two HAs',
          'VA x = a: blow-up after checking numerator ≠ 0; 0/0 there is a hole',
          'u = 1/x turns x sin(1/x) into sin u/u → 1 (HA y = 1)',
          'Oblique when degN = degD + 1; long division gives the line',
          '“lim = ∞” is still DNE — a regular, informative escape',
          'Asymptote checklist: domain/intercepts → VAs → end behavior → sign → sketch']}
]}
];

/* normalization (needs LESSONS): theme whitelist + extend saved secDone for new sections */
if(S.theme!=='light')S.theme='dark';
if(Array.isArray(S.secDone)&&S.secDone.length<LESSONS.length)S.secDone.length=LESSONS.length;

/* ============================================================
   Homework — guided, never solved up front
============================================================ */
const HW=[
{id:'h1',badge:'Q1 · §1.1 · 10 pts',
 stmt:'Find the natural domain and range of f(x) = √(x + 3) + 1/(x − 2).',
 steps:[
  {t:'say', html:`<p>Nice question — it has <i>both</i> dangers. Don't rush to the answer; let's take it apart like a lab procedure.</p>`},
  {t:'ask', q:'Look only at √(x + 3). What does Rule 2 require?',
   choices:[{txt:'x + 3 ≥ 0, so x ≥ −3',ok:true},{txt:'x + 3 ≠ 0',ok:false},{txt:'x ≥ 3',ok:false}],
   ok:'Good: one restriction is x ≥ −3.'},
  {t:'ask', q:'Now the fraction 1/(x − 2). What does Rule 1 require?',
   choices:[{txt:'x ≠ 2',ok:true},{txt:'x ≠ −2',ok:false},{txt:'x > 2',ok:false}],
   ok:'x ≠ 2 — the single forbidden point.'},
  {t:'ask', q:'Combine them: which set below is the domain?',
   choices:[
     {txt:'[−3, 2) ∪ (2, ∞)',ok:true},
     {txt:'(−3, 2) ∪ (2, ∞)',ok:false},
     {txt:'[−3, ∞)',ok:false}],
   ok:'That is it: x ≥ −3 with the point x = 2 removed. −3 is included; 2 is excluded from both sides.',
   h2:'Start at −3 with a bracket, open a hole at 2, extend to ∞.',
   scaffold:[
    {q:'Rule 2: x ≥ −3. Rule 1: x ≠ 2. Shade [−3, ∞) on a number line, then punch a hole at 2. What is left?',
     choices:[{txt:'[−3, 2) ∪ (2, ∞)',ok:true},{txt:'(−3, 2) ∪ (2, ∞)',ok:false},{txt:'[−3, 2] ∪ (2, ∞)',ok:false}],
     fb:'−3 is INCLUDED (≥); the hole at 2 splits the ray in two.',oktxt:'[−3, 2) ∪ (2, ∞): bracket at −3, round parens around the hole.'}
   ]},
  {t:'input', q:'Your turn to finish: write the range. Think piece by piece — as x → 2⁻ and x → 2⁺, what does 1/(x − 2) do? Write your range in interval form (a careful attempt, then compare with the walkthrough).',
   accept:v=>v.length>4,
   free:true,
   fb:'Trace the two branches of 1/(x − 2): for x in [−3, 2) the denominator is negative small near 2; for x in (2, ∞) positive small. Sketch both pieces.',
   reveal:'<b>Walkthrough (read with a pencil):</b> on [−3,2): √(x+3) ∈ [0,√5) while 1/(x−2) ∈ (−∞,−1/5], so the sum covers (−∞, M] with a turning point; on (2,∞): √(x+3) ∈ (√5,∞) and 1/(x−2) ∈ (0,∞), giving a branch [m, ∞). The range is two separate pieces with a gap — the function blows up near 2 and each side has one minimum. The exam focus here is the domain; for the range, analyzing the two branches and the gap is the full-credit reasoning.'}
 ]},
{id:'h2',badge:'Q2 · §1.1 · 10 pts',
 stmt:'Even, odd, or neither? (a) f(x) = x³ − x  (b) g(x) = x² + |x|  (c) h(x) = x + 1',
 steps:[
  {t:'say', html:`<p>You met all three in §1.1 — now commit on paper yourself. The recipe: compute f(−x), then compare with f(x) and −f(x).</p>`},
  {t:'ask', q:'Part (a): f(−x) = −x³ + x. Compare…',
   choices:[{txt:'= −f(x) → odd',ok:true},{txt:'= f(x) → even',ok:false},{txt:'Neither',ok:false}],
   ok:'Odd. ✓'},
  {t:'ask', q:'Part (b): (−x)² + |−x| = x² + |x|. Compare…',
   choices:[{txt:'= f(x) → even',ok:true},{txt:'→ odd',ok:false},{txt:'Neither',ok:false}],
   ok:'Even — both pieces are even. ✓'},
  {t:'ask', q:'Part (c): h(−x) = −x + 1. Compare with h(x) = x + 1 and −h(x) = −x − 1…',
   choices:[{txt:'Neither',ok:true},{txt:'Even',ok:false},{txt:'Odd',ok:false}],
   ok:'Neither. The +1 breaks both symmetries — one bad point is enough to disprove “for all x”.'}
 ]},
{id:'h3',badge:'Q3 · §1.2 · 10 pts',
 stmt:'f(x) = x² + 1, g(x) = x − 1. Find f ∘ g and g ∘ f and their domains.',
 steps:[
  {t:'ask', q:'(f ∘ g)(x): which machine runs first?',
   choices:[{txt:'g first: plug g(x) = x − 1 into f',ok:true},{txt:'f first: plug f into g',ok:false}],
   ok:'Right — composition reads right to left.'},
  {t:'ask', q:'So (f ∘ g)(x) = (x − 1)² + 1 = ?',
   choices:[{txt:'x² − 2x + 2, domain ℝ',ok:true},{txt:'x², domain ℝ',ok:false},{txt:'x² − 2x + 2, domain x ≥ 1',ok:false}],
   ok:'Simplified correctly, and no gates restrict x — domain all reals.'},
  {t:'ask', q:'(g ∘ f)(x) = g(x² + 1) = ?',
   choices:[{txt:'x², domain ℝ',ok:true},{txt:'x² + 2, domain ℝ',ok:false},{txt:'(x−1)²+1, domain ℝ',ok:false}],
   ok:'x² on ℝ. Notice the two compositions are different — order matters.'}
 ]},
{id:'h4',badge:'Q4 · §1.2 · 10 pts',
 stmt:'From y = x², describe the transformations giving y = −2(x − 3)² + 5; give vertex and opening direction.',
 steps:[
  {t:'say', html:`<p>Use the lab if needed, but now reason with symbols. Unpack the formula from the inside outward.</p>`},
  {t:'ask', q:'What does the inside “x − 3” do?',
   choices:[{txt:'Shift right 3',ok:true},{txt:'Shift left 3',ok:false}],
   ok:'Right 3 — inside moves in reverse.'},
  {t:'ask', q:'What do the factor 2 and the leading minus do (outside operations)?',
   choices:[{txt:'Vertical stretch ×2, then reflect across x-axis',ok:true},{txt:'Horizontal stretch ×2, reflect across y-axis',ok:false}],
   ok:'Outside ×2 stretches heights; outside minus flips over the x-axis.'},
  {t:'ask', q:'Then + 5, and the vertex / opening?',
   choices:[{txt:'Shift up 5; vertex (3, 5); opens downward',ok:true},{txt:'Shift up 5; vertex (5, 3); opens upward',ok:false}],
   ok:'Full chain: right 3 → stretch ×2 → reflect (downward) → up 5. Vertex (3, 5), opens down.'}
 ]},
{id:'h5',badge:'Q5 · §1.3 · 10 pts',
 stmt:'(a) 225° to radians; (b) 7π/6 to degrees; (c) sin, cos, tan of 7π/6.',
 steps:[
  {t:'ask', q:'(a) 225° × π/180 = ?',
   choices:[{txt:'5π/4',ok:true},{txt:'7π/6',ok:false},{txt:'3π/4',ok:false}],
   ok:'5π/4.'},
  {t:'ask', q:'(b) 7π/6 × 180/π = ?',
   choices:[{txt:'210°',ok:true},{txt:'240°',ok:false},{txt:'150°',ok:false}],
   ok:'210°.'},
  {t:'ask', q:'(c) 7π/6 is in QIII. CAST says both sin and cos are negative; reference angle π/6 gives the sizes. So…',
   choices:[
     {txt:'sin = −1/2, cos = −√3/2, tan = √3/3',ok:true},
     {txt:'sin = −√3/2, cos = −1/2, tan = √3',ok:false},
     {txt:'sin = 1/2, cos = √3/2, tan = √3/3',ok:false}],
   ok:'All three: −1/2, −√3/2, and tan = (−1/2)/(−√3/2) = 1/√3 = √3/3. Positive tan in QIII — consistent with CAST.'}
 ]},
{id:'h6',badge:'Q6 · §1.3 · 15 pts',
 stmt:'Ferris wheel: radius 25 m, center 26 m above ground, one revolution per 5 min; lowest point at t = 0. Write h(t) and find h(2).',
 steps:[
  {t:'say', html:`<p>A modeling classic. Match the four parameters A, B, C, D to physical quantities first.</p>`},
  {t:'ask', q:'Amplitude |A| and midline D are the easiest — they are geometrically…',
   choices:[{txt:'A = 25 (radius), D = 26 (center height)',ok:true},{txt:'A = 26, D = 25',ok:false},{txt:'A = 51, D = 1',ok:false}],
   ok:'Radius = amplitude; center height = midline.'},
  {t:'ask', q:'One revolution takes 5 minutes. That makes the period B = ?',
   choices:[{txt:'B = 5',ok:true},{txt:'B = 2π/5',ok:false},{txt:'B = 5/2π',ok:false}],
   ok:'B is the period itself (5); the angular frequency is 2π/B = 2π/5.'},
  {t:'say', html:`<p>Passenger starts at the LOWEST point. A cosine is the natural choice there: cos(0) = 1, so put a minus sign —</p>
   <div class="formula">h(t) = 26 − 25 cos(2π t / 5)</div>
   <p>Check: h(0) = 26 − 25 = 1 m (boarding level), h(2.5) = 51 m (top). Always sanity-check endpoints like this.</p>`},
  {t:'input', q:'Now compute h(2) yourself: 26 − 25 cos(4π/5). cos(4π/5) = −cos(π/5) ≈ −0.809. Give a number in meters (one decimal).',
   accept:v=>{const n=parseFloat(norm(v).replace('m',''));return !isNaN(n)&&Math.abs(n-46.2)<0.6;},
   fb:'cos(4π/5) ≈ −0.809, so 26 − 25(−0.809) = 26 + 20.2 = ?',
   reveal:'h(2) ≈ 46.2 m — high up, two minutes after boarding.',
   placeholder:'e.g. 46.2'}
 ]},
{id:'h7',badge:'Q7 · §1.3 · 15 pts',
 stmt:'Triangle a = 2, b = 3, C = 60°. Use the Law of Cosines to find side c.',
 steps:[
  {t:'ask', q:'Write down c² using c² = a² + b² − 2ab cos C. Substituting gives…',
   choices:[{txt:'4 + 9 − 12 cos 60°',ok:true},{txt:'4 + 9 + 12 cos 60°',ok:false},{txt:'2 + 3 − 6 cos 60°',ok:false}],
   ok:'Careful with the minus sign — it is −2ab cos C.'},
  {t:'ask', q:'cos 60° = 1/2. So c² = 13 − 6 = ?',
   choices:[{txt:'7, hence c = √7 ≈ 2.65',ok:true},{txt:'7, hence c = 7',ok:false},{txt:'19, hence c ≈ 4.36',ok:false}],
   ok:'c = √7 ≈ 2.65. Side length is the square root — don’t hand back c².'}
 ]},
{id:'h8',badge:'Q8 · Bonus · §1.1/1.4',
 stmt:'Parking: ¥6 first hour (fraction counts full), ¥4 each extra hour (round up), daily cap ¥40. Write the fee as a piecewise/ceiling function of x hours and describe its graph.',
 steps:[
  {t:'ask', q:'First hour ¥6, then ¥4 per additional started hour. With ceiling ⌈x⌉ rounding UP started hours, the fee before the cap is…',
   choices:[
     {txt:'6 + 4(⌈x⌉ − 1) = 2 + 4⌈x⌉',ok:true},
     {txt:'6⌈x⌉',ok:false},
     {txt:'6 + 4x',ok:false}],
   ok:'Right: the first hour costs 6, each of the remaining ⌈x⌉−1 started hours costs 4.'},
  {t:'ask', q:'Now the cap. When does 2 + 4⌈x⌉ reach 40?',
   choices:[
     {txt:'⌈x⌉ ≥ 9.5 → from 10 started hours it flattens at 40',ok:true},
     {txt:'⌈x⌉ ≥ 10.5 → 11 hours',ok:false},
     {txt:'Never — no cap',ok:false}],
   ok:'At 10 started hours: 2 + 40 = 42, but the cap clips it to 40 (it actually touches 40 once 2+4⌈x⌉ ≥ 40).'},
  {t:'say', html:`<div class="formula">Fee(x) = min(40, 2 + 4⌈x⌉), x &gt; 0 &nbsp;（分段/上取整函数）</div>
   <p>Graph: a staircase <span class="zh">阶梯图</span> jumping at each integer (closed dot on the left of each tread, open on the right), then flat at 40 after the cap. Draw both kinds of endpoint dots carefully.</p>`}
 ]},
{id:'h9',badge:'Q9 · Bonus · §1.2',
 stmt:'Express h(x) = sin²(3x + 1) as a composite f ∘ g ∘ k of three functions.',
 steps:[
  {t:'say', html:`<p>Peel from the inside out — what happens to x FIRST?</p>`},
  {t:'ask', q:'Innermost layer (runs first):',
   choices:[{txt:'k(x) = 3x + 1',ok:true},{txt:'k(x) = sin x',ok:false},{txt:'k(x) = x²',ok:false}],
   ok:'k(x) = 3x + 1.'},
  {t:'ask', q:'Middle layer — applied to that result:',
   choices:[{txt:'g(u) = sin u',ok:true},{txt:'g(u) = u²',ok:false},{txt:'g(u) = 3u + 1',ok:false}],
   ok:'g(u) = sin u.'},
  {t:'ask', q:'Outermost layer:',
   choices:[{txt:'f(w) = w²',ok:true},{txt:'f(w) = sin w',ok:false},{txt:'f(w) = 3w² + 1',ok:false}],
   ok:'h = f ∘ g ∘ k: x → 3x+1 → sin(3x+1) → sin²(3x+1). This peeling is exactly the skill behind the Chain Rule in Chapter 2.'}
 ]},
{id:'h10',badge:'Q10 · Bonus · §1.3',
 stmt:'Temperature varies sinusoidally between 8°C (min) and 26°C (max), maximum at 14:00. Write T(t) = D + A sin(B(t − C)), t hours after midnight.',
 steps:[
  {t:'ask', q:'Amplitude = half the max−min gap, midline = their average. So…',
   choices:[{txt:'A = 9, D = 17',ok:true},{txt:'A = 18, D = 17',ok:false},{txt:'A = 9, D = 8',ok:false}],
   ok:'A = (26−8)/2 = 9; D = (26+8)/2 = 17.'},
  {t:'ask', q:'Period is 24 hours. In the form sin(B(t−C)), B = 2π/period = ?',
   choices:[{txt:'π/12',ok:true},{txt:'24',ok:false},{txt:'π/24',ok:false}],
   ok:'B = 2π/24 = π/12.'},
  {t:'ask', q:'Sine peaks when its angle is π/2. Max at t = 14: (π/12)(14 − C) = π/2 → 14 − C = 6, so C = ?',
   choices:[{txt:'8',ok:true},{txt:'6',ok:false},{txt:'20',ok:false}],
   ok:'C = 8. Model: T(t) = 17 + 9 sin(π/12 (t − 8)). Check T(14) = 26 and T(2) = 8 — always verify both extrema.'}
 ]},
/* ---------------- Chapter 2 guided homework ---------------- */
{id:'c2h1',badge:'Q1 · §2.1 · 10 pts',
 stmt:'A dropped object has height y = 4.9t² metres (t seconds). Find its average speed on [2, 2+h] for h = 1, 0.1, 0.01, then its instantaneous speed at t = 2.',
 steps:[
  {t:'say', html:`<p>Average speed <span class="zh">平均速度</span> over [a,b] is the slope of the secant:</p>
   <div class="formula">v̄ = (y(b) − y(a))/(b − a) = (y(2+h) − y(2))/h</div>
   <p>First compute the anchor value: y(2) = 4.9·4 = 19.6 m.</p>`},
  {t:'ask', q:'h = 1: interval [2,3], y(3) = 4.9·9 = 44.1. Average speed = ?',
   choices:[{txt:'(44.1 − 19.6)/1 = 24.5 m/s',ok:true},{txt:'44.1/3 = 14.7 m/s',ok:false},{txt:'(44.1 + 19.6)/2 = 31.85 m/s',ok:false}],
   ok:'Difference in position divided by difference in time: 24.5 m/s.'},
  {t:'ask', q:'h = 0.1: y(2.1) = 4.9·4.41 = 21.609. So v̄ = ?',
   choices:[{txt:'(21.609 − 19.6)/0.1 = 20.09 m/s',ok:true},{txt:'21.609/2.1 ≈ 10.29 m/s',ok:false},{txt:'2.009/0.1 = 20.9 m/s',ok:false}],
   ok:'21.609 − 19.6 = 2.009; divided by 0.1 → 20.09 m/s. Already close to 19.6.'},
  {t:'input', q:'h = 0.01: y(2.01) = 4.9·4.0401 = 19.79649. Compute v̄ (three decimals).',
   accept:v=>{const n=parseFloat(norm(v));return !isNaN(n)&&Math.abs(n-19.649)<0.002;},
   fb:'(19.79649 − 19.6)/0.01 = 0.19649/0.01 = ?',
   reveal:'19.649 m/s. The sequence 24.5 → 20.09 → 19.649 is converging.',
   placeholder:'e.g. 19.649'},
  {t:'ask', q:'Now do it once for general h. Expand y(2+h) = 4.9(2+h)² = ?',
   choices:[{txt:'19.6 + 19.6h + 4.9h²',ok:true},{txt:'19.6 + 4.9h²',ok:false},{txt:'4.9h² + 9.8h',ok:false}],
   ok:'(2+h)² = 4 + 4h + h²; times 4.9 gives 19.6 + 19.6h + 4.9h².'},
  {t:'ask', q:'Subtract y(2) = 19.6 and divide by h. v̄(h) simplifies to…',
   choices:[{txt:'19.6 + 4.9h',ok:true},{txt:'19.6h + 4.9h²',ok:false},{txt:'4.9h',ok:false}],
   ok:'(19.6h + 4.9h²)/h = 19.6 + 4.9h — every secant slope in one formula.'},
  {t:'input', q:'Instantaneous speed v(2) = limₕ→₀ (19.6 + 4.9h). Give the number.',
   accept:v=>{const n=parseFloat(norm(v));return !isNaN(n)&&Math.abs(n-19.6)<0.05;},
   fb:'As h shrinks, the term 4.9h shrinks with it. What remains?',
   reveal:'v(2) = 19.6 m/s — matching the table trend 24.5, 20.09, 19.649, …',
   placeholder:'e.g. 19.6'}
 ]},
{id:'c2h2',badge:'Q2 · §2.2 · 15 pts',
 stmt:'Evaluate (a) limₓ→₁ (x² + x − 2)/(x − 1); (b) limₓ→₀ (√(x+4) − 2)/x.',
 steps:[
  {t:'say', html:`<p>Both give 0/0 at the target — the <b>indeterminate form</b> <span class="zh">不定式</span>. 0/0 is not an answer; it is a signal: do ALGEBRA first, take the limit after.</p>`},
  {t:'ask', q:'(a) Factor the numerator x² + x − 2. Which factor pair works?',
   choices:[{txt:'(x + 2)(x − 1)',ok:true},{txt:'(x − 2)(x + 1)',ok:false},{txt:'(x + 1)(x − 2)',ok:false}],
   ok:'Two numbers with product −2 and sum +1 are +2 and −1: (x+2)(x−1).'},
  {t:'ask', q:'Cancel the common (x−1). The functions agree everywhere EXCEPT x = 1, so their limits agree:…',
   choices:[{txt:'lim (x + 2) = 3',ok:true},{txt:'0',ok:false},{txt:'undefined',ok:false}],
   ok:'At x = 1: 1 + 2 = 3. The hole is filled with value 3.'},
  {t:'ask', q:'(b) 0/0 again, but a radical blocks factoring. The standard move is…',
   choices:[{txt:'Multiply by the conjugate √(x+4) + 2',ok:true},{txt:'Plug in x = 0 twice',ok:false},{txt:'Divide top and bottom by x²',ok:false}],
   ok:'Conjugate <span class="zh">共轭式</span>: √(x+4) − 2 pairs with √(x+4) + 2.'},
  {t:'ask', q:'After multiplying top and bottom by √(x+4) + 2, the new numerator is (x+4) − 4 = ?',
   choices:[{txt:'x',ok:true},{txt:'x + 8',ok:false},{txt:'x − 4',ok:false}],
   ok:'(A−B)(A+B) = A² − B² = (x+4) − 4 = x. The radical disappears.'},
  {t:'ask', q:'Cancel x (valid for x ≠ 0, which is all the limit sees): lim 1/(√(x+4) + 2) = ?',
   choices:[{txt:'1/(2 + 2) = 1/4',ok:true},{txt:'1/2',ok:false},{txt:'0',ok:false}],
   ok:'√4 = 2 in the denominator: 1/(2+2) = 1/4.'}
 ]},
{id:'c2h3',badge:'Q3 · §2.2 · 10 pts',
 stmt:'Use the Sandwich Theorem to show limₓ→₀ x² sin(1/x) = 0.',
 steps:[
  {t:'say', html:`<p>Trap: sin(1/x) oscillates faster and faster as x → 0, so sin(1/x) itself has no limit there. But it is BOUNDED — and its partner x² is heading to 0.</p>`},
  {t:'ask', q:'Step 1: bound the wild factor. For every x ≠ 0,…',
   choices:[{txt:'−1 ≤ sin(1/x) ≤ 1',ok:true},{txt:'−1/x ≤ sin(1/x) ≤ 1/x',ok:false},{txt:'0 ≤ sin(1/x) ≤ 1',ok:false}],
   ok:'Sine of ANY angle lies in [−1, 1].'},
  {t:'ask', q:'Step 2: multiply by x² (positive, so inequalities keep their direction):',
   choices:[{txt:'−x² ≤ x² sin(1/x) ≤ x²',ok:true},{txt:'−x ≤ x² sin(1/x) ≤ x',ok:false},{txt:'0 ≤ x² sin(1/x) ≤ x²',ok:false}],
   ok:'The function is squeezed between −x² and x².'},
  {t:'ask', q:'Step 3: the two bread slices both tend to…',
   choices:[{txt:'0 (both −x² and x² → 0)',ok:true},{txt:'1 and −1',ok:false},{txt:'different values',ok:false}],
   ok:'lim (−x²) = 0 and lim x² = 0 — the SAME limit from both sides.'},
  {t:'say', html:`<p><b>Sandwich / Squeeze Theorem</b> <span class="zh">夹逼定理</span>: if g(x) ≤ f(x) ≤ h(x) near c and both g and h tend to L, then f is forced to L as well.</p>
   <div class="formula">Therefore limₓ→₀ x² sin(1/x) = 0.</div>
   <p>The oscillations never stop, but their AMPLITUDE is crushed by x² — a bounded wobble times a vanishing factor must go to 0.</p>`}
 ]},
{id:'c2h4',badge:'Q4 · §2.4 · 10 pts',
 stmt:'Evaluate (a) lim_{θ→0} sin(3θ)/(5θ); (b) lim_{x→0} tan(2x)/x.',
 steps:[
  {t:'say', html:`<p>The one famous trig limit is lim_{u→0} sin u / u = 1 (proved by squeezing with sector areas). Every trick here is reshaping to match that template, with u = the angle inside sin.</p>`},
  {t:'ask', q:'(a) Want sin(3θ)/(3θ) to appear. Rewrite sin(3θ)/(5θ) as…',
   choices:[{txt:'(3/5) · sin(3θ)/(3θ)',ok:true},{txt:'(5/3) · sin(3θ)/(3θ)',ok:false},{txt:'sin(3θ)/(3θ) alone',ok:false}],
   ok:'Check: (3/5)·sin(3θ)/(3θ) = sin(3θ)/(5θ). The constant ratio is 3 over 5.'},
  {t:'ask', q:'As θ → 0, u = 3θ → 0 too, so sin(3θ)/(3θ) → 1. Answer:',
   choices:[{txt:'3/5',ok:true},{txt:'5/3',ok:false},{txt:'1',ok:false}],
   ok:'3/5. Rule of thumb: sin(kθ)/(mθ) → k/m.'},
  {t:'ask', q:'(b) tan(2x) = sin(2x)/cos(2x). Rewrite tan(2x)/x to expose sin(2x)/(2x):',
   choices:[{txt:'2 · [sin(2x)/(2x)] · [1/cos(2x)]',ok:true},{txt:'(1/2) · [sin(2x)/(2x)] · cos(2x)',ok:false},{txt:'sin(2x)/(2x) alone',ok:false}],
   ok:'2·sin(2x)/(2x)·1/cos(2x) = sin(2x)/(x·cos(2x)) = tan(2x)/x. ✓'},
  {t:'ask', q:'Take the pieces: sin(2x)/(2x) → 1 and cos(2x) → cos 0 = 1. So the limit is…',
   choices:[{txt:'2',ok:true},{txt:'1',ok:false},{txt:'1/2',ok:false}],
   ok:'2 · 1 · 1 = 2. Near 0, tan(2x) behaves like 2x.'}
 ]},
{id:'c2h5',badge:'Q5 · §2.3 · 15 pts',
 stmt:'Give an ε–δ proof that limₓ→₃ (2x − 1) = 5. Find δ in terms of ε, and δ when ε = 0.01.',
 steps:[
  {t:'say', html:`<p>Formal goal: for every ε &gt; 0 there exists δ &gt; 0 such that 0 &lt; |x − 3| &lt; δ implies |(2x−1) − 5| &lt; ε. Do <b>scratchwork backwards</b> from ε, then write the proof forwards.</p>`},
  {t:'ask', q:'Scratch step: simplify the error |(2x − 1) − 5|.',
   choices:[{txt:'|2x − 6| = 2|x − 3|',ok:true},{txt:'|2x − 4|',ok:false},{txt:'|x − 3|',ok:false}],
   ok:'(2x−1) − 5 = 2x − 6 = 2(x − 3). The error is exactly twice the input distance.'},
  {t:'ask', q:'Want 2|x − 3| < ε, i.e. |x − 3| < ε/2. That tells us to choose…',
   choices:[{txt:'δ = ε/2',ok:true},{txt:'δ = 2ε',ok:false},{txt:'δ = ε',ok:false}],
   ok:'δ = ε/2 — a tighter ε tolerance forces a proportionally tighter δ.'},
  {t:'input', q:'For ε = 0.01, what is δ? (decimal)',
   accept:v=>{const n=parseFloat(norm(v));return !isNaN(n)&&Math.abs(n-0.005)<1e-9;},
   fb:'δ = ε/2 = 0.01/2 = ?',
   reveal:'δ = 0.005. x within 0.005 of 3 guarantees 2x−1 within 0.01 of 5.',
   placeholder:'e.g. 0.005'},
  {t:'say', html:`<p><b>Formal proof (written forwards):</b></p>
   <ol style="margin:.3rem 0 .3rem 1.1rem">
    <li>Let ε &gt; 0 be given. Choose δ = ε/2 (which is &gt; 0).</li>
    <li>Assume 0 &lt; |x − 3| &lt; δ. Then</li>
    <li>|(2x − 1) − 5| = |2x − 6| = 2|x − 3| &lt; 2δ = 2(ε/2) = ε.</li>
    <li>Hence |f(x) − 5| &lt; ε whenever 0 &lt; |x − 3| &lt; δ. ∎</li>
   </ol>
   <p>Every ε gets its own δ: this is the precise meaning of “the limit is 5”.</p>`}
 ]},
{id:'c2h6',badge:'Q6 · §2.5 · 10 pts',
 stmt:'f(x) = x² for x < 1; f(x) = ax + 2 for x ≥ 1. Find a so that f is continuous everywhere.',
 steps:[
  {t:'say', html:`<p>Each piece is a polynomial, so f is automatically continuous on (−∞, 1) and (1, ∞). The ONLY danger point is the join x = 1 — check the three continuity conditions there.</p>`},
  {t:'ask', q:'Continuity at x = 1 needs left limit, right limit, and f(1) all equal. Left limit: limₓ→1⁻ x² = ?',
   choices:[{txt:'1',ok:true},{txt:'a + 2',ok:false},{txt:'2',ok:false}],
   ok:'x² → 1² = 1 from the left.'},
  {t:'ask', q:'Right limit AND f(1) (the second piece owns x = 1): limₓ→1⁺ (ax + 2) = f(1) = ?',
   choices:[{txt:'a + 2',ok:true},{txt:'1',ok:false},{txt:'2a',ok:false}],
   ok:'a·1 + 2 = a + 2. Since the piece includes x = 1, f(1) already matches the right limit.'},
  {t:'input', q:'Set the two sides equal: a + 2 = 1. What is a?',
   accept:v=>{const n=parseFloat(norm(v));return !isNaN(n)&&Math.abs(n-(-1))<1e-9;},
   fb:'Solve a + 2 = 1 for a.',
   reveal:'a = −1. The two branches then meet at height 1 with no jump.',
   placeholder:'e.g. -1'},
  {t:'say', html:`<p>With a = −1 the second piece is f(x) = 2 − x. At the seam: left 1² = 1, right 2 − 1 = 1, f(1) = 1 — all agree. Polynomials away from the seam plus agreement AT the seam ⇒ continuous on all of ℝ.</p>`}
 ]},
{id:'c2h7',badge:'Q7 · §2.5 · 15 pts',
 stmt:'f(x) = x³ − x − 1. Show a root lies in [1,2], run two bisection steps, and find n for error < 0.001.',
 steps:[
  {t:'ask', q:'IVT setup: f is a polynomial, hence continuous. Evaluate the endpoints.',
   choices:[{txt:'f(1) = −1, f(2) = 5 — opposite signs',ok:true},{txt:'f(1) = 1, f(2) = 5 — both positive',ok:false},{txt:'f(1) = −1, f(2) = −5',ok:false}],
   ok:'1 − 1 − 1 = −1; 8 − 2 − 1 = 5. A sign change ⇒ some c ∈ (1,2) has f(c) = 0.'},
  {t:'ask', q:'Bisection 1: midpoint m₁ = 1.5, f(1.5) = 3.375 − 2.5 = 0.875 &gt; 0. The root lies in…',
   choices:[{txt:'[1, 1.5] (f(1) < 0, f(1.5) > 0)',ok:true},{txt:'[1.5, 2] (both positive — no sign change)',ok:false},{txt:'still [1, 2]',ok:false}],
   ok:'Keep the half whose endpoints still straddle zero: [1, 1.5].'},
  {t:'ask', q:'Bisection 2: m₂ = 1.25, f(1.25) ≈ 1.9531 − 2.25 = −0.2969 &lt; 0. New bracket:',
   choices:[{txt:'[1.25, 1.5]',ok:true},{txt:'[1, 1.25]',ok:false},{txt:'[1.25, 2]',ok:false}],
   ok:'f(1.25) < 0 and f(1.5) > 0 → [1.25, 1.5], width now 0.25.'},
  {t:'ask', q:'After n bisections the bracket width is 1/2ⁿ. Want error < 0.001:',
   choices:[{txt:'1/2ⁿ < 0.001 ⇒ 2ⁿ > 1000 ⇒ n = 10',ok:true},{txt:'n = 8 (2⁸ = 256)',ok:false},{txt:'n = 1000',ok:false}],
   ok:'2¹⁰ = 1024 > 1000, so 10 bisections suffice; 2⁹ = 512 would not. Error halves each step — slow but guaranteed.'}
 ]},
{id:'c2h8',badge:'Q8 · §2.6 · 20 pts',
 stmt:'Analyse f(x) = (2x² − 3x + 1)/(x² − 4): domain, vertical & horizontal asymptotes, x- and y-intercepts.',
 steps:[
  {t:'ask', q:'Domain first: denominator x² − 4 = 0 at x = ?',
   choices:[{txt:'x = 2 and x = −2',ok:true},{txt:'x = 2 only',ok:false},{txt:'x = 4 only',ok:false}],
   ok:'x² − 4 = (x − 2)(x + 2): exclude BOTH ±2.'},
  {t:'ask', q:'A vertical asymptote needs the numerator NONZERO there. Numerator at x = 2 is 8 − 6 + 1 = 3; at x = −2 is 8 + 6 + 1 = 15. So…',
   choices:[{txt:'Both x = 2 and x = −2 are vertical asymptotes',ok:true},{txt:'Both are removable holes',ok:false},{txt:'Only x = 2 is an asymptote',ok:false}],
   ok:'Nonzero-over-zero → infinite blow-up: VA x = ±2. (Zero-over-zero would instead signal a possible hole.)'},
  {t:'ask', q:'Horizontal asymptote: degrees are equal (both 2), so take the ratio of leading coefficients:',
   choices:[{txt:'y = 2/1 = 2',ok:true},{txt:'y = 0',ok:false},{txt:'no horizontal asymptote',ok:false}],
   ok:'Equal degrees ⇒ HA y = (leading coefficient ratio) = 2.'},
  {t:'ask', q:'x-intercepts: solve numerator 2x² − 3x + 1 = 0. Factoring gives (2x − 1)(x − 1), so…',
   choices:[{txt:'x = 1/2 and x = 1',ok:true},{txt:'x = −1 and x = −2',ok:false},{txt:'x = 2 and x = −2',ok:false}],
   ok:'The graph crosses the x-axis at 1/2 and 1 (neither is excluded from the domain).'},
  {t:'input', q:'y-intercept: set x = 0. f(0) = 1/(−4) = ? (fraction or decimal)',
   accept:v=>{let s=norm(v),n;if(s.includes('/')){const p=s.split('/').map(Number);n=p[0]/p[1];}else n=parseFloat(s);return !isNaN(n)&&Math.abs(n+0.25)<1e-6;},
   fb:'Numerator at 0 is 1, denominator is −4.',
   reveal:'y-intercept (0, −1/4). Full toolkit done: domain, VA, HA, intercepts — now sketch.',
   placeholder:'e.g. -1/4 or -0.25'}
 ]},
{id:'c2h9',badge:'Q9 · Bonus · §2.6',
 stmt:'Find the oblique asymptote of f(x) = (x² + 2x − 1)/(x + 1), and verify the gap tends to 0.',
 steps:[
  {t:'say', html:`<p>Numerator degree is exactly denominator degree + 1: expect an OBLIQUE (slant) asymptote <span class="zh">斜渐近线</span> — a tilted line the graph approaches far out. Polynomial long division finds it.</p>`},
  {t:'ask', q:'Divide x² + 2x − 1 by x + 1. Leading term x²/x = x; subtract x(x+1) = x² + x, leaving x − 1. Then x/x = 1; subtract 1·(x+1) = x + 1. The remainder is…',
   choices:[{txt:'−2, so f(x) = (x + 1) − 2/(x + 1)',ok:true},{txt:'0, so f(x) = x + 1 exactly',ok:false},{txt:'2, so f(x) = (x + 1) + 2/(x + 1)',ok:false}],
   ok:'(x+1)(x+1) = x² + 2x + 1; the numerator is exactly 2 less → remainder −2.'},
  {t:'ask', q:'The oblique asymptote is the polynomial part of the division:',
   choices:[{txt:'y = x + 1',ok:true},{txt:'y = x',ok:false},{txt:'y = −2x',ok:false}],
   ok:'The remainder term −2/(x+1) is the vertical GAP between the graph and the line.'},
  {t:'ask', q:'As x → ±∞, the gap −2/(x + 1) behaves like −2/x and tends to…',
   choices:[{txt:'0 — the graph hugs the line y = x + 1',ok:true},{txt:'−2 — a fixed offset',ok:false},{txt:'∞',ok:false}],
   ok:'Gap → 0 is exactly the definition of an oblique asymptote. Equal degrees would have produced a horizontal HA instead.'}
 ]},
{id:'c2h10',badge:'Q10 · Bonus · §2.5',
 stmt:'Prove that on any great circle there are two antipodal points with equal surface temperature (via IVT).',
 steps:[
  {t:'say', html:`<p>Pick any great circle; let θ be angle around it and T(θ) the temperature there. Assume T is continuous in θ and 360°-periodic. Antipodal points differ by 180°.</p>`},
  {t:'ask', q:'Define the temperature DIFFERENCE g(θ) = T(θ) − T(θ + 180°). Why is g continuous?',
   choices:[{txt:'A difference of continuous functions is continuous',ok:true},{txt:'Temperature is always positive',ok:false},{txt:'Because it is periodic',ok:false}],
   ok:'Continuity survives subtraction — and IVT requires g to be continuous.'},
  {t:'ask', q:'Evaluate g half a turn later, using T(θ + 360°) = T(θ): g(θ + 180°) = ?',
   choices:[{txt:'T(θ+180) − T(θ+360) = T(θ+180) − T(θ) = −g(θ)',ok:true},{txt:'g(θ) — unchanged',ok:false},{txt:'2g(θ)',ok:false}],
   ok:'g flips sign after a half-turn: g(θ+180°) = −g(θ). The difference is antisymmetric.'},
  {t:'ask', q:'If g(0) = 0 we are already done. Otherwise g(0) and g(180°) have…',
   choices:[{txt:'Opposite signs — IVT forces a zero between them',ok:true},{txt:'The same sign — nothing follows',ok:false},{txt:'Both zero already',ok:false}],
   ok:'g is continuous on [0, 180°] and g(180°) = −g(0): a sign change ⇒ some θ* has g(θ*) = 0.'},
  {t:'say', html:`<p>At θ*: T(θ*) = T(θ* + 180°) — two antipodal points share the same temperature. A fact about the real world proved from <b>continuity + IVT</b> alone: the globe cannot be strictly warmer than its antipode everywhere.</p>`}
 ]}
];

/* ============================================================
   Quiz — fixed order, exam-style, explanation only after submit
============================================================ */
const QUIZ=[
{id:'set1', name:'Set 1', topic:['DR','DR','FC','FC','CP','TR','RC','RC'], qs:[
 {q:'What is the natural domain of f(x) = 1/(x² − 4)?',
  o:['x ≠ 2 only','x ≠ −2 and x ≠ 2, i.e. (−∞,−2) ∪ (−2,2) ∪ (2,∞)','x > 2','all real numbers'],a:1,
  ex:'Denominator x² − 4 = (x−2)(x+2) ≠ 0, so exclude BOTH roots. Rule 1 excludes single points.'},
 {q:'What is the natural domain of g(x) = √(9 − x)?',
  o:['x ≥ 9','x ≤ 9','x ≥ −9','x ≠ 9'],a:1,
  ex:'Even root: 9 − x ≥ 0 → x ≤ 9, i.e. (−∞, 9].'},
 {q:'The graph of x² + y² = 4 is a circle. Is it the graph of a function of x?',
  o:['Yes — circles are functions','No — it fails the Vertical Line Test','Only when x ≥ 0','It is two functions at every x'],a:1,
  ex:'A vertical line through the interior meets the circle twice: one x, two y-values.'},
 {q:'Evaluate ⌊−2.3⌋ (floor).',
  o:['−2','−3','2','−2.3'],a:1,
  ex:'Floor walks LEFT to the nearest integer: −3. The −2 answer is the classic trap.'},
 {q:'f(x) = √x, g(x) = x − 4. Find (f ∘ g)(x) and its domain.',
  o:['√(x − 4), domain [4, ∞)','√x − 4, domain [0, ∞)','√(x − 4), domain ℝ','√(4 − x), domain (−∞, 4]'],a:0,
  ex:'f(g(x)) = √(x − 4); gate 2 requires g(x) ≥ 0, i.e. x ≥ 4.'},
 {q:'From y = x², the graph y = (x + 2)² − 1 is shifted…',
  o:['right 2, up 1; vertex (2, 1)','left 2, down 1; vertex (−2, −1)','left 2, up 1; vertex (−2, 1)','down 2, left 1; vertex (−1, −2)'],a:1,
  ex:'Inside +2 moves LEFT （左加右减）; outside −1 moves down 1.'},
 {q:'210° expressed in radians is…',
  o:['5π/6','7π/6','7π/4','11π/6'],a:1,
  ex:'210 × π/180 = 7π/6 (π + π/6, Quadrant III).'},
 {q:'sin(4π/3) = ?',
  o:['−1/2','√3/2','−√3/2','1/2'],a:2,
  ex:'QIII: sine negative (CAST); reference angle π/3 has size √3/2 → −√3/2.'}
]},
{id:'set2', name:'Set 2', topic:['DR','DR','FC','CP','TR','RC','RC','TM'], qs:[
 {q:'What is the natural domain of h(x) = √x + 1/(x − 1)?',
  o:['[0, ∞)','(1, ∞)','[0, 1) ∪ (1, ∞)','(0, 1) ∪ (1, ∞)'],a:2,
  ex:'√x needs x ≥ 0 (0 included); the fraction needs x ≠ 1. Intersect: [0,1) ∪ (1,∞).'},
 {q:'f(x) = x² with its domain restricted to x ≥ 2. The range is…',
  o:['[0, ∞)','[4, ∞)','(4, ∞)','[2, ∞)'],a:1,
  ex:'Restricting the domain changes the range: the smallest output is 2² = 4, attained.'},
 {q:'Classify f(x) = x⁴ − 3x².',
  o:['Even','Odd','Neither even nor odd','Both even and odd'],a:0,
  ex:'f(−x) = x⁴ − 3x² = f(x). Both powers are even.'},
 {q:'f(x) = x², g(x) = x + 1. Find (g ∘ f)(x).',
  o:['(x + 1)²','x² + 1','2x + 1','x² + x'],a:1,
  ex:'g(f(x)) = f(x) + 1 = x² + 1. Inner f runs first.'},
 {q:'Compared with y = f(x), the graph of y = 3 f(2x) is…',
  o:['vertically compressed, horizontally stretched','vertically stretched ×3, horizontally compressed ×2','stretched ×3 and ×2 in both directions','reflected and shifted'],a:1,
  ex:'Outside ×3 stretches heights; inside ×2 squeezes horizontally (inside reverses).'},
 {q:'cos(5π/6) = ?',
  o:['−√3/2','−1/2','√3/2','1/2'],a:0,
  ex:'QII: cosine negative; reference angle π/6 has size √3/2 → −√3/2.'},
 {q:'tan(7π/6) = ?',
  o:['−√3/3','−√3','√3/3','undefined'],a:2,
  ex:'QIII: tan positive (CAST); reference π/6: tan = 1/√3 = √3/3.'},
 {q:'h(t) = 31 + 30 sin(π/2 (t − 1)) models the textbook Ferris wheel. Its LOWEST height is…',
  o:['31 m','61 m','1 m','0 m'],a:2,
  ex:'Min = midline − amplitude = 31 − 30 = 1 m (boarding at the bottom).'}
]},
{id:'set3', name:'Set 3', topic:['DR','FC','CP','TR','RC','TM','SW','TR'], qs:[
 {q:'What is the natural domain of f(x) = √(x + 5)?',
  o:['x ≥ −5, i.e. [−5, ∞)','x > −5','x ≥ 5','all real numbers'],a:0,
  ex:'Even root: inside must be ≥ 0, so x + 5 ≥ 0 → x ≥ −5.'},
 {q:'What is the range of y = √x?',
  o:['[0, ∞)','(−∞, ∞)','(0, ∞)','[1, ∞)'],a:0,
  ex:'Square roots are never negative; every y ≥ 0 is attained.'},
 {q:'f(x) = x², g(x) = √x. Find (f ∘ g)(x) and its domain.',
  o:['x, domain [0, ∞)','x, domain ℝ','|x|, domain ℝ','√(x²), domain ℝ'],a:0,
  ex:'Gate 1: x ∈ D(g) needs x ≥ 0. Simplifying (√x)² = x never enlarges the domain — the classic trap.'},
 {q:'From y = |x|, the graph y = −|x + 1| + 2 is…',
  o:['reflected over the x-axis, shifted left 1 and up 2','reflected over the y-axis, shifted right 1 and down 2','shifted right 1 and up 2, no reflection','reflected over the x-axis, shifted right 1 and up 2'],a:0,
  ex:'Inside +1 moves LEFT （左加右减）; outside − reflects over the x-axis; outside +2 lifts. Corner lands at (−1, 2).'},
 {q:'Convert 300° to radians.',
  o:['5π/3','4π/3','3π/2','11π/6'],a:0,
  ex:'300 · π/180 = 5π/3 (QIV, one step short of 2π).'},
 {q:'A tide model is h(t) = 2 + 1.5 sin(2π/12.4 · t). The time between consecutive high tides is…',
  o:['12.4 h','24.8 h','6.2 h','1.5 h'],a:0,
  ex:'The period is B = 12.4; the midline 2 and amplitude 1.5 are distractors.'},
 {q:'sin(100x) plotted on [−10, 10] looks like a slow smooth wave. The most likely explanation:',
  o:['aliasing — too few samples per period; zoom in','sin(100x) is genuinely slow on wide windows','the function is undefined somewhere in the window','the window must be non-square'],a:0,
  ex:'Period ≈ 0.063; one sample per pixel column invents a fake slow wave. Zoom in to see the true oscillation.'},
 {q:'y = sin(x/2) compared with y = sin x has…',
  o:['period doubled to 4π','period halved to π','amplitude halved','shifted right 2'],a:0,
  ex:'Inside ×1/2 stretches horizontally by 1/c — features spread out.'}
]},
{id:'set4', name:'Set 4', topic:['FC','CP','TR','TR','RC','TI','TM','SW'], qs:[
 {q:'Classify f(x) = x³.',
  o:['Odd','Even','Neither even nor odd','Both even and odd'],a:0,
  ex:'f(−x) = −x³ = −f(x): rotational symmetry about the origin.'},
 {q:'f(x) = 1/x, g(x) = x + 3. The domain of (f ∘ g)(x) = 1/(x + 3) is…',
  o:['x ≠ −3','x ≠ 0','x ≠ −3 and x ≠ 0','all real numbers'],a:0,
  ex:'The only gate is the denominator: g(x) must never be 0, so x ≠ −3.'},
 {q:'y = (x + 3)² comes from y = x² by shifting…',
  o:['left 3','right 3','up 3','down 3'],a:0,
  ex:'Inside addition runs in reverse: +3 next to x moves the graph LEFT.'},
 {q:'7π/4 expressed in degrees is…',
  o:['315°','225°','330°','240°'],a:0,
  ex:'7π/4 · 180/π = 315° (QIV).'},
 {q:'Given sin θ = 5/13 with θ in Quadrant IV, cos θ =',
  o:['12/13','−12/13','±12/13','5/12'],a:0,
  ex:'cos²θ = 1 − 25/169 = 144/169; CAST says cosine is positive in QIV → 12/13.'},
 {q:'Ferris wheel: radius 20 m, center 22 m above ground, one revolution per 8 min, boarding at the lowest point. h(0) =',
  o:['2 m','42 m','22 m','20 m'],a:0,
  ex:'Lowest point = midline − amplitude = 22 − 20 = 2 m.'},
 {q:'A linear fit predicts college tuition well within 1990–2011. Using it to predict 2050 is…',
  o:['risky extrapolation — the farther out, the bigger the bet','safe, because the fit inside the data is excellent','safe because the model is linear','impossible with least squares'],a:0,
  ex:'Extrapolation beyond the data assumes the trend continues — a bet, not a guarantee.'},
 {q:'(1 − cos²θ)/sin²θ simplifies to…',
  o:['1','cot²θ','tan²θ','cos²θ'],a:0,
  ex:'Mother identity: 1 − cos²θ = sin²θ, so the ratio is 1 wherever defined.'}
]},
{id:'set5', name:'Set 5', topic:['DR','FC','FC','CP','TR','RC','TI','SW'], qs:[
 {q:'What is the natural domain of h(x) = √x / (x − 3)?',
  o:['[0, 3) ∪ (3, ∞)','(3, ∞)','[0, ∞)','(0, 3) ∪ (3, ∞)'],a:0,
  ex:'Root needs x ≥ 0 (0 included); the denominator kills x = 3. Intersect.'},
 {q:'Evaluate ⌈3.2⌉ + ⌊−0.5⌋.',
  o:['3','4','5','2'],a:0,
  ex:'Ceiling walks right: 3.2 → 4. Floor walks LEFT: −0.5 → −1. Sum = 3.'},
 {q:'Does the curve x = y² − 1 pass the Vertical Line Test?',
  o:['No — it opens sideways; some vertical lines meet it twice','Yes — every equation passes','Only for y > 0','It has no graph'],a:0,
  ex:'Solving for y gives y = ±√(x + 1): two outputs for one input — not a function of x.'},
 {q:'Decompose h(x) = cos²(5x) as f ∘ g. Correct layers:',
  o:['g(x) = cos 5x, f(u) = u²','g(x) = 5x, f(u) = cos²u','g(x) = cos x, f(u) = 5u²','g(x) = x², f(u) = cos 5u'],a:0,
  ex:'The inner machine cos 5x runs first, then squaring. Peel from the inside out.'},
 {q:'The vertex of y = 2(x + 1)² − 4 is…',
  o:['(−1, −4)','(1, −4)','(−1, 4)','(1, 4)'],a:0,
  ex:'Inside +1 → left 1; outside −4 → down 4.'},
 {q:'tan(3π/2) is…',
  o:['undefined','0','1','−1'],a:0,
  ex:'cos(3π/2) = 0 and tan = sin/cos — division by zero is never allowed.'},
 {q:'A curve fails the Vertical Line Test. Its upper and lower halves, taken separately…',
  o:['can each be a function (branches)','also fail','become one bigger function','are not graphs'],a:0,
  ex:'Branches of a failed curve can each pass — one circle = two semicircle functions.'},
 {q:'Least squares picks the curve that minimizes…',
  o:['Σ(yᵢ − f(xᵢ))²','Σ|yᵢ − f(xᵢ)|','the largest single error','the number of data points'],a:0,
  ex:'Squares cannot cancel signs, punish big errors harder, and are smooth — calculus-friendly.'}
]},
/* ---------------- Chapter 2 quiz sets ---------------- */
{id:'set6', name:'Set 6 · Rates & Limit Laws', topic:['RT','RT','LL','LL','LL','LL','RT','RT'], qs:[
 {q:'limₓ→₂ (x² − 4)/(x − 2) = ?',
  o:['4','0','2','does not exist'],a:0,
  ex:'Factor: (x−2)(x+2)/(x−2) = x+2 for x ≠ 2 → 2+2 = 4. The hole is filled at height 4.'},
 {q:'y = 4.9t². Average speed on [1, 3] is…',
  o:['(y(3) − y(1))/2 = 19.6 m/s','44.1/3 = 14.7 m/s','44.1 − 4.9 = 39.2 m/s','9.8 m/s'],a:0,
  ex:'y(3) = 44.1, y(1) = 4.9: (44.1 − 4.9)/(3 − 1) = 39.2/2 = 19.6.'},
 {q:'limₓ→₂ (x² + 3x) = ? (limit laws, direct substitution)',
  o:['10','6','0','2'],a:0,
  ex:'Polynomials are continuous: 2² + 3·2 = 4 + 6 = 10.'},
 {q:'limₓ→₀ x² sin(1/x) = ?',
  o:['0, by the Sandwich Theorem','1','∞','does not exist'],a:0,
  ex:'−x² ≤ x² sin(1/x) ≤ x², and both slices → 0. Bounded wobble × vanishing factor.'},
 {q:'limₓ→₀ (√(x+4) − 2)/x = ?',
  o:['1/4','1/2','0','does not exist'],a:0,
  ex:'Multiply by conjugate √(x+4)+2: numerator becomes x, cancel → 1/(√(x+4)+2) → 1/4.'},
 {q:'limₓ→₁ (x² + x − 2)/(x − 1) = ?',
  o:['3','0','1','does not exist'],a:0,
  ex:'(x+2)(x−1)/(x−1) = x+2 → 3 at x = 1.'},
 {q:'As h → 0, slopes of secants PQ tend to…',
  o:['the slope of the tangent at P (instantaneous rate)','the average rate over the whole interval','the slope of the x-axis','infinity'],a:0,
  ex:'Q slides into P; the secant rotates into the tangent — its limiting slope is the derivative.'},
 {q:'The difference quotient computing average rate over [a, a+h] is…',
  o:['(f(a+h) − f(a))/h','f(a)/a','(f(a+h) + f(a))/h','f(a+h) − f(a)'],a:0,
  ex:'Rise over run: change in output f(a+h)−f(a) divided by change in input h.'}
]},
{id:'set7', name:'Set 7 · ε–δ & One-Sided Limits', topic:['EP','EP','OS','OS','OS','OS','OS','EP'], qs:[
 {q:'For limₓ→₃ (2x − 1) = 5, which δ works for a given ε?',
  o:['δ = ε/2','δ = 2ε','δ = ε','δ = ε − 2'],a:0,
  ex:'|2x−6| = 2|x−3| < ε ⇔ |x−3| < ε/2.'},
 {q:'In that proof, if ε = 0.01 then δ = ?',
  o:['0.005','0.01','0.02','0.001'],a:0,
  ex:'δ = ε/2 = 0.005.'},
 {q:'lim_{θ→0} sin(3θ)/(5θ) = ?',
  o:['3/5','5/3','1','0'],a:0,
  ex:'(3/5)·sin(3θ)/(3θ) → (3/5)·1 = 3/5.'},
 {q:'limₓ→₀ tan(2x)/x = ?',
  o:['2','1','1/2','does not exist'],a:0,
  ex:'2·[sin 2x/2x]·[1/cos 2x] → 2·1·1 = 2.'},
 {q:'limₓ→₀ |x|/x = ?',
  o:['does not exist: left = −1, right = +1','0','1','−1'],a:0,
  ex:'x < 0: |x|/x = −1; x > 0: |x|/x = +1. One-sided limits disagree.'},
 {q:'limₓ→₀ sin x / x = ?',
  o:['1','0','x','does not exist'],a:0,
  ex:'The fundamental trig limit (angles in radians), proved by the sandwich with areas.'},
 {q:'The two-sided limit limₓ→c f(x) exists exactly when…',
  o:['both one-sided limits exist and are equal','f is defined at c','f(c) equals zero','f is positive on both sides'],a:0,
  ex:'Theorem 6: limₓ→c = L iff limₓ→c⁻ = L AND limₓ→c⁺ = L.'},
 {q:'In “0 < |x − c| < δ ⇒ |f(x) − L| < ε”, the “0 <” means…',
  o:['x itself is excluded — the limit ignores the value at c','x must be greater than c','f(c) must equal L','δ must be larger than ε'],a:0,
  ex:'Limits describe behaviour NEAR c, not AT c — which is why holes can still have limits.'}
]},
{id:'set8', name:'Set 8 · Continuity & Asymptotes', topic:['CT','CT','CT','CT','IN','IN','IN','IV'], qs:[
 {q:'f(x) = x² + |x| at x = 0 is…',
  o:['continuous (both pieces give 0, no break)','a removable discontinuity','a jump discontinuity','an infinite discontinuity'],a:0,
  ex:'Sums of continuous functions are continuous; x² and |x| both continue through 0.'},
 {q:'g(x) = (x² − 1)/(x − 1) at x = 1 is a removable hole. Its continuous extension sets g(1) = ?',
  o:['2','1','0','undefined forever'],a:0,
  ex:'Cancel to x + 1 (x ≠ 1); define g(1) = 1 + 1 = 2 to remove the discontinuity.'},
 {q:'The Intermediate Value Theorem requires f to be…',
  o:['continuous on the closed interval [a, b]','differentiable on (a, b)','satisfying f(a) = f(b)','positive everywhere'],a:0,
  ex:'Continuity on [a,b] plus f(a), f(b) straddling N guarantees an interior point with value N.'},
 {q:'Bisection starting from an interval of width 1 gives a bracket of width ___ after n steps.',
  o:['1/2ⁿ','1/n','n²/2','still 1'],a:0,
  ex:'Each midpoint halves the bracket: 1 → 1/2 → 1/4 → … Guaranteed linear convergence.'},
 {q:'Horizontal asymptote of (3x² + 2x)/(x² − 1) is…',
  o:['y = 3','y = 0','none — degrees differ','y = 3x'],a:0,
  ex:'Equal degrees: ratio of leading coefficients 3/1 = 3.'},
 {q:'Vertical asymptote(s) of (2x² − 3x + 1)/(x² − 4):',
  o:['x = 2 and x = −2','x = 2 only','x = 1/2 and x = 1','none'],a:0,
  ex:'Denominator zero at ±2; numerator is 3 and 15 there (nonzero), so both are VAs.'},
 {q:'If numerator degree is exactly ONE more than denominator degree, far out the graph…',
  o:['approaches a slant (oblique) line found by division','has HA y = 0','has HA equal to the coefficient ratio','grows without any guiding line'],a:0,
  ex:'Division gives f(x) = mx + b + remainder/(denom); the remainder term → 0.'},
 {q:'A function f has an inverse f⁻¹ if and only if f is…',
  o:['one-to-one (passes the Horizontal Line Test)','continuous','linear','defined for all real x'],a:0,
  ex:'One-to-one means each output came from a unique input — required to “undo” unambiguously.'}
]}
];
const TOPICS={DR:'Domain & range',FC:'Function concept & VLT',CP:'Composition',TR:'Shifts & scaling',RC:'Radians & unit circle',TM:'Trig modeling',TI:'Trig identities',SW:'Software & regression',RT:'Rates & tangents',LL:'Limit laws',EP:'ε–δ definition',OS:'One-sided & trig limits',CT:'Continuity & IVT',IN:'Limits at infinity',IV:'Inverse functions'};

/* ============================================================
   Word flashcards — key terminology of Chapters 1–2
============================================================ */
const WORDS=[
{en:'function',zh:'函数',def:"A rule assigning exactly ONE output to each allowed input.",ex:"f(x) = 2x + 3 is a function: every x gives one f(x).",sec:'1.1'},
{en:'domain',zh:'定义域',def:"The set D of all allowed inputs of a function.",ex:"For 1/(x−2), the domain excludes x = 2.",sec:'1.1'},
{en:'range',zh:'值域',def:"All output values the function actually produces.",ex:"The range of x² is [0, ∞).",sec:'1.1'},
{en:'input / output',zh:'输入 / 输出',def:"What goes into the function machine / what comes out.",ex:"Input x = 4 gives output f(4).",sec:'1.1'},
{en:'independent variable',zh:'自变量',def:"The input variable you choose freely (usually x).",ex:"Dose d is the independent variable in C(d).",sec:'1.1'},
{en:'dependent variable',zh:'因变量',def:"The output whose value depends on the input (usually y).",ex:"Blood concentration depends on the dose.",sec:'1.1'},
{en:'vertical line test',zh:'垂线检验',def:"A graph is a function of x if no vertical line meets it more than once.",ex:"A circle fails the vertical line test.",sec:'1.1'},
{en:'piecewise function',zh:'分段函数',def:"A function defined by different formulas on different intervals.",ex:"Tax rates are often given piecewise.",sec:'1.1'},
{en:'composition',zh:'复合（函数）',def:"Applying one function to the result of another: (f∘g)(x) = f(g(x)).",ex:"Socks then shoes — order matters.",sec:'1.2'},
{en:'even function',zh:'偶函数',def:"Symmetric about the y-axis: f(−x) = f(x).",ex:"x² and cos x are even.",sec:'1.2'},
{en:'odd function',zh:'奇函数',def:"Symmetric about the origin: f(−x) = −f(x).",ex:"x³ and sin x are odd.",sec:'1.2'},
{en:'transformation',zh:'变换',def:"A shift, reflection, or scaling that turns one graph into another.",ex:"y = a·f(x − h) + k.",sec:'1.2'},
{en:'shift / translation',zh:'平移',def:"Sliding a graph without rotating or reshaping it.",ex:"f(x) + 3 shifts the graph up 3.",sec:'1.2'},
{en:'scaling / stretch',zh:'缩放（伸缩）',def:"Multiplying outputs or inputs to stretch or compress a graph.",ex:"2·f(x) stretches vertically by factor 2.",sec:'1.2'},
{en:'reflection',zh:'反射（翻转）',def:"A mirror image across an axis, produced by a minus sign.",ex:"−f(x) reflects across the x-axis.",sec:'1.2'},
{en:'radian',zh:'弧度',def:"An angle measure: arc length divided by radius. π rad = 180°.",ex:"30° = π/6 radians.",sec:'1.3'},
{en:'unit circle',zh:'单位圆',def:"Circle of radius 1; cos θ and sin θ are coordinates on it.",ex:"(cos θ, sin θ) is the point at angle θ.",sec:'1.3'},
{en:'reference angle',zh:'参考角',def:"The acute angle to the x-axis; fixes the value, CAST fixes the sign.",ex:"For 210°, the reference angle is 30°.",sec:'1.3'},
{en:'amplitude',zh:'振幅',def:"Half the distance between maximum and minimum of a sinusoid.",ex:"A = (max − min)/2.",sec:'1.3'},
{en:'period',zh:'周期',def:"The length of one full repeating cycle.",ex:"sin(Bt) has period 2π/|B|.",sec:'1.3'},
{en:'phase shift',zh:'相位偏移',def:"A horizontal slide of a periodic graph: C in sin(B(t − C)).",ex:"A Ferris wheel starting late has a phase shift.",sec:'1.3'},
{en:'scatterplot',zh:'散点图',def:"A plot of paired data as points; shows relationship shape.",ex:"Points nearly on a line suggest a linear model.",sec:'1.4'},
{en:'regression',zh:'回归（最小二乘）',def:"A best-fit curve chosen to minimise total squared error.",ex:"Least-squares line ŷ = ax + b.",sec:'1.4'},
{en:'slope',zh:'斜率',def:"Rate of change: rise over run.",ex:"Slope 2 means +2 in y per +1 in x.",sec:'1.4'},
/* Chapter 2 */
{en:'one-to-one',zh:'一一对应',def:"No two different inputs share an output: f(a) = f(b) implies a = b.",ex:"f(x) = x³ is one-to-one; f(x) = x² is not (2 and −2 both give 4).",sec:'2.0'},
{en:'inverse function',zh:'反函数',def:"f⁻¹ undoes f: f⁻¹(y) = the unique x with f(x) = y. Only exists for one-to-one f.",ex:"If f(x) = 2x + 3, then f⁻¹(y) = (y − 3)/2.",sec:'2.0'},
{en:'horizontal line test',zh:'水平线检验',def:"A function is one-to-one iff no horizontal line meets its graph more than once.",ex:"A sideways-opening parabola fails the horizontal line test.",sec:'2.0'},
{en:'average rate of change',zh:'平均变化率',def:"Slope of the secant over [a,b]: (f(b) − f(a))/(b − a).",ex:"Average speed over [2, 3] is (y(3) − y(2))/1.",sec:'2.1'},
{en:'secant line',zh:'割线',def:"A line through TWO points P and Q on a curve.",ex:"Its slope is the average rate between P and Q.",sec:'2.1'},
{en:'tangent line',zh:'切线',def:"The limiting position of secants PQ as Q slides into P — touches at P.",ex:"Tangent slope at P is the instantaneous rate of change.",sec:'2.1'},
{en:'instantaneous rate of change',zh:'瞬时变化率',def:"The limit of average rates as the interval shrinks to a point.",ex:"A speedometer needle shows the instantaneous speed.",sec:'2.1'},
{en:'increment',zh:'增量',def:"A small change Δx (often h) in the input.",ex:"The difference quotient steps from x to x + h.",sec:'2.1'},
{en:'limit',zh:'极限',def:"The value f(x) approaches as x nears c — behaviour NEAR c, not at c.",ex:"limₓ→₂ (x²−4)/(x−2) = 4 even though f(2) is undefined.",sec:'2.2'},
{en:'limit laws',zh:'极限运算法则',def:"Limits respect sums, differences, products, quotients (denom ≠ 0), powers and roots.",ex:"lim (f + g) = lim f + lim g; same pattern for products.",sec:'2.2'},
{en:'indeterminate form',zh:'不定式',def:"A form like 0/0 whose value is not determined by substitution alone.",ex:"0/0 signals: simplify (factor, rationalize) before evaluating.",sec:'2.2'},
{en:'two-sided limit',zh:'双侧极限',def:"limₓ→c f(x): approach from BOTH sides must agree.",ex:"|x|/x has no two-sided limit at 0: −1 from left, +1 from right.",sec:'2.2'},
{en:'rationalize',zh:'有理化',def:"Multiply by a conjugate to remove a radical (or a root from a denominator).",ex:"(√(x+4) − 2)/x is fixed with √(x+4) + 2.",sec:'2.2'},
{en:'Sandwich (Squeeze) Theorem',zh:'夹逼定理',def:"If g ≤ f ≤ h and g, h both tend to L near c, then f is forced to L too.",ex:"−x² ≤ x²sin(1/x) ≤ x² forces the limit 0.",sec:'2.2'},
{en:'does not exist (DNE)',zh:'极限不存在',def:"No single number is approached — sides disagree, unbounded growth, or persistent oscillation.",ex:"limₓ→₀ |x|/x DNE (left −1, right +1).",sec:'2.2'},
{en:'epsilon–delta definition (ε–δ)',zh:'ε–δ 精确定义',def:"lim f = L means: for every ε > 0 there is δ > 0 with 0 < |x−c| < δ ⇒ |f(x)−L| < ε.",ex:"For 2x − 1 at x = 3, choosing δ = ε/2 works.",sec:'2.3'},
{en:'tolerance',zh:'容差',def:"ε is the allowed output error; δ is the input precision that guarantees it.",ex:"A machine shop: ε is the part’s allowed error, δ is how precisely to set the cutter.",sec:'2.3'},
{en:'one-sided limit',zh:'单侧极限',def:"limₓ→c⁻ from the left; limₓ→c⁺ from the right. Each ignores the other side.",ex:"At a jump, left and right limits exist but differ.",sec:'2.4'},
{en:'small-angle approximation',zh:'小角近似',def:"For small angles (radians), sin θ ≈ θ — formalized by lim sin θ/θ = 1.",ex:"sin(0.01) ≈ 0.0099998 ≈ 0.01.",sec:'2.4'},
{en:'continuous at a point',zh:'（在某点）连续',def:"f is continuous at c iff limₓ→c f(x) = f(c): limit exists, value exists, they agree.",ex:"Polynomials are continuous at every real number.",sec:'2.5'},
{en:'removable discontinuity',zh:'可去间断点',def:"A hole: the two-sided limit exists but f(c) is missing or mismatched; redefining f(c) fixes it.",ex:"(x² − 1)/(x − 1) at 1: define f(1) = 2.",sec:'2.5'},
{en:'jump discontinuity',zh:'跳跃间断点',def:"Left and right limits both exist but are DIFFERENT — the graph leaps.",ex:"A step in a postage or ceiling-style fee function.",sec:'2.5'},
{en:'infinite discontinuity',zh:'无穷间断点',def:"A vertical asymptote: f blows to ±∞ near c, so no finite limit exists.",ex:"1/x at x = 0 — the two sides even run off in opposite directions.",sec:'2.5'},
{en:'oscillating discontinuity',zh:'振荡间断点',def:"The function keeps wobbling near c with no settling value (amplitude not crushed).",ex:"sin(1/x) near 0 oscillates through [−1,1] forever.",sec:'2.5'},
{en:'continuous extension',zh:'连续延拓',def:"Filling a removable hole by defining f(c) as the existing limit.",ex:"(x²−1)/(x−1) extends at x = 1 with value 2.",sec:'2.5'},
{en:'Intermediate Value Theorem',zh:'介值定理',def:"Continuous f on [a,b] takes EVERY value between f(a) and f(b) at least once.",ex:"f(1) = −1 and f(2) = 5 ⇒ a root hides inside (1,2).",sec:'2.5'},
{en:'bisection method',zh:'二分法',def:"Repeatedly halve a sign-changing bracket to trap a root; error shrinks by 1/2 each step.",ex:"Width 1 needs 10 halvings to get under 0.001 (2¹⁰ = 1024).",sec:'2.5'},
{en:'end behavior',zh:'末端趋势',def:"What f(x) does as x → +∞ or x → −∞ — read from the dominant terms.",ex:"Rational functions settle toward horizontal or slant lines.",sec:'2.6'},
{en:'horizontal asymptote',zh:'水平渐近线',def:"A line y = L that f(x) approaches as x → ±∞ (the graph may cross it).",ex:"Ratio of leading coefficients when degrees are equal.",sec:'2.6'},
{en:'vertical asymptote',zh:'垂直渐近线',def:"A line x = c near which f(x) → ±∞; typically a nonzero numerator over a zero denominator.",ex:"x = 0 is a vertical asymptote of 1/x.",sec:'2.6'},
{en:'oblique (slant) asymptote',zh:'斜渐近线',def:"A non-horizontal line y = mx + b approached as x → ±∞; occurs when numerator degree is one higher.",ex:"(x²+2x−1)/(x+1) hugs y = x + 1.",sec:'2.6'},
{en:'dominant term',zh:'主导项',def:"The highest-power term that controls a polynomial’s size for large |x|.",ex:"In 3x² − 100x + 2, the 3x² dominates, so f(x)/x² → 3.",sec:'2.6'},
{en:'infinite limit',zh:'无穷极限',def:"f(x) grows without bound (→ ∞ or −∞) near a finite point — the limit DNE, but the symbol records HOW.",ex:"limₓ→0⁺ 1/x = +∞; the vertical asymptote description.",sec:'2.6'},
];
