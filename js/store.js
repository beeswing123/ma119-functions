/* ============================================================
   Persistent state (centralised — import/export backups use this shape)
============================================================ */
const STORE='ma119_v3';
const PREV_STORE='ma119_v2';        // Chapters 1–2
const OLD_STORE='ma119_ch1_v1';     // Chapter 1 only
function newStore(){
  return {
    onboarded:false, goal:'learn', level:'grade10', theme:'dark',
    ch:1,        // current chapter in the Learn rail (1, 2 or 3)
    sec:0, step:0, secDone:new Array(21).fill(false),
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
      // migration chain: v2 (Chapters 1–2), then the Chapter-1-only key
      d=JSON.parse(localStorage.getItem(PREV_STORE)||localStorage.getItem(OLD_STORE));
    }
    return d||{};
  }catch(e){ return {}; }
}
function saveStore(){ try{ localStorage.setItem(STORE,JSON.stringify(S)); }catch(e){} }
const _raw=loadStore();
if(!('theme' in _raw)&&typeof matchMedia==='function'&&matchMedia('(prefers-color-scheme: light)').matches)_raw.theme='light';
let S = Object.assign(newStore(), _raw);
