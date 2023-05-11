async function acbStartVerses(e, t) { const n = `${mainPath}DATA/${versionActive}/${versionActive}Verses.json`, a = await fetchJson(n); return allVerses.push(a), verses = allVerses[0], acbLoadVerses(e, t), Promise.resolve(!0) } async function acbLoadBooks(e) { let t = 0; return acbRemoveItems("id-acbInnerBook"), e.forEach((e => { let n = document.createElement("span"); n.addEventListener("click", acbChangeBook, !0), n.id = `id-acbBk${e.id}`, n.textContent = e.t, n.dataset.bid = e.id, n.dataset.c = e.c, n.dataset.idx = t, n.classList.add("cs-acbSelect"), document.getElementById("id-acbInnerBook").appendChild(n), t++ })), Promise.resolve(!0) } async function acbLoadChapter() { let e = 1, t = 0, n = 1; var a = 0; for (acbCloseBox(), acbRemoveItems("id-acbInnerChapter"); e <= chapterCount;) { if (n) { let e = document.createElement("div"); e.id = `id-acbChpt${a}`, e.classList.add("cs-acbSelectLine"), document.getElementById("id-acbInnerChapter").appendChild(e), n = 0 } let d = document.createElement("span"); d.addEventListener("click", acbChangeChapter, !0), d.id = `id-acbChp${e}`, d.textContent = e, d.dataset.cn = e, d.classList.add("cs-acbSelector"), document.getElementById(`id-acbChpt${a}`).appendChild(d), t < 4 ? t++ : (t = 0, n = 1, a++), e++ } let d = document.createElement("div"); return d.id = `id-acbChpt${a + 1}`, d.textContent = " ... ", d.classList.add("cs-acbSelectLine"), document.getElementById("id-acbInnerChapter").appendChild(d), Promise.resolve(!0) } async function acbLoadVerses(e, t) { let n = 0, a = 0, d = 1; var c = 0; acbRemoveItems("id-acbInnerVerse"); let s = verses.findIndex((n => n.bid === e && n.cn === t)); for (; verses[s].bid === e && verses[s].cn === t;) { if (d) { let e = document.createElement("div"); e.id = `id-acbVrss${c}`, e.classList.add("cs-acbSelectLine"), document.getElementById("id-acbInnerVerse").appendChild(e), d = 0 } let e = document.createElement("span"); e.addEventListener("click", acbGoToVerse, !0), e.id = `id-acbVrs${a}`, e.textContent = verses[s].vn, e.dataset.bid = verses[s].bid, e.dataset.cn = verses[s].cn, e.dataset.vn = verses[s].vn, e.classList.add("cs-acbSelector"), document.getElementById(`id-acbVrss${c}`).appendChild(e), n < 4 ? n++ : (n = 0, d = 1, c++), s++, a++ } let o = document.createElement("div"); o.id = `id-acbVrss${c + 1}`, o.textContent = " ... ", o.classList.add("cs-acbSelectLine"), document.getElementById("id-acbInnerVerse").appendChild(o), acbScroll("id-acbInnerVerse") } function acbCloseBox() { bookOpen = 0, chapterOpen = 0, verseOpen = 0, versionOpen = 0, document.getElementById("id-acbVersionList").style.display = "none", document.getElementById("id-acbBook").style.display = "none", document.getElementById("id-acbChapter").style.display = "none", document.getElementById("id-acbVerse").style.display = "none", document.getElementById("id-acbFixedPanel").style.display = "none", document.getElementById("id-acbSortBooks").style.display = "none" } function acbRemoveItems(e) { let t = document.getElementById(e); for (; t.firstChild;)t.removeChild(t.firstChild) } window.onload = async () => { let e = !1; localStorage.getItem("loaded") && localStorage.removeItem("loaded"), e = await acbLoadBooks(oldBooks), e && (e = !1, e = await acbLoadChapter()), e && (e = !1, e = await acbStartVerses(1, 1)), e && (document.getElementById(chapterClicked).style.color = "crimson", document.getElementById(chapterClicked).style.backgroundColor = "rgba(112, 111, 111, 0.25)") };