window.onload = async () => {

    acbLoadBooks(oldBooks);
    acbLoadChapter();
    acbStartVerses(1, 1)
};

// #region Load functions Section
async function acbStartVerses() {
    const url = `${mainPath}DATA/${versionActive}/${versionActive}Verses.json`;
        const verse = await fileFetch(url);
        allVerses.push(verse);
        verses = allVerses[0];
        //document.getElementById(versionClicked).dataset.loaded = 1;
        //document.getElementById(versionClicked).dataset.idx = versionIdx;
        //versionIdx++;
        acbLoadVerses(1, 1)
};

async function acbLoadBooks(books) {

    let i = 0;

    acbRemoveItems('id-acbInnerBook');
    books.forEach(book => {
        let a = document.createElement("a");
        a.addEventListener("click", acbChangeBook, true);
        a.id = `id-acbBk${book.id}`;
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
        a.dataset.cn = i;
        a.textContent = i;
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
    document.getElementById(chapterClicked).style.color = "crimson";
    document.getElementById(chapterClicked).style.backgroundColor = "rgba(112, 111, 111, 0.25)";
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
        a.dataset.bid = verses[i].bid;
        a.dataset.cn = verses[i].cn;
        a.dataset.vn = verses[i].vn;
        a.textContent = verses[i].vn;
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
    document.getElementById(verseClicked).style.color = "crimson";
    document.getElementById(verseClicked).style.backgroundColor = "rgba(112, 111, 111, 0.25)";
};

async function acbLoadText(bid, cn) {

    let newLine = 0;
    let firstLine = 1;
    var pIndx = 0;

    acbRemoveItems('id-acbMainText');

    let p = document.createElement("p");
    p.id = `id-acbTextTitle1`;
    p.textContent = document.getElementById(versionClicked).textContent;
    p.classList.add('cs-acbTextTitle');
    document.getElementById('id-acbMainText').appendChild(p);

    p = document.createElement("p");
    p.id = `id-acbTextTitle2`;
    p.textContent = `${document.getElementById(bookClicked).textContent} ${cn}`;
    p.classList.add('cs-acbTextTitle');
    document.getElementById(`id-acbMainText`).appendChild(p);

    let i = verses.findIndex(vrs => vrs.bid === bid && vrs.cn === cn);
    let pn = verses[i].pn;
    while (verses[i].bid === bid && verses[i].cn === cn) {
        if (firstLine) {
            p = document.createElement("p");
            p.id = `id-acbP${pIndx}`;
            document.getElementById('id-acbMainText').appendChild(p);
            let img = document.createElement("img");
            img.src = "./IMAGES/first-one.png";
            img.alt = "First Verse";
            img.classList = "cs-acbImage2";
            img.title = "Verse One";
            document.getElementById(`id-acbP0`).appendChild(img);
            firstLine = 0;
        };

        if (newLine) {
            let p = document.createElement("p");
            p.id = `id-acbP${pIndx}`;
            document.getElementById(`id-acbMainText`).appendChild(p);
            newLine = 0;
        };
        let sp = document.createElement("span");
        sp.textContent = verses[i].vn;
        sp.classList.add('cs-acbNumber');
        document.getElementById(`id-acbP${pIndx}`).appendChild(sp);

        sp = document.createElement("span");
        sp.textContent = `${verses[i].vt} `;
        sp.classList.add('cs-acbP');
        document.getElementById(`id-acbP${pIndx}`).appendChild(sp);
        if (verses[i].pn !== pn) { pn = verses[i].pn; newLine = 1; pIndx++; };
        i++;
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
    let idx = Number(document.getElementById(versionClicked).dataset.idx);

    if (loaded === 1) {
        verses = allVerses[idx];
    } else {
        const url = `${mainPath}DATA/${versionActive}/${versionActive}Verses.json`;
        const verse = await fileFetch(url);
        allVerses.push(verse);
        verses = allVerses[idx];
        document.getElementById(versionClicked).dataset.loaded = 1;
        document.getElementById(versionClicked).dataset.idx = versionIdx;
        versionIdx++;
    };

    if (verses) {acbLoadVerses(1, 1)};
    document.getElementById('id-acbTextTitle1').textContent = document.getElementById(versionClicked).textContent;
    document.getElementById('id-acbTextTitle2').textContent = "Genesis 1"
    acbCloseBox();
};

function acbChangeBook(e) {

    e.preventDefault();
    e.stopImmediatePropagation();
    acbCloseBox();
    bookClicked = e.target.id;
    //let test =`${document.getElementById(bookClicked).textContent} 1`;
    //document.getElementById("id-acbTextTitle2").textContent = `${document.getElementById(bookClicked).textContent} 1`;
    chapterCount = Number(document.getElementById(bookClicked).dataset.c);
    let bid = Number(document.getElementById(bookClicked).dataset.bid);
    acbLoadChapter();
    acbLoadVerses(bid, 1);
    acbLoadText(bid, 1);
};

function acbChangeChapter(e) {

    this.event.preventDefault();
    this.event.stopImmediatePropagation();
    acbCloseBox();
    document.getElementById(chapterClicked).style.color = "black";
    document.getElementById(chapterClicked).style.backgroundColor = "white";
    e.target.style.color = "crimson";
    e.target.style.backgroundColor = "rgba(112, 111, 111, 0.25)";
    e.target.style.backgroundColor = "rgba(112, 111, 111, 0.25)";
    chapterClicked = e.target.id;
};

function acbGoToVerse(e) {

    e.preventDefault();
    e.stopImmediatePropagation();
    acbCloseBox();
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
            case "id-acbBtn4":
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

// #region Miscellaneous functions Section

async function fileFetch(url) {

    const res = await fetch(url, { mode: 'cors' });
    const aFile = await res.json();
    return Promise.resolve(aFile);
}

function acbRemoveItems(id) {

    let el = document.getElementById(id);
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    };
};

function acbSetNewTestament() {

    document.getElementById("id-acbTestament").textContent = "New Testament";
    newBooks.sort((a, b) => (a.id > b.id) ? 1 : -1);
    acbLoadBooks(newBooks);
    testament = 1;
};

function acbSetOldTestament() {

    document.getElementById("id-acbTestament").textContent = "Old Testament";
    oldBooks.sort((a, b) => (a.id > b.id) ? 1 : -1);
    acbLoadBooks(oldBooks);
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
