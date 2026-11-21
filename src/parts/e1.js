
/* ================= Etapa 1 · grafos, dígrafos y árboles ================= */
const E1=(()=>{
const NS='http://www.w3.org/2000/svg';
const mk=(tag,attrs,parent)=>{const e=document.createElementNS(NS,tag);for(const k in attrs)e.setAttribute(k,attrs[k]);if(parent)parent.appendChild(e);return e;};
const tw=t=>14+t.length*7.4;
function node(svg,id,label,x,y,cls){const g=mk('g',{class:'gn '+(cls||''),'data-id':id,transform:`translate(${x},${y})`},svg);const w=/sm/.test(cls||'')?10+label.length*6.3:tw(label);
  mk('rect',{x:-w/2,y:-15,width:w,height:30,rx:15},g);const t=mk('text',{},g);t.textContent=label;g.w=w;return g;}
function edgeEnd(a,b,pa,pb){// recorta la arista al borde de la píldora
  const dx=pb[0]-pa[0],dy=pb[1]-pa[1],L=Math.hypot(dx,dy)||1,ux=dx/L,uy=dy/L;
  const ra=Math.min(a.w/2/Math.abs(ux||1e-9),15/Math.abs(uy||1e-9)),rb=Math.min(b.w/2/Math.abs(ux||1e-9),15/Math.abs(uy||1e-9));
  return [pa[0]+ux*(ra+2),pa[1]+uy*(ra+2),pb[0]-ux*(rb+4),pb[1]-uy*(rb+4)];}

/* ---------- S1 · grafo no dirigido ---------- */
const V1={ini:['Inicio',70,180],pro:['Programa',200,70],u1:['Unidad 1',310,180],u2:['Unidad 2',440,70],u3:['Unidad 3',560,180],foro:['Foro de consultas',150,300],nov:['Novedades',320,300],ent:['Entregas',470,290],bib:['Biblioteca',585,50]};
const E1s=[['ini','pro'],['ini','u1'],['ini','foro'],['ini','nov'],['pro','u1'],['foro','u1'],['nov','u1'],['u1','u2'],['u1','u3'],['u1','ent'],['u2','u3'],['u2','ent'],['u3','ent']];
const adj={};Object.keys(V1).forEach(k=>adj[k]=[]);E1s.forEach(([a,b])=>{adj[a].push(b);adj[b].push(a);});
function bfs(src,skip){const d={[src]:0},prev={},q=[src];while(q.length){const u=q.shift();adj[u].forEach(v=>{if(v===skip||v in d)return;d[v]=d[u]+1;prev[v]=u;q.push(v);});}return{d,prev};}
console.assert(bfs('ini').d.ent===2,'E1 camino Inicio-Entregas');
console.assert(['u2','u3','ent'].every(v=>!(v in bfs('ini','u1').d)),'E1 punto de corte U1');
console.assert(Math.max(...Object.values(bfs('ini').d))<=3,'E1 d(Inicio,v)<=3');
const g1=$('#g1'),gE=mk('g',{},g1),gN=mk('g',{},g1),n1={},e1={};
Object.entries(V1).forEach(([k,[l,x,y]])=>{n1[k]=node(gN,k,l,x,y,k==='bib'?'iso':'');});
E1s.forEach(([a,b])=>{const [x1,y1,x2,y2]=edgeEnd(n1[a],n1[b],V1[a].slice(1),V1[b].slice(1));e1[a+'-'+b]=mk('line',{class:'ge',x1,y1,x2,y2},gE);});
const eOf=(a,b)=>e1[a+'-'+b]||e1[b+'-'+a];
function clear1(){Object.values(n1).forEach(n=>n.setAttribute('class','gn'+(n.dataset.id==='bib'?' iso':'')));Object.values(e1).forEach(e=>e.setAttribute('class','ge'));}
const info=(k,html)=>{$('#g1Info').innerHTML=`<span class="k">${k}</span><p>${html}</p>`;};
Object.values(n1).forEach(n=>n.addEventListener('click',()=>{clear1();cut=false;$('#g1Cut').textContent='Quitar Unidad 1';const id=n.dataset.id;n.classList.add('sel');
  adj[id].forEach(v=>{n1[v].classList.add('nb');eOf(id,v).classList.add('nb');});
  const d=bfs('ini').d[id];
  info(V1[id][0],id==='bib'?'Grado 0: vértice aislado. No hay ningún camino desde Inicio.':`Grado ${adj[id].length}: se conecta con ${adj[id].map(v=>V1[v][0]).join(', ')}. Desde Inicio: ${d} clic${d===1?'':'s'}.`);}));
$('#g1Path').onclick=async()=>{clear1();cut=false;$('#g1Cut').textContent='Quitar Unidad 1';const {prev}=bfs('ini');const p=['ent'];while(p[0]!=='ini')p.unshift(prev[p[0]]);
  info('Camino mínimo',`${p.map(v=>V1[v][0]).join(' → ')}: <b>${p.length-1} clics</b>. Lo encuentra un recorrido en anchura desde Inicio.`);
  for(let i=0;i<p.length;i++){n1[p[i]].classList.add('path');if(i)eOf(p[i-1],p[i]).classList.add('path');await new Promise(r=>setTimeout(r,REDUCED?0:420));}};
let cut=false;
$('#g1Cut').onclick=()=>{clear1();cut=!cut;$('#g1Cut').textContent=cut?'Restaurar Unidad 1':'Quitar Unidad 1';if(!cut){info('Tocá una sección','Cada sección es un vértice y cada enlace entre secciones es una arista.');return;}
  n1.u1.classList.add('cut');adj.u1.forEach(v=>eOf('u1',v).classList.add('gone'));const {d}=bfs('ini','u1');
  const lost=Object.keys(V1).filter(v=>v!=='u1'&&v!=='bib'&&!(v in d));lost.forEach(v=>n1[v].classList.add('lost'));
  info('Punto crítico',`Sin Unidad 1 quedan desconectadas ${lost.map(v=>V1[v][0]).join(', ')}. Unidad 1 es un vértice de corte.`);};

/* ---------- S2 · dígrafo ---------- */
const V2={M1:[60,60],M2:[60,230],M3:[190,60],M4:[190,150],M5:[330,60],M6:[330,230],M7:[470,150],M8:[590,150]};
let E2s=[['M1','M3'],['M1','M4'],['M2','M4'],['M3','M5'],['M4','M5'],['M4','M6'],['M5','M7'],['M6','M7'],['M7','M8'],['M6','M2']];
const g2=$('#g2');mk('defs',{},g2).innerHTML='<marker id="g2a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" fill="currentColor"/></marker>';
const colX=[60,190,330,470,590];const gC=mk('g',{},g2);
colX.forEach((x,i)=>{mk('rect',{class:'col',x:x-48,y:22,width:96,height:236,rx:16},gC);const t=mk('text',{class:'lvl',x,y:282},gC);t.textContent='Etapa '+(i+1);});
const g2E=mk('g',{},g2),g2N=mk('g',{},g2),n2={},e2={};
Object.entries(V2).forEach(([k,[x,y]])=>n2[k]=node(g2N,k,k,x,y));
E2s.forEach(([a,b])=>{const [x1,y1,x2,y2]=edgeEnd(n2[a],n2[b],V2[a],V2[b]);let d;
  if(a==='M6'&&b==='M2'){d=`M${x1} ${y1+6} Q195 290 ${x2+6} ${y2+12}`;}else d=`M${x1} ${y1} L${x2} ${y2}`;
  const p=mk('path',{class:'ge',d,'marker-end':'url(#g2a)'},g2E);p.style.color='var(--muted)';e2[a+'>'+b]=p;});
function findCycle(edges){const out={};Object.keys(V2).forEach(k=>out[k]=[]);edges.forEach(([a,b])=>out[a].push(b));const st={},stack=[];let cyc=null;
  const dfs=u=>{st[u]=1;stack.push(u);for(const v of out[u]){if(cyc)return;if(st[v]===1){cyc=stack.slice(stack.indexOf(v)).concat(v);return;}if(!st[v])dfs(v);}st[u]=2;stack.pop();};
  Object.keys(V2).forEach(k=>{if(!st[k]&&!cyc)dfs(k);});
  if(cyc&&cyc.includes('M2')){const b=cyc.slice(0,-1),i=b.indexOf('M2');cyc=b.slice(i).concat(b.slice(0,i),'M2');}return cyc;}
function levels(edges){const inn={};Object.keys(V2).forEach(k=>inn[k]=[]);edges.forEach(([a,b])=>inn[b].push(a));const L={};const lv=k=>L[k]??(L[k]=inn[k].length?1+Math.max(...inn[k].map(lv)):1);Object.keys(V2).forEach(lv);return L;}
console.assert(findCycle(E2s).join('>')==='M2>M4>M6>M2','E1 ciclo');
$('#g2Cycle').onclick=()=>{const c=findCycle(E2s);if(!c)return;for(let i=0;i<c.length-1;i++){const e=e2[c[i]+'>'+c[i+1]];e.classList.add('cyc');e.style.color='var(--err)';}
  ['M2','M4','M6'].forEach(k=>n2[k].classList.add('cut'));
  $('#g2Info').innerHTML=`<span class="k">Ciclo encontrado</span><p><b>${c.join(' → ')}</b>. Ningún módulo del ciclo puede empezar: el trayecto queda bloqueado.</p>`;
  $('#g2Fix').disabled=false;$('#g2Cycle').disabled=true;};
$('#g2Fix').onclick=()=>{E2s=E2s.filter(([a,b])=>!(a==='M6'&&b==='M2'));e2['M6>M2'].classList.add('del');Object.values(e2).forEach(e=>{e.classList.remove('cyc');e.style.color='var(--muted)';});
  Object.values(n2).forEach(n=>n.classList.remove('cut'));console.assert(!findCycle(E2s),'E1 sin ciclo');
  $('#g2Info').innerHTML='<span class="k">Solución</span><p>Sin la arista M6 → M2 no quedan ciclos: es un dígrafo acíclico y el trayecto se puede ordenar.</p>';$('#g2Fix').disabled=true;$('#g2Lv').disabled=false;};
$('#g2Lv').onclick=async()=>{const L=levels(E2s);const by=[1,2,3,4,5].map(i=>Object.keys(L).filter(k=>L[k]===i));
  console.assert(by.map(a=>a.join(',')).join('|')==='M1,M2|M3,M4|M5,M6|M7|M8','E1 etapas');
  g2.classList.add('leveled');$('#g2Levels').innerHTML='';
  for(let i=0;i<5;i++){by[i].forEach(k=>n2[k].classList.add('path'));const s=document.createElement('span');s.textContent=`Etapa ${i+1}: {${by[i].join(', ')}}`;$('#g2Levels').appendChild(s);
    if(G_OK&&!REDUCED)gsap.from(s,{opacity:0,y:10,duration:.4});await new Promise(r=>setTimeout(r,REDUCED?0:450));}
  $('#g2Info').innerHTML='<span class="k">Orden en 5 etapas</span><p>Cada módulo va una etapa después del último de sus prerrequisitos.</p>';$('#g2Lv').disabled=true;};

/* ---------- S3 · árbol con raíz ---------- */
const g3=$('#g3'),g3E=mk('g',{},g3),g3N=mk('g',{},g3);
const T={id:'mat',l:'Materia',c:[1,2,3].map(u=>({id:'u'+u,l:'Unidad '+u,c:['Clases','Actividades','Recursos'].map(f=>({id:`u${u}${f}`,l:f,c:[{id:`u${u}${f}a`,l:'Archivos',c:[]}]}))}))};
const P3={},n3={};const leafX=[];
(function lay(){const ux=[110,330,550],fx=[-70,0,72];P3.mat=[330,24];
  T.c.forEach((u,i)=>{P3[u.id]=[ux[i],100];u.c.forEach((f,j)=>{P3[f.id]=[ux[i]+fx[j],178];f.c.forEach(a=>P3[a.id]=[ux[i]+fx[j],256]);});});})();
const walk=(t,fn,par)=>{fn(t,par);t.c.forEach(c=>walk(c,fn,t));};
walk(T,(t,p)=>{if(p){const [x1,y1]=P3[p.id],[x2,y2]=P3[t.id],my=(y1+y2)/2;mk('path',{class:'ge',d:`M${x1} ${y1+15} V${my} H${x2} V${y2-15}`},g3E);}});
walk(T,t=>{const [x,y]=P3[t.id];n3[t.id]=node(g3N,t.id,t.l,x,y,'sm');});
const pre=[];walk(T,(t,p)=>pre.push(t));
console.assert(pre.length===1+3+9+9,'E1 nodos del árbol');
let preT=[];
$('#g3Pre').onclick=()=>{preT.forEach(clearTimeout);preT=[];Object.values(n3).forEach(n=>n.classList.remove('lit','done'));const names=[];
  pre.forEach((t,i)=>preT.push(setTimeout(()=>{if(i)n3[pre[i-1].id].classList.replace('lit','done');n3[t.id].classList.add('lit');
    if(t.l!=='Archivos')names.push(t.l);$('#g3Trail').innerHTML='<b>Preorden:</b> '+names.slice(-6).join(' → ')+(i===pre.length-1?' · índice completo.':' …');},REDUCED?0:i*230)));};
let shared=false,extra=[];
$('#g3Share').onclick=()=>{if(shared){extra.forEach(e=>e.remove());extra=[];shared=false;$('#g3Share').textContent='Compartir «Cómo citar fuentes»';$('#g3Trail').textContent='Volvió a ser un árbol: cada nodo tiene un solo padre.';return;}
  shared=true;$('#g3Share').textContent='Quitar el archivo compartido';
  const [x,y]=[330,292];const nn=node(g3N,'cita','Cómo citar fuentes',x,y,'cut sm');extra.push(nn);
  [['u1Recursos'],['u2Recursos'],['u3Recursos']].forEach(([p],i)=>{const [px,py]=P3[p];extra.push(mk('path',{class:'ge extra',d:`M${px} ${py+15} Q${(px+x)/2} ${y-30} ${x+(i-1)*40} ${y-15}`},g3E));});
  $('#g3Trail').innerHTML='<b>Ya no es un árbol:</b> el archivo tendría tres padres. En un árbol cada nodo tiene un único padre, así que hay que duplicarlo en cada carpeta.';};

/* ---------- S4 · miniaturas de las tres capas ---------- */
(function minis(){const draw=(svg,nodes,edges,arrow)=>{if(arrow)mk('defs',{},svg).innerHTML='<marker id="ma'+svg.id+'" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 10 5 0 10z" fill="#F5F5F7"/></marker>';
  edges.forEach(([a,b])=>{const [x1,y1]=nodes[a],[x2,y2]=nodes[b];const dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy);mk('line',{x1:x1+dx/L*11,y1:y1+dy/L*11,x2:x2-dx/L*13,y2:y2-dy/L*13,stroke:'rgba(245,245,247,.6)','stroke-width':1.4,...(arrow?{'marker-end':`url(#ma${svg.id})`}:{})},svg);});
  Object.entries(nodes).forEach(([k,[x,y]])=>{mk('circle',{cx:x,cy:y,r:10,fill:'rgba(0,0,0,.5)',stroke:'currentColor','stroke-width':1.5},svg);const t=mk('text',{x,y},svg);t.textContent=k;});};
  const s2=$('#mini2');s2.style.color='#BF5AF2';draw(s2,{M1:[20,25],M2:[20,65],M3:[65,25],M4:[65,55],M5:[110,25],M6:[110,70],M7:[155,48],M8:[200,48]},[['M1','M3'],['M1','M4'],['M2','M4'],['M3','M5'],['M4','M5'],['M4','M6'],['M5','M7'],['M6','M7'],['M7','M8']],true);
  const s3=$('#mini3');s3.style.color='#FF9F0A';draw(s3,{M:[110,14],U1:[45,45],U2:[110,45],U3:[175,45],a:[25,78],b:[65,78],c:[95,78],d:[125,78],e:[160,78],f:[195,78]},[['M','U1'],['M','U2'],['M','U3'],['U1','a'],['U1','b'],['U2','c'],['U2','d'],['U3','e'],['U3','f']]);
  const s1=$('#mini1');s1.style.color='#2997FF';draw(s1,{In:[20,45],Pr:[65,15],U1:[100,45],U2:[150,15],U3:[195,45],Fo:[55,78],No:[105,80],En:[160,78]},E1s.filter(([a,b])=>a!=='bib'&&b!=='bib').map(([a,b])=>[{ini:'In',pro:'Pr',u1:'U1',u2:'U2',u3:'U3',foro:'Fo',nov:'No',ent:'En'}[a],{ini:'In',pro:'Pr',u1:'U1',u2:'U2',u3:'U3',foro:'Fo',nov:'No',ent:'En'}[b]]));})();
const LZ=[105,0,-105];
$$('#stack3 .layer').forEach((l,i)=>{l.style.transform=`rotateX(56deg) rotateZ(-24deg) translateZ(${LZ[i]}px)`;});
function stackIn(){if(!G_OK||REDUCED)return;const ls=$$('#stack3 .layer');
  gsap.fromTo(ls,{rotateX:0,rotateZ:0,z:0,scale:.7,opacity:0},{rotateX:56,rotateZ:-24,z:i=>LZ[i],scale:1,opacity:1,duration:1.6,stagger:.18,ease:'expo.out',delay:.2});}

/* ---------- S5 · equivalencia y orden ---------- */
const act=[false,false,false,false];
['A1','A2','A3','A4'].forEach((a,i)=>{const b=document.createElement('button');b.textContent=a;b.setAttribute('aria-pressed','false');b.onclick=()=>{act[i]=!act[i];b.setAttribute('aria-pressed',act[i]);upA();};$('#acts').appendChild(b);});
for(let i=0;i<16;i++){const s=document.createElement('span');s.textContent=i.toString(2).padStart(4,'0');$('#q16').appendChild(s);}
function upA(){const code=act.map(x=>x?1:0).join('');$$('#q16 span').forEach(s=>s.classList.toggle('on',s.textContent===code));
  const done=act.map((x,i)=>x?'A'+(i+1):null).filter(Boolean);
  $('#actTxt').innerHTML=`Clase <b class="m">[${code}]</b>: ${done.length?'completaron '+done.join(', '):'no completaron ninguna'}${done.length<4&&done.length?' y nada más':''}. Los 120 estudiantes quedan en, como mucho, <b>2⁴ = 16 clases</b>.`;}
upA();
const H={Visitante:[150,200],Estudiante:[150,135],Ayudante:[75,45],Editor:[225,45]};
const cover=[['Visitante','Estudiante'],['Estudiante','Ayudante'],['Estudiante','Editor']];
const leq=(a,b)=>a===b||b!=='Visitante'&&(a==='Visitante'||a==='Estudiante'&&b!=='Estudiante');
console.assert(!leq('Ayudante','Editor')&&!leq('Editor','Ayudante')&&leq('Visitante','Editor'),'E1 orden de roles');
const hs=$('#hasse'),hl={};
cover.forEach(([a,b])=>{hl[a+b]=mk('line',{x1:H[a][0],y1:H[a][1]-15,x2:H[b][0],y2:H[b][1]+15},hs);});
const hn={};Object.entries(H).forEach(([k,[x,y]])=>{const g=mk('g',{class:'hn',transform:`translate(${x},${y})`},hs);const w=tw(k);mk('rect',{x:-w/2,y:-15,width:w,height:30,rx:15},g);mk('text',{},g).textContent=k;hn[k]=g;g.onclick=()=>pickRole(k);});
let pick=[];
function pickRole(k){if(pick.length===2)pick=[];pick.push(k);Object.values(hn).forEach(g=>g.setAttribute('class','hn'));Object.values(hl).forEach(l=>l.classList.remove('on'));
  hn[pick[0]].classList.add('a');if(pick[1])hn[pick[1]].classList.add('b');
  if(pick.length<2){$('#roleBig').textContent=pick[0];$('#roleWhy').innerHTML='<div>Elegí otro rol.</div>';$('#roleTxt').className='vrd';return;}
  const [a,b]=pick;let big,why,ok=true;
  if(a===b){big=`${a} ≤ ${a}`;why='Reflexiva: todo rol tiene sus propios permisos.';}
  else if(leq(a,b)){big=`${a} ≤ ${b}`;why=`${b} tiene todos los permisos de ${a}.`;}
  else if(leq(b,a)){big=`${b} ≤ ${a}`;why=`${a} tiene todos los permisos de ${b}.`;}
  else{big='No comparables';why=`Cada uno tiene permisos que el otro no tiene. Por eso es un orden <b>parcial</b>.`;ok=false;}
  const lo=leq(a,b)?a:b,hi=leq(a,b)?b:a;if(ok&&a!==b){cover.forEach(([x,y])=>{if(leq(lo,x)&&leq(y,hi))hl[x+y].classList.add('on');});}
  $('#roleBig').textContent=big;$('#roleWhy').innerHTML=`<div>${why}</div>`;$('#roleTxt').className='vrd '+(ok?'ok':'no');}
return{s1:()=>{},s4:stackIn,s5:()=>{setTimeout(()=>{pickRole('Ayudante');pickRole('Editor');},900);}};
})();
