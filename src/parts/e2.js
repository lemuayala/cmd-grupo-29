
/* ================= Etapa 2 · relación de equivalencia ================= */
const E2=(()=>{
const S=[['S1','P1','C1'],['S2','P2','C1'],['S3','P1','C1'],['S4','P3','C2'],['S5','P2','C1'],['S6','P1','C1'],['S7','P3','C2'],['S8','P2','C1'],['S9','P1','C2'],['S10','P1','C2']].map(([id,p,c])=>({id,p,c}));
const K=[{k:'K1',p:'P1',c:'C1',col:'var(--k1)'},{k:'K2',p:'P2',c:'C1',col:'var(--k2)'},{k:'K3',p:'P3',c:'C2',col:'var(--k3)'},{k:'K4',p:'P1',c:'C2',col:'var(--k4)'}];
const kOf=s=>K.findIndex(k=>k.p===s.p&&k.c===s.c),byId=id=>S.find(s=>s.id===id);
K.forEach(k=>k.m=S.filter(s=>s.p===k.p&&s.c===k.c).map(s=>s.id));
console.assert(K.map(k=>k.m.join(',')).join('|')==='S1,S3,S6|S2,S5,S8|S4,S7|S9,S10','E2 clases');
const R=[];S.forEach(a=>S.forEach(b=>{if(a.p===b.p&&a.c===b.c)R.push([a.id,b.id])}));
console.assert(R.length===26,'E2 26 pares');
const wait=ms=>new Promise(r=>setTimeout(r,REDUCED?0:ms));
const docIcon='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z"/><path d="M14 3v6h6"/></svg>';
function card(s){const d=document.createElement('div');d.className='sc';d.dataset.id=s.id;d.style.setProperty('--kc',K[kOf(s)].col);
  d.innerHTML=`<div class="id">${docIcon}${s.id}</div><div class="f"><span>Plan</span><b>${s.p}</b></div><div class="f"><span>Carrera</span><b>${s.c}</b></div>`;return d;}
function flip(els,mutate,dur=750){const f=new Map(els.map(e=>[e,e.getBoundingClientRect()]));mutate();if(REDUCED)return;
  els.forEach(e=>{const a=f.get(e),b=e.getBoundingClientRect();const dx=a.left-b.left,dy=a.top-b.top,sx=a.width/(b.width||1);if(!dx&&!dy)return;
    e.animate([{transform:`translate(${dx}px,${dy}px) scale(${sx})`,transformOrigin:'top left'},{transform:'none',transformOrigin:'top left'}],{duration:dur,easing:'cubic-bezier(.16,1,.3,1)'});});}

/* datos */
S.forEach(s=>$('#allCards').appendChild(card(s)));
/* comparador */
['#selA','#selB'].forEach(q=>{const e=$(q);S.forEach(s=>e.add(new Option(`${s.id} · ${s.p}, ${s.c}`,s.id)));});
$('#selA').value='S1';$('#selB').value='S3';
function compare(){const a=byId($('#selA').value),b=byId($('#selB').value),pe=a.p===b.p,ce=a.c===b.c,rel=pe&&ce;
  $('#aP b').textContent=a.p;$('#aC b').textContent=a.c;$('#bP b').textContent=b.p;$('#bC b').textContent=b.c;
  ['#aP','#bP'].forEach(q=>$(q).className='crow '+(pe?'ok':'no'));['#aC','#bC'].forEach(q=>$(q).className='crow '+(ce?'ok':'no'));
  $('#vrd').className='vrd '+(rel?'ok':'no');$('#vBig').textContent=rel?`${a.id} R ${b.id}`:`${a.id} R̸ ${b.id}`;
  $('#vTxt').innerHTML=`<div><span class="${pe?'y':'n'}">${pe?'✓':'✗'}</span>${pe?'Mismo plan de origen ('+a.p+')':'Planes distintos ('+a.p+' y '+b.p+')'}</div>`+
    `<div><span class="${ce?'y':'n'}">${ce?'✓':'✗'}</span>${ce?'Misma carrera de destino ('+a.c+')':'Carreras distintas ('+a.c+' y '+b.c+')'}</div>`+
    `<div>${rel?(a.id===b.id?'Es la misma solicitud: la relación es reflexiva.':'Están relacionadas: misma clase, '+K[kOf(a)].k+'.'):(pe||ce?'Coinciden en un solo criterio: no alcanza.':'No coinciden en nada.')}</div>`;
  if(G_OK&&!REDUCED)gsap.fromTo('#vrd',{scale:.96},{scale:1,duration:.5,ease:'back.out(2)'});}
$('#selA').onchange=compare;$('#selB').onchange=compare;
$$('[data-ex]').forEach(b=>b.onclick=()=>{const [x,y]=b.dataset.ex.split(',');$('#selA').value=x;$('#selB').value=y;compare();});
compare();

/* agrupar */
const pool=$('#pool'),kl=$('#klasses'),gc={};let grouped=false,busy=false;
S.forEach(s=>{gc[s.id]=card(s);pool.appendChild(gc[s.id]);});
K.forEach(k=>{const b=document.createElement('div');b.className='kbox';b.style.setProperty('--kc',k.col);b.innerHTML=`<div class="kh"><b>${k.k}</b><span>(${k.p}, ${k.c})</span></div><div class="slot"></div>`;kl.appendChild(b);});
$('#groupBtn').onclick=async()=>{if(busy||grouped)return;busy=true;$('#groupBtn').disabled=true;
  for(let i=0;i<K.length;i++){const k=K[i],box=kl.children[i];$('#groupMsg').textContent=`${k.k}: plan ${k.p} y carrera ${k.c} → ${k.m.join(', ')}`;
    flip(Object.values(gc),()=>{k.m.forEach(id=>{gc[id].classList.add('colored');box.querySelector('.slot').appendChild(gc[id]);});box.classList.add('filled');});
    await wait(900);}
  grouped=true;busy=false;$('#ungroupBtn').disabled=false;$('#groupMsg').textContent='Cuatro clases. Ninguna vacía, ninguna solicitud repetida.';$('#quot').classList.add('show');};
$('#ungroupBtn').onclick=()=>{if(busy||!grouped)return;
  flip(Object.values(gc),()=>{S.forEach(s=>{gc[s.id].classList.remove('colored');pool.appendChild(gc[s.id]);});[...kl.children].forEach(b=>b.classList.remove('filled'));});
  grouped=false;$('#groupBtn').disabled=false;$('#ungroupBtn').disabled=true;$('#groupMsg').textContent='Las tarjetas están en el orden original.';$('#quot').classList.remove('show');};

/* propiedades */
let ps=0;const PL=['Mostrar reflexiva','Mostrar simétrica','Mostrar transitiva','Ver conclusión','Listo'];
$('#propBtn').onclick=()=>{const pr=$$('.prop');if(ps<3){pr[ps].classList.add('shown');if(G_OK&&!REDUCED)gsap.fromTo(pr[ps],{scale:.9},{scale:1,duration:.7,ease:'back.out(1.6)',clearProps:'transform'});}else if(ps===3)$('#propConcl').classList.add('show');
  ps=Math.min(ps+1,4);$('#propBtn').textContent=PL[ps];$('#propBtn').disabled=ps>=4;};
$('#propReset').onclick=()=>{ps=0;$$('.prop').forEach(p=>p.classList.remove('shown'));$('#propConcl').classList.remove('show');$('#propBtn').textContent=PL[0];$('#propBtn').disabled=false;};

/* dígrafo */
(function(){const svg=$('#graph');const cen=[[160,110],[460,110],[160,315],[460,315]],pos={},R0=19;
  let out='<defs>'+K.map((k,i)=>`<marker id="gm${i}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" fill="${k.col}"/></marker>`).join('')+'</defs>';
  K.forEach((k,i)=>{const [cx,cy]=cen[i],n=k.m.length,rad=n===3?62:58;
    k.m.forEach((id,j)=>{const a=n===3?(-90+j*120)*Math.PI/180:(j===0?Math.PI:0);pos[id]=[cx+rad*Math.cos(a),cy+(n===3?10:0)+rad*Math.sin(a)];});
    out+=`<text class="ktag" x="${cx-112}" y="${cy-76}" fill="${k.col}">${k.k}</text><text class="ksub" x="${cx-112}" y="${cy-60}">(${k.p}, ${k.c})</text>`;});
  let d=0;K.forEach((k,i)=>{const [cx,cy0]=cen[i],cy=cy0+(k.m.length===3?10:0);
    k.m.forEach(a=>k.m.forEach(b=>{const [x1,y1]=pos[a],[x2,y2]=pos[b];let p;
      if(a===b){let vx=x1-cx,vy=y1-cy;const L=Math.hypot(vx,vy)||1;vx/=L;vy/=L;const px=-vy,py=vx;
        p=`M${(x1+vx*R0+px*8).toFixed(1)} ${(y1+vy*R0+py*8).toFixed(1)} C${(x1+vx*58+px*30).toFixed(1)} ${(y1+vy*58+py*30).toFixed(1)} ${(x1+vx*58-px*30).toFixed(1)} ${(y1+vy*58-py*30).toFixed(1)} ${(x1+vx*R0-px*8).toFixed(1)} ${(y1+vy*R0-py*8).toFixed(1)}`;}
      else{let dx=x2-x1,dy=y2-y1;const L=Math.hypot(dx,dy);dx/=L;dy/=L;const nx=-dy,ny=dx,o=7,sx=x1+dx*R0+nx*o,sy=y1+dy*R0+ny*o,ex=x2-dx*(R0+2)+nx*o,ey=y2-dy*(R0+2)+ny*o;
        p=`M${sx.toFixed(1)} ${sy.toFixed(1)} Q${((sx+ex)/2+nx*10).toFixed(1)} ${((sy+ey)/2+ny*10).toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`;}
      out+=`<path class="edge" style="transition-delay:${d.toFixed(2)}s" stroke="${k.col}" marker-end="url(#gm${i})" d="${p}"/>`;d+=.035;}));});
  S.forEach(s=>{const [x,y]=pos[s.id];out+=`<g class="node"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${R0}" stroke="${K[kOf(s)].col}"/><text x="${x.toFixed(1)}" y="${y.toFixed(1)}">${s.id}</text></g>`;});
  svg.innerHTML=out;console.assert(svg.querySelectorAll('.edge').length===26,'E2 26 arcos');
  $('#klegend').innerHTML=K.map(k=>`<span><i style="background:${k.col}"></i>${k.k}</span>`).join('');})();

/* matriz */
const MT0='Pasá el mouse sobre una celda. Un 1 en la fila a y la columna b significa a R b.';
function renderMat(o){const ids=o==='class'?K.flatMap(k=>k.m):S.map(s=>s.id);
  let h='<tr><th></th>'+ids.map(i=>`<th>${i}</th>`).join('')+'</tr>';
  ids.forEach(a=>{h+=`<tr><th>${a}</th>`;ids.forEach(b=>{const A=byId(a),B=byId(b),one=A.p===B.p&&A.c===B.c;h+=`<td class="${one?'one':''}" data-a="${a}" data-b="${b}" style="${one?'background:'+K[kOf(A)].col:''}">${one?1:0}</td>`;});h+='</tr>';});
  $('#mat').innerHTML=h;$('#matTxt').textContent=o==='class'?'Ordenada por clases aparecen cuatro bloques sobre la diagonal: 9 + 9 + 4 + 4 = 26 unos.':MT0;
  if(G_OK&&!REDUCED)gsap.from('#mat td.one',{scale:0,duration:.4,stagger:{each:.012,from:'start'},ease:'back.out(2)'});}
$('#mat').addEventListener('mouseover',e=>{const td=e.target.closest('td');if(!td)return;$$('#mat td.hl').forEach(x=>x.classList.remove('hl'));td.classList.add('hl');
  const a=byId(td.dataset.a),b=byId(td.dataset.b);$('#matTxt').textContent=td.classList.contains('one')?`${a.id} R ${b.id}: los dos son (${a.p}, ${a.c}).`:`${a.id} no se relaciona con ${b.id}: (${a.p}, ${a.c}) ≠ (${b.p}, ${b.c}).`;});
$$('#matOrder button').forEach(b=>b.onclick=()=>{$$('#matOrder button').forEach(x=>x.setAttribute('aria-pressed',x===b));renderMat(b.dataset.o);});
renderMat('orig');

/* pares */
let pt=[];
function showPairs(i){pt.forEach(clearTimeout);pt=[];const k=K[i],n=k.m.length;$$('#kpick button').forEach((b,j)=>b.classList.toggle('on',j===i));
  const g=$('#pairgrid');g.style.gridTemplateColumns=`36px repeat(${n},auto)`;g.style.setProperty('--kc',k.col);
  let h='<div></div>'+k.m.map(id=>`<div class="h">${id}</div>`).join('');k.m.forEach(a=>{h+=`<div class="h">${a}</div>`;k.m.forEach(b=>h+=`<div class="p${a===b?' diag':''}">(${a}, ${b})</div>`);});
  g.innerHTML=h;$('#pairTxt').textContent=`${k.k} tiene ${n} elementos: ${n} · ${n} = ${n*n} pares, ${n} de ellos lazos (una solicitud consigo misma).`;
  [...g.querySelectorAll('.p')].forEach((el,j)=>pt.push(setTimeout(()=>el.classList.add('lit'),REDUCED?0:120+j*170)));}
K.forEach((k,i)=>{const b=document.createElement('button');b.textContent=k.k;b.style.setProperty('--kc',k.col);b.onclick=()=>showPairs(i);$('#kpick').appendChild(b);});
$('#kbars').innerHTML=K.map(k=>`<div class="kbar"><b style="color:${k.col}">${k.k}</b><div class="tr"><div class="fl" style="background:${k.col}" data-w="${k.m.length**2/9*100}"></div></div><span>${k.m.length}² = <b>${k.m.length**2}</b></span></div>`).join('');
function count(el,to){if(!G_OK||REDUCED){el.textContent=to;return;}const o={n:0};gsap.to(o,{n:to,duration:1.6,ease:'power3.out',onUpdate:()=>el.textContent=Math.round(o.n)});}

/* antisimetría */
$('#antiBtn').onclick=()=>{const c1=$('#ce1'),c2=$('#ce2');[c1,c2].forEach(p=>p.style.strokeDashoffset=260);$('#ceT1').setAttribute('opacity',0);$('#ceT2').setAttribute('opacity',0);$('#stamp').classList.remove('show');$('#antiCell').textContent='?';$('#ctable .anti').classList.remove('hot');
  const f=R.find(([a,b])=>a!==b&&R.some(([x,y])=>x===b&&y===a));console.assert(f&&f[0]==='S1'&&f[1]==='S3','E2 contraejemplo');
  requestAnimationFrame(()=>requestAnimationFrame(()=>{c1.style.strokeDashoffset=0;c2.style.strokeDashoffset=0;$('#ceT1').setAttribute('opacity',1);$('#ceT2').setAttribute('opacity',1);}));
  setTimeout(()=>{$('#stamp').classList.add('show');$('#antiCell').textContent='✗';$('#ctable .anti').classList.add('hot');},REDUCED?0:1700);};

/* conclusión */
function finale(){const f=$('#fin');f.innerHTML='';S.forEach(s=>{const d=document.createElement('div');d.className='dot';d.textContent=s.id;f.appendChild(d);});
  setTimeout(()=>{const dots=[...f.children];flip(dots,()=>{K.forEach((k,i)=>k.m.forEach((id,j)=>{const d=dots.find(x=>x.textContent===id);d.style.background=k.col;d.style.color='#fff';d.style.marginRight=(j===k.m.length-1&&i<3)?'18px':'0';f.appendChild(d);}));},1000);},REDUCED?0:500);}

return{
  datos:s=>{if(G_OK&&!REDUCED)gsap.from(s.querySelectorAll('#allCards .sc'),{opacity:0,y:50,rotation:()=>gsap.utils.random(-6,6),scale:.85,duration:.8,stagger:.07,ease:'expo.out',delay:.2});},
  grafo:()=>setTimeout(()=>$('#graph').classList.add('drawn'),300),
  pares:()=>{showPairs(0);setTimeout(()=>{$$('#kbars .fl').forEach(f=>f.style.width=f.dataset.w+'%');count($('#ktotal'),26);},400);},
  conclusion:()=>finale(),
  all(){this.grafo();this.pares();this.conclusion();}
};
})();

/* ================= Cine: letras, separadores y acercamientos ================= */
function splitChars(h){const walk=n=>{[...n.childNodes].forEach(c=>{if(c.nodeType===3){const fr=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(w=>{if(!w)return;if(/^\s+$/.test(w)){fr.appendChild(document.createTextNode(' '));return;}
  const cw=document.createElement('span');cw.className='lwd';[...w].forEach(ch=>{const s=document.createElement('span');s.className='ltr';s.textContent=ch;cw.appendChild(s);});fr.appendChild(cw);});c.replaceWith(fr);}else if(c.nodeType===1)walk(c);});};walk(h);}
$$('.chars').forEach(splitChars);
function setupCine(){
  if(!ST_OK||REDUCED)return;
  $$('.chars').forEach(h=>{const cs=h.querySelectorAll('.ltr');gsap.set(cs,{yPercent:120,rotateX:-80,opacity:0,transformOrigin:'50% 100%'});
    ScrollTrigger.create({trigger:h,start:'top 85%',once:true,onEnter:()=>gsap.to(cs,{yPercent:0,rotateX:0,opacity:1,duration:1.1,stagger:.022,ease:'expo.out'})});});
  $$('.divider').forEach(d=>{const num=d.querySelector('.num');if(!num)return;
    gsap.fromTo(num,{scale:1.9,opacity:0,filter:'blur(30px)'},{scale:1,opacity:1,filter:'blur(0px)',ease:'none',scrollTrigger:{trigger:d,start:'top 95%',end:'top 15%',scrub:true}});
    gsap.to(num,{scale:.55,opacity:.15,yPercent:-30,ease:'none',scrollTrigger:{trigger:d,start:'bottom 85%',end:'bottom top',scrub:true}});});
  $$('.zoomin').forEach(z=>gsap.fromTo(z,{scale:.84},{scale:1,ease:'none',scrollTrigger:{trigger:z,start:'top bottom',end:'top 45%',scrub:true}}));
  const lg=$('#portada .logo-card');if(lg)gsap.to(lg,{scale:.7,y:-60,opacity:.2,ease:'none',scrollTrigger:{trigger:'#portada',start:'top top',end:'bottom top',scrub:true}});
  const lab=$('#laboratorio .doc-frame')||$('#laboratorio .lab');if(lab)gsap.fromTo(lab,{scale:.86,rotateX:8,transformPerspective:1200},{scale:1,rotateX:0,ease:'none',scrollTrigger:{trigger:'#laboratorio',start:'top bottom',end:'top 30%',scrub:true}});
}
