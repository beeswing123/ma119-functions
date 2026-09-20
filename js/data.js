/* ============================================================
   Lesson scripts — one question per turn
============================================================ */
const T=(en,zh)=>zh?`${en} <span class="zh">（${zh}）</span>`:en;

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
]}
];
const TOPICS={DR:'Domain & range',FC:'Function concept & VLT',CP:'Composition',TR:'Shifts & scaling',RC:'Radians & unit circle',TM:'Trig modeling',TI:'Trig identities',SW:'Software & regression'};

/* ============================================================
   Word flashcards — key terminology of Chapter 1
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
];
