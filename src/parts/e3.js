/* ================= Etapa 3 · grupos cíclicos ================= */
const E3=(()=>{
const NS='http://www.w3.org/2000/svg';
const mk=(t,a,p)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e;};
const GN=['A','B','C','D'],GC=['var(--k1)','var(--k2)','var(--k3)','var(--k4)'];
const md=k=>((k%4)+4)%4;
const rk=k=>['e','r','r²','r³'][md(k)];
const turno=(g,s)=>md(g+s)+1;
const C=180,R=122;
const pos=(a,r=R)=>[C+r*Math.cos(a*Math.PI/180),C+r*Math.sin(a*Math.PI/180)];

function ring(svg){
  svg.setAttribute('viewBox','-10 -14 380 392');svg.classList.add('ring');
  mk('defs',{},svg).innerHTML=`<marker id="${svg.id}m" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 10 5 0 10z" fill="var(--accent)"/></marker>`;
  mk('circle',{cx:C,cy:C,r:R,class:'rtrack'},svg);
  for(let t=0;t<4;t++){const[x0,y0]=pos(-90+90*t+24),[x1,y1]=pos(-90+90*t+64);
    mk('path',{d:`M${x0} ${y0} A${R} ${R} 0 0 1 ${x1} ${y1}`,class:'rarc','marker-end':`url(#${svg.id}m)`},svg);}
  for(let t=0;t<4;t++){const[x,y]=pos(-90+90*t);mk('circle',{cx:x,cy:y,r:34,class:'rslot'},svg);
    const lb=mk('text',{x,y:t===2?y+50:y-50,class:'rlab'},svg);lb.textContent='Turno '+(t+1);}
  const chips=GN.map((n,i)=>{const g=mk('g',{class:'rchip'},svg);mk('circle',{r:27,fill:GC[i]},g);mk('text',{},g).textContent=n;return g;});
  const cen=mk('text',{x:C,y:C-8,class:'rcen'},svg),sub=mk('text',{x:C,y:C+36,class:'rsub'},svg);
  let cur=0,raf=0;
  const place=s=>chips.forEach((g,i)=>{const[x,y]=pos(-90+90*(i+s));g.setAttribute('transform',`translate(${x.toFixed(2)},${y.toFixed(2)})`);});
  place(0);
  function to(s,anim=true){cancelAnimationFrame(raf);const from=cur;cur=s;
    if(!anim||REDUCED||from===s){place(s);svg.classList.remove('moving');return;}
    svg.classList.add('moving');const t0=performance.now(),D=650+260*Math.min(3,Math.abs(s-from));
    const step=now=>{const p=Math.min(1,(now-t0)/D),e=p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2;place(from+(s-from)*e);
      if(p<1)raf=requestAnimationFrame(step);else svg.classList.remove('moving');};
    raf=requestAnimationFrame(step);}
  return{to,label:(a,b)=>{cen.textContent=a;sub.textContent=b;},get s(){return cur;}};
}
const dist=(el,s)=>{el.innerHTML=GN.map((n,i)=>`<span style="--c:${GC[i]}">${n} → T${turno(i,s)}</span>`).join('');};

/* ---------- La sala ---------- */
const r1=ring($('#ring1'));let p1=0;
function up1(){r1.label(rk(p1),'período '+p1);dist($('#dist1'),p1);const box=$('#sala1');
  box.innerHTML=p1===0?`<span class="k">Distribución inicial</span><p>A en el turno 1, B en el 2, C en el 3 y D en el 4.</p>`
   :p1%4===0?`<span class="k">Período ${p1} · vuelta completa</span><p>Después de cuatro rotaciones se recupera la distribución inicial: <span class="m">r⁴ = e</span>.</p>`
   :`<span class="k">Período ${p1}</span><p>Todos avanzan un turno. Desde el inicio se aplicó <span class="m">${rk(p1)}</span>: ${md(p1)} lugar${md(p1)>1?'es':''}.</p>`;
  box.classList.toggle('okc',p1>0&&p1%4===0);}
$('#r1Go').onclick=()=>{p1++;r1.to(p1);up1();};
$('#r1Reset').onclick=()=>{p1=0;r1.to(0,false);up1();};
up1();

/* ---------- Tablas ---------- */
function cay(el,num,onPick){el.innerHTML='';const L=k=>num?String(md(k)):rk(k);
  const sp=(cls,txt,d)=>{const s=document.createElement('span');s.className='hd '+cls;s.textContent=txt;Object.assign(s.dataset,d||{});el.appendChild(s);};
  sp('op',num?'+₄':'∘');for(let j=0;j<4;j++)sp('col',L(j),{j});
  for(let i=0;i<4;i++){sp('row',L(i),{i});
    for(let j=0;j<4;j++){const b=document.createElement('button');b.className='cell';b.dataset.i=i;b.dataset.j=j;b.dataset.k=md(i+j);b.textContent=L(i+j);
      b.setAttribute('aria-label',`${L(i)} ${num?'+':'∘'} ${L(j)}`);b.onclick=()=>onPick(i,j);el.appendChild(b);}}}
function mark(el,i,j){el.querySelectorAll('.on,.hl').forEach(x=>x.classList.remove('on','hl'));
  el.querySelectorAll(`.row[data-i="${i}"],.col[data-j="${j}"]`).forEach(x=>x.classList.add('hl'));
  el.querySelector(`.cell[data-i="${i}"][data-j="${j}"]`).classList.add('on');}
const sumTxt=(i,j)=>`${i} + ${j} = ${i+j}${i+j>=4?' ≡ '+md(i+j):''} (mod 4)`;

function pick1(i,j){mark($('#cay1'),i,j);
  $('#cay1Txt').innerHTML=`<span class="k">Composición</span><p><span class="m">${rk(i)} ∘ ${rk(j)} = ${rk(i+j)}</span> porque ${sumTxt(i,j)}.${md(i+j)===0?' Volvemos al inicio.':''}</p>`;}
cay($('#cay1'),false,pick1);pick1(1,1);

function pickIso(i,j){mark($('#cayG'),i,j);mark($('#cayZ'),i,j);
  $('#isoTxt').innerHTML=`<span class="k">Misma estructura</span><p><span class="m">φ(${rk(i)} ∘ ${rk(j)}) = φ(${rk(i+j)}) = ${md(i+j)}</span> y en ℤ₄: ${sumTxt(i,j)}. Componer rotaciones equivale a sumar módulo 4.</p>`;}
cay($('#cayG'),false,pickIso);cay($('#cayZ'),true,pickIso);pickIso(2,3);

/* ---------- Propiedades ---------- */
const P3=['clausura','asociatividad','neutro','inversos','conmutatividad'];let p3=0;
function up3(){$$('.p3').forEach((c,k)=>c.classList.toggle('ok',k<p3));$('#p3Concl').classList.toggle('show',p3>=5);
  $('#p3Go').textContent=p3<5?'Verificar '+P3[p3]:'Grupo abeliano ✓';$('#p3Go').disabled=p3>=5;}
$('#p3Go').onclick=()=>{if(p3<5)p3++;up3();};
$('#p3Reset').onclick=()=>{p3=0;up3();};
up3();

/* ---------- Cíclico ---------- */
let gen=1,genT=[];
$$('#genSeg [data-gen]').forEach(b=>b.onclick=()=>{gen=+b.dataset.gen;$$('#genSeg [data-gen]').forEach(x=>x.setAttribute('aria-pressed',x===b));genRun();});
function genRun(){genT.forEach(clearTimeout);genT=[];$('#pow').innerHTML='';$('#genTxt').textContent='';$$('.sg').forEach(s=>s.classList.remove('on'));
  const g=rk(gen),base=gen===1?'r':`(${g})`,seq=[];let k=1;
  do{seq.push(md(gen*k));k++;}while(seq[seq.length-1]!==0);
  const dt=REDUCED?0:430;
  seq.forEach((v,n)=>genT.push(setTimeout(()=>{const s=document.createElement('span');s.textContent=`${base}${['','','²','³','⁴'][n+1]} = ${rk(v)}`;
    if(v===0)s.className='back';$('#pow').appendChild(s);},dt*n)));
  genT.push(setTimeout(()=>{const set=[0,...seq.slice(0,-1)].sort();const ord=seq.length;
    $('#sg'+ord).classList.add('on');
    $('#genTxt').innerHTML=ord===4?`<span class="m">⟨${g}⟩ = G</span>. Hay que repetir ${g} cuatro veces para volver al inicio: su orden es 4 y <b>genera todo el grupo</b>.`
      :`<span class="m">⟨${g}⟩ = {${set.map(rk).join(', ')}}</span>. Se vuelve al inicio en ${ord} pasos: solo genera un <b>subgrupo de orden ${ord}</b>.`;},dt*seq.length));}
$('#genGo').onclick=genRun;
genRun();

/* ---------- Coevaluación ---------- */
const r2=ring($('#ring2'));let st=2,p2=0;const seen=new Set([0]);
const order=k=>[0,1,2,3].map(t=>GN[md(t-k)]).join('');
function up2(){r2.label(rk(p2),'paso '+rk(st));
  $('#c2Seen').innerHTML=[0,1,2,3].map(k=>`<span class="${seen.has(md(k))?'on':''}"><b>${order(k)}</b>${rk(k)}</span>`).join('');
  const n=seen.size,box=$('#c2Txt');
  box.innerHTML=st===2
    ?(p2<2?`<span class="k">Distribuciones visitadas: ${n} de 4</span><p>Avanzá un par de veces y mirá cuántas distribuciones aparecen.</p>`
      :`<span class="k">Solo ${n} de 4 distribuciones</span><p><span class="m">r² ∘ r² = r⁴ = e</span>: se alterna entre dos. Se genera <span class="m">⟨r²⟩ = {e, r²}</span>, de orden 2, y 2 divide a 4 (Lagrange).</p>`)
    :(n<4?`<span class="k">Distribuciones visitadas: ${n} de 4</span><p>Con paso r los grupos pasan por todos los turnos.</p>`
      :`<span class="k">Las 4 distribuciones</span><p>Con paso r se recorren todas: <span class="m">⟨r⟩ = G</span>.</p>`);
  box.classList.toggle('okc',(st===2&&p2>=2)||(st===1&&n===4));}
$$('#c2Seg [data-step]').forEach(b=>b.onclick=()=>{st=+b.dataset.step;$$('#c2Seg [data-step]').forEach(x=>x.setAttribute('aria-pressed',x===b));p2=0;seen.clear();seen.add(0);r2.to(0,false);up2();});
$('#c2Go').onclick=()=>{p2+=st;seen.add(md(p2));r2.to(p2);up2();};
$('#c2Reset').onclick=()=>{p2=0;seen.clear();seen.add(0);r2.to(0,false);up2();};
up2();

/* ---------- Semana ---------- */
const r3=ring($('#ring3'));
function up3w(anim){const n=+$('#wk').value,q=Math.floor(n/4),m=n%4;
  r3.to(r3.s+md(n-r3.s),anim);r3.label(rk(m),'semana '+n);dist($('#dist3'),n);
  $('#wkOut').innerHTML=`<span class="big">Semana ${n}</span><span class="m">${n} = 4 · ${q} + ${m} → ${rk(m)}</span><span style="color:var(--muted);font-size:.95rem">${m===0?'Misma distribución que al inicio.':`Equivale a avanzar ${m} lugar${m>1?'es':''}.`}</span>`;}
$('#wk').addEventListener('input',()=>up3w(true));
$('#wk').addEventListener('change',e=>e.target.blur()); // devuelve las flechas a la navegación
up3w(false);

console.assert(rk(14)==='r²'&&order(2)==='CDAB'&&turno(3,1)===1,'E3 datos');
return{ciclo:genRun};
})();
