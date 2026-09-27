/* Irish phrase rules adapted from Gramadán (MIT), © Foras na Gaeilge. */
(function(root){
'use strict';
const D=root.IRISH_DATA;
const persons={Sg1:'I · mé',Sg2:'you (singular) · tú',Sg3Masc:'he · sé',Sg3Fem:'she · sí',Pl1:'we · muid',Pl2:'you (plural) · sibh',Pl3:'they · siad',Auto:'autonomous · unspecified subject'};
const tenses={PresCont:'Present / habitual present',Pres:'Present state (bí)',Past:'Past',PastCont:'Habitual past',Fut:'Future',Cond:'Conditional',Imper:'Imperative',Subj:'Present subjunctive',PastSubj:'Past subjunctive / hypothetical',ProgPres:'Present progressive',ProgPast:'Past progressive',ProgFut:'Future progressive',ProgCond:'Conditional progressive',ProgHabit:'Habitual past progressive',PerfPres:'Present perfect',PerfPast:'Past perfect',PerfFut:'Future perfect',PerfCond:'Conditional perfect',VN:'Verbal noun',VA:'Verbal adjective'};
const shapes={pos:'Statement / affirmative',neg:'Negative',q:'Question',nq:'Negative question'};
const pron={Sg1:'mé',Sg2:'tú',Sg3Masc:'sé',Sg3Fem:'sí',Pl1:'muid',Pl2:'sibh',Pl3:'siad',Auto:''};
const enPron={Sg1:'I',Sg2:'you',Sg3Masc:'he',Sg3Fem:'she',Pl1:'we',Pl2:'you',Pl3:'they',Auto:'someone'};
function mutate(s,m){
 if(m==='Len1'||m==='Len1D'){
  s=s.replace(/^([pbmftdcg])(?!j)/i,'$1h').replace(/^(s)(?=[rnlaeiouáéíóú])/i,'$1h');
  if(m==='Len1D'&&/^[aeiouáéíóúf]/i.test(s))s="d'"+s;
 }else if(m==='Ecl1'||m==='Ecl1x'){
  const map={p:'b',b:'m',f:'bh',c:'g',g:'n',t:'d',d:'n'};
  if(map[s[0]])s=map[s[0]]+s;
  else if(m==='Ecl1'&&/^[aeiouáéíóú]/.test(s))s='n-'+s;
 }else if(m==='PrefH'&&/^[aeiouáéíóú]/i.test(s))s='h'+s;
 return s;
}
const unique=a=>[...new Set(a)];
function finite(v,t,p,shape){
 const sh=shape==='q'||shape==='nq'?'rog':'dec',pol=shape==='neg'||shape==='nq'?'neg':'pos';
 const rs=D.rules[[t,p,sh,pol].join('|')]||[];
 return unique(rs.flatMap(rule=>{
  let [part,mut,vt,dep,per,pr]=rule;const l=v.lemma;
  if(l==='bí'&&t==='Past') {mut=pol==='pos'&&sh==='dec'?'Len1':'None';part=sh==='dec'?(pol==='pos'?'':'ní'):(pol==='pos'?'an':'nach');}
  if(l==='abair'){mut=sh==='dec'?'None':pol==='pos'?'Ecl1x':'Ecl1';part=sh==='dec'?(pol==='pos'?'':'ní'):(pol==='pos'?'an':'nach');}
  if(['déan','feic','téigh'].includes(l)&&t==='Past'){
   if(sh==='dec'&&pol==='neg'){part='ní';mut='Len1';}
   if(sh==='rog'){part=pol==='pos'?'an':'nach';mut=pol==='pos'?'Ecl1x':'Ecl1';}
   if(['feic','téigh'].includes(l)&&sh==='dec'&&pol==='pos')mut='Len1';
  }
  if(l==='faigh'){
   if(t==='Past'||t==='Fut'){
    if(sh==='dec'&&pol==='pos')mut=t==='Past'?'None':'Len1';
    else{part=sh==='dec'?'ní':pol==='pos'?'an':'nach';mut=sh==='rog'&&pol==='pos'?'Ecl1x':'Ecl1';}
   }
   if(t==='Cond'&&sh==='dec'&&pol==='neg')mut='Ecl1';
  }
  if(['tar','clois'].includes(l)&&t==='Past'&&p==='Auto')mut='Len1';
  return (v.forms[[vt,dep,per].join('|')]||[]).map(f=>{
   let s=[part,mutate(f,mut),pr].filter(Boolean).join(' ');
   if(l==='bí'&&t==='Pres'&&sh==='dec'&&pol==='neg')s=s.replace(/^ní fhuil/,'níl');
   return s;
  });
 }));
}
function mood(v,t,p,shape){
 if(shape==='q'||shape==='nq')return [];
 const neg=shape==='neg';const per=p.startsWith('Sg3')?'Sg3':p;
 let synth=v.forms[t+'|'+per]||[];
 let all=synth.map(s=>[s,'']);
 if(!synth.length||p==='Pl1'||(t==='Imper'&&p==='Pl3'))all.push(...(v.forms[t+'|Base']||[]).map(s=>[s,pron[p]]));
 return unique(all.map(([s,pr])=>{
  let part='',mut='None';
  if(t==='Imper'&&neg){part='ná';mut='PrefH';}
  if(t==='Subj'){part=neg?(v.lemma==='bí'?'ná':'nár'):'go';mut=neg?(v.lemma==='abair'?'None':'Len1'):'Ecl1';}
  return [part,mutate(s,mut),pr].filter(Boolean).join(' ');
 }));
}
function forms(v,t,p,shape){
 if(t==='VN'||t==='VA')return shape==='pos'&&p==='Sg1'?(t==='VN'?v.vn:v.va):[];
 if(t==='Imper'||t==='Subj')return mood(v,t,p,shape);
 if(t==='PastSubj'){
  if(shape==='q'||shape==='nq')return [];
  // A hypothetical dá/mura clause uses dependent habitual-past forms with eclipsis.
  const source=v.lemma==='bí'?'Cond':'PastCont';
  const rs=D.rules[[source,p,'rog','pos'].join('|')]||[];
  return unique(rs.flatMap(r=>(v.forms[[source,'Dep',r[4]].join('|')]||[]).map(f=>[(shape==='neg'?'mura':'dá'),mutate(f,'Ecl1'),r[5]].filter(Boolean).join(' '))));
 }
 if(t.startsWith('Prog')||t.startsWith('Perf')){
  if(t.startsWith('Prog')&&v.lemma==='bí')return [];
  const aux={Pres:'Pres',Past:'Past',Fut:'Fut',Cond:'Cond',Habit:'PastCont'}[t.slice(4)];
  return finite(D.verbs.find(v=>v.lemma==='bí'),aux,p,shape).flatMap(a=>v.vn.map(n=>a+(t.startsWith('Prog')?' ag ':' tar éis ')+(v.lemma==='bí'?'a ':'')+n));
 }
 return finite(v,t,p,shape);
}
function third(v){return ({be:'is',go:'goes',do:'does',have:'has'})[v]||(/[^aeiou]y$/.test(v)?v.slice(0,-1)+'ies':/(s|sh|ch|x|z|o)$/.test(v)?v+'es':v+'s');}
function english(v,t,p,shape){
 if(t==='VN')return 'Verbal noun of “'+v.en+'”';if(t==='VA')return 'Verbal adjective of “'+v.en+'”';
 let subject=enPron[p],s=subject,neg=shape==='neg'||shape==='nq',q=shape==='q'||shape==='nq',is3=['Sg3Masc','Sg3Fem','Auto'].includes(p),tail=v.enTail;
 let aux='',rest='',simple='';
 const be=p==='Sg1'?'am':is3?'is':'are',was=(p==='Sg1'||is3)?'was':'were';
 if(t==='Imper'){const act=(neg?'not ':'')+v.en+' '+tail;return (p==='Sg2'||p==='Pl2'?(neg?'Do not ':'')+v.en+' '+tail:'Let '+({Sg1:'me',Sg3Masc:'him',Sg3Fem:'her',Pl1:'us',Pl3:'them',Auto:'someone'}[p])+' '+act)+'.';}
 if(t==='Subj')return 'May '+subject+(neg?' not':'')+' '+v.en+' '+tail+'.';
 if(t==='PastSubj')return 'If '+subject+' were '+(neg?'not ':'')+'to '+v.en+' '+tail+', that would be good.';
 if(t.startsWith('Prog')){
  const suffix=t.slice(4);aux=({Pres:be,Past:was,Fut:'will',Cond:'would',Habit:neg||q?'did':'used'})[suffix];
  rest=(suffix==='Fut'||suffix==='Cond'?'be ':suffix==='Habit'?(neg||q?'use to be ':'to be '):'')+v.ing;
 }else if(t.startsWith('Perf')){const suffix=t.slice(4);aux=({Pres:is3?'has':'have',Past:'had',Fut:'will',Cond:'would'})[suffix];rest=(suffix==='Fut'||suffix==='Cond'?'have ':'')+v.pp;}
 else if(t==='Fut'||t==='Cond'){aux=t==='Fut'?'will':'would';rest=v.en;}
 else if(t==='PastCont'){aux=neg||q?'did':'used';rest=(neg||q?'use to ':'to ')+v.en;}
 else if(v.en==='be'){aux=t==='Past'?was:be;rest='';if(t==='PresCont')rest='usually';}
 else{aux=t==='Past'?'did':is3?'does':'do';rest=v.en;simple=t==='Past'?v.past:is3?third(v.en):v.en;}
 if(simple&&!neg&&!q)s+=' '+simple;
 else if(q)s=aux+' '+subject+(neg?' not':'')+(rest?' '+rest:'');
 else s+=' '+aux+(neg?' not':'')+(rest?' '+rest:'');
 s+=' '+tail;return s[0].toUpperCase()+s.slice(1)+(q?'?':'.');
}
function example(v,t,p,shape,answer){
 if(t==='VN')return '[Tá mé] [tar éis '+(v.lemma==='bí'?'a ':'')+answer+'] ['+v.vnTail+'].';
 if(t==='VA')return '[Tá] [an focal “'+answer+'”] [sa téacs].';
 let tail=(t.startsWith('Prog')||t.startsWith('Perf'))?v.vnTail:v.tail;
 return '['+answer+'] ['+tail+']'+(t==='PastSubj'?', [bheadh sé go maith].':shape==='q'||shape==='nq'?'?':'.');
}
function normalize(s,loose=false){s=s.normalize('NFC').toLowerCase().trim().replace(/[’‘`]/g,"'").replace(/[.!?]+$/,'').replace(/\s+/g,' ').replace(/\s*'\s*/g,"'");return loose?s.normalize('NFD').replace(/\p{M}/gu,''):s;}
function check(input,answers,strict=true){if(answers.some(a=>normalize(input)===normalize(a)))return 'correct';if(answers.some(a=>normalize(input,true)===normalize(a,true)))return strict?'accent':'correct-accent';return 'incorrect';}
root.Irish={persons,tenses,shapes,forms,finite,mutate,english,example,normalize,check};
})(globalThis);
