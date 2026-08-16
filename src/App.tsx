"use client";

import { PointerEvent, useEffect, useRef, useState } from "react";

type Sentence={text:string;start:number;end:number};
type Line={speaker:"WOMAN"|"MAN";start:number;end:number;sentences:Sentence[]};
type Point={x:number;y:number};
type Q=1|2|3|4|5|6|7|8|9|10;
const S=(text:string,start:number,end:number):Sentence=>({text,start,end});
const L=(speaker:"WOMAN"|"MAN",start:number,end:number,...sentences:Sentence[]):Line=>({speaker,start,end,sentences});

const transcript12:Line[]=[
 L("WOMAN",.71,12.74,S("I've been meaning to ask you for some advice about restaurants – I need to book somewhere to celebrate my sister's 30th birthday and I liked the sound of that place you went to for your mum's 50th.",.71,12.74)),
 L("MAN",12.95,21.40,S("The Junction?",12.95,13.98),S("Yeah, I'd definitely recommend that for a special occasion.",14.05,17.45),S("We had a great time there.",17.72,19.45),S("Everyone really enjoyed it.",19.65,21.40)),
 L("WOMAN",21.74,23.70,S("Where is it again?",21.65,22.70),S("I can't remember.",22.72,23.78)),
 L("MAN",24.54,28.98,S("It's on Greyson Street, only about a two minute walk from the station.",24.42,29.08)),
 L("WOMAN",29.44,36.20,S("Oh, that's good.",29.32,30.62),S("I'd prefer not to have to drive anywhere.",30.84,33.12),S("But I don't want to have to walk too far either.",33.48,36.32)),
 L("MAN",37.04,58.42,S("Yes, the location's perfect but that's not necessarily why I'd recommend it.",36.92,42.52),S("The food's amazing.",42.56,44.56),S("If you like fish it's probably the best restaurant in town for that.",45.08,50.40),S("It's always really fresh and there are lots of interesting dishes to choose from.",50.82,56.02),S("But all the food is good there.",56.30,58.54)),
 L("WOMAN",58.90,60.42,S("Is it really expensive?",58.78,60.54)),
 L("MAN",61.46,81.20,S("It's certainly not cheap but for a special occasion I think it's fine.",61.34,66.30),S("It's got a great atmosphere and before dinner you can go up on the roof and have a drink – it's really nice up there but you need to book.",66.86,77.52),S("It's very popular as the views are spectacular.",77.96,81.32)),
];
const transcript34:Line[]=[
 L("WOMAN",82.16,88.68,S("Sounds good.",82.16,82.92),S("So that's definitely a possibility then.",83.40,86.44),S("Is there anywhere else you can think of?",86.44,88.68)),
 L("MAN",90.16,94.36,S("If you want somewhere a bit less formal then you could try Paloma.",90.16,94.36)),
 L("WOMAN",95.09,97.01,S("Where's that?",95.09,95.81),S("I haven't heard of it.",95.85,97.01)),
 L("MAN",97.29,107.69,S("No, it's quite new.",97.29,98.49),S("It's only been open a few months but it's got a great reputation already.",99.09,103.25),S("It's in a really beautiful old building on Bow Street.",104.05,107.69)),
 L("WOMAN",108.17,112.57,S("Oh, I think I know where you mean – right beside the cinema?",108.17,112.57)),
 L("MAN",113.09,125.48,S("Yes, that's it.",113.09,114.17),S("I've only been there a couple of times but I was really impressed.",114.84,118.28),S("The chef used to work at Don Felipe's, apparently.",119.16,122.60),S("I was really sorry when that closed down.",123.12,125.48)),
 L("WOMAN",125.92,128.68,S("So is all the food they serve Spanish, then?",125.92,128.68)),
 L("MAN",129.08,135.56,S("Yeah.",129.08,129.46),S("You can get lots of small dishes to share – which always works really well if you're in a group.",129.46,135.56)),
 L("WOMAN",135.56,137.61,S("Mmm.",135.56,136.10),S("Worth thinking about.",136.10,137.61)),
 L("MAN",137.97,148.21,S("Yeah.",137.97,138.30),S("There's a lively atmosphere and the waiters are really friendly.",138.30,142.57),S("The only thing is that you need to pay a £50 deposit to book a table.",143.45,148.21)),
 L("WOMAN",148.61,159.16,S("A lot of restaurants are doing that these days.",148.61,150.81),S("I should have a look at the menu to check there's a good choice of vegetarian dishes.",151.45,155.89),S("A couple of my friends have stopped eating meat.",156.72,159.16)),
 L("MAN",160.04,163.84,S("Not sure.",160.04,160.84),S("I'd say the selection of those would be quite limited.",161.20,163.84)),
];
const transcript510:Line[]=[
 L("MAN",211.66,215.46,S("I've just thought of another idea.",211.66,213.34),S("Have you been to The Audley?",213.86,215.46)),
 L("WOMAN",216.10,219.81,S("No, don't think I've heard of it.",216.10,218.22),S("How's it spelt?",219.01,219.81)),
 L("MAN",220.65,228.93,S("A‑U‑D‑L‑E‑Y.",220.65,224.41),S("You must have heard of it – there's been a lot about it in the press.",225.37,228.93)),
 L("WOMAN",229.45,234.93,S("I don't tend to pay much attention to that kind of thing.",229.45,232.41),S("So where is it exactly?",233.37,234.93)),
 L("MAN",235.73,239.97,S("It's in that hotel near Baxter Bridge – on the top floor.",235.73,239.97)),
 L("WOMAN",240.45,243.45,S("Oh, the views would be incredible from up there.",240.45,243.45)),
 L("MAN",243.85,255.09,S("Yeah.",243.85,244.15),S("I'd love to go.",244.15,245.49),S("I can't think of the chef's name but she was a judge on that TV cookery show recently.",246.13,252.30),S("And she's written a couple of cookery books.",252.30,255.09)),
 L("WOMAN",255.61,257.37,S("Oh, Angela Frayn.",255.61,257.37)),
 L("MAN",257.89,263.43,S("That's the one.",257.89,258.69),S("Anyway, it's had excellent reviews from all the newspapers.",259.55,263.43)),
 L("WOMAN",264.11,267.07,S("That would be a memorable place for a celebration.",264.11,267.07)),
 L("MAN",267.75,275.15,S("Definitely.",267.75,268.31),S("Obviously it's worth going there just for the view but the food is supposed to be really special.",269.31,275.15)),
 L("WOMAN",275.79,279.47,S("She only likes cooking with local products, doesn't she?",275.79,279.47)),
 L("MAN",279.94,288.54,S("Yes.",279.94,280.30),S("Everything at the restaurant has to be sourced within a short distance and absolutely nothing flown in from abroad.",281.02,288.54)),
 L("WOMAN",288.94,291.42,S("I imagine it's really expensive though.",288.94,291.42)),
 L("MAN",292.14,304.25,S("Well, you could go for the set lunch.",292.14,294.58),S("That's quite reasonable for a top class restaurant: £30 a head.",295.22,300.77),S("In the evening I think it'd be more like £50.",300.77,304.25)),
 L("WOMAN",305.05,315.45,S("At least that, I should think.",305.05,306.77),S("But I'm sure everyone would enjoy it.",307.37,309.65),S("It's not the kind of place you leave feeling hungry though, is it?",310.41,313.93),S("With tiny portions?",314.21,315.45)),
 L("MAN",316.29,321.69,S("No, the reviews I've read didn't mention that.",316.29,318.93),S("I imagine they'd be average.",319.37,321.69)),
 L("WOMAN",322.29,323.89,S("Well, that's all great, thanks …",322.29,323.89)),
];

const answers:Record<Q,string>={1:"fish",2:"roof",3:"Spanish",4:"vegetarian",5:"Audley",6:"hotel",7:"reviews",8:"local",9:"30",10:"average"};
const ranges:Record<Q,[number,number]>={1:[37.04,58.42],2:[58.90,81.20],3:[125.92,135.56],4:[148.61,163.84],5:[211.66,224.41],6:[233.37,239.97],7:[243.85,263.43],8:[275.79,288.54],9:[292.14,304.25],10:[305.05,321.69]};
const knowledge:Partial<Record<Q,{synonym?:React.ReactNode;vocabulary?:React.ReactNode}>>={
 1:{synonym:<><b>keen on</b> = <b>like</b></>,vocabulary:<><b>fresh</b> 新鲜的；<b>dish</b> 菜品</>},
 2:{synonym:<><b>a good place</b> = <b>really nice up there</b></>,vocabulary:<><b>roof</b> 屋顶；<b>atmosphere</b> 氛围；<b>spectacular</b> 壮观的</>},
 3:{vocabulary:<><b>portion</b> 一份食物；<b>serve</b> 供应，提供</>},
 4:{synonym:<><b>food</b> = <b>dishes</b></>,vocabulary:<><b>limited</b> 有限的；<b>deposit</b> 订金</>},
 7:{synonym:<><b>very good</b> = <b>excellent</b></>},
 8:{synonym:<><b>ingredients</b> = <b>products</b></>,vocabulary:<><b>ingredient</b> 成分；（尤指烹饪）材料</>},
 9:{synonym:<><b>per person</b> = <b>a head</b></>,vocabulary:<><b>set lunch</b> 午间套餐；<b>set menu</b> 套餐；<b>lunch special / lunch deal</b> 午餐特惠</>},
 10:{vocabulary:<><b>portion</b> 一份食物；<b>small / regular / medium / large / extra large</b> 小份 / 中份（标准份）/ 大份 / 加量</>},
};
const labels:Record<string,string>={junction:"The Junction",greyson:"Greyson Street",keen:"keen on",expensive:"expensive",drink:"drink",paloma:"Paloma",bow:"Bow Street",sharing:"sharing",staff:"Staff",deposit:"£50 deposit",limited:"limited",menu:"menu",top:"top",chef:"chef",good:"very good",only:"Only",ingredients:"ingredients",setLunch:"Set lunch",perPerson:"per person",portions:"Portions"};
const transcriptFor=(q:Q)=>q<=2?transcript12:q<=4?transcript34:transcript510;
const groupStart=(q:Q)=>q<=2?1:q<=4?3:5;
const groupEnd=(q:Q)=>q<=2?2:q<=4?4:10;
const asset=(name:string)=>`${import.meta.env.BASE_URL}assets/${name}`;

export default function Home(){
 const audioRef=useRef<HTMLAudioElement>(null),timerRef=useRef<ReturnType<typeof setTimeout>|null>(null),clickRef=useRef<ReturnType<typeof setTimeout>|null>(null),questionRef=useRef<HTMLDivElement>(null);
 const [page,setPage]=useState<"cover"|"ppt"|"intro"|"teach"|"end"|"thanks">("cover"),[question,setQuestion]=useState<Q>(1),[step,setStep]=useState(-1),[activeLine,setActiveLine]=useState<number|null>(null);
 const [highlighted,setHighlighted]=useState<Set<string>>(new Set()),[colored,setColored]=useState<Set<string>>(new Set()),[strokes,setStrokes]=useState<Point[][]>([]),[current,setCurrent]=useState<Point[]>([]),[drawing,setDrawing]=useState(false);
 const pauseAudio=()=>{if(timerRef.current)clearTimeout(timerRef.current);if(clickRef.current)clearTimeout(clickRef.current);audioRef.current?.pause()};
 const playRange=(start:number,end:number)=>{const a=audioRef.current;if(!a)return;if(timerRef.current)clearTimeout(timerRef.current);a.currentTime=start;void a.play();timerRef.current=setTimeout(()=>a.pause(),Math.max(250,(end-start)*1000))};
 const playAll=()=>{const a=audioRef.current;if(!a)return;if(timerRef.current)clearTimeout(timerRef.current);a.currentTime=0;void a.play()};
 const playLine=(e:React.MouseEvent,i:number,l:Line)=>{e.stopPropagation();if(clickRef.current)clearTimeout(clickRef.current);if(e.detail!==1)return;clickRef.current=setTimeout(()=>{setActiveLine(i);playRange(l.start,l.end+.5)},350)};
 const playSentence=(i:number,s:Sentence)=>{if(clickRef.current)clearTimeout(clickRef.current);setActiveLine(i);playRange(s.start,s.end+.5)};
 const speakerRange=()=>{const [s,e]=ranges[question];playRange(s,e+.5)};
 const mark=(id:string)=>(e:React.MouseEvent)=>{e.stopPropagation();setHighlighted(v=>new Set([...v,id]));setColored(v=>new Set([...v,id]))};
 const dismiss=(e:React.MouseEvent<HTMLTableElement>)=>{if(!(e.target as HTMLElement).closest(".keyword"))setHighlighted(new Set())};
 const key=(id:string,text?:string)=><span role="button" tabIndex={0} onClick={mark(id)} className={`keyword ${highlighted.has(id)?"selected":""} ${page==="teach"&&highlighted.has(id)?"glass":""} ${colored.has(id)?"colored":""}`}>{text??labels[id]}</span>;
 const clearEmphasis=()=>{pauseAudio();setHighlighted(new Set())};
 const hasKnowledge=(q:Q)=>Boolean(knowledge[q]?.synonym||knowledge[q]?.vocabulary),finalStep=(q:Q)=>hasKnowledge(q)?1:0;
 const next=()=>{if(page==="cover"){setPage("ppt");return}if(page==="ppt"){setPage("intro");return}if(page==="intro"){setPage("teach");setStep(-1);return}if(page==="end"){setPage("thanks");return}if(page==="thanks")return;if(step<finalStep(question)){setStep(step+1);return}if(question<10){setQuestion((question+1)as Q);setStep(-1);setActiveLine(null);return}setPage("end")};
 const prev=()=>{pauseAudio();if(page==="ppt"){setPage("cover");return}if(page==="intro"){setPage("ppt");return}if(page==="thanks"){setPage("end");return}if(page==="end"){setPage("teach");setQuestion(10);setStep(finalStep(10));return}if(page==="teach"&&step>=0){setStep(step-1);return}if(page==="teach"&&question>1){const q=(question-1)as Q;setQuestion(q);setStep(finalStep(q));setActiveLine(null);return}if(page==="teach")setPage("intro")};
 useEffect(()=>{const h=(e:KeyboardEvent)=>{if(e.key==="ArrowRight")next();if(e.key==="ArrowLeft"&&page!=="cover")prev()};window.addEventListener("keydown",h);return()=>window.removeEventListener("keydown",h)});
 const point=(e:PointerEvent<HTMLDivElement>)=>{const r=questionRef.current!.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top}},down=(e:PointerEvent<HTMLDivElement>)=>{if((e.target as HTMLElement).closest("button,.keyword,[contenteditable]"))return;e.currentTarget.setPointerCapture(e.pointerId);setDrawing(true);setCurrent([point(e)])},move=(e:PointerEvent<HTMLDivElement>)=>{if(drawing)setCurrent(v=>[...v,point(e)])},up=()=>{if(current.length>2)setStrokes(v=>[...v,current]);setCurrent([]);setDrawing(false)},path=(p:Point[])=>p.map((v,i)=>`${i?"L":"M"} ${v.x} ${v.y}`).join(" ");
 const revealed=(q:Q)=>page==="teach"&&(q<question||(q===question&&step>=0)),blank=(q:Q,prefix="")=><span className={`blank ${revealed(q)?"revealed":""}`}>{q} {prefix}{revealed(q)?answers[q]:"…………"}</span>;
 const row12=<tr><td>{key("junction")}</td><td>{key("greyson")},<br/>near the station</td><td>Good for people who are especially {key("keen")} {blank(1)}</td><td>Quite {key("expensive")}<br/><br/>The {blank(2)} is a good place for a {key("drink")}</td></tr>;
 const table=question<=2?row12:question<=4?<tr><td>{key("paloma")}</td><td>In {key("bow")}<br/>next to the cinema</td><td>{blank(3)} food,<br/>good for {key("sharing")}</td><td>{key("staff")} are very friendly<br/><br/>Need to pay {key("deposit")}<br/><br/>A {key("limited")} selection of {blank(4)} food on the {key("menu")}</td></tr>:<tr><td>The {blank(5)}</td><td>At the {key("top")} of<br/>a {blank(6)}</td><td>A famous {key("chef")}<br/><br/>All the {blank(7)} are {key("good")}<br/><br/>{key("only")} uses {blank(8)} {key("ingredients")}</td><td>{key("setLunch")} costs<br/>{blank(9,"£")} {key("perPerson")}<br/><br/>{key("portions")} probably of {blank(10)} size</td></tr>;
 const currentKnowledge=knowledge[question],nextLabel=question===10&&step===finalStep(10)?"查看总结":step===finalStep(question)?`讲解 Q${question+1}`:"继续";
 const introClick=()=>{const a=audioRef.current;if(a&&!a.paused){pauseAudio();return}next()};
 return <main className="stage"><audio ref={audioRef} src={asset("q1-q10.mp3")}/>{page==="cover"?<section className="cover-slide" role="button" tabIndex={0} aria-label="点击进入下一页" onClick={()=>{pauseAudio();next()}} onKeyDown={e=>{if(e.key==="Enter"){pauseAudio();next()}}}><img src={asset("C20T1P1-demo.svg")} alt="" draggable={false}/></section>:page==="ppt"?<section className="image-slide ppt-slide" role="button" tabIndex={0} aria-label="点击进入题目页" onClick={next} onKeyDown={e=>{if(e.key==="Enter")next()}}><h1>雅思听力</h1><div className="ppt-cards"><img src={asset("ppt-intro/part1.png")} alt="PART 1 Questions 1–10"/><img src={asset("ppt-intro/part2.png")} alt="PART 2 Questions 11–20"/><img src={asset("ppt-intro/part3.png")} alt="PART 3 Questions 21–30"/><img src={asset("ppt-intro/audio-mark.png")} alt="PART 4 Questions 31–40"/></div><div className="ppt-points"><h2>雅思听力三大通用标准</h2><h3>顺序原则</h3><p>题目顺序和听到的顺序一致</p><h3>所听即所得</h3><p>不需要同义改写</p><p>填空题答案词一定在音频中出现过</p><h3>大小写不做要求</h3><p>日期、地点、人名、时间、金钱……</p><img src={asset("ppt-intro/part4.png")} alt=""/></div><div className="ppt-steps"><h2>雅思听力解题步骤</h2><p><b>读</b><span>字数限制、划关键词（定位词 / 限定词）</span></p><p><b>猜</b><span>词性 &amp; 含义</span></p><p><b>听</b><span>听力能力（考试技巧）</span></p><p><b>写</b><span>单词拼写（所听即所得）</span></p><p><b>查</b><span>拼写、规范性、语法</span></p></div></section>:page==="intro"?<section className="image-slide intro-slide" role="button" tabIndex={0} aria-label="播放音频或进入讲解" onClick={introClick} onKeyDown={e=>{if(e.key==="Enter")introClick()}}><img src={asset("intro-question.png")} alt="Questions 1–10 完整题目" draggable={false}/><button className="speaker intro-speaker" onClick={e=>{e.stopPropagation();const a=audioRef.current;if(a&&!a.paused)pauseAudio();else playAll()}} aria-label="播放或暂停 Questions 1–10 全部音频">🔊</button></section>:page==="end"?<section className="image-slide final-summary"><div className="final-question"><img src={asset("summary-question.png")} alt="Questions 1–10 完整答案" draggable={false}/></div><div className="final-knowledge"><section><h2>重点词汇</h2><p><b>fresh</b> 新鲜的</p><p><b>dish</b> 菜品</p><p><b>roof</b> 屋顶</p><p><b>atmosphere</b> 氛围</p><p><b>spectacular</b> 壮观的</p><p><b>portion</b> 一份食物</p><p><b>serve</b> 供应，提供</p><p><b>limited</b> 有限的</p><p><b>deposit</b> 订金</p><p><b>ingredient</b> 成分；（尤指烹饪）材料</p><p><b>set lunch</b> 午间套餐</p><p><b>set menu</b> 套餐</p><p><b>lunch special / lunch deal</b> 午餐特惠</p><p><b>small / regular / medium / large / extra large</b> 小份 / 中份（标准份）/ 大份 / 加量</p></section><section><h2>同义替换</h2><p><b>keen on</b> = <b>like</b></p><p><b>a good place</b> = <b>really nice up there</b></p><p><b>food</b> = <b>dishes</b></p><p><b>very good</b> = <b>excellent</b></p><p><b>ingredients</b> = <b>products</b></p><p><b>per person</b> = <b>a head</b></p></section></div><div className="summary-nav"><button onClick={prev}>← 返回上一页</button><button className="next" onClick={next}>下一页 →</button></div></section>:page==="thanks"?<section className="image-slide thanks-slide"><img src={asset("ending-thanks.jpg")} alt="THANKS" draggable={false}/><button className="thanks-back" onClick={prev}>←</button></section>:<section className="slide-shell" onClick={clearEmphasis}>
  <header className="topbar"><span className="editable-title" contentEditable suppressContentEditableWarning>C20-T1-P1 表格填空题</span></header><div className="workspace teach"><section className="question-panel"><div className="instruction"><b>Questions {groupStart(question)}–{groupEnd(question)}</b><span>Write <strong>ONE WORD AND/OR A NUMBER</strong> for each answer.</span></div><div ref={questionRef} className="question-stage" onClick={e=>e.stopPropagation()}><table onClickCapture={dismiss}><thead><tr><th>Name of<br/>restaurant</th><th>Location</th><th>Reason for<br/>recommendation</th><th>Other comments</th></tr></thead><tbody>{table}</tbody></table></div></section>
  {page==="teach"&&<section className="teaching-panel"><div className="transcript-head"><span>TRANSCRIPT</span><button className="speaker" onClick={e=>{e.stopPropagation();speakerRange()}} aria-label={`播放第${question}题相关音频`}>🔊</button></div><div className="transcript">{transcriptFor(question).map((l,i)=><p key={i} className={activeLine===i?"active":""} onClick={e=>playLine(e,i,l)}><b>{l.speaker}:</b><span>{l.sentences.map((s,j)=><span key={j} className="sentence" onMouseDown={e=>{if(e.detail>1)e.preventDefault()}} onDoubleClick={e=>{e.preventDefault();e.stopPropagation();window.getSelection()?.removeAllRanges();playSentence(i,s)}}>{j>0&&" "}{s.text}</span>)}</span></p>)}</div><div className="explain-card">{step===0&&<p><em>答案</em><strong className="answer">{answers[question]}</strong></p>}{step===1&&currentKnowledge&&<div className="q1-knowledge">{currentKnowledge.synonym&&<p><em>同义替换</em><span>{currentKnowledge.synonym}</span></p>}{currentKnowledge.vocabulary&&<p><em>重点词汇</em><span>{currentKnowledge.vocabulary}</span></p>}</div>}</div></section>}</div>
  <footer><button className="speaker footer-speaker" onClick={e=>{e.stopPropagation();speakerRange()}} aria-label="播放对应音频片段">🔊</button><div className="nav"><button onClick={prev}>←</button><button className="next" onClick={next}>{nextLabel} →</button></div></footer></section>}</main>
}
