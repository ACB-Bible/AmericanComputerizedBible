function acbNavMission(){localStorage.setItem("loaded","true"),window.open("mission.v1.html","_blank")}function acbNavCopyright(){localStorage.setItem("loaded","true"),window.open("copyright.v1.html","_blank")}function acbClickedP(e){e.preventDefault(),e.stopImmediatePropagation(),id=e.target.id,document.getElementById(id).style.color="black",document.getElementById(id).style.backgroundColor="white",document.getElementById(verseClicked).style.color="black",document.getElementById(verseClicked).style.backgroundColor="white",highlighted=0}function acbSingleParagraph(e,t,o){for(var n=0;verses[o].bid===e&&verses[o].cn===t;){let e=document.createElement("p");e.id=`id-acbP${n}`,e.addEventListener("click",acbClickedP,!0),e.classList.add("cs-acbP"),document.getElementById("id-acbMainText").appendChild(e);let t=document.createElement("span");t.id=`id-acbSP${verses[o].vn}`,1!==verses[o].vn&&(t.textContent=verses[o].vn),t.classList.add("cs-acbNumber"),document.getElementById(`id-acbP${n}`).appendChild(t),t=document.createElement("span"),t.id=`id-acbSP${verses[o].vn}-2`,t.textContent=`${verses[o].vt} `,document.getElementById(`id-acbP${n}`).appendChild(t),o++,n++}}async function acbLoadText(e,t){let o=0;var n=0;acbRemoveItems("id-acbMainText");let d=document.createElement("p");d.id="id-acbTextTitle1",d.classList.add("cs-acbTextTitle"),document.getElementById("id-acbMainText").appendChild(d),document.getElementById("id-acbTextTitle1").textContent=document.getElementById(versionClicked).textContent,d=document.createElement("p"),d.id="id-acbTextTitle2",d.textContent=`${document.getElementById(bookClicked).textContent} ${t}`,d.classList.add("cs-acbTextTitle"),d.classList.add("cs-acbGold"),document.getElementById("id-acbMainText").appendChild(d),d=document.createElement("p"),d.id=`id-acbP${n}`,d.addEventListener("click",acbClickedP,!0),document.getElementById("id-acbMainText").appendChild(d);let c=document.createElement("img");c.src="./IMAGES/open.webp",c.alt="First Verse",c.classList="cs-acbImage2",c.setAttribute("async",!0),c.setAttribute("loading","lazy"),document.getElementById("id-acbP0").appendChild(c);let a=verses.findIndex((o=>o.bid===e&&o.cn===t));if(0===verses[a].pn)acbSingleParagraph(e,t,Number(a));else{let d=verses[a].pn;for(;verses[a].bid===e&&verses[a].cn===t;){if(verses[a].pn!==d&&(d=verses[a].pn,o=1,n++),o){let e=document.createElement("p");e.id=`id-acbP${n}`,e.classList.add("cs-acbP"),document.getElementById("id-acbMainText").appendChild(e),o=0}let e=document.createElement("span");1!==verses[a].vn&&(e.textContent=verses[a].vn),e.id=`id-acbSP${verses[a].vn}`,e.classList.add("cs-acbNumber"),document.getElementById(`id-acbP${n}`).appendChild(e),e=document.createElement("span"),e.id=`id-acbSP${verses[a].vn}-2`,e.textContent=`${verses[a].vt} `,document.getElementById(`id-acbP${n}`).appendChild(e),document.getElementById(`id-acbSP${verses[a].vn}-2`).addEventListener("click",acbClickedP,!0),a++}}}async function acbChangeVersion(e){this.event.preventDefault(),this.event.stopImmediatePropagation(),versionClicked=this.event.target.id,versionActive=document.getElementById(versionClicked).dataset.ar;let t=!1;if(1===document.getElementById(versionClicked).dataset.loaded){let e=Number(document.getElementById(versionClicked).dataset.idx);verses=allVerses[e]}else{const e=`${mainPath}DATA/${versionActive}/${versionActive}Verses.json`,t=await fetchJson(e);allVerses.push(t),verses=allVerses[versionIdx],document.getElementById(versionClicked).dataset.loaded=1,document.getElementById(versionClicked).dataset.idx=versionIdx,versionIdx++}let o=Number(document.getElementById(bookClicked).dataset.bid),n=Number(document.getElementById(chapterClicked).dataset.cn);verses&&(t=acbLoadText(o,n)),document.getElementById("id-acbTextTitle2").textContent=`${document.getElementById(bookClicked).textContent} ${n}`,acbCloseBox(),t&&1===highlighted&&(document.getElementById(textHighlight).style.backgroundColor="#aed0fc",document.getElementById(textHighlight).scrollIntoView({block:"center"})),document.getElementById(chapterClicked).style.color="crimson",document.getElementById(chapterClicked).style.backgroundColor="rgba(112, 111, 111, 0.25)"}function acbChangeBook(e){e.preventDefault(),e.stopImmediatePropagation(),acbCloseBox(),bookClicked=e.target.id,chapterCount=Number(document.getElementById(bookClicked).dataset.c);let t=Number(document.getElementById(bookClicked).dataset.bid);document.getElementById(chapterClicked).style.color="black",document.getElementById(chapterClicked).style.backgroundColor="white",acbLoadChapter(),verseClicked="id-acbVrs0",chapterClicked="id-acbChp1",acbLoadVerses(t,1),acbLoadText(t,1),document.getElementById("id-acbBody").scrollTo(0,0),document.getElementById(chapterClicked).style.color="crimson",document.getElementById(chapterClicked).style.backgroundColor="rgba(112, 111, 111, 0.25)"}function acbChangeChapter(e){e.preventDefault(),e.stopImmediatePropagation(),acbCloseBox(),document.getElementById(chapterClicked).style.color="black",document.getElementById(chapterClicked).style.backgroundColor="white",chapterClicked=e.target.id,document.getElementById(chapterClicked).style.color="crimson",document.getElementById(chapterClicked).style.backgroundColor="rgba(112, 111, 111, 0.25)",chapterCount=Number(document.getElementById(bookClicked).dataset.c);let t=Number(document.getElementById(bookClicked).dataset.bid),o=Number(document.getElementById(chapterClicked).dataset.cn);verseClicked="id-acbVrs0",acbLoadVerses(t,o),acbLoadText(t,o),document.getElementById("id-acbBody").scrollTo(0,0)}function acbGoToVerse(e){e.preventDefault(),e.stopImmediatePropagation();let t=`id-acbSP${e.target.dataset.vn}`;document.getElementById(t).scrollIntoView({block:"center"}),acbCloseBox(),mobileMenuOpen&&(document.getElementById("id-acbSelectContainer").style.display="none",document.getElementById("id-acbSelectContainer").style.width="0",mobileMenuOpen=!1),document.getElementById(`${t}-2`).style.backgroundColor="#aed0fc",firstHighlight||(document.getElementById(textHighlight).style.backgroundColor="white"),firstHighlight=!1,textHighlight=`${t}-2`,document.getElementById(verseClicked).style.color="black",document.getElementById(verseClicked).style.backgroundColor="white",e.target.style.color="crimson",e.target.style.backgroundColor="rgba(112, 111, 111, 0.25)",verseClicked=e.target.id,highlighted=1}function acbScroll(e){document.getElementById(e)&&document.getElementById(e).scrollTo(0,0)}function acbOpenClose(){this.event.preventDefault(),this.event.stopImmediatePropagation();let e=this.event.target.id;if("id-acbSelectContainer"!==e&&"id-acbFixedPanel"!==e&&1!==versionOpen&&1!==bookOpen&&1!==chapterOpen&&1!==verseOpen)switch(e){case"id-acbBookLabel":acbOpenBox("id-acbBook"),document.getElementById("id-acbSortBooks").style.display="inline-block",acbScroll("id-acbInnerBook"),bookOpen=1;break;case"id-acbChapterLabel":acbOpenBox("id-acbChapter"),chapterOpen=1;break;case"id-acbVerseLabel":acbOpenBox("id-acbVerse"),verseOpen=1;break;case"id-acbBtn3":case"id-acbBtn3":acbOpenBox("id-acbVersionList"),acbScroll("id-acbInnerVersion"),versionOpen=1;break}else acbCloseBox()}function acbOpenBox(e){document.getElementById(e).style.display="block",document.getElementById("id-acbFixedPanel").style.display="block"}async function fetchFile(e){document.getElementById("id-acbHtml").style.cursor="wait",document.getElementById("id-acbHtml").style.pointerEvents="none";return await fetch(e,{mode:"cors"})&&(document.getElementById("id-acbHtml").style.cursor="default",document.getElementById("id-acbHtml").style.pointerEvents="auto"),Promise.resolve(aFile)}async function fetchJson(e){document.getElementById("id-acbHtml").style.cursor="wait",document.getElementById("id-acbHtml").style.pointerEvents="none";const t=await fetch(e,{mode:"cors"}),o=await t.json();return o&&(document.getElementById("id-acbHtml").style.cursor="default",document.getElementById("id-acbHtml").style.pointerEvents="auto"),Promise.resolve(o)}async function acbSetNewTestament(){document.getElementById("id-acbTestament").textContent="New Testament",newBooks.sort(((e,t)=>e.id>t.id?1:-1)),bookClicked="id-acbBk40",chapterClicked="id-acbChp1",verseClicked="id-acbVrs0",chapterCount=28;let e=!1;e=await acbLoadBooks(newBooks),acbLoadChapter(),acbLoadVerses(40,1),e&&acbLoadText(40,1),document.getElementById(chapterClicked).style.color="crimson",document.getElementById(chapterClicked).style.backgroundColor="rgba(112, 111, 111, 0.25)",document.getElementById("id-acbBody").scrollTo(0,0),testament=1}async function acbSetOldTestament(){document.getElementById("id-acbTestament").textContent="Old Testament",oldBooks.sort(((e,t)=>e.id>t.id?1:-1)),bookClicked="id-acbBk1",chapterClicked="id-acbChp1",verseClicked="id-acbVrs0",chapterCount=50;let e=!1;e=await acbLoadBooks(oldBooks),acbLoadChapter(),acbLoadVerses(1,1),acbLoadText(1,1),document.getElementById(chapterClicked).style.color="crimson",document.getElementById(chapterClicked).style.backgroundColor="rgba(112, 111, 111, 0.25)",document.getElementById("id-acbBody").scrollTo(0,0),testament=0}function acbSortBooks(){if(this.event.preventDefault(),this.event.stopImmediatePropagation(),1===bookOpen)switch(testament){case 0:bookAlph?(oldBooks.sort(((e,t)=>e.id>t.id?1:-1)),acbLoadBooks(oldBooks),bookAlph=!1,document.getElementById("id-acbSortBooks").title="Sort Books Alphabetically"):(oldBooks.sort(((e,t)=>e.t>t.t?1:-1)),acbLoadBooks(oldBooks),bookAlph=!0,document.getElementById("id-acbSortBooks").title="Sort Books Biblically");break;case 1:bookAlph?(newBooks.sort(((e,t)=>e.id>t.id?1:-1)),acbLoadBooks(newBooks),bookAlph=!1,document.getElementById("id-acbSortBooks").title="Sort Books Alphabetically"):(newBooks.sort(((e,t)=>e.t>t.t?1:-1)),acbLoadBooks(newBooks),document.getElementById("id-acbSortBooks").title="Sort Books Biblically",bookAlph=!0);break}}function acbMobileMenu(){mobileMenuOpen?(document.getElementById("id-acbSelectContainer").style.display="none",document.getElementById("id-acbSelectContainer").style.width="0",mobileMenuOpen=!1):(document.getElementById("id-acbSelectContainer").style.display="block",document.getElementById("id-acbSelectContainer").style.width="65%",mobileMenuOpen=!0)}"function"==typeof window.onbeforeunload&&(window.onbeforeunload=function(){localStorage.getItem("loaded")&&localStorage.removeItem("loaded")});