var verses,mainPath="https://acbible.com/",firstText=!0,firstHighlight=!0,highlighted=0,mobileMenuOpen=!1,testament=0,textHighlight="id-acbSP1-2",steTestament=!1,versionIdx=1,versionOpen=0,versionActive="TWF",versionClicked="id-acbVrsn5",bookOpen=0,bookClicked="id-acbBk1",bookAlph=!1,chapterOpen=0,chapterClicked="id-acbChp1",chapterCount=50,verseOpen=0,verseClicked="id-acbVrs0",allVerses=[],oldBooks=[{c:50,id:1,t:"Genesis"},{c:40,id:2,t:"Exodus"},{c:27,id:3,t:"Leviticus"},{c:36,id:4,t:"Numbers"},{c:34,id:5,t:"Deuteronomy"},{c:24,id:6,t:"Joshua"},{c:21,id:7,t:"Judges"},{c:4,id:8,t:"Ruth"},{c:31,id:9,t:"1 Samuel"},{c:24,id:10,t:"2 Samuel"},{c:22,id:11,t:"1 Kings"},{c:25,id:12,t:"2 Kings"},{c:29,id:13,t:"1 Chronicles"},{c:36,id:14,t:"2 Chronicles"},{c:10,id:15,t:"Ezra"},{c:13,id:16,t:"Nehemiah"},{c:10,id:17,t:"Esther"},{c:42,id:18,t:"Job"},{c:150,id:19,t:"Psalm"},{c:31,id:20,t:"Proverbs"},{c:12,id:21,t:"Ecclesiastes"},{c:8,id:22,t:"Song of Solomon"},{c:66,id:23,t:"Isaiah"},{c:52,id:24,t:"Jeremiah"},{c:5,id:25,t:"Lamentations"},{c:48,id:26,t:"Ezekiel"},{c:12,id:27,t:"Daniel"},{c:14,id:28,t:"Hosea"},{c:3,id:29,t:"Joel"},{c:9,id:30,t:"Amos"},{c:1,id:31,t:"Obadiah"},{c:4,id:32,t:"Jonah"},{c:7,id:33,t:"Micah"},{c:3,id:34,t:"Nahum"},{c:3,id:35,t:"Habakkuk"},{c:3,id:36,t:"Zephaniah"},{c:2,id:37,t:"Haggai"},{c:14,id:38,t:"Zechariah"},{c:4,id:39,t:"Malachi"}],newBooks=[{c:28,id:40,t:"Matthew"},{c:16,id:41,t:"Mark"},{c:24,id:42,t:"Luke"},{c:21,id:43,t:"John"},{c:28,id:44,t:"Acts"},{c:16,id:45,t:"Romans"},{c:16,id:46,t:"1 Corinthians"},{c:13,id:47,t:"2 Corinthians"},{c:6,id:48,t:"Galatians"},{c:6,id:49,t:"Ephesians"},{c:4,id:50,t:"Philppians"},{c:4,id:51,t:"Colossians"},{c:5,id:52,t:"1 Thessalonians"},{c:3,id:53,t:"2 Thessalonians"},{c:6,id:54,t:"1 Timothy"},{c:4,id:55,t:"2 Timothy"},{c:3,id:56,t:"Titus"},{c:1,id:57,t:"Philemon"},{c:13,id:58,t:"Hebrews"},{c:5,id:59,t:"James"},{c:5,id:60,t:"1 Peter"},{c:3,id:61,t:"2 Peter"},{c:5,id:62,t:"1 John"},{c:1,id:63,t:"2 John"},{c:1,id:64,t:"3 John"},{c:1,id:65,t:"Jude"},{c:22,id:66,t:"Revelation"}];

async function acbStartVerses(e,t){const n=`${mainPath}DATA/${versionActive}/${versionActive}Verses.json`,a=await fetchJson(n);return allVerses.push(a),verses=allVerses[0],acbLoadVerses(e,t),Promise.resolve(!0)}async function acbLoadBooks(e){let t=0;return acbRemoveItems("id-acbInnerBook"),e.forEach((e=>{let n=document.createElement("span");n.addEventListener("click",acbChangeBook,!0),n.id=`id-acbBk${e.id}`,n.textContent=e.t,n.dataset.bid=e.id,n.dataset.c=e.c,n.dataset.idx=t,n.classList.add("cs-acbSelect"),document.getElementById("id-acbInnerBook").appendChild(n),t++})),Promise.resolve(!0)}async function acbLoadChapter(){let e=1,t=0,n=1;var a=0;for(acbCloseBox(),acbRemoveItems("id-acbInnerChapter");e<=chapterCount;){if(n){let e=document.createElement("div");e.id=`id-acbChpt${a}`,e.classList.add("cs-acbSelectLine"),document.getElementById("id-acbInnerChapter").appendChild(e),n=0}let d=document.createElement("span");d.addEventListener("click",acbChangeChapter,!0),d.id=`id-acbChp${e}`,d.textContent=e,d.dataset.cn=e,d.classList.add("cs-acbSelector"),document.getElementById(`id-acbChpt${a}`).appendChild(d),t<4?t++:(t=0,n=1,a++),e++}let d=document.createElement("div");return d.id=`id-acbChpt${a+1}`,d.textContent=" ... ",d.classList.add("cs-acbSelectLine"),document.getElementById("id-acbInnerChapter").appendChild(d),Promise.resolve(!0)}async function acbLoadVerses(e,t){let n=0,a=0,d=1;var c=0;acbRemoveItems("id-acbInnerVerse");let s=verses.findIndex((n=>n.bid===e&&n.cn===t));for(;verses[s].bid===e&&verses[s].cn===t;){if(d){let e=document.createElement("div");e.id=`id-acbVrss${c}`,e.classList.add("cs-acbSelectLine"),document.getElementById("id-acbInnerVerse").appendChild(e),d=0}let e=document.createElement("span");e.addEventListener("click",acbGoToVerse,!0),e.id=`id-acbVrs${a}`,e.textContent=verses[s].vn,e.dataset.bid=verses[s].bid,e.dataset.cn=verses[s].cn,e.dataset.vn=verses[s].vn,e.classList.add("cs-acbSelector"),document.getElementById(`id-acbVrss${c}`).appendChild(e),n<4?n++:(n=0,d=1,c++),s++,a++}let o=document.createElement("div");o.id=`id-acbVrss${c+1}`,o.textContent=" ... ",o.classList.add("cs-acbSelectLine"),document.getElementById("id-acbInnerVerse").appendChild(o),acbScroll("id-acbInnerVerse")}function acbCloseBox(){bookOpen=0,chapterOpen=0,verseOpen=0,versionOpen=0,document.getElementById("id-acbVersionList").style.display="none",document.getElementById("id-acbBook").style.display="none",document.getElementById("id-acbChapter").style.display="none",document.getElementById("id-acbVerse").style.display="none",document.getElementById("id-acbFixedPanel").style.display="none",document.getElementById("id-acbSortBooks").style.display="none"}function acbRemoveItems(e){let t=document.getElementById(e);for(;t.firstChild;)t.removeChild(t.firstChild)}window.onload=async()=>{let e=!1;localStorage.getItem("loaded")&&localStorage.removeItem("loaded"),e=await acbLoadBooks(oldBooks),e&&(e=!1,e=await acbLoadChapter()),e&&(e=!1,e=await acbStartVerses(1,1)),e&&(document.getElementById(chapterClicked).style.color="crimson",document.getElementById(chapterClicked).style.backgroundColor="rgba(112, 111, 111, 0.25)")};