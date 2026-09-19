import {francAll} from './vendor/franc.mjs';
const codes={ind:'id',eng:'en',arb:'ar',fra:'fr',deu:'de',spa:'es',jpn:'ja'};
export function detectLanguage(text){
 if(text.replace(/\s/g,'').length<20)return 'und';
 const all=francAll(text.slice(0,12000),{minLength:20});
 const first=all[0]; if(first?.[0]==='zlm'){const ind=all.find(x=>x[0]==='ind'); if(ind&&first[1]-ind[1]<0.12)return 'id';} return first ? codes[first[0]]||'und':'und';
}
export function sentences(text,lang='id'){
 const clean=text.replace(/\r/g,'').trim();if(!clean)return [];
 if(typeof Intl.Segmenter==='function')return [...new Intl.Segmenter(lang==='und'?'id':lang,{granularity:'sentence'}).segment(clean)].map(x=>x.segment.trim()).filter(Boolean);
 return clean.match(/[^.!?؟]+[.!?؟]*\s*/gu)?.map(s=>s.trim()).filter(Boolean)||[clean];
}
export function buildQueue(pages,from,to,lang){
 if(!Number.isInteger(from)||!Number.isInteger(to)||from<1||to>pages.length||from>to)throw new Error('Rentang tidak valid. Periksa bagian awal dan akhir.');
 return pages.flatMap((p,i)=> i+1<from||i+1>to?[]:sentences(p.text,lang).map((text,j)=>({page:i,index:j,text})));
}
export function extractLines(items){
 // PDF text items keep the producer's order, including RTL runs.
 let lines=[],line='',lastY=null;
 for(const item of items){if(!('str'in item))continue;const y=item.transform[5];
 if(lastY!==null&&Math.abs(y-lastY)>Math.max(3,Math.abs(item.transform[3])*.5)&&line){lines.push(line.trim());line='';}
 if(line&&!/\s$/.test(line)&&item.str&&!/^\s/.test(item.str))line+=' ';
 line+=item.str;lastY=y;if(item.hasEOL){lines.push(line.trim());line='';lastY=null;}}
 if(line)lines.push(line.trim());return lines.filter(Boolean).join('\n');
}
