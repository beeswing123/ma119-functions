/* ============================================================
   Small helpers
============================================================ */
const $=s=>document.querySelector(s);
const el=(tag,cls,html)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e;};
const norm=v=>String(v).replace(/\s+/g,'').replace(/−/g,'-').replace(/[“”]/g,'"').toLowerCase();
const shuffle=(a)=>{const b=a.slice();for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;};
function addMissed(type,a,b){
  const k=type+':'+a+':'+b;
  if(!S.missed.some(m=>m.k===k)) S.missed.push({k,type,a,b});
}
function afterAttempt(step, node, ok, fbEl){
  const key='s'+S.sec+'_'+S.step;
  if(ok){
    const firstOk=!step._tries;
    S.learn[key]=firstOk?1:0;
    if(!firstOk) addMissed('learn',S.sec,S.step);
    saveStore();
    fbEl.className='fb show ok';
    fbEl.textContent = step.ok || 'Nice — that is exactly it.';
    node.querySelectorAll('button,input').forEach(b=>b.disabled=true);
    const row=el('div','continue-row');
    const c=el('button','btn','Continue →');
    c.onclick=()=>advanceLesson();
    row.appendChild(c); node.appendChild(row);
  }else{
    step._tries=(step._tries||0)+1;
    fbEl.className='fb show no';
    if(step._tries>=2 && step.reveal){
      S.learn[key]=0; addMissed('learn',S.sec,S.step); saveStore();
      fbEl.innerHTML = (step.fb||'Take another look. ')+'<br><br>'+step.reveal;
      node.querySelectorAll('button,input').forEach(b=>b.disabled=true);
      const row=el('div','continue-row');
      const c=el('button','btn','I get it — Continue →');
      c.onclick=()=>advanceLesson();
      row.appendChild(c); node.appendChild(row);
    }else{
      fbEl.textContent = step.fb || 'Not quite — give it another try. Talk it through in your head first.';
    }
  }
}
function startHelp(st,body,ch,fb,helper){
  if(st._helped)return;st._helped=true;
  S.learn['s'+S.sec+'_'+S.step]=0;addMissed('learn',S.sec,S.step);saveStore();
  if(st.scaffold){renderScaffold(st,body,ch,fb,helper);}
  else{finishHelp(st,body,ch,fb,helper);}
}
function finishHelp(st,body,ch,fb,helper){
  if(ch){[...ch.children].forEach((x,i)=>{x.disabled=true;if(st.choices&&st.choices[i]&&st.choices[i].ok)x.classList.add('correct');});}
  const ip=body.querySelector('input');if(ip)ip.disabled=true;
  const ib=body.querySelector('.inline-input button');if(ib)ib.disabled=true;
  const sk=body.querySelector('.skiprow button');if(sk)sk.disabled=true;
  helper.innerHTML='';
  fb.className='fb show no';
  fb.innerHTML=st.reveal||st.ok||'See the section recap.';
  if(st.detail){
    const d=el('button','ghostmini','More detail ▸ 更多');
    const dx=el('div','expl');
    dx.style.display='none';dx.innerHTML=st.detail;
    d.onclick=()=>{dx.style.display=dx.style.display==='none'?'block':'none';};
    helper.append(d,dx);
  }
  const row=el('div','continue-row');const nx=el('button','btn','Continue →');
  nx.onclick=()=>advanceLesson();row.appendChild(nx);body.appendChild(row);convScroll();
}
function renderScaffold(st,body,ch,fb,helper){
  const sc=el('div','scaffold');
  const head=el('div','sch-head','Let\'s build it up in small steps 分步引导');
  sc.appendChild(head);
  let i=0;
  function step(){
    if(i>=st.scaffold.length){
      sc.innerHTML='';
      const done=el('div','sch-head','Now you\'ve seen every move — try the original again ↺');
      const back=el('button','btn','Back to the question ↺');
      back.onclick=()=>{sc.remove();fb.className='fb';fb.textContent='';
        if(ch)ch.querySelectorAll('button').forEach(x=>{if(!x.classList.contains('correct'))x.disabled=false;});
        const ip=body.querySelector('input');if(ip){ip.disabled=false;ip.focus();}};
      sc.append(done,back);convScroll();return;
    }
    const mini=st.scaffold[i];
    const mq=el('p','',`<b>${i+1}/${st.scaffold.length}.</b> ${mini.q}`);
    const mch=el('div','choices');const mfb=el('div','fb');
    let mt=0;
    mini.choices.forEach(mc=>{
      const mb=el('button','',mc.txt);
      mb.onclick=()=>{
        if(mc.ok){mch.querySelectorAll('button').forEach(x=>x.disabled=true);mb.classList.add('correct');
          mfb.className='fb show ok';mfb.textContent=mini.oktxt;
          const nx=el('button','ghostmini','Next ▸');nx.onclick=()=>{i++;step();};mfb.appendChild(document.createElement('br'));mfb.appendChild(nx);}
        else{mt++;mb.disabled=(mt>=2);mb.classList.add('wrong');
          mfb.className='fb show no';
          mfb.textContent=mt>=2?(mini.oktxt||''):(mini.fb||'Not quite.');
          if(mt>=2){const nx=el('button','ghostmini','Next ▸');nx.onclick=()=>{i++;step();};mfb.appendChild(document.createElement('br'));mfb.appendChild(nx);}}
      };
      mch.appendChild(mb);
    });
    const holder=el('div','');holder.append(mq,mch,mfb);
    sc.appendChild(holder);convScroll();
  }
  helper.innerHTML='';body.appendChild(sc);step();
}

/* ============================================================
   Interactive widgets (canvas)
============================================================ */
const WIDGETS={};

/* ---- W1: Vertical Line Test ---- */
WIDGETS.vlt={
  curves:{
    parabola:{name:'y = x² (parabola)',pts:(x)=>[0.28*x*x].filter(y=>Math.abs(y)<=130),max:1},
    circle:  {name:'x² + y² = 1 (circle)',pts:(x)=>{const r=95,x2=x*x;return x2<=r*r?[Math.sqrt(r*r-x2),-Math.sqrt(r*r-x2)]:[];}},
    side:    {name:'x = y² (sideways)',pts:(x)=>x>=0?[Math.sqrt(150*x),-Math.sqrt(150*x)].filter(y=>Math.abs(y)<=130):[]},
    sine:    {name:'y = sin x',pts:(x)=>[60*Math.sin(x/32)]},
  },
  mount(host){
    host.innerHTML=`
      <h4>Vertical Line Test <span class="zh">垂直线检验</span></h4>
      <div class="wsub">Drag the orange vertical line across each curve. A curve is a function only if the line meets it <b>at most once</b>.</div>
      <div class="wrow">
        <canvas id="vltC" width="330" height="280"></canvas>
        <div class="wcontrols">
          <div class="wbtns" id="vltBtns"></div>
          <div class="readout" id="vltOut">—</div>
          <p class="muted" style="font-size:12.5px">One fixed x = one vertical line. Two crossings = two heights for the same input.</p>
        </div>
      </div>`;
    const cv=$('#vltC'),ctx=cv.getContext('2d');
    const W=330,H=280,cx=W/2,cy=H/2;
    let cur='parabola', vx=60, drag=false;
    const btns=$('#vltBtns'), out=$('#vltOut');
    Object.keys(this.curves).forEach(k=>{
      const b=el('button',k===cur?'on':'',this.curves[k].name);
      b.onclick=()=>{cur=k;[...btns.children].forEach(c=>c.classList.remove('on'));b.classList.add('on');draw();};
      btns.appendChild(b);
    });
    const X=x=>cx+x, Y=y=>cy-y;
    function draw(){
      ctx.clearRect(0,0,W,H);
      // grid
      ctx.strokeStyle='#1e2127';ctx.lineWidth=1;
      for(let g=-150;g<=150;g+=30){ctx.beginPath();ctx.moveTo(X(g),0);ctx.lineTo(X(g),H);ctx.stroke();ctx.beginPath();ctx.moveTo(0,Y(g));ctx.lineTo(W,Y(g));ctx.stroke();}
      ctx.strokeStyle='#3c4250';ctx.lineWidth=1.5;
      ctx.beginPath();ctx.moveTo(0,cy);ctx.lineTo(W,cy);ctx.moveTo(cx,0);ctx.lineTo(cx,H);ctx.stroke();
      // curve
      ctx.strokeStyle='#8fb0ff';ctx.lineWidth=2.3;ctx.beginPath();
      for(let px=0;px<=W;px++){
        const wx=px-cx, ys=WIDGETS.vlt.curves[cur].pts(wx);
        ys.forEach((yy,idx)=>{const py=Y(yy);idx===0&&ys.length===1?(px===0?ctx.moveTo(px,py):ctx.lineTo(px,py)):ctx.rect(px-1.2,py-1.2,2.4,2.4);});
      }
      ctx.stroke();
      // vertical line
      const hits=WIDGETS.vlt.curves[cur].pts(vx).length;
      ctx.strokeStyle='#5f8af7';ctx.setLineDash([6,5]);ctx.lineWidth=2;
      ctx.beginPath();ctx.moveTo(X(vx),8);ctx.lineTo(X(vx),H-8);ctx.stroke();ctx.setLineDash([]);
      ctx.fillStyle='#5f8af7';ctx.beginPath();ctx.arc(X(vx),14,5,0,7);ctx.fill();
      WIDGETS.vlt.curves[cur].pts(vx).forEach(yy=>{ctx.fillStyle='#67c587';ctx.beginPath();ctx.arc(X(vx),Y(yy),5,0,7);ctx.fill();});
      out.innerHTML = hits===0
        ? '0 crossings here (line misses the curve). Keep scanning…'
        : hits===1
          ? '<b style="color:#8fd4a8">1 crossing → PASS</b> — at this x, one output.'
          : `<b style="color:#f0a8a0">${hits} crossings → FAIL</b> — one x, two y-values: not a function of x.`;
    }
    draw();
    cv.addEventListener('pointerdown',e=>{drag=true;cv.setPointerCapture(e.pointerId);move(e);});
    cv.addEventListener('pointermove',e=>{if(drag)move(e);});
    cv.addEventListener('pointerup',()=>drag=false);
    function move(e){const r=cv.getBoundingClientRect();vx=Math.max(-150,Math.min(150,e.clientX-r.left-cx));draw();}
  }
};

/* ---- W2: Transformation lab ---- */
WIDGETS.trans={
  mount(host){
    host.innerHTML=`
      <h4>Transformation Lab <span class="zh">图像变换实验室</span></h4>
      <div class="wsub">Start from <span class="math">y = x²</span>. Watch <span class="math">y = a·f(x − h) + k</span> respond. Note which moves behave "in reverse".</div>
      <div class="wrow">
        <canvas id="trC" width="330" height="330"></canvas>
        <div class="wcontrols">
          <label>a (vertical scale / flip) <b id="trA">1</b><input type="range" id="ra" min="-3" max="3" step="0.5" value="1"></label>
          <label>h (inside, horizontal) <b id="trH">0</b><input type="range" id="rh" min="-4" max="4" step="0.5" value="0"></label>
          <label>k (outside, vertical shift) <b id="trK">0</b><input type="range" id="rk" min="-5" max="6" step="0.5" value="0"></label>
          <div class="readout" id="trF">y = x²</div>
          <div class="readout" id="trPt" style="margin-top:6px">Drag the blue dot on y = x² — watch where its image lands <span class="zh">拖动蓝点，观察对应点</span></div>
          <p class="muted" style="font-size:12.5px">Challenge: can you build <span class="math">y = −2(x − 3)² + 5</span>? Vertex should land at (3, 5), opening downward.</p>
        </div>
      </div>`;
    const cv=$('#trC'),ctx=cv.getContext('2d'),W=330,H=330,cx=W/2,cy=H-30,sc=26;
    const X=x=>cx+x*sc, Y=y=>cy-y*sc;
    const vals=()=>({a:+$('#ra').value,h:+$('#rh').value,k:+$('#rk').value});
    let t=-1.6, drag=false;
    function draw(){
      const {a,h,k}=vals();
      ctx.clearRect(0,0,W,H);
      ctx.strokeStyle='#1e2127';
      for(let g=-6;g<=6;g++){ctx.beginPath();ctx.moveTo(X(g),0);ctx.lineTo(X(g),H);ctx.stroke();}
      for(let g=-2;g<=10;g++){ctx.beginPath();ctx.moveTo(0,Y(g));ctx.lineTo(W,Y(g));ctx.stroke();}
      ctx.strokeStyle='#3c4250';ctx.lineWidth=1.5;
      ctx.beginPath();ctx.moveTo(0,Y(0));ctx.lineTo(W,Y(0));ctx.moveTo(X(0),0);ctx.lineTo(X(0),H);ctx.stroke();
      // base faint
      ctx.strokeStyle='#7a8291';ctx.lineWidth=1.4;ctx.setLineDash([4,4]);
      plot(x=>x*x);
      ctx.setLineDash([]);
      ctx.strokeStyle='#5f8af7';ctx.lineWidth=2.6;
      plot(x=>a*(x-h)*(x-h)+k);
      // vertex
      ctx.fillStyle='#67c587';ctx.beginPath();ctx.arc(X(h),Y(a*0+k),4.5,0,7);ctx.fill();
      // draggable pre-image P=(t,t²) and image P'=(h+t, a·t²+k)
      const px=t, py=t*t, ix=h+t, iy=a*t*t+k;
      ctx.strokeStyle='rgba(143,176,255,.55)';ctx.lineWidth=1.2;ctx.setLineDash([3,3]);
      ctx.beginPath();ctx.moveTo(X(px),Y(py));ctx.lineTo(X(ix),Y(iy));ctx.stroke();ctx.setLineDash([]);
      ctx.fillStyle='#8fb0ff';
      ctx.beginPath();ctx.arc(X(px),Y(py),drag?7.5:6,0,7);ctx.fill();
      ctx.strokeStyle='#8fb0ff';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(X(px),Y(py),10,0,7);ctx.stroke();
      ctx.fillStyle='#67c587';
      ctx.beginPath();ctx.arc(X(ix),Y(iy),6,0,7);ctx.fill();
      ctx.fillStyle='#a0a8b4';ctx.font='12px Helvetica';ctx.textAlign='left';
      ctx.fillText('P',X(px)-16,Y(py)+4);ctx.fillStyle='#67c587';ctx.fillText("P'",X(ix)+9,Y(iy)+4);
      $('#trA').textContent=a;$('#trH').textContent=h;$('#trK').textContent=k;
      const aStr=a===1?'':(a===-1?'−':a+'·');
      const xStr=h===0?'x':`(x ${h>0?'−':'+'} ${Math.abs(h)})`;
      const kStr=k===0?'':` ${k>0?'+':'−'} ${Math.abs(k)}`;
      $('#trF').innerHTML=`y = ${aStr}${xStr}²${kStr}`;
      $('#trPt').innerHTML=`P = (${+px.toFixed(2)}, ${+py.toFixed(2)}) &nbsp;→&nbsp; P′ = (${+ix.toFixed(2)}, ${+iy.toFixed(2)}) <span class="zh">横向走 h，纵向被 a 缩放再抬 k</span>`;
      function plot(fn){ctx.beginPath();let started=false;
        for(let px=0;px<=W;px++){const x=(px-cx)/sc,y=fn(x),py=Y(y);
          if(py<-20||py>H+20){started=false;continue;}
          started?(ctx.lineTo(px,py)):(ctx.moveTo(px,py),started=true);}ctx.stroke();}
    }
    const toT=e=>{const r=cv.getBoundingClientRect();const cx0=(e.touches?e.touches[0].clientX:e.clientX)-r.left;return Math.max(-4.5,Math.min(4.5,(cx0-cx)/sc));};
    cv.style.touchAction='none';
    cv.addEventListener('pointerdown',e=>{
      const r=cv.getBoundingClientRect();
      const mx=(e.clientX-r.left)-X(t), my=(e.clientY-r.top)-Y(t*t);
      if(Math.hypot(mx,my)<16){drag=true;cv.setPointerCapture(e.pointerId);e.preventDefault();}
    });
    cv.addEventListener('pointermove',e=>{if(drag){t=toT(e);draw();}});
    cv.addEventListener('pointerup',()=>drag=false);
    cv.addEventListener('pointercancel',()=>drag=false);
    ['ra','rh','rk'].forEach(id=>$('#'+id).addEventListener('input',draw));
    draw();
  }
};

/* ---- W3: Unit circle ---- */
WIDGETS.circle={
  mount(host){
    host.innerHTML=`
      <h4>Unit Circle Explorer <span class="zh">单位圆</span></h4>
      <div class="wsub">Drag point P. On the unit circle its coordinates are <span class="math">(cos θ, sin θ)</span>. Size from the reference angle <span class="zh">参考角</span>, sign from the quadrant (CAST).</div>
      <div class="wrow">
        <canvas id="ucC" width="300" height="300"></canvas>
        <div class="wcontrols">
          <div class="readout" id="ucOut"></div>
          <div class="wbtns" id="ucSnap"></div>
          <p class="muted" style="font-size:12.5px">CAST: <b>Q I</b> all + · <b>Q II</b> sin + · <b>Q III</b> tan + · <b>Q IV</b> cos +.</p>
        </div>
      </div>`;
    const cv=$('#ucC'),ctx=cv.getContext('2d'),W=300,cx=W/2,cy=W/2,R=105;
    let theta=Math.PI/6, drag=false;
    const snaps=[[0,'0'],[Math.PI/6,'π/6'],[Math.PI/4,'π/4'],[Math.PI/3,'π/3'],[Math.PI/2,'π/2'],[2*Math.PI/3,'2π/3'],[5*Math.PI/6,'5π/6'],[Math.PI,'π'],[7*Math.PI/6,'7π/6'],[5*Math.PI/4,'5π/4'],[4*Math.PI/3,'4π/3'],[3*Math.PI/2,'3π/2'],[7*Math.PI/4,'7π/4'],[11*Math.PI/6,'11π/6']];
    const sb=$('#ucSnap');
    snaps.forEach(([v,t])=>{const b=el('button','',t);b.style.padding='3px 8px';b.onclick=()=>{theta=v;draw();};sb.appendChild(b);});
    function draw(){
      ctx.clearRect(0,0,W,W);
      ctx.strokeStyle='#1e2127';
      for(let g=-2;g<=2;g++){ctx.beginPath();ctx.moveTo(cx+g*50,15);ctx.lineTo(cx+g*50,W-15);ctx.stroke();ctx.beginPath();ctx.moveTo(15,cy+g*50);ctx.lineTo(W-15,cy+g*50);ctx.stroke();}
      ctx.strokeStyle='#3c4250';ctx.lineWidth=1.5;
      ctx.beginPath();ctx.moveTo(15,cy);ctx.lineTo(W-15,cy);ctx.moveTo(cx,15);ctx.lineTo(cx,W-15);ctx.stroke();
      ctx.strokeStyle='#7a8291';ctx.lineWidth=1.6;ctx.beginPath();ctx.arc(cx,cy,R,0,7);ctx.stroke();
      // arc
      ctx.strokeStyle='#5f8af7';ctx.lineWidth=2.5;ctx.beginPath();ctx.arc(cx,cy,26,0,theta<0?theta:theta, theta<0);ctx.stroke();
      // terminal ray
      const px=cx+R*Math.cos(theta), py=cy-R*Math.sin(theta);
      ctx.strokeStyle='#8fb0ff';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(px,py);ctx.stroke();
      // projections
      ctx.strokeStyle='#6fb3d9';ctx.setLineDash([4,4]);ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(px,cy);ctx.stroke();
      ctx.strokeStyle='#90a0c0';ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(cx,py);ctx.stroke();ctx.setLineDash([]);
      ctx.fillStyle='#8fb0ff';ctx.beginPath();ctx.arc(px,py,5,0,7);ctx.fill();
      ctx.fillStyle='#a0a8b4';ctx.font='12px Georgia';ctx.fillText('P(cos θ, sin θ)',px+8,py-6);
      const deg=theta*180/Math.PI;
      const q=theta===0?0:Math.floor(theta/(Math.PI/2))%4;
      const signs=[['sin +','cos +'],['sin +','cos −'],['sin −','cos −'],['sin −','cos +']][q];
      const pi=theta/Math.PI;
      const s=Math.sin(theta),c=Math.cos(theta),t=Math.tan(theta);
      $('#ucOut').innerHTML=
        `θ = ${pi.toFixed(3)} π rad = ${deg.toFixed(1)}°<br>
         Quadrant <b>${q===0&&theta===0?'—':q+1}</b> · <span class="signchip ${s>=0?'pos':'neg'}">sin ${s>=0?'+':'−'}</span><span class="signchip ${c>=0?'pos':'neg'}">cos ${c>=0?'+':'−'}</span><br>
         sin θ = <b>${s.toFixed(3)}</b> &nbsp; cos θ = <b>${c.toFixed(3)}</b> &nbsp; tan θ = <b>${Math.abs(c)<1e-9?'undefined':t.toFixed(3)}</b>`;
    }
    draw();
    cv.addEventListener('pointerdown',e=>{drag=true;cv.setPointerCapture(e.pointerId);move(e);});
    cv.addEventListener('pointermove',e=>{if(drag)move(e);});
    cv.addEventListener('pointerup',()=>drag=false);
    function move(e){const r=cv.getBoundingClientRect();let a=Math.atan2(-(e.clientY-r.top-cy),e.clientX-r.left-cx);if(a<0)a+=2*Math.PI;theta=a;draw();}
  }
};

/* ---- W4: General sine wave / Ferris wheel ---- */
WIDGETS.sine={
  mount(host){
    host.innerHTML=`
      <h4>General Sine Wave <span class="zh">一般正弦波</span></h4>
      <div class="wsub"><span class="math">h(t) = A·sin(2π/B·(t − C)) + D</span> — amplitude, period, phase, midline. Same recipe models a Ferris wheel, tides, body temperature.</div>
      <div class="wrow">
        <canvas id="snC" width="360" height="280"></canvas>
        <div class="wcontrols">
          <label>A  amplitude <b id="snA">30</b><input type="range" id="sA" min="0" max="40" value="30"></label>
          <label>B  period (minutes) <b id="snB">4</b><input type="range" id="sB" min="1" max="10" step="0.5" value="4"></label>
          <label>C  phase shift <b id="snC2">1</b><input type="range" id="sC" min="-2" max="6" step="0.5" value="1"></label>
          <label>D  midline (center height) <b id="snD">31</b><input type="range" id="sD" min="0" max="40" value="31"></label>
          <div class="readout" id="snOut"></div>
          <button class="btn ghost" id="snCheck" style="font-size:12.5px;padding:6px 12px">Check the Ferris-wheel setup (A=30,B=4,C=1,D=31)</button>
        </div>
      </div>`;
    const cv=$('#snC'),ctx=cv.getContext('2d'),W=360,H=280,mL=34,mB=26,mT=14;
    const v=()=>({A:+$('#sA').value,B:+$('#sB').value,C:+$('#sC').value,D:+$('#sD').value});
    function draw(){
      const {A,B,C,D}=v();
      const xmin=0,xmax=8,ymin=Math.min(0,D-A-4),ymax=Math.max(64,D+A+4);
      const X=t=>mL+(t-xmin)/(xmax-xmin)*(W-mL-8);
      const Y=y=>H-mB-(y-ymin)/(ymax-ymin)*(H-mB-mT);
      ctx.clearRect(0,0,W,H);
      ctx.strokeStyle='#252932';ctx.lineWidth=1;
      for(let y=0;y<=60;y+=10){ctx.beginPath();ctx.moveTo(mL,Y(y));ctx.lineTo(W-8,Y(y));ctx.stroke();ctx.fillStyle='#6f7683';ctx.font='10px Georgia';ctx.fillText(y,6,Y(y)+3);}
      for(let t=0;t<=8;t+=2){ctx.beginPath();ctx.moveTo(X(t),mT);ctx.lineTo(X(t),H-mB);ctx.stroke();ctx.fillStyle='#6f7683';ctx.fillText(t,X(t)-3,H-8);}
      // midline
      ctx.strokeStyle='#7a8291';ctx.setLineDash([5,5]);ctx.beginPath();ctx.moveTo(mL,Y(D));ctx.lineTo(W-8,Y(D));ctx.stroke();ctx.setLineDash([]);
      ctx.strokeStyle='#5f8af7';ctx.lineWidth=2.4;ctx.beginPath();
      for(let px=mL;px<=W-8;px++){const t=xmin+(px-mL)/(W-mL-8)*(xmax-xmin);const y=A*Math.sin(2*Math.PI/B*(t-C))+D;px===mL?ctx.moveTo(px,Y(y)):ctx.lineTo(px,Y(y));}
      ctx.stroke();
      ctx.fillStyle='#a0a8b4';ctx.font='11px sans-serif';ctx.fillText('height (m)',6,mT+4);ctx.fillText('t (min)',W-42,H-8);
      $('#snA').textContent=A;$('#snB').textContent=B;$('#snC2').textContent=C;$('#snD').textContent=D;
      $('#snOut').innerHTML=`h(t) = ${A}·sin(2π/${B}·(t − ${C})) + ${D}<br><small>min ${D-A} m · max ${D+A} m · midline ${D} m · h(0) ≈ ${(A*Math.sin(2*Math.PI/B*(-C))+D).toFixed(1)} m</small>`;
    }
    $('#snCheck').onclick=()=>{
      const {A,B,C,D}=v();
      const ok=A===30&&B===4&&C===1&&D===31;
      $('#snOut').innerHTML += ok
        ? '<br><span style="color:#8fd4a8">✔ Boarding level h(0) ≈ 1 m, center at 31 m — this is the textbook Ferris wheel.</span>'
        : '<br><span style="color:#f0a8a0">Not yet — adjust so radius=30, center=31, one turn=4 min, and crossing the middle going up at t=1.</span>';
    };
    ['sA','sB','sC','sD'].forEach(id=>$('#'+id).addEventListener('input',draw));
    draw();
  }
};

/* ---- W5: Aliasing ---- */
WIDGETS.alias={
  mount(host){
    host.innerHTML=`
      <h4>Aliasing <span class="zh">混叠</span>: the screen can lie</h4>
      <div class="wsub"><span class="math">y = sin(100x)</span>, period ≈ 0.063. Software samples one point per pixel column. Switch windows and compare the sampled dots (orange) with the true wave (faint).</div>
      <div class="wrow">
        <canvas id="alC" width="380" height="240"></canvas>
        <div class="wcontrols">
          <div class="wbtns" id="alBtns">
            <button data-w="wide" class="on">Wide [−10, 10]</button>
            <button data-w="mid">[−0.5, 0.5]</button>
            <button data-w="zoom">Zoomed [−0.1, 0.1]</button>
          </div>
          <p class="muted" style="font-size:12.5px">Same math as wagon wheels in movies: too few samples per cycle, and the truth disappears. Moral: never trust a smooth-looking plot of a fast function.</p>
        </div>
      </div>`;
    const cv=$('#alC'),ctx=cv.getContext('2d'),W=380,H=240,mL=30,mB=22;
    const wins={wide:[-10,10],mid:[-.5,.5],zoom:[-.1,.1]};
    let cur='wide';
    $('#alBtns').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;cur=b.dataset.w;[...$('#alBtns').children].forEach(c=>c.classList.remove('on'));b.classList.add('on');draw();});
    function draw(){
      const [xmin,xmax]=wins[cur];
      const X=x=>mL+(x-xmin)/(xmax-xmin)*(W-mL-6), Y=y=>H/2-y*70;
      ctx.clearRect(0,0,W,H);
      ctx.strokeStyle='#252932';
      ctx.beginPath();ctx.moveTo(mL,H/2);ctx.lineTo(W-6,H/2);ctx.moveTo(mL,10);ctx.lineTo(mL,H-mB);ctx.stroke();
      // true curve (dense)
      ctx.strokeStyle='#7a8291';ctx.lineWidth=1;ctx.beginPath();
      for(let px=mL;px<=W-6;px+=.6){const x=xmin+(px-mL)/(W-mL-6)*(xmax-xmin);px===mL?ctx.moveTo(px,Y(Math.sin(100*x))):ctx.lineTo(px,Y(Math.sin(100*x)));}
      ctx.stroke();
      // sampled: one point per ~6 px
      const samples=[];
      ctx.strokeStyle='#5f8af7';ctx.lineWidth=1.8;ctx.beginPath();
      for(let px=mL;px<=W-6;px+=6){const x=xmin+(px-mL)/(W-mL-6)*(xmax-xmin),y=Math.sin(100*x);samples.push([px,Y(y)]);}
      samples.forEach((p,i)=>i?ctx.lineTo(...p):ctx.moveTo(...p));ctx.stroke();
      ctx.fillStyle='#8fb0ff';samples.forEach(p=>{ctx.beginPath();ctx.arc(p[0],p[1],2.2,0,7);ctx.fill();});
      ctx.fillStyle='#6f7683';ctx.font='11px sans-serif';
      ctx.fillText('window: ['+xmin+', '+xmax+']',mL,H-6);
    }
    draw();
  }
};

/* ---- W6: Secant rotating into the tangent (§2.1) ---- */
WIDGETS.secant={
  mount(host){
    host.innerHTML=`
      <h4>Secant → Tangent <span class="zh">割线转动为切线</span></h4>
      <div class="wsub">P is fixed at <span class="math">t = 2</span>. Slide <span class="math">h</span> so Q moves toward P; the secant rotates and its slope settles onto the tangent — that limiting slope is the instantaneous rate.</div>
      <div class="wrow">
        <canvas id="scC" width="360" height="300"></canvas>
        <div class="wcontrols">
          <div class="wbtns" id="scMode">
            <button data-m="para" class="on">y = x²</button>
            <button data-m="fall">y = 4.9t² (falling object)</button>
          </div>
          <label>h &nbsp;(Q is at 2 + h) <b id="scH">1.00</b><input type="range" id="scHIn" min="0.01" max="2" step="0.01" value="1"></label>
          <div class="wbtns" id="scQuick">
            <button data-h="1">h = 1</button>
            <button data-h="0.1">h = 0.1</button>
            <button data-h="0.01">h = 0.01</button>
          </div>
          <div class="readout" id="scOut"></div>
          <p class="muted" style="font-size:12.5px">Blue secant = average rate · green dashed tangent = instantaneous rate. As h → 0 they become the same line.</p>
        </div>
      </div>`;
    const $=s=>host.querySelector(s);
    const cv=$('#scC'),ctx=cv.getContext('2d'),W=360,H=300,mL=36,mB=24,mT=12;
    let mode='para';
    const f=x=>mode==='para'?x*x:4.9*x*x;
    const a=2;
    const xmin=0,xmax=4.4,ymin=0,ymax=24;
    const X=x=>mL+(x-xmin)/(xmax-xmin)*(W-mL-8);
    const Y=y=>H-mB-(y-ymin)/(ymax-ymin)*(H-mB-mT);
    function lineInView(m,pt){
      // draw y = pt.y + m(x - pt.x), clipped to view box
      const xL=xmin,xR=xmax;
      ctx.beginPath();
      ctx.moveTo(X(xL),Y(pt.y+m*(xL-pt.x)));
      ctx.lineTo(X(xR),Y(pt.y+m*(xR-pt.x)));
      ctx.stroke();
    }
    function draw(){
      const h=+$('#scHIn').value;
      const fa=f(a), fb=f(a+h), mSec=(fb-fa)/h, mTan=mode==='para'?4:19.6;
      ctx.clearRect(0,0,W,H);
      ctx.strokeStyle='#20242d';ctx.lineWidth=1;
      for(let y=0;y<=24;y+=4){ctx.beginPath();ctx.moveTo(mL,Y(y));ctx.lineTo(W-8,Y(y));ctx.stroke();}
      for(let x=0;x<=4;x++){ctx.beginPath();ctx.moveTo(X(x),mT);ctx.lineTo(X(x),H-mB);ctx.stroke();}
      ctx.strokeStyle='#3c4250';ctx.lineWidth=1.5;
      ctx.beginPath();ctx.moveTo(mL,Y(0));ctx.lineTo(W-8,Y(0));ctx.moveTo(X(0),mT);ctx.lineTo(X(0),H-mB);ctx.stroke();
      ctx.fillStyle='#6f7683';ctx.font='10px sans-serif';
      ctx.fillText(mode==='para'?'y':'height y',8,mT+6);
      ctx.fillText(mode==='para'?'x':'time t →',W-52,H-7);
      // curve
      ctx.strokeStyle='#5f8af7';ctx.lineWidth=2.4;ctx.beginPath();
      for(let px=mL;px<=W-8;px++){const x=xmin+(px-mL)/(W-mL-8)*(xmax-xmin),y=f(x);
        if(Y(y)<mT-30||Y(y)>H-mB+30){ctx.moveTo(px,Y(y));continue;}
        px===mL?ctx.moveTo(px,Y(y)):ctx.lineTo(px,Y(y));}
      ctx.stroke();
      // tangent (green dashed)
      ctx.strokeStyle='#67c587';ctx.lineWidth=1.8;ctx.setLineDash([6,4]);
      lineInView(mTan,{x:a,y:fa});ctx.setLineDash([]);
      // secant (blue solid)
      ctx.strokeStyle='#8fb0ff';ctx.lineWidth=2;
      lineInView(mSec,{x:a,y:fa});
      // P and Q
      ctx.fillStyle='#67c587';ctx.beginPath();ctx.arc(X(a),Y(fa),5,0,7);ctx.fill();
      ctx.fillStyle='#8fb0ff';ctx.beginPath();ctx.arc(X(a+h),Y(fb),5,0,7);ctx.fill();
      ctx.fillStyle='#a0a8b4';ctx.font='12px sans-serif';ctx.textAlign='right';
      ctx.fillText('P (2, '+(mode==='para'?'4':'19.6')+')',X(a)-8,Y(fa)-8);
      ctx.textAlign='left';ctx.fillText('Q',X(a+h)+8,Y(fb)-6);
      $('#scH').textContent=(+h).toFixed(2);
      const gap=Math.abs(mSec-mTan);
      $('#scOut').innerHTML= mode==='para'
        ? `secant slope = ((2+h)² − 4)/h = <b>4 + ${(+h).toFixed(2)}</b> = <b>${mSec.toFixed(3)}</b><br>tangent slope at P = <b>4</b> · gap ${gap<0.0005?'≈ 0 ✔':gap.toFixed(3)}`
        : `v̄ = 19.6 + 4.9h = <b>${mSec.toFixed(3)} m/s</b><br>v(2) (tangent) = <b>19.6 m/s</b> · gap ${gap<0.005?'≈ 0 ✔':gap.toFixed(3)+' m/s'}`;
    }
    $('#scMode').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;mode=b.dataset.m;[...$('#scMode').children].forEach(c=>c.classList.remove('on'));b.classList.add('on');draw();});
    $('#scQuick').addEventListener('click',e=>{const b=e.target.closest('button');if(!b||b.dataset.h==null)return;$('#scHIn').value=b.dataset.h;draw();});
    $('#scHIn').addEventListener('input',draw);
    draw();
  }
};

/* ---- W7: epsilon–delta tolerance game (§2.3) ---- */
WIDGETS.epsd={
  mount(host){
    host.innerHTML=`
      <h4>The ε–δ Tolerance Game <span class="zh">ε–δ 精度挑战</span></h4>
      <div class="wsub">Green band = output tolerance ε around L = 5 (or 9). Blue band = your input window δ. Win when <b>every</b> punctured x in the blue band maps <b>inside</b> the green band. Like a machining spec: ε is the allowed part error, δ is how precisely to set the machine.</div>
      <div class="wrow">
        <canvas id="epC" width="360" height="300"></canvas>
        <div class="wcontrols">
          <div class="wbtns" id="epMode">
            <button data-m="lin" class="on">f(x) = 2x − 1, c = 3, L = 5</button>
            <button data-m="quad">f(x) = x², c = 3, L = 9</button>
          </div>
          <label>ε (vertical tolerance) <b id="epE">1.00</b><input type="range" id="epEin" min="0.15" max="3" step="0.01" value="1"></label>
          <label>δ (your horizontal window) <b id="epD">0.80</b><input type="range" id="epDin" min="0.02" max="2" step="0.01" value="0.8"></label>
          <div class="readout" id="epOut"></div>
          <div class="wbtns" id="epBtns">
            <button id="epChal">Challenge me — random ε</button>
            <button id="epShow">Show the winning δ</button>
          </div>
        </div>
      </div>`;
    const $=s=>host.querySelector(s);
    const cv=$('#epC'),ctx=cv.getContext('2d'),W=360,H=300,mL=36,mB=26,mT=12;
    let mode='lin';
    const cfg={lin:{f:x=>2*x-1,c:3,L:5,xmin:1,xmax:5,ymin:1,ymax:9,win:e=>e/2,winTxt:'δ = ε/2'},
               quad:{f:x=>x*x,c:3,L:9,xmin:1,xmax:5,ymin:1,ymax:25,win:e=>Math.min(1,e/7),winTxt:'δ = min(1, ε/7)'}};
    const X=(x,g)=>mL+(x-g.xmin)/(g.xmax-g.xmin)*(W-mL-8);
    const Y=(y,g)=>H-mB-(y-g.ymin)/(g.ymax-g.ymin)*(H-mB-mT);
    function draw(){
      const g=cfg[mode],f=g.f;
      const eps=+$('#epEin').value, delta=+$('#epDin').value;
      // numeric check: worst error inside the punctured delta band
      let maxErr=0;
      for(let i=0;i<=400;i++){const x=g.c-delta+2*delta*i/400;if(Math.abs(x-g.c)<1e-12)continue;maxErr=Math.max(maxErr,Math.abs(f(x)-g.L));}
      const win=maxErr<=eps+1e-9;
      ctx.clearRect(0,0,W,H);
      // epsilon band (green)
      ctx.fillStyle='rgba(103,197,135,.18)';
      ctx.fillRect(mL,Y(g.L+eps,g),W-mL-8,Y(g.L-eps,g)-Y(g.L+eps,g));
      // delta band (blue), punctured at c
      ctx.fillStyle='rgba(143,176,255,.16)';
      ctx.fillRect(X(g.c-delta,g),mT,X(g.c,g)-X(g.c-delta,g),H-mB-mT);
      ctx.fillRect(X(g.c,g),mT,X(g.c+delta,g)-X(g.c,g),H-mB-mT);
      // grid + axes
      ctx.strokeStyle='#20242d';ctx.lineWidth=1;
      for(let x=Math.ceil(g.xmin);x<=g.xmax;x++){ctx.beginPath();ctx.moveTo(X(x,g),mT);ctx.lineTo(X(x,g),H-mB);ctx.stroke();}
      ctx.strokeStyle='#3c4250';ctx.lineWidth=1.4;
      ctx.beginPath();ctx.moveTo(mL,Y(g.L,g));ctx.lineTo(W-8,Y(g.L,g));ctx.stroke();
      ctx.strokeStyle='#67c587';ctx.setLineDash([6,4]);ctx.lineWidth=1.4;
      ctx.beginPath();ctx.moveTo(mL,Y(g.L+eps,g));ctx.lineTo(W-8,Y(g.L+eps,g));
      ctx.moveTo(mL,Y(g.L-eps,g));ctx.lineTo(W-8,Y(g.L-eps,g));ctx.stroke();ctx.setLineDash([]);
      ctx.strokeStyle='#8fb0ff';ctx.lineWidth=1.4;
      ctx.beginPath();ctx.moveTo(X(g.c-delta,g),mT);ctx.lineTo(X(g.c-delta,g),H-mB);
      ctx.moveTo(X(g.c+delta,g),mT);ctx.lineTo(X(g.c+delta,g),H-mB);ctx.stroke();
      // function
      ctx.strokeStyle='#5f8af7';ctx.lineWidth=2.4;ctx.beginPath();
      for(let px=mL;px<=W-8;px++){const x=g.xmin+(px-mL)/(W-mL-8)*(g.xmax-g.xmin),y=f(x);
        px===mL?ctx.moveTo(px,Y(y,g)):ctx.lineTo(px,Y(y,g));}
      ctx.stroke();
      // point (c,L)
      ctx.fillStyle='#e8d27a';ctx.beginPath();ctx.arc(X(g.c,g),Y(g.L,g),4.5,0,7);ctx.fill();
      ctx.fillStyle='#6f7683';ctx.font='10px sans-serif';ctx.textAlign='left';
      ctx.fillText('y = L',mL+4,Y(g.L,g)-4);
      ctx.fillText('x = c',X(g.c,g)+4,H-8);
      $('#epE').textContent=(+eps).toFixed(2);$('#epD').textContent=(+delta).toFixed(2);
      $('#epOut').innerHTML= win
        ? `<span style="color:#8fd4a8">✔ δ works — every x in the blue band maps inside green.</span><br>max |f(x) − L| in band = ${maxErr.toFixed(3)} ≤ ε = ${(+eps).toFixed(2)}`
        : `<span style="color:#f0a8a0">✘ δ too wide — blue edges escape the green band.</span><br>max |f(x) − L| in band = ${maxErr.toFixed(3)} &gt; ε = ${(+eps).toFixed(2)} · shrink δ`;
    }
    $('#epMode').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;mode=b.dataset.m;[...$('#epMode').children].forEach(c=>c.classList.remove('on'));b.classList.add('on');draw();});
    $('#epEin').addEventListener('input',draw);
    $('#epDin').addEventListener('input',draw);
    $('#epChal').onclick=()=>{const e=+(0.2+Math.random()*1.3).toFixed(2);$('#epEin').value=e;$('#epDin').value=1.5;draw();};
    $('#epShow').onclick=()=>{const g=cfg[mode];$('#epDin').value=g.win(+$('#epEin').value);draw();
      $('#epOut').innerHTML+=`<br><span class="muted">Scratch trick: ${g.winTxt} (for x² we first bounded |x+3| &lt; 7).</span>`;};
    draw();
  }
};

/* ---- W8: Asymptote zoo (§2.6) ---- */
WIDGETS.asymp={
  mount(host){
    host.innerHTML=`
      <h4>Asymptote Lab <span class="zh">渐近线实验室</span></h4>
      <div class="wsub">Pick a function, then zoom out to watch the tails behave. Red dashed = vertical asymptotes, green dashed = horizontal/oblique guides, open ring = removable hole.</div>
      <div class="wrow">
        <canvas id="asC" width="360" height="300"></canvas>
        <div class="wcontrols">
          <div class="wbtns" id="asPick">
            <button data-k="rat" class="on">(2x²−3x+1)/(x²−4)</button>
            <button data-k="hole">(x²−1)/(x−1) — hole</button>
            <button data-k="sx">sin x / x — crosses HA</button>
            <button data-k="sl">(x²+2x−1)/(x+1) — slant</button>
          </div>
          <div class="wbtns"><button id="asZoom" class="on">Near view</button><button id="asFar">Zoom out (end behavior)</button></div>
          <div class="readout" id="asOut"></div>
        </div>
      </div>`;
    const $=s=>host.querySelector(s);
    const cv=$('#asC'),ctx=cv.getContext('2d'),W=360,H=300,mL=34,mB=22,mT=10;
    const funcs={
      rat:{fn:x=>(2*x*x-3*x+1)/(x*x-4),near:[-6,6,-8,8],far:[-30,30,-3,6],ha:[[2,'y = 2']],va:[[-2,'x = −2'],[2,'x = 2']],holes:[],guide:null,
        out:'<b>HA y = 2</b> (equal degrees → leading ratio 2/1). <b>VAs x = ±2</b>: denominator zero while numerator is 3 and 15 (nonzero). Zoom out — both tails flatten onto y = 2.'},
      hole:{fn:x=>x===1?NaN:(x*x-1)/(x-1),near:[-3,6,-3,8],far:[-30,30,-33,33],ha:[],va:[],holes:[[1,2]],guide:[x=>x+1,'y = x + 1 (continuous extension)'],
        out:'At x = 1 it is 0/0 — but the limit is <b>2</b>. That is a <b>removable hole</b> (open ring), NOT an asymptote. Cancel to x + 1 for x ≠ 1.'},
      sx:{fn:x=>Math.abs(x)<1e-9?1:Math.sin(x)/x,near:[-15,15,-.6,1.2],far:[-60,60,-.4,1.2],ha:[[0,'y = 0']],va:[],holes:[],guide:null,
        out:'<b>HA y = 0</b> — and the graph CROSSES it at ±π, ±2π, … A horizontal asymptote is only an end-behavior promise; crossings in the middle are allowed.'},
      sl:{fn:x=>(x*x+2*x-1)/(x+1),near:[-8,8,-10,10],far:[-30,30,-34,34],ha:[],va:[[-1,'x = −1']],holes:[],guide:[x=>x+1,'y = x + 1 (oblique)'],
        out:'Numerator degree is one higher → long division gives x + 1 − 2/(x+1). The <b>oblique asymptote is y = x + 1</b>; the gap −2/(x+1) shrinks to 0. Zoom out to see curve and line merge.'}
    };
    let k='rat',far=false;
    function draw(){
      const d=funcs[k],v=far?d.far:d.near,xmin=v[0],xmax=v[1],ymin=v[2],ymax=v[3];
      const X=x=>mL+(x-xmin)/(xmax-xmin)*(W-mL-8);
      const Y=y=>H-mB-(y-ymin)/(ymax-ymin)*(H-mB-mT);
      ctx.clearRect(0,0,W,H);
      ctx.strokeStyle='#20242d';ctx.lineWidth=1;
      for(let px=mL;px<=W-8;px+=26){ctx.beginPath();ctx.moveTo(px,mT);ctx.lineTo(px,H-mB);ctx.stroke();}
      for(let py=mT;py<=H-mB;py+=26){ctx.beginPath();ctx.moveTo(mL,py);ctx.lineTo(W-8,py);ctx.stroke();}
      ctx.strokeStyle='#3c4250';ctx.lineWidth=1.3;
      ctx.beginPath();ctx.moveTo(mL,Y(0));ctx.lineTo(W-8,Y(0));ctx.moveTo(X(0),mT);ctx.lineTo(X(0),H-mB);ctx.stroke();
      // HA
      ctx.strokeStyle='#67c587';ctx.lineWidth=1.5;ctx.setLineDash([7,4]);
      d.ha.forEach(([yy,t])=>{ctx.beginPath();ctx.moveTo(mL,Y(yy));ctx.lineTo(W-8,Y(yy));ctx.stroke();
        ctx.fillStyle='#67c587';ctx.font='11px sans-serif';ctx.textAlign='right';ctx.fillText(t,W-10,Y(yy)-4);});
      // oblique / extension guide
      if(d.guide){const[gn,gt]=d.guide;ctx.strokeStyle='#67c587';ctx.lineWidth=1.5;ctx.beginPath();
        ctx.moveTo(mL,Y(gn(xmin)));ctx.lineTo(W-8,Y(gn(xmax)));ctx.stroke();
        ctx.fillStyle='#67c587';ctx.font='11px sans-serif';ctx.textAlign='left';ctx.fillText(gt,mL+4,mT+12);}
      ctx.setLineDash([]);
      // VA
      ctx.strokeStyle='#e0817a';ctx.lineWidth=1.5;ctx.setLineDash([5,4]);
      d.va.forEach(([xx,t])=>{ctx.beginPath();ctx.moveTo(X(xx),mT);ctx.lineTo(X(xx),H-mB);ctx.stroke();
        ctx.fillStyle='#e0817a';ctx.font='11px sans-serif';ctx.textAlign='center';ctx.fillText(t,X(xx),H-6);});
      ctx.setLineDash([]);
      // curve
      ctx.strokeStyle='#5f8af7';ctx.lineWidth=2.2;ctx.beginPath();
      for(let px=mL;px<=W-8;px+=0.6){const x=xmin+(px-mL)/(W-mL-8)*(xmax-xmin),y=d.fn(x);
        if(!isFinite(y)||Y(y)<mT-40||Y(y)>H-mB+40){ctx.moveTo(px,Y(isFinite(y)?y:ymin));continue;}
        ctx.lineTo(px,Y(y));}
      ctx.stroke();
      // holes
      d.holes.forEach(([hx,hy])=>{ctx.beginPath();ctx.arc(X(hx),Y(hy),5,0,7);ctx.fillStyle='#14161b';ctx.fill();ctx.strokeStyle='#8fb0ff';ctx.lineWidth=2;ctx.stroke();
        ctx.fillStyle='#a0a8b4';ctx.font='11px sans-serif';ctx.textAlign='left';ctx.fillText('hole ('+hx+', '+hy+')',X(hx)+9,Y(hy)-7);});
      $('#asOut').innerHTML=d.out;
    }
    $('#asPick').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;k=b.dataset.k;[...$('#asPick').children].forEach(c=>c.classList.remove('on'));b.classList.add('on');draw();});
    $('#asZoom').onclick=()=>{far=false;$('#asZoom').classList.add('on');$('#asFar').classList.remove('on');draw();};
    $('#asFar').onclick=()=>{far=true;$('#asFar').classList.add('on');$('#asZoom').classList.remove('on');draw();};
    draw();
  }
};

/* ============================================================
   Render: Learn
============================================================ */
const feed=$('#feed'), conv=$('#conv');
/* Stick-to-bottom: whenever content changes/grows, keep pinned to bottom while
   the student is near the bottom; scrolling up to review is never fought. */
function pinWatcher(box){
  let near=true;
  const nearBottom=()=>{
    if(box.scrollHeight>box.clientHeight+2)return box.scrollHeight-box.scrollTop-box.clientHeight<120;
    const r=box.getBoundingClientRect();           // mobile: the whole page scrolls
    return r.bottom<=innerHeight+120;
  };
  const pin=()=>{
    if(!near)return;
    if(box.scrollHeight>box.clientHeight+2){box.scrollTop=box.scrollHeight;}
    else if(document.documentElement.scrollHeight>innerHeight+2)window.scrollTo({top:document.documentElement.scrollHeight});
  };
  box.addEventListener('scroll',()=>{near=nearBottom();});
  addEventListener('scroll',()=>{near=nearBottom();},true);
  addEventListener('resize',()=>{near=nearBottom();if(near)pin();});
  if(window.ResizeObserver&&box.firstElementChild)new ResizeObserver(pin).observe(box.firstElementChild);
  new MutationObserver(pin).observe(box,{childList:true,subtree:true});
}
pinWatcher(conv);
const hwc=document.querySelector('#tab-hw .conv');if(hwc)pinWatcher(hwc);
/* Pure: first-try accuracy for one lesson index (0..n). null = no attempts yet */
function secMastery(li){
  let ok=0,tot=0;
  LESSONS[li].steps.forEach((st,si)=>{
    const r=S.learn['s'+li+'_'+si];
    if((st.t==='ask'||st.t==='input')&&r!==undefined){tot++;ok+=r;}
  });
  return tot?ok/tot:null;
}
function chTabsHtml(){
  return CHAPTERS.map(c=>`<button type="button" data-ch="${c.n}" class="${c.n===S.ch?'on':''}">${c.short}</button>`).join('');
}
function bindChTabs(container,onswitch){
  container.querySelectorAll('button[data-ch]').forEach(b=>b.onclick=()=>onswitch(+b.dataset.ch));
}
function switchChapter(n){
  if(n===S.ch)return;
  S.ch=n;
  const[f]=chRange(n);
  if(S.sec<f||S.sec>=chRange(n)[1]){S.sec=f;S.step=0;}
  saveStore();
  renderAll();updateChrome();
  const tab=(document.querySelector('#nav button.active')||{}).dataset&&document.querySelector('#nav button.active').dataset.tab;
  if(tab==='hw')renderHWList();
  if(tab==='quiz')renderQuizHome();
  if(tab==='words')renderWordsHome();
  if(tab==='mastery')renderMastery();
}
function updateChrome(){
  const c=CHAPTERS[S.ch-1]||CHAPTERS[0];
  const brand=$('#brand');
  if(brand)brand.innerHTML=`MA119 · ${c.short.replace(/^Ch\.\d\s·\s/,'')} <small>Mathematics for Health Sciences · ${c.week}</small>`;
  const rh=$('#routeH4');if(rh)rh.textContent=c.week+"'s route";
}
function renderRail(){
  const list=$('#secList');list.innerHTML='';
  secIndices(S.ch).forEach(gi=>{
    const s=LESSONS[gi];
    const b=el('button','secitem'+(gi===S.sec?' active':'')+(S.secDone[gi]?' done':''));
    const m=secMastery(gi);
    const tag=m==null?(S.secDone[gi]?'<span class="tag">✓</span>':'<span class="tag"></span>')
      :`<span class="tag pct ${m>=.8?'hi':m>=.5?'mid':'lo'}">${Math.round(m*100)}%</span>`;
    b.innerHTML+=`<span class="dot"></span><span>${s.title}</span>${tag}`;
    b.onclick=()=>{S.sec=gi;S.step=0;saveStore();renderAll();};
    list.appendChild(b);
  });
  const sw=$('#chSwitch');
  if(sw){sw.innerHTML=chTabsHtml();bindChTabs(sw,switchChapter);}
  const strip=$('#sectStrip');
  if(strip){
    strip.innerHTML='';
    CHAPTERS.forEach(c=>{
      const b=el('button','chtab'+(c.n===S.ch?' on':''),'Ch.'+c.n);
      b.title=c.name+' · '+c.week;
      b.onclick=()=>switchChapter(c.n);
      strip.appendChild(b);
    });
    secIndices(S.ch).forEach(gi=>{
      const b=el('button',gi===S.sec?'on':'',LESSONS[gi].title);
      b.onclick=()=>{S.sec=gi;S.step=0;saveStore();renderAll();};
      strip.appendChild(b);
    });
  }
}
function renderLesson(){
  feed.innerHTML='';
  const L=LESSONS[S.sec];
  S.step=Math.max(0,Math.min(S.step,L.steps.length-1));
  for(let i=0;i<=S.step;i++){try{addStepNode(L.steps[i],i===S.step)}catch(e){console.warn('step render failed',i,e)}}
  $('#progressChip').textContent=`Ch.${S.ch} · ${L.title.split(' · ')[0]} · step ${S.step+1}/${L.steps.length}`;
  requestAnimationFrame(()=>requestAnimationFrame(()=>{conv.scrollTop=conv.scrollHeight}));
}
function addStepNode(st,interactive){
  if(st.t==='say'){
    const node=teacherCard(st.html||`<p>${st.en||''}</p>`);
    if(st.detail){
      const body=node.querySelector('.bubble');
      const d=el('button','ghostmini','More detail ▸ 更多');
      const dx=el('div','expl');
      dx.style.display='none';dx.innerHTML=st.detail;
      d.onclick=()=>{dx.style.display=dx.style.display==='none'?'block':'none';};
      body.append(d,dx);
    }
    feed.appendChild(node);
    if(interactive){
      const row=el('div','continue-row');
      const b=el('button','btn','Continue →');
      b.onclick=()=>advanceLesson();
      const sk=el('button','ghostmini','Skip ▸');
      sk.title='Skip to next 略过';sk.onclick=()=>advanceLesson();
      row.append(b,sk);feed.appendChild(row);
    }
  }else if(st.t==='widget'){
    if(st.html) feed.appendChild(teacherCard(st.html));
    const w=el('div','widget');feed.appendChild(w);
    requestAnimationFrame(()=>{if(w.isConnected)WIDGETS[st.id].mount(w);});
    if(interactive){
      const row=el('div','continue-row');
      const b=el('button','btn','I tried it — Continue →');
      b.onclick=()=>advanceLesson();
      row.appendChild(b);feed.appendChild(row);
    }
  }else if(st.t==='recap'){
    const c=el('div','recap');
    c.innerHTML=`<h3>${st.title} · Summary</h3>`;
    if(st.items&&st.items.length){const u=el('ul');st.items.forEach(it=>u.appendChild(el('li','',it)));c.appendChild(u);}
    if(st.mn)c.appendChild(el('div','mn',`<b>Memory hook 记忆口诀:</b> ${st.mn}`));
    feed.appendChild(c);
    if(interactive){
      const row=el('div','continue-row');
      const last=S.sec===chRange(S.ch)[1]-1;
      const b=el('button','btn', last?'Finish chapter 🎉':'Continue to next section →');
      b.onclick=()=>{
        S.secDone[S.sec]=true;
        if(!last){S.sec++;S.step=0;}
        saveStore();renderAll();
        if(last){setTab('hw');}
      };
      row.appendChild(b);feed.appendChild(row);
    }
  }else if(st.t==='ask'){
    const node=teacherCard('');const body=node.querySelector('.bubble');body.classList.add('askcard');
    st._helped=false;
    body.innerHTML+=`<p>${st.q}</p>`;
    const skipRow=el('div','skiprow');
    const sk=el('button','ghostmini','Skip ▸');
    sk.title='Skip this question 跳过此题';
    sk.onclick=()=>{S.learn['s'+S.sec+'_'+S.step]=0;addMissed('learn',S.sec,S.step);saveStore();advanceLesson();};
    skipRow.appendChild(sk);body.appendChild(skipRow);
    const fb=el('div','fb');const ch=el('div','choices');
    const helper=el('div','');
    body.append(ch,fb,helper);
    st.choices.forEach(c=>{
      const b=el('button','',c.txt);
      b.onclick=()=>{
        if(c.ok){
          const firstOk=!st._tries;
          S.learn['s'+S.sec+'_'+S.step]=firstOk?1:0;
          if(!firstOk)addMissed('learn',S.sec,S.step);
          saveStore();renderRail();
          [...ch.children].forEach(x=>x.disabled=true);b.classList.add('correct');
          sk.disabled=true;helper.innerHTML='';
          fb.className='fb show ok';fb.textContent=st.ok||'Correct.';
          const row=el('div','continue-row');const nx=el('button','btn','Continue →');
          nx.onclick=()=>advanceLesson();row.appendChild(nx);body.appendChild(row);convScroll();
        }else{
          st._tries=(st._tries||0)+1;b.disabled=true;b.classList.add('wrong');
          fb.className='fb show no';
          if(st._tries===1){
            fb.textContent=st.fb||'Not quite — try once more.';
            helper.innerHTML='';
            const stuck=el('button','ghostmini','I\'m stuck — teach me 让我学');
            stuck.onclick=()=>startHelp(st,body,ch,fb,helper);
            helper.appendChild(stuck);
          }else{
            fb.textContent=st.h2||st.fb||'Let me help.';
            helper.innerHTML='';
            const retry=el('button','ghostmini','Try again ↺');
            const show=el('button','ghostmini','Show explanation ▸');
            retry.onclick=()=>{fb.className='fb';fb.textContent='';helper.innerHTML='';ch.querySelectorAll('button').forEach(x=>{if(!x.classList.contains('correct'))x.disabled=false;});};
            show.onclick=()=>finishHelp(st,body,ch,fb,helper);
            helper.append(retry,show);
          }
        }
        convScroll();
      };
      ch.appendChild(b);
    });
    feed.appendChild(node);
  }else if(st.t==='input'){
    const node=teacherCard('');
    const body=node.querySelector('.bubble');body.classList.add('askcard');
    st._helped=false;
    body.innerHTML+=`<p>${st.q}</p>`;
    const skipRow=el('div','skiprow');
    const sk=el('button','ghostmini','Skip ▸');
    sk.title='Skip this question 跳过此题';
    sk.onclick=()=>{S.learn['s'+S.sec+'_'+S.step]=0;addMissed('learn',S.sec,S.step);saveStore();advanceLesson();};
    skipRow.appendChild(sk);body.appendChild(skipRow);
    const fb=el('div','fb');const helper=el('div','');
    const form=el('div','inline-input');
    const inp=el('input');inp.placeholder=st.placeholder||'Type your answer';
    const btn=el('button','','Check');
    form.append(inp,btn);body.append(form,fb,helper);
    const succeed=()=>{
      const firstOk=!st._tries;
      S.learn['s'+S.sec+'_'+S.step]=firstOk?1:0;
      if(!firstOk)addMissed('learn',S.sec,S.step);
      saveStore();renderRail();
      inp.disabled=true;btn.disabled=true;sk.disabled=true;helper.innerHTML='';
      fb.className='fb show ok';fb.textContent=st.ok||'Correct.';
      const row=el('div','continue-row');const nx=el('button','btn','Continue →');
      nx.onclick=()=>advanceLesson();row.appendChild(nx);body.appendChild(row);convScroll();
    };
    const fail=()=>{
      st._tries=(st._tries||0)+1;
      fb.className='fb show no';
      if(st._tries===1){
        fb.textContent=st.fb||'Not quite — try once more.';
        helper.innerHTML='';
        const stuck=el('button','ghostmini','I\'m stuck — teach me 让我学');
        stuck.onclick=()=>startHelp(st,body,null,fb,helper);
        helper.appendChild(stuck);
      }else{
        fb.textContent=st.h2||st.fb||'Let me help.';
        helper.innerHTML='';
        const retry=el('button','ghostmini','Try again ↺');
        const show=el('button','ghostmini','Show explanation ▸');
        retry.onclick=()=>{fb.className='fb';fb.textContent='';helper.innerHTML='';inp.disabled=false;btn.disabled=false;inp.focus();};
        show.onclick=()=>finishHelp(st,body,null,fb,helper);
        helper.append(retry,show);
      }
      convScroll();
    };
    const submit=()=>{
      if(!inp.value.trim())return;
      if(st.accept(inp.value))succeed();else fail();
    };
    btn.onclick=submit;inp.addEventListener('keydown',e=>{if(e.key==='Enter')submit();});
    feed.appendChild(node);
    setTimeout(()=>inp.focus(),50);
  }
}
function teacherCard(inner){
  const m=el('div','msg');
  m.innerHTML=`<div class="avatar">林</div><div class="bubble"><div class="who">Ms. Lin</div></div>`;
  m.querySelector('.bubble').innerHTML=inner;
  return m;
}
function advanceLesson(){
  const L=LESSONS[S.sec];
  if(S.step<L.steps.length-1){S.step++;}
  saveStore();renderAll();
}

/* ============================================================
   Render: Homework
============================================================ */
function renderHWList(){
  const wrap=$('#hwList');wrap.innerHTML='';
  const sw=el('div','chswitch');sw.innerHTML=chTabsHtml();bindChTabs(sw,switchChapter);wrap.appendChild(sw);
  const c=CHAPTERS[S.ch-1];
  const list=HW.filter(h=>h.id.indexOf('c2')===0?(S.ch===2):(S.ch===1));
  const intro=el('div','',`<h2 style="font-size:18px;margin-bottom:4px">${c.name} Homework <span style="color:var(--faint);font-size:13px;font-weight:400">— ${list.length} problems · I will guide, not solve for you</span></h2>
    <p class="muted" style="font-size:13.5px;margin-bottom:10px">Rule of our sessions: I ask one small question at a time. You commit to an answer, then we check. Full walkthroughs only appear after you have tried — that is how understanding sticks.</p>`);
  wrap.appendChild(intro);
  list.forEach(h=>{
    const done=S.hw[h.id]&&S.hw[h.id].finished;
    const card=el('button','hwcard'+(done?' done':''));
    card.innerHTML=`<div class="top"><span class="hwbadge ${h.badge.includes('Bonus')?'bonus':''}">${h.badge}</span><span class="state">${done?'✓ worked through':'Start →'}</span></div><div class="stmt">${h.stmt}</div>`;
    card.onclick=()=>renderHWSession(h);
    wrap.appendChild(card);
  });
}
function renderHWSession(h){
  const wrap=$('#hwList');wrap.innerHTML='';
  const back=el('button','backbtn','← All homework problems');back.onclick=renderHWList;wrap.appendChild(back);
  const card=el('div','qcard','');card.innerHTML=`<div class="qmeta">${h.badge}</div><div style="font-size:15.5px">${h.stmt}</div>`;
  wrap.appendChild(card);
  const stat=el('div','qmeta','');wrap.appendChild(stat);
  const box=el('div','');wrap.appendChild(box);
  let idx=0, allFirst=true; const wrongSteps=[];
  function showStep(){
    const st=h.steps[idx];
    stat.textContent=`Guided step ${idx+1} / ${h.steps.length}`;
    let firstTry=true;
    if(!st){finishHW();return;}
    if(st.t==='say'){
      box.appendChild(teacherCard(st.html));nextBtn('Continue');
    }else if(st.t==='ask'){
      const node=teacherCard('');const body=node.querySelector('.bubble');body.classList.add('askcard');
      body.innerHTML+=`<p>${st.q}</p>`;
      const fb=el('div','fb');const ch=el('div','choices');
      st.choices.forEach(c=>{
        const b=el('button','',c.txt);
        b.onclick=()=>{[...ch.children].forEach(x=>x.disabled=true);b.classList.add(c.ok?'correct':'wrong');
          if(c.ok){if(!firstTry){allFirst=false;wrongSteps.push(idx);}fb.className='fb show ok';fb.textContent=st.ok||'Correct.';[...ch.children].forEach(x=>x.disabled=true);
            setTimeout(()=>nextBtn('Next →'),250);}
          else{firstTry=false;fb.className='fb show no';fb.textContent=st.fb||'Think again — try another choice.';}};
        ch.appendChild(b);});
      body.append(ch,fb);box.appendChild(node);
    }else if(st.t==='input'){
      const node=teacherCard('');const body=node.querySelector('.bubble');body.classList.add('askcard');
      body.innerHTML+=`<p>${st.q}</p>`;
      const fb=el('div','fb');const form=el('div','inline-input');
      const inp=el('input');inp.placeholder=st.placeholder||'';const btn=el('button','','Check');
      form.append(inp,btn);body.append(form,fb);box.appendChild(node);inp.focus();
      let tries=0;
      btn.onclick=()=>{if(!inp.value.trim())return;tries++;
        if(st.accept(inp.value)){inp.disabled=btn.disabled=true;if(!firstTry){allFirst=false;wrongSteps.push(idx);}fb.className='fb show ok';
          fb.innerHTML=st.ok||'Correct — nicely done.';setTimeout(()=>nextBtn('Next →'),250);}
        else if(tries>=2&&st.reveal){inp.disabled=btn.disabled=true;if(firstTry){firstTry=false;allFirst=false;wrongSteps.push(idx);}fb.className='fb show no';
          fb.innerHTML=st.reveal;setTimeout(()=>nextBtn('Next →'),400);}
        else{firstTry=false;fb.className='fb show no';fb.innerHTML=st.fb||'Not quite — one more try.';}};
      inp.addEventListener('keydown',e=>{if(e.key==='Enter')btn.click();});
    }
    convScroll();
  }
  function nextBtn(label){
      const row=el('div','continue-row');const b=el('button','btn',label);
      b.onclick=()=>{idx++;showStep();};row.appendChild(b);box.appendChild(row);convScroll();
  }
  function finishHW(){
    const m=h.badge.match(/§(\d\.\d)/);const sec=m?m[1]:'1.4';
    S.hwsec[sec]=S.hwsec[sec]||[0,0];S.hwsec[sec][0]+=allFirst?1:0;S.hwsec[sec][1]+=1;
    wrongSteps.forEach(si=>addMissed('hw',h.id,si));
    S.hw[h.id]={finished:true,tries:(S.hw[h.id]?.tries||0)+1,firstTry:allFirst};saveStore();
    const c=el('div','recap');
    c.innerHTML=`<h3>Nice work ✦</h3><p>You reasoned through ${h.badge.split('·')[0].trim()} yourself. In your written submission, show each of these small steps — that is what earns full credit.</p>`;
    const row=el('div','continue-row');const b=el('button','btn','Back to homework list');b.onclick=renderHWList;row.appendChild(b);
    box.append(c,row);convScroll();
  }
  showStep();
}
function convScroll(){requestAnimationFrame(()=>requestAnimationFrame(()=>{['#tab-hw .conv','#conv'].forEach(sel=>{const c=$(sel);if(c)c.scrollTop=c.scrollHeight;});}));}

/* ============================================================
   Render: Quiz
============================================================ */
let qz=null;
function buildReviewSet(){
  const items=S.missed.filter(m=>m.type==='quiz');
  const qs=[],topic=[],src=[];
  items.forEach(m=>{const s=QUIZ.find(x=>x.id===m.a);if(s&&s.qs[m.b]){qs.push(s.qs[m.b]);topic.push(s.topic[m.b]);src.push({setId:m.a,qi:m.b});}});
  return qs.length?{id:'review',name:'Review Drill',qs,topic,src}:null;
}
const QUIZ_CH_COPY={
  1:'domains, composition, transformations, trig, modeling',
  2:'rates & tangents, limit laws, ε–δ, one-sided limits, continuity, asymptotes'
};
function quizSetCh(set){return parseInt(set.id.replace('set',''),10)<=5?1:2;}
function renderQuizHome(){
  const a=$('#quizArea');a.innerHTML='';
  const sw=el('div','chswitch');sw.innerHTML=chTabsHtml();bindChTabs(sw,switchChapter);a.appendChild(sw);
  const c=CHAPTERS[S.ch-1];
  a.appendChild(el('div','',`<h2 style="font-size:18px;margin-bottom:4px">${c.name} Quiz</h2>
    <p class="muted" style="font-size:13.5px">Exam-style: fixed question order, one question per screen, <b>no feedback until you submit</b>. You may revisit earlier questions before submitting. Afterward we review every miss together, and your mastery map updates. Topics: ${QUIZ_CH_COPY[S.ch]}.</p>`));
  const rv=buildReviewSet();
  if(rv){
    const c2=el('button','hwcard');
    c2.innerHTML=`<div class="top"><span class="hwbadge bonus">Review Drill 错题重练</span><span class="state">${rv.qs.length} missed · Start →</span></div>
      <div class="stmt">Re-drill the quiz questions you have missed (both chapters), still in fixed order. Answer correctly to clear them from your Review notebook.</div>`;
    c2.onclick=()=>startQuiz(rv);
    a.appendChild(c2);
  }
  QUIZ.filter(set=>quizSetCh(set)===S.ch).forEach(set=>{
    const card=el('button','hwcard');
    const best=S.attempts.filter(x=>x.setId===set.id).map(x=>x.score);
    card.innerHTML=`<div class="top"><span class="hwbadge">${set.name}</span><span class="state">${best.length?'best: '+Math.max(...best)+'/'+set.qs.length+' — retake ↻':'Start →'}</span></div>
      <div class="stmt">${set.qs.length} questions · ${QUIZ_CH_COPY[S.ch]}</div>`;
    card.onclick=()=>startQuiz(set);
    a.appendChild(card);
  });
}
function startQuiz(set){
  qz={set,qi:0,ans:new Array(set.qs.length).fill(null),qt:new Array(set.qs.length).fill(0),t0:Date.now(),q0:Date.now()};
  renderQ();
}
function renderQ(){
  const a=$('#quizArea');a.innerHTML='';
  qz.qt[qz.qi]+=Date.now()-qz.q0;qz.q0=Date.now();
  const {set,qi}=qz;
  const bar=el('div','progress');bar.innerHTML=`<i style="width:${(qi/set.qs.length)*100}%"></i>`;a.appendChild(bar);
  const card=el('div','qcard');
  card.innerHTML=`<div class="qmeta">${set.name} · Question ${qi+1} of ${set.qs.length} · fixed order · <span class="kbd-hint">keys A–D select · Enter next</span></div><div style="font-size:15.5px;margin-bottom:6px">${set.qs[qi].q}</div>`;
  set.qs[qi].o.forEach((t,i)=>{
    const o=el('div','opt'+(qz.ans[qi]===i?' sel':''));
    o.innerHTML=`<span class="key">${'ABCD'[i]}</span><span>${t}</span>`;
    o.onclick=()=>{qz.ans[qi]=i;renderQ();};
    card.appendChild(o);
  });
  const row=el('div','continue-row');row.style.justifyContent='space-between';row.style.marginTop='16px';
  const prev=el('button','btn ghost','← Prev');prev.disabled=qi===0;
  prev.onclick=()=>{qz.qi--;renderQ();};
  const back=el('button','btn ghost','Exit');back.onclick=()=>{if(confirm('Exit the quiz? Your answers this round will not be saved.'))renderQuizHome();};
  const next=el('button','btn',qi===set.qs.length-1?'Submit ▸':'Next →');
  next.disabled=qz.ans[qi]===null;
  next.onclick=()=>{ if(qi<set.qs.length-1){qz.qi++;renderQ();} else submitQuiz(); };
  row.append(prev,back,next);card.appendChild(row);
  a.appendChild(card);
}
function submitQuiz(){
  const {set,ans}=qz;
  qz.qt[qz.qi]+=Date.now()-qz.q0;
  const timeSec=Math.round((Date.now()-qz.t0)/1000);
  const qt=qz.qt.map(x=>Math.round(x/1000));
  let score=0;const byTopic={};
  set.qs.forEach((q,i)=>{
    const tp=set.topic[i];byTopic[tp]=byTopic[tp]||[0,0];byTopic[tp][1]++;
    if(ans[i]===q.a){score++;byTopic[tp][0]++;}
  });
  S.attempts.push({setId:set.id,date:new Date().toISOString(),ans:ans.slice(),score,byTopic,n:set.qs.length,timeSec,qt});
  if(set.src){
    set.src.forEach((m,i)=>{
      const key='quiz:'+m.setId+':'+m.qi, item=S.missed.find(x=>x.k===key);
      if(!item)return;
      if(ans[i]===set.qs[i].a){item.s=(item.s||0)+1; if(item.s>=2)S.missed=S.missed.filter(x=>x.k!==key);}
      else item.s=0;
    });
  }else{
    set.qs.forEach((q,i)=>{ if(ans[i]!==q.a) addMissed('quiz',set.id,i); });
  }
  saveStore();qz=null;
  // review
  const a=$('#quizArea');a.innerHTML='';
  a.appendChild(el('div','',`<h2 style="font-size:18px">Result: ${score} / ${set.qs.length}</h2>
    <p class="muted" style="font-size:13.5px;margin:6px 0 14px">${score===set.qs.length?'Flawless — teach this to a classmate tonight to lock it in.':'We review every question below. Misses are where the learning happens.'}</p>`));
  set.qs.forEach((q,i)=>{
    const ok=ans[i]===q.a;
    const card=el('div','qcard','');card.style.marginBottom='12px';card.style.padding='16px 20px';
    card.innerHTML=`<div class="qmeta" style="color:${ok?'var(--good)':'var(--bad)'}">Q${i+1} · ${ok?'Correct':'Missed'} · ${TOPICS[set.topic[i]]}</div>
      <div style="margin:4px 0 8px">${q.q}</div>`;
    q.o.forEach((t,j)=>{
      const cls='opt '+ (j===q.a?'cr':(j===ans[i]?'wr':''));
      const d=el('div',cls);d.style.cursor='default';d.style.marginTop='6px';
      d.innerHTML=`<span class="key">${'ABCD'[j]}</span><span>${t}${j===q.a?' ✔':''}${j===ans[i]&&j!==q.a?' ✘':''}</span>`;
      card.appendChild(d);
    });
    card.appendChild(el('div','expl',`<b>Why:</b> ${q.ex}`));
    a.appendChild(card);
  });
  const row=el('div','continue-row');row.style.justifyContent='space-between';row.style.maxWidth='680px';
  const again=el('button','btn ghost','Retake another set');again.onclick=renderQuizHome;
  const mast=el('button','btn','See my mastery map →');mast.onclick=()=>setTab('mastery');
  row.append(again,mast);a.appendChild(row);
}

/* ============================================================
   Render: Mastery
============================================================ */
function renderMastery(){
  const a=$('#masteryArea');a.innerHTML='';
  const card=el('div','mcard');
  card.innerHTML='<h3>Mastery by topic <span style="color:var(--faint);font-weight:400;font-size:12px">— from all quiz attempts, most recent weighted higher</span></h3>';
  const topicAgg={};
  const att=S.attempts;
  att.forEach((at,i)=>{
    const w=0.5+0.5*((i+1)/Math.max(att.length,1));
    Object.entries(at.byTopic).forEach(([tp,[c,t]])=>{
      topicAgg[tp]=topicAgg[tp]||[0,0];topicAgg[tp][0]+=c*w;topicAgg[tp][1]+=t*w;
    });
  });
  if(!att.length){
    card.innerHTML+='<p class="muted" style="font-size:13.5px">No quiz data yet. Finish a quiz set and your topic strengths will appear here.</p>';
  }else{
    Object.keys(TOPICS).forEach(tp=>{
      const r=topicAgg[tp];if(!r)return;
      const pct=Math.round(r[0]/r[1]*100);
      const color=pct>=80?'var(--good)':pct>=55?'var(--acc2)':'var(--bad)';
      const row=el('div','mbar-row');
      row.innerHTML=`<span class="lbl">${TOPICS[tp]}</span><span class="mtrack"><i style="width:${pct}%;background:${color}"></i></span><span class="val">${pct}%</span>`;
      card.appendChild(row);
    });
  }
  a.appendChild(card);

  const prac=el('div','mcard');
  prac.innerHTML='<h3>Guided practice accuracy <span style="color:var(--faint);font-weight:400;font-size:12px">— Learn & Homework, first-try results</span></h3>';
  let anyPrac=false;
  CHAPTERS.forEach(c=>{
    const head=el('div','mchap-head','Ch.'+c.n+' · '+c.name.replace(/^Chapter \d+\s·\s/,''));
    prac.appendChild(head);
    secIndices(c.n).forEach(li=>{
      let ok=0,tot=0;
      LESSONS[li].steps.forEach((st,si)=>{
        const r=S.learn['s'+li+'_'+si];
        if((st.t==='ask'||st.t==='input')&&r!==undefined){tot++;ok+=r;}
      });
      const mm=LESSONS[li].title.match(/§(\d\.\d)/);
      const sec=mm?mm[1]:null;
      const hw=sec?S.hwsec[sec]:null;
      if(hw){ok+=hw[0];tot+=hw[1];}
      if(tot)anyPrac=true;
      const lab=sec?('§'+sec):(li===4?'Word Eq':'Warm-up');
      const pct=tot?Math.round(ok/tot*100):null;
      const row=el('div','mbar-row');
      row.innerHTML=`<span class="lbl">${lab} guided</span><span class="mtrack"><i style="width:${pct==null?0:pct}%;background:${pct==null?'#2c3038':pct>=80?'var(--good)':pct>=55?'var(--acc2)':'var(--bad)'}"></i></span><span class="val">${pct==null?'— not yet':pct+'% · '+tot+' tries'}</span>`;
      prac.appendChild(row);
    });
  });
  if(!anyPrac)prac.innerHTML+='<p class="muted" style="font-size:13.5px">Answer Learn or Homework questions and your first-try accuracy shows up here.</p>';
  a.appendChild(prac);

  const note=el('div','mcard');
  if(att.length>=5){
    const last5=att.slice(-5);
    const weak=Object.entries(topicAgg).sort((x,y)=>(x[1][0]/x[1][1])-(y[1][0]/y[1][1])).slice(0,2).map(x=>TOPICS[x[0]]);
    const avgPct=Math.round(last5.reduce((s,x)=>{const n=x.n||8;return s+x.score/n;},0)/last5.length*100);
    const qts=att.filter(x=>x.qt&&x.qt.length).flatMap(x=>x.qt);
    const avgT=qts.length?Math.round(qts.reduce((s,x)=>s+x,0)/qts.length):null;
    note.innerHTML=`<h3>After 5 sets: your check-in</h3>
      <p style="font-size:13.5px;color:var(--mut)">Recent average: about <b style="color:var(--acc2);font-size:16px">${avgPct}%</b>${avgT!=null?` · roughly <b style="color:var(--txt)">${avgT}s per question</b>`:''}. Focus your next review on: <b style="color:var(--txt)">${weak.join(' · ')}</b>. Revisit those sections in Learn, clear your Review notebook, then retake a set — the map updates immediately.</p>`;
  }else{
    note.innerHTML=`<h3>Your attempt history</h3><p class="muted" style="font-size:13.5px">Complete ${5-att.length} more quiz set${5-att.length>1?'s':''} to unlock your five-set mastery analysis — like a mini diagnosis before the real test.</p>`;
  }
  if(att.length){
    const list=el('div','');
    att.slice().reverse().slice(0,8).forEach(x=>{
      const n=x.n||8;
      const d=new Date(x.date);
      const nm=(QUIZ.find(q=>q.id===x.setId)||{}).name||'Review Drill';
      list.appendChild(el('div','attempt',`<span>${nm}</span><span>${d.toLocaleDateString()} ${d.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</span><span style="margin-left:auto;color:${x.score/n>=.8?'var(--good)':'var(--acc2)'}">${x.score}/${n}${x.timeSec!=null?' · '+x.timeSec+'s':''}</span>`));
    });
    note.appendChild(list);
  }
  a.appendChild(note);

  const save=el('div','mcard');
  save.innerHTML='<h3>Progress backup <span style="color:var(--faint);font-weight:400;font-size:12px">— 进度自动保存在本浏览器；换设备用它迁移</span></h3><p class="muted" style="font-size:13.5px;margin-bottom:8px">Your lesson step, homework status, quiz history and review list are saved automatically on this device. To move them to another device or browser, export a file here and import it there.</p>';
  const srow=el('div','continue-row');
  const ex=el('button','btn ghost','Export .json 导出');
  ex.onclick=()=>{
    const blob=new Blob([JSON.stringify(S,null,1)],{type:'application/json'});
    const u=URL.createObjectURL(blob);const a2=document.createElement('a');
    a2.href=u;a2.download='ma119-progress.json';a2.click();setTimeout(()=>URL.revokeObjectURL(u),2000);
  };
  const im=el('button','btn ghost','Import .json 导入');
  const fi=document.createElement('input');fi.type='file';fi.accept='.json,application/json';fi.style.display='none';
  im.onclick=()=>fi.click();
  fi.onchange=()=>{
    const r=new FileReader();
    r.onload=()=>{try{
      const d=JSON.parse(r.result);
      if(!d||typeof d!=='object')throw 0;
      S=Object.assign(newStore(),d);saveStore();renderAll();
      alert('Progress imported ✓');
    }catch(e){alert('That file does not look like a valid progress backup.');}};
    r.readAsText(fi.files[0]);fi.value='';
  };
  srow.append(ex,im);save.appendChild(srow);save.appendChild(fi);
  a.appendChild(save);
}

/* ============================================================
   Render: Review (错题本)
============================================================ */
function renderReview(){
  const a=$('#reviewArea');a.innerHTML='';
  a.appendChild(el('div','',`<h2 style="font-size:18px;margin-bottom:4px">Review · 错题本</h2>
    <p class="muted" style="font-size:13.5px;margin-bottom:12px">Every question you missed on the first try lands here automatically. Quiz misses leave automatically after <b>2 correct drills in a row</b> — or mark them mastered by hand.</p>`));
  const items=S.missed;
  if(!items.length){
    a.appendChild(el('div','mcard','<p style="font-size:14px">Empty — nothing missed yet. Keep it that way, or let it fill up and become your personal mock exam.</p>'));
    return;
  }
  const qItems=items.filter(m=>m.type==='quiz');
  if(qItems.length){
    const drill=el('button','btn','Re-drill '+qItems.length+' quiz miss'+(qItems.length>1?'es':'')+' →');
    drill.style.marginBottom='14px';
    drill.onclick=()=>{const set=buildReviewSet();if(set)startQuiz(set);};
    a.appendChild(drill);
  }
  items.forEach(m=>{
    const card=el('div','rvcard');
    if(m.type==='quiz'){
      const s=QUIZ.find(x=>x.id===m.a);if(!s)return;const q=s.qs[m.b];if(!q)return;
      card.innerHTML=`<span class="src">Quiz · ${s.name} · Q${m.b+1} · ${TOPICS[s.topic[m.b]]}${m.s?' · ✓ ' + m.s + '/2':''}</span>
        <div style="margin:6px 0">${q.q}</div>`;
      q.o.forEach((t,j)=>{const d=el('div','opt'+(j===q.a?' cr':''));d.style.cursor='default';
        d.innerHTML=`<span class="key">${'ABCD'[j]}</span><span>${t}${j===q.a?' ✔':''}</span>`;card.appendChild(d);});
      card.appendChild(el('div','expl','<b>Why:</b> '+q.ex));
    }else if(m.type==='learn'){
      const L=LESSONS[m.a];const st=L&&L.steps[m.b];if(!st)return;
      card.innerHTML=`<span class="src">Learn · ${L.title}</span><div style="margin:6px 0">${st.q||''}</div>`;
      if(st.reveal)card.appendChild(el('div','expl',st.reveal));
      const row=el('div','continue-row');
      const redo=el('button','btn ghost','Redo this step');
      redo.onclick=()=>{setTab('learn');S.sec=m.a;S.step=m.b;saveStore();renderAll();};
      row.appendChild(redo);card.appendChild(row);
    }else if(m.type==='hw'){
      const h=HW.find(x=>x.id===m.a);const st=h&&h.steps[m.b];if(!st)return;
      card.innerHTML=`<span class="src">Homework · ${h.badge}</span><div style="margin:6px 0">${st.q||h.stmt}</div>`;
      if(st.reveal)card.appendChild(el('div','expl',st.reveal));
    }
    const row2=el('div','continue-row');
    const mk=el('button','btn ghost','Mark mastered ✓');
    mk.onclick=()=>{S.missed=S.missed.filter(x=>x.k!==m.k);saveStore();renderReview();};
    row2.appendChild(mk);card.appendChild(row2);
    a.appendChild(card);
  });
}

/* ============================================================
   Render: Words (flashcards 闪卡)
============================================================ */
let wc=null; // {deck:[indices], idxs:[chapter indices], pos, flipped, agains}
function chWordIdxs(){const p=String(S.ch)+'.';return WORDS.map((_,i)=>i).filter(i=>WORDS[i].sec.indexOf(p)===0);}
function knownCountIdxs(idxs){return idxs.filter(i=>(S.cards.known[WORDS[i].en]||0)>0).length;}
function renderWordsHome(){
  wc=null;
  const a=$('#wordsArea');a.innerHTML='';
  const sw=el('div','chswitch');sw.innerHTML=chTabsHtml();bindChTabs(sw,switchChapter);a.appendChild(sw);
  const idxs=chWordIdxs();
  const kc=knownCountIdxs(idxs), total=idxs.length;
  const c=CHAPTERS[S.ch-1];
  a.appendChild(el('div','',`<h2 style="font-size:18px;margin-bottom:4px">${c.name} · Words <span style="color:var(--faint);font-size:13px;font-weight:400">— 关键术语闪卡</span></h2>
    <p class="muted" style="font-size:13.5px;margin-bottom:10px">Flip a card, judge yourself honestly. Cards you mark <b>Again</b> come back later in the same round; <b>Know</b> is remembered across sessions. Keys: <b>Space</b> flip · <b>1</b> again · <b>2</b> know.</p>`));
  const card=el('div','mcard');
  card.innerHTML=`<h3>Your term bank <span style="color:var(--faint);font-weight:400;font-size:12px">— ${kc} / ${total} marked known</span></h3>
    <div class="wprogress"><i style="width:${Math.round(kc/total*100)}%"></i></div>`;
  const row=el('div','continue-row');row.style.justifyContent='flex-start';row.style.gap='10px';
  const all=el('button','btn',`Study all ${total}`);
  all.onclick=()=>{wc={deck:idxs.slice(),idxs,pos:0,flipped:false,agains:0,total};renderWordCard();};
  const fresh=el('button','btn ghost',`New only (${total-kc})`);
  fresh.onclick=()=>{const d=idxs.filter(i=>!(S.cards.known[WORDS[i].en]>0));wc={deck:d,idxs,pos:0,flipped:false,agains:0,total:d.length};renderWordCard();};
  row.append(all,fresh);card.appendChild(row);a.appendChild(card);
}
function renderWordCard(){
  const a=$('#wordsArea');a.innerHTML='';
  if(wc.pos>=wc.deck.length){
    const card=el('div','mcard','');
    card.innerHTML=`<h3>Round complete 🎉</h3><p style="font-size:14px">Cards reviewed: <b>${wc.total}</b> · extra repeats from "Again": <b>${wc.agains}</b> · terms now known: <b>${knownCountIdxs(wc.idxs)} / ${wc.idxs.length}</b></p>
      <p class="muted" style="font-size:13px">A low repeat count means the terms are sticking. Come back tomorrow and run "New only" to keep them fresh.</p>`;
    const row=el('div','continue-row');row.style.justifyContent='flex-start';row.style.gap='10px';
    const back=el('button','btn','Back to word bank');back.onclick=renderWordsHome;
    const again=el('button','btn ghost','Restart round ↺');
    again.onclick=()=>{wc={deck:wc.idxs.slice(),idxs:wc.idxs,pos:0,flipped:false,agains:0,total:wc.idxs.length};renderWordCard();};
    row.append(back,again);card.appendChild(row);a.appendChild(card);return;
  }
  const w=WORDS[wc.deck[wc.pos]];
  const head=el('div','',`<div class="wcard-head"><span>Card ${wc.pos+1} / ${wc.total}</span><span class="wsec">§${w.sec}</span></div><div class="wprogress"><i style="width:${Math.round(wc.pos/wc.total*100)}%"></i></div>`);
  a.appendChild(head);
  const flip=el('button','wcard'+(wc.flipped?' flipped':''));
  flip.innerHTML=wc.flipped
    ?`<span class="wc-en">${w.en}</span><span class="wc-zh">${w.zh}</span><span class="wc-def">${w.def}</span><span class="wc-ex">“${w.ex}”</span><span class="wc-hint">click to see the term 点卡片回正面</span>`
    :`<span class="wc-en big">${w.en}</span><span class="wc-hint">click or press Space to flip 点击翻面</span>`;
  flip.onclick=()=>{wc.flipped=true;renderWordCard();};
  a.appendChild(flip);
  const row=el('div','wcard-actions');
  const ag=el('button','btn bad','Again 还不会 · 1');
  ag.disabled=!wc.flipped;
  ag.onclick=()=>{wc.deck.push(wc.deck[wc.pos]);wc.agains++;wc.pos++;wc.flipped=false;renderWordCard();};
  const kn=el('button','btn good','Know 认识 · 2');
  kn.disabled=!wc.flipped;
  kn.onclick=()=>{S.cards.known[w.en]=(S.cards.known[w.en]||0)+1;saveStore();wc.pos++;wc.flipped=false;renderWordCard();};
  const quit=el('button','ghostmini','Exit ✕');quit.style.marginLeft='auto';
  quit.onclick=renderWordsHome;
  row.append(ag,kn,quit);a.appendChild(row);
}

/* ============================================================
   Keyboard answering
============================================================ */
document.addEventListener('keydown',e=>{
  if(!S.onboarded)return;
  const t=document.activeElement&&document.activeElement.tagName;
  if(t==='INPUT'||t==='TEXTAREA'||t==='BUTTON')return;
  const activeBtn=document.querySelector('#nav button.active');
  if(!activeBtn)return;
  const tab=activeBtn.dataset.tab;
  if(tab==='words'&&wc){
    if(e.key===' '||e.key==='Enter'){if(wc.pos<wc.deck.length&&!wc.flipped){wc.flipped=true;renderWordCard();}e.preventDefault();return;}
    if(e.key==='1'){const b=document.querySelector('.wcard-actions .bad:not([disabled])');if(b)b.click();}
    if(e.key==='2'){const b=document.querySelector('.wcard-actions .good:not([disabled])');if(b)b.click();}
    if(e.key==='Escape')renderWordsHome();
    return;
  }
  if(e.key==='Escape')return;
  if(e.key==='Enter'){
    const conts=document.querySelectorAll('#tab-'+tab+' .continue-row button:not([disabled])');
    if(conts.length){conts[conts.length-1].click();e.preventDefault();}
    return;
  }
  let idx='abcd'.indexOf(e.key.toLowerCase());
  if(idx<0)idx='1234'.indexOf(e.key);
  if(idx<0)return;
  if(tab==='quiz'){
    if(!qz)return;
    const opts=document.querySelectorAll('#quizArea .opt');
    if(opts[idx])opts[idx].click();
  }else{
    const btns=[...document.querySelectorAll('#tab-'+tab+' .choices button')].filter(b=>!b.disabled);
    if(btns[idx])btns[idx].click();
  }
});

/* ============================================================
   Tabs, onboarding, init
============================================================ */
function setTab(name){
  document.querySelectorAll('#nav button').forEach(b=>b.classList.toggle('active',b.dataset.tab===name));
  ['learn','hw','quiz','review','words','mastery'].forEach(t=>$('#tab-'+t).classList.toggle('hidden',t!==name));
  if(name==='hw')renderHWList();
  if(name==='quiz')renderQuizHome();
  if(name==='mastery')renderMastery();
  if(name==='review')renderReview();
  if(name==='words')renderWordsHome();
}
document.querySelectorAll('#nav button').forEach(b=>b.onclick=()=>setTab(b.dataset.tab));
$('#resetBtn').onclick=()=>{if(confirm('Clear all saved progress, quiz history and settings?')){localStorage.removeItem(STORE);location.reload();}};

const tb=$('#themeBtn');
function applyTheme(){
  document.documentElement.dataset.theme=S.theme;
  tb.textContent=S.theme==='dark'?'Light':'Dark';
  const m=document.querySelector('meta[name="theme-color"]');
  if(m)m.content=S.theme==='dark'?'#14161b':'#f4f5f7';
}
tb.onclick=()=>{S.theme=S.theme==='dark'?'light':'dark';saveStore();applyTheme();};
applyTheme();

const ONBOARD=[
  {title:'Welcome to MA119 👋',
   p:"I'm Ms. Lin, your guide for Chapter 1 — Functions and Chapter 2 — Limits and Continuity. I'll ask one small question at a time and let you do the thinking. Before we start, two quick questions so I can match your pace.",
   picks:null},
  {key:'goal',title:'What brings you here today?',
   p:'You can switch modes any time from the toolbar.',
   picks:[
     {v:'learn',t:'Learn from scratch',s:'Step through Chapters 1–2 with guidance'},
     {v:'review',t:'Quick review',s:'I have seen this before'},
     {v:'hw',t:'Homework help',s:'Guide me through the problems'},
     {v:'quiz',t:'Practice quiz',s:'Exam-style sets with analysis'}]},
  {key:'level',title:'How is your math background?',
   p:'This adjusts how much background linking I do. You can change it anytime by resetting.',
   picks:[
     {v:'grade10',t:'Grade 10 / high-school basics (recommended)',s:'We will build from what you know'},
     {v:'precalc',t:'I have done some precalculus',s:'Move a bit faster'},
     {v:'rusty',t:'A bit rusty — go slowly',s:'More links and reminders'}]},
  {title:'All set.',
   p:'One promise: when you bring me homework, I will not just hand over answers — I will guide you to find them yourself. Wrong guesses are part of the process. Ready?',
   picks:[{v:'go',t:'Start with §1.1 Functions →'}]}
];
let obIdx=0;
function renderOnboard(){
  const card=$('#onboardCard');const o=ONBOARD[obIdx];
  card.innerHTML=`<h2>${o.title}</h2><p>${o.p}</p>`;
  if(o.picks===null){const b=el('button','btn','Let’s begin');b.onclick=()=>{obIdx++;renderOnboard();};card.appendChild(b);}
  else{
    const pk=el('div','pick');
    o.picks.forEach(x=>{
      const b=el('button','',`${x.t}${x.s?`<small>${x.s}</small>`:''}`);
      b.onclick=()=>{
        if(o.key==='goal'){S.goal=x.v;}
        else if(o.key==='level'){S.level=x.v;}
        else if(x.v==='go'){
          S.onboarded=true;saveStore();$('#onboard').classList.add('hidden');
          if(S.goal==='hw')setTab('hw');else if(S.goal==='quiz')setTab('quiz');
          renderAll();return;
        }
        obIdx++;renderOnboard();
      };
      pk.appendChild(b);
    });
    card.appendChild(pk);
  }
}
function renderAll(){renderRail();renderLesson();updateChrome();}

if(S.onboarded){$('#onboard').classList.add('hidden');renderAll();}
else{updateChrome();renderOnboard();}

/* Service worker (offline cache) */
if('serviceWorker' in navigator && /^https?:$/.test(location.protocol)){
  addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
}
