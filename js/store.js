/* ============================================================
   Persistent state (centralised — import/export backups use this shape)
============================================================ */
const STORE='ma119_v2';
const OLD_STORE='ma119_ch1_v1';
function newStore(){
  return {
    onboarded:false, goal:'learn', level:'grade10', theme:'dark',
    ch:1,        // current chapter in the Learn rail (1 or 2)
    sec:0, step:0, secDone:[false,false,false,false,false,false,false,false,false,false,false,false],
    hw:{},       // id: {tries, finished, firstTry}
    attempts:[], // {setId,date,ans,score,byTopic,n,timeSec,qt}
    learn:{},    // 's{sec}_{step}' -> 1 first-try ok | 0  (global lesson index)
    hwsec:{},    // '2.1' -> [firstTryOkCount, totalProblems]
    missed:[],   // {k,type,a,b}  type: 'quiz'|'learn'|'hw'
    cards:{known:{}}, // word flashcards: term -> times marked known
  };
}
function loadStore(){
  try{
    let d=JSON.parse(localStorage.getItem(STORE));
    if(!d){
      // one-time migration from the Chapter-1-only key
      const o=localStorage.getItem(OLD_STORE);
      if(o)d=JSON.parse(o);
    }
    return d||{};
  }catch(e){ return {}; }
}
function saveStore(){ try{ localStorage.setItem(STORE,JSON.stringify(S)); }catch(e){} }
const _raw=loadStore();
if(!('theme' in _raw)&&typeof matchMedia==='function'&&matchMedia('(prefers-color-scheme: light)').matches)_raw.theme='light';
let S = Object.assign(newStore(), _raw);
