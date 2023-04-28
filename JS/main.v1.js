window.onload = async () => {

    let res = false;
    res = await acbLoadBooks(oldBooks);
    res = false;
    res = await acbLoadChapter();
    res = false;
    res = await acbStartVerses(1, 1);
    if (res) {
        document.getElementById(chapterClicked).style.color = "crimson";
        document.getElementById(chapterClicked).style.backgroundColor = "rgba(112, 111, 111, 0.25)";
    };
    
};

// #region Load functions Section
async function acbStartVerses() {
    const url = `${mainPath}DATA/${versionActive}/${versionActive}Verses.json`;
    const verse = await fetchJson(url);
    allVerses.push(verse);
    verses = allVerses[0];
    acbLoadVerses(1, 1);
    return Promise.resolve(true);
};

async function acbLoadBooks(books) {

    let i = 0;

    acbRemoveItems('id-acbInnerBook');
    books.forEach(book => {
        let a = document.createElement("a");
        a.addEventListener("click", acbChangeBook, true);
        a.id = `id-acbBk${book.id}`;
        a.rel = "nofollow";
        a.textContent = book.t;
        a.dataset.bid = book.id;
        a.dataset.c = book.c;
        a.dataset.idx = i;
        a.classList.add('cs-acbSelect');
        document.getElementById("id-acbInnerBook").appendChild(a);
        i++;
    });
    return Promise.resolve(true);
};

async function acbLoadChapter() {

    let i = 1;
    let x = 0;
    let newLine = 1;
    var chapterIndx = 0;

    acbCloseBox();
    acbRemoveItems(`id-acbInnerChapter`);
    while (i <= chapterCount) {
        if (newLine) {
            let d = document.createElement("div");
            d.id = `id-acbChpt${chapterIndx}`;
            d.classList.add('cs-acbSelectLine');
            document.getElementById(`id-acbInnerChapter`).appendChild(d);
            newLine = 0;
        };
        let a = document.createElement("a");
        a.addEventListener("click", acbChangeChapter, true);
        a.id = `id-acbChp${i}`;
        a.rel = "nofollow";
        a.textContent = i;
        a.dataset.cn = i;
        a.classList.add('cs-acbSelector');
        document.getElementById(`id-acbChpt${chapterIndx}`).appendChild(a);
        if (x < 4) { x++; } else { x = 0; newLine = 1; chapterIndx++; };
        i++;
    };
    let d = document.createElement("div");
    d.id = `id-acbChpt${chapterIndx + 1}`;
    d.textContent = ' ... ';
    d.classList.add('cs-acbSelectLine');
    document.getElementById(`id-acbInnerChapter`).appendChild(d);
    return Promise.resolve(true);
};

async function acbLoadVerses(bid, cn) {

    let x = 0;
    let y = 0;
    let newLine = 1;
    var verseIndx = 0;

    acbRemoveItems('id-acbInnerVerse');
    let i = verses.findIndex(vrs => vrs.bid === bid && vrs.cn === cn);
    while (verses[i].bid === bid && verses[i].cn === cn) {
        if (newLine) {
            let d = document.createElement("div");
            d.id = `id-acbVrss${verseIndx}`;
            d.classList.add('cs-acbSelectLine');
            document.getElementById(`id-acbInnerVerse`).appendChild(d);
            newLine = 0;
        };
        let a = document.createElement("a");
        a.addEventListener("click", acbGoToVerse, true);
        a.id = `id-acbVrs${y}`;
        a.textContent = verses[i].vn;
        a.rel = "nofollow";
        a.dataset.bid = verses[i].bid;
        a.dataset.cn = verses[i].cn;
        a.dataset.vn = verses[i].vn;
        a.classList.add('cs-acbSelector');
        document.getElementById(`id-acbVrss${verseIndx}`).appendChild(a);
        if (x < 4) { x++; } else { x = 0; newLine = 1; verseIndx++; };
        i++;
        y++;
    };
    let d = document.createElement("div");
    d.id = `id-acbVrss${verseIndx + 1}`;
    d.textContent = ' ... ';
    d.classList.add('cs-acbSelectLine');
    document.getElementById(`id-acbInnerVerse`).appendChild(d);
    acbScroll('id-acbInnerVerse');
};

function acbSingleParagraph(bid, cn, i) {

    var pIndx = 0;

    while (verses[i].bid === bid && verses[i].cn === cn) {

        let p = document.createElement("p");
        p.id = `id-acbP${pIndx}`;
        p.addEventListener("click", acbClickedP, true);
        p.classList.add('cs-acbP');
        document.getElementById(`id-acbMainText`).appendChild(p);
        let sp = document.createElement("span");
        sp.id = `id-acbSP${verses[i].vn}`;
        if (verses[i].vn !== 1) { sp.textContent = verses[i].vn };
        sp.classList.add('cs-acbNumber');
        document.getElementById(`id-acbP${pIndx}`).appendChild(sp);
        sp = document.createElement("span");
        sp.id = `id-acbSP${verses[i].vn}-2`;
        sp.textContent = `${verses[i].vt} `;
        document.getElementById(`id-acbP${pIndx}`).appendChild(sp);
        i++;
        pIndx++;

    };
};

function acbClickedP(e) {

    e.preventDefault();
    e.stopImmediatePropagation();
    id = e.target.id;
    document.getElementById(id).style.color = "black";
    document.getElementById(id).style.backgroundColor = "white";
    document.getElementById(verseClicked).style.color = "black";
    document.getElementById(verseClicked).style.backgroundColor = "white";
};

async function acbLoadText(bid, cn) {

    let newLine = 0;
    var pIndx = 0;

    acbRemoveItems('id-acbMainText');

    let p = document.createElement("p");
    p.id = `id-acbTextTitle1`;
    p.classList.add('cs-acbTextTitle');
    document.getElementById('id-acbMainText').appendChild(p);
    if (document.getElementById(versionClicked).textContent === 'Twenty-First Century Bible®') {
        document.getElementById('id-acbTextTitle1').textContent = 'Twenty-First Century Bible';
        let sp = document.createElement("span");
        sp.textContent = '®';
        sp.classList ="cs-acbTrademark";
        document.getElementById('id-acbTextTitle1').appendChild(sp);
    } else {
        document.getElementById('id-acbTextTitle1').textContent = document.getElementById(versionClicked).textContent;
    };

    p = document.createElement("p");
    p.id = `id-acbTextTitle2`;
    p.textContent = `${document.getElementById(bookClicked).textContent} ${cn}`;
    p.classList.add('cs-acbTextTitle');
    p.classList.add('cs-acbGold');
    document.getElementById(`id-acbMainText`).appendChild(p);

    p = document.createElement("p");
    p.id = `id-acbP${pIndx}`;
    p.addEventListener("click", acbClickedP, true);
    document.getElementById('id-acbMainText').appendChild(p);
    let img = document.createElement("img");
    img.src = "./IMAGES/first-one31.png";
    img.alt = "First Verse";
    img.classList = "cs-acbImage2";
    img.title = "Verse One";
    document.getElementById(`id-acbP0`).appendChild(img);

    let i = verses.findIndex(vrs => vrs.bid === bid && vrs.cn === cn);
    if (verses[i].pn === 0) {
        acbSingleParagraph(bid, cn, Number(i));
    } else {

        let pn = verses[i].pn;
        while (verses[i].bid === bid && verses[i].cn === cn) {

            if (verses[i].pn !== pn) { pn = verses[i].pn; newLine = 1; pIndx++; };
            if (newLine) {
                let p = document.createElement("p");
                p.id = `id-acbP${pIndx}`;
                p.addEventListener("click", acbClickedP, true);
                p.classList.add('cs-acbP');
                document.getElementById(`id-acbMainText`).appendChild(p);
                newLine = 0;
            };

            let sp = document.createElement("span");
            if (verses[i].vn !== 1) { sp.textContent = verses[i].vn };
            sp.id = `id-acbSP${verses[i].vn}`;
            sp.classList.add('cs-acbNumber');
            document.getElementById(`id-acbP${pIndx}`).appendChild(sp);

            sp = document.createElement("span");
            sp.id = `id-acbSP${verses[i].vn}-2`;
            sp.textContent = `${verses[i].vt} `;
            document.getElementById(`id-acbP${pIndx}`).appendChild(sp);
            i++;
        };
    };
};

// #endregion End Load functions Section

// #region Change functions Section
async function acbChangeVersion(e) {

    this.event.preventDefault();
    this.event.stopImmediatePropagation();
    versionClicked = this.event.target.id;
    versionActive = document.getElementById(versionClicked).dataset.ar;
    let loaded = document.getElementById(versionClicked).dataset.loaded;

    if (loaded === 1) {
        let idx = Number(document.getElementById(versionClicked).dataset.idx);
        verses = allVerses[idx];
    } else {
        const url = `${mainPath}DATA/${versionActive}/${versionActive}Verses.json`;
        const verse = await fetchJson(url);
        allVerses.push(verse);
        verses = allVerses[versionIdx];
        document.getElementById(versionClicked).dataset.loaded = 1;
        document.getElementById(versionClicked).dataset.idx = versionIdx;
        versionIdx++;
    };
    let bid = Number(document.getElementById(bookClicked).dataset.bid);
    let cn = Number(document.getElementById(chapterClicked).dataset.cn);
    if (verses) { acbLoadText(bid, cn); };

    if (document.getElementById(versionClicked).textContent === 'Twenty-First Century Bible®') {
        document.getElementById('id-acbTextTitle1').textContent = 'Twenty-First Century Bible';
        let sp = document.createElement("span");
        sp.textContent = '®';
        sp.classList ="cs-acbTrademark";
        document.getElementById('id-acbTextTitle1').appendChild(sp);
    } else {
        document.getElementById('id-acbTextTitle1').textContent = document.getElementById(versionClicked).textContent;
    };

    document.getElementById('id-acbTextTitle2').textContent = `${document.getElementById(bookClicked).textContent} ${cn}`;

    acbCloseBox();
    document.getElementById(chapterClicked).style.color = "crimson";
    document.getElementById(chapterClicked).style.backgroundColor = "rgba(112, 111, 111, 0.25)";
};

function acbChangeBook(e) {

    e.preventDefault();
    e.stopImmediatePropagation();
    acbCloseBox();
    bookClicked = e.target.id;
    chapterCount = Number(document.getElementById(bookClicked).dataset.c);
    let bid = Number(document.getElementById(bookClicked).dataset.bid);
    document.getElementById(chapterClicked).style.color = "black";
    document.getElementById(chapterClicked).style.backgroundColor = "white";
    acbLoadChapter();
    verseClicked = 'id-acbVrs0';
    chapterClicked = 'id-acbChp1';
    acbLoadVerses(bid, 1);
    acbLoadText(bid, 1);
    document.getElementById('id-acbBody').scrollTo(0, 0);
    document.getElementById(chapterClicked).style.color = "crimson";
    document.getElementById(chapterClicked).style.backgroundColor = "rgba(112, 111, 111, 0.25)";
};

function acbChangeChapter(e) {

    e.preventDefault();
    e.stopImmediatePropagation();
    acbCloseBox();
    document.getElementById(chapterClicked).style.color = "black";
    document.getElementById(chapterClicked).style.backgroundColor = "white";
    chapterClicked = e.target.id;
    document.getElementById(chapterClicked).style.color = "crimson";
    document.getElementById(chapterClicked).style.backgroundColor = "rgba(112, 111, 111, 0.25)";
    chapterCount = Number(document.getElementById(bookClicked).dataset.c);
    let bid = Number(document.getElementById(bookClicked).dataset.bid);
    let cn = Number(document.getElementById(chapterClicked).dataset.cn);
    verseClicked = 'id-acbVrs0';
    acbLoadVerses(bid, cn);
    acbLoadText(bid, cn);
    document.getElementById('id-acbBody').scrollTo(0, 0);
};

function acbGoToVerse(e) {

    e.preventDefault();
    e.stopImmediatePropagation();
    let id = `id-acbSP${e.target.dataset.vn}`;
    document.getElementById(id).scrollIntoView({ block: 'center' });
    acbCloseBox();
    document.getElementById(`${id}-2`).style.backgroundColor = "#aed0fc"
    document.getElementById(verseClicked).style.color = "black";
    document.getElementById(verseClicked).style.backgroundColor = "white";
    e.target.style.color = "crimson";
    e.target.style.backgroundColor = "rgba(112, 111, 111, 0.25)";
    verseClicked = e.target.id;
};
// #endregion End Change functions Section

// #region OpenClose functions Section
function acbScroll(id) {

    if (document.getElementById(id)) {
        document.getElementById(id).scrollTo(0, 0);
    };
};

function acbOpenClose() {

    this.event.preventDefault();
    this.event.stopImmediatePropagation();
    let id = this.event.target.id;

    if (id === "id-acbSelectContainer" || id === "id-acbFixedPanel" || versionOpen === 1 || bookOpen === 1 || chapterOpen === 1 || verseOpen === 1) {
        acbCloseBox();
        return;
    } else {

        switch (id) {
            case "id-acbBookLabel":
                acbOpenBox("id-acbBook");
                document.getElementById("id-acbSortBooks").style.display = "inline-block";
                acbScroll("id-acbInnerBook");
                bookOpen = 1;
                break;
            case "id-acbChapterLabel":
                acbOpenBox("id-acbChapter");
                chapterOpen = 1;
                break;
            case "id-acbVerseLabel":
                acbOpenBox("id-acbVerse");
                verseOpen = 1;
                break;
            case "id-acbBtn3":
            case "id-acbBtn3":
                acbOpenBox('id-acbVersionList');
                acbScroll("id-acbInnerVersion");
                versionOpen = 1;
                break;
        };
    };
};

function acbOpenBox(id) {

    document.getElementById(id).style.display = "block";
    document.getElementById("id-acbFixedPanel").style.display = "block";
};

function acbCloseBox() {

    bookOpen = 0;
    chapterOpen = 0;
    verseOpen = 0;
    versionOpen = 0;
    document.getElementById("id-acbVersionList").style.display = "none";
    document.getElementById("id-acbBook").style.display = "none";
    document.getElementById("id-acbChapter").style.display = "none";
    document.getElementById("id-acbVerse").style.display = "none";
    document.getElementById("id-acbFixedPanel").style.display = "none";
    document.getElementById("id-acbSortBooks").style.display = "none";
};
// #endregion End OpenClose functions Section

// #region Miscellaneous functions Sectionasync function fetchJson(url) {
async function fetchFile(url) {
    document.getElementById('id-acbHtml').style.cursor = 'wait';
    document.getElementById('id-acbHtml').style.pointerEvents = 'none';
    const res = await fetch(url, { mode: 'cors' });
    if (res) {
        document.getElementById('id-acbHtml').style.cursor = 'default'
        document.getElementById('id-acbHtml').style.pointerEvents = 'auto';
    };
    return Promise.resolve(aFile);
};

async function fetchJson(url) {

    document.getElementById('id-acbHtml').style.cursor = 'wait';
    document.getElementById('id-acbHtml').style.pointerEvents = 'none';
    const res = await fetch(url, { mode: 'cors' });
    const aFile = await res.json();
    if (aFile) {
        document.getElementById('id-acbHtml').style.cursor = 'default';
        document.getElementById('id-acbHtml').style.pointerEvents = 'auto';
    };
    return Promise.resolve(aFile);
};

function acbRemoveItems(id) {

    let el = document.getElementById(id);
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    };
};

async function acbSetNewTestament() {

    document.getElementById("id-acbTestament").textContent = "New Testament";
    newBooks.sort((a, b) => (a.id > b.id) ? 1 : -1);
    bookClicked = 'id-acbBk40';
    chapterClicked = 'id-acbChp1';
    verseClicked = 'id-acbVrs0';
    chapterCount = 28;
    let res = false;
    res = await acbLoadBooks(newBooks);
    acbLoadChapter();
    acbLoadVerses(1, 1);
    if (res) { acbLoadText(40, 1) };
    document.getElementById(chapterClicked).style.color = "crimson";
    document.getElementById(chapterClicked).style.backgroundColor = "rgba(112, 111, 111, 0.25)";
    document.getElementById('id-acbBody').scrollTo(0, 0);
    testament = 1;
};

async function acbSetOldTestament() {

    document.getElementById("id-acbTestament").textContent = "Old Testament";
    oldBooks.sort((a, b) => (a.id > b.id) ? 1 : -1);
    bookClicked = 'id-acbBk1';
    chapterClicked = 'id-acbChp1';
    verseClicked = 'id-acbVrs0';
    chapterCount = 50;
    let res = false;
    res = await acbLoadBooks(oldBooks);
    acbLoadChapter();
    acbLoadVerses(1, 1);
    acbLoadText(1, 1);
    document.getElementById(chapterClicked).style.color = "crimson";
    document.getElementById(chapterClicked).style.backgroundColor = "rgba(112, 111, 111, 0.25)";
    document.getElementById('id-acbBody').scrollTo(0, 0);
    testament = 0;
};

function acbSortBooks() {

    this.event.preventDefault();
    this.event.stopImmediatePropagation();

    if (bookOpen === 1) {
        switch (testament) {
            case 0:
                if (bookAlph) {
                    oldBooks.sort((a, b) => (a.id > b.id) ? 1 : -1);
                    acbLoadBooks(oldBooks);
                    bookAlph = false;
                    document.getElementById("id-acbSortBooks").title = "Sort Books Alphabetically";
                } else {
                    oldBooks.sort((a, b) => (a.t > b.t) ? 1 : -1);
                    acbLoadBooks(oldBooks);
                    bookAlph = true;
                    document.getElementById("id-acbSortBooks").title = "Sort Books Biblically";
                };
                break;
            case 1:
                if (bookAlph) {
                    newBooks.sort((a, b) => (a.id > b.id) ? 1 : -1);
                    acbLoadBooks(newBooks);
                    bookAlph = false;
                    document.getElementById("id-acbSortBooks").title = "Sort Books Alphabetically";
                } else {
                    newBooks.sort((a, b) => (a.t > b.t) ? 1 : -1);
                    acbLoadBooks(newBooks);
                    document.getElementById("id-acbSortBooks").title = "Sort Books Biblically";
                    bookAlph = true;
                };
                break;
        };
    };
};

// #endregion End Miscellaneous functions Section
