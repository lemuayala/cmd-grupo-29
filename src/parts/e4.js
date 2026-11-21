/* ================= Etapa 4 · clausura del subgrupo ================= */
const E4=(()=>{
const box=$('#cwList');if(!box)return{};
const words=[...Array(16)].map((_,x)=>encode(bits4(x)));
const txt=document.createElement('p');txt.className='cwtxt r';box.after(txt);
const fmt=c=>c.slice(0,4).join('')+' '+c.slice(4).join('');
let sel=[];
function show(){const sp=[...box.children];sp.forEach(s=>s.classList.remove('ca','cb','cs'));
  if(!sel.length){txt.innerHTML='Tocá dos palabras válidas: su suma ⊕ también está en C.';return;}
  sp[sel[0]].classList.add('ca');if(sel.length<2){txt.innerHTML='Elegí otra palabra.';return;}
  sp[sel[1]].classList.add('cb');const s=words[sel[0]].map((b,i)=>b^words[sel[1]][i]);
  const k=words.findIndex(w=>w.join('')===s.join(''));if(k>=0)sp[k].classList.add('cs');
  txt.innerHTML=`<span class="m">${fmt(words[sel[0]])} ⊕ ${fmt(words[sel[1]])} = ${fmt(s)}</span> ${k>=0?'<b style="color:var(--ok)">∈ C</b>: es cerrado por ⊕.':'∉ C'}`;}
box.addEventListener('click',e=>{const t=e.target.closest('#cwList > span');if(!t)return;const i=[...box.children].indexOf(t);sel=sel.length>=2?[i]:sel.includes(i)?sel:[...sel,i];show();});
show();
console.assert(words.every(a=>words.every(b=>words.some(w=>w.every((x,i)=>x===(a[i]^b[i]))))),'E4 clausura');
return{};
})();
