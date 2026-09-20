/* ============================================================
   Persistent state (centralised — import/export backups use this shape)
============================================================ */
const STORE='ma119_ch1_v1';
function newStore(){
  return {
    onboarded:false, goal:'learn', level:'grade10', theme:'dark',
    sec:0, step:0, secDone:[false,false,false,false,false],
    hw:{},       // id: {tries, finished, firstTry}
    attempts:[], // {setId,date,ans,score,byTopic,n,timeSec,qt}
    learn:{},    // 's{sec}_{step}' -> 1 first-try ok | 0
    hwsec:{},    // '1.1' -> [firstTryOkCount, totalProblems]
    missed:[],   // {k,type,a,b}  type: 'quiz'|'learn'|'hw'
    cards:{known:{}}, // word flashcards: term -> times marked known
  };
}
function loadStore(){
  try{ return JSON.parse(localStorage.getItem(STORE))||{}; }catch(e){ return {}; }
}
function saveStore(){ try{ localStorage.setItem(STORE,JSON.stringify(S)); }catch(e){} }
const _raw=loadStore();
if(!('theme' in _raw)&&typeof matchMedia==='function'&&matchMedia('(prefers-color-scheme: light)').matches)_raw.theme='light';
let S = Object.assign(newStore(), _raw);
