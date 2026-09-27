const levels = {
  wifi: {n:1, icon:'📶', title:'De wifi is weg', subtitle:'Melding van Yasmin', mission:'Yasmin ziet helemaal geen internet. De router heeft lampjes, maar haar laptop staat op “Vliegtuigstand”. Wat doe je eerst?', hint:'Kijk eerst naar de eenvoudigste oorzaak op de werkplek.', choices:[['De router vervangen','router'],['Vliegtuigstand uitschakelen en opnieuw met het schoolnetwerk verbinden','good'],['Een nieuwe netwerkkabel bestellen','cable']], digit:'7', next:'printer.html'},
  printer: {n:2, icon:'🖨️', title:'De printer zwijgt', subtitle:'Melding van Sam', mission:'Sam heeft drie keer op Print gedrukt. Nu staat er een wachtrij met foutmeldingen. Welke rustige helpdeskstap past het beste?', hint:'Voorkom dat de opdracht nog vijf keer wordt verstuurd.', choices:[['De wachtrij openen, foute opdrachten verwijderen en de juiste printer kiezen','good'],['Alle kabels uit de pc trekken','cables'],['De printer uit het raam zetten','window']], digit:'2', next:'account.html'},
  account: {n:3, icon:'🔐', title:'Account geblokkeerd', subtitle:'Melding van Milan', mission:'Milan kan niet inloggen na te veel verkeerde pogingen. Zijn wachtwoord mag je niet vragen of opschrijven. Wat doe je?', hint:'Veilig werken betekent: identiteit controleren en volgens de procedure handelen.', choices:[['Zijn wachtwoord op een briefje vragen','note'],['Zijn identiteit controleren en het account volgens de procedure laten/resetten','good'],['Inloggen met jouw eigen account','mine']], digit:'9', next:'update.html'},
  update: {n:4, icon:'🔄', title:'Update op 99%', subtitle:'Melding van Noor', mission:'De computer meldt dat een update klaarstaat en opnieuw opstarten nodig is. Noor wil direct verder. Wat doe je?', hint:'Een update afmaken is vaak veiliger dan hem steeds uitstellen.', choices:[['De pc tijdens de update hard uitzetten','off'],['Werk opslaan, uitleggen wat er gebeurt en de pc gecontroleerd opnieuw opstarten','good'],['Het updatescherm wegklikken','close']], digit:'4', next:'snelheid.html'},
  speed: {n:5, icon:'⚡', title:'De pc is slaktraag', subtitle:'Melding van Ilyas', mission:'De pc start langzaam op. Er openen meteen veel programma’s die niet nodig zijn. Waar onderzoek je dit netjes?', hint:'Meet en kijk eerst: Taakbeheer vertelt welke programma’s veel gebruiken.', choices:[['In Taakbeheer kijken en onnodige opstart-apps uitschakelen','good'],['Willekeurige systeembestanden verwijderen','delete'],['De monitor harder zetten','monitor']], digit:'6', next:'finale.html'}
};

function nav(n) {
  return `<div class="progress">${[1,2,3,4,5].map(x=>`<i class="${x<n?'done':x===n?'current':''}"></i>`).join('')}</div>`;
}
function shell(content,n=0) {
  document.body.innerHTML=`<main class="shell"><header class="topbar"><div class="brand">ICT <span>ESCAPE ROOM</span></div>${n?nav(n):'<div class="badge">NIVEAU 2 · ICT SUPPORT</div>'}<div class="badge">${n?`STAP ${n}/5`:'MISSIE START'}</div></header>${content}<footer class="footer"><span>Werk rustig • denk logisch • help professioneel</span><span>© ICT-klas</span></footer></main>`;
}
function stage(key) {
  const x=levels[key];
  shell(`<section class="game"><article class="card"><p class="eyebrow">${x.subtitle}</p><h1>${x.title}</h1><p class="mission">${x.mission}</p><div class="choices">${x.choices.map(([t,v])=>`<button data-answer="${v}">${t}</button>`).join('')}</div><div id="result" class="result" aria-live="polite"></div></article><aside class="card screen"><div><div class="icon">${x.icon}</div><h2>Werkplek in gevaar</h2><small>Los het probleem op. Een goede helpdeskmedewerker blijft vriendelijk, veilig en zorgvuldig.</small></div><div class="hint">💡 <strong>Hint:</strong> ${x.hint}</div></aside></section>`,x.n);
  document.querySelector('.card').insertAdjacentHTML('beforeend', `<div class="hint inline-hint">💡 <strong>Hint:</strong> ${x.hint}</div>`);
  document.querySelectorAll('[data-answer]').forEach(b=>b.addEventListener('click',()=>{
    const result=document.querySelector('#result');
    if(b.dataset.answer==='good') {
      localStorage.setItem('escape-'+key,x.digit);
      result.className='result good';
     result.innerHTML=`Goed opgelost! Onthoud je beloning goed.<br><a class="button primary" href="${x.next}">Verder naar de volgende melding →</a>`;
    } else { result.className='result bad'; result.textContent='Nog niet. Denk aan een veilige, logische eerste stap die een helpdeskmedewerker echt zou nemen.'; }
  }));
}
function intro() {
  shell(`<section class="game"><article class="card"><p class="eyebrow">Noodmelding · 08:45 uur</p><h1>Red de ICT-werkplek!</h1><p class="copy">Vijf collega’s hebben een probleem. Jij bent vandaag de ICT-supportmedewerker. Los iedere melding professioneel op en verzamel de vijf cijfers van de uitgangscode.</p><div class="mission"><strong>Jouw doel:</strong> kies steeds de beste eerste stap. Gebruik je hoofd, blijf rustig en denk aan veiligheid.</div><a class="button primary" href="wifi.html">Start de eerste melding →</a></article><aside class="card screen"><div><div class="icon">🚨</div><h2>Servicedesk alarm</h2><small>De les begint over twintig minuten. Zonder jouw hulp loopt alles vast.</small></div><div class="console"><p>&gt; 5 meldingen ontvangen</p><p>&gt; 5 cijfers nodig</p><p>&gt; status: WACHT OP JOU</p></div></aside></section>`);
}
function final() {
  const found=['wifi','printer','account','update','speed'].map(k=>localStorage.getItem('escape-'+k)||'?');
  shell(`<section class="game"><article class="card"><p class="eyebrow">Laatste deur</p><h1>Voer de uitgangscode in</h1><p class="copy">Je hebt alle meldingen opgelost. Zet de vijf verzamelde cijfers in de juiste volgorde.</p><div class="mission">Jouw verzamelde cijfers: <strong>${found.join(' · ')}</strong></div><div class="final-input">${[0,1,2,3,4].map(i=>`<input maxlength="1" inputmode="numeric" aria-label="cijfer ${i+1}">`).join('')}</div><button id="open" class="primary">Open de deur</button><div id="result" class="result" aria-live="polite"></div></article><aside class="card screen"><div><div class="icon">🚪</div><h2>Uitgang geblokkeerd</h2><small>De deur opent alleen voor een supportmedewerker die alle meldingen veilig heeft afgehandeld.</small></div><div class="hint">Tip: je mag terug naar eerdere meldingen als je een cijfer mist.</div></aside></section>`);
  const fields=[...document.querySelectorAll('input')];
  fields.forEach((f,i)=>f.addEventListener('input',()=>{if(f.value&&fields[i+1])fields[i+1].focus();}));
  document.querySelector('#open').addEventListener('click',()=>{
    const val=fields.map(f=>f.value).join(''), r=document.querySelector('#result');
    if(val==='72946') { r.className='result good'; r.innerHTML='🎉 <strong>De deur gaat open!</strong> Jij hebt de werkplek gered. Laat deze pagina aan je docent zien.'; }
    else { r.className='result bad'; r.textContent='Die code klopt nog niet. Controleer je verzamelde cijfers en probeer opnieuw.'; }
  });
}
const page=document.body.dataset.page;
if(page==='intro') intro(); else if(page==='final') final(); else stage(page);
