
/*document.addEventListenechapterIndxr("DOMContentLoaded", function () {
    acbStartVersions();
});*/

window.onload = async () => {
    let vrsnRes = false;
    let bkRes = false;
    let chptRes = false;
    let vrssRes = false;

    vrsnRes = await acbStartVersions();
    if (vrsnRes) { bkRes = await acbStartBooks() };
    if (bkRes) { vrssRes = await acbStartVerses() };
    if (vrssRes) { chptRes = await acbStartChapter() };
};

// #region Start functions Section
async function acbStartVersions() {

    let i = 0;
    let url;

    url = `${mainPath}DATA/Versions.jsonc`;
    const versions = await fileFetch(url);
    versions.forEach(version => {
        let a = document.createElement("a");
        a.addEventListener("click", acbChangeVersion, true);
        a.id = `id-acbVrsn${version.id}`;
        a.textContent = version.vn;
        a.dataset.ar = version.ar;
        a.dataset.idx = i;
        a.dataset.loaded = false;
        a.classList.add('cs-acbSelect');
        document.getElementById("id-acbVersion").appendChild(a);
        i++;
    });
    document.getElementById(versionClicked).dataset.loaded = true;
    return Promise.resolve(true);
};

async function acbStartBooks() {

    let aBook = '';
    let i = 0;
    const url = `${mainPath}DATA/Books.jsonc`;
    const books = await fileFetch(url);

    acbRemoveItems('id-acbInnerBook');
    while (i < 39) {
        let a = document.createElement("a");
        a.addEventListener("click", acbChangeBook, true);
        a.id = `id-acbBk${books[i].id}`;
        a.textContent = books[i].t;
        a.dataset.c = books[i].c;
        a.dataset.idx = i;
        a.classList.add('cs-acbSelect');
        aBook = `{id: "${books[i].id}", t: "${books[i].t}, c: ${books[i].c}}"`
        oldBooks.push(aBook);
        document.getElementById("id-acbInnerBook").appendChild(a);
        i++;
    };

    while (i >= 39) {
        aBook = `{id: "${books[i].id}", t: "${books[i].t}, c: ${books[i].c}}"`
        newBooks.push(aBook);
        i++;
        if (i > 65) break;
    };
    return Promise.resolve(true);
};

async function acbStartVerses() {

    let i = 0;
    let x = 0;
    let newLine = 1;
    var verseIndx = 0;

    acbRemoveItems('id-acbInnerChapter');
    const url = `${mainPath}DATA/${versionActive}/${versionActive}Verses.jsonc`;
    const res = await fileFetch(url);
    allVerses.push(res);
    verses = res;

    while (verses[i].bid === 1 && verses[i].cn === 1) {
        if (newLine) {
            let d = document.createElement("div");
            d.id = `id-acbVrss${verseIndx}`;
            d.classList.add('cs-acbSelectLine');
            document.getElementById(`id-acbInnerVerse`).appendChild(d);
            newLine = 0;
        };
        let a = document.createElement("a");
        a.addEventListener("click", acbGoToVerse, true);
        a.id = `id-acbVrs${verses[i].vid}`;
        a.dataset.bid = verses[i].bid;
        a.dataset.cn = verses[i].cn;
        a.dataset.vn = verses[i].vn;
        a.textContent = verses[i].vn;
        a.classList.add('cs-acbSelector');
        document.getElementById(`id-acbVrss${verseIndx}`).appendChild(a);
        if (x < 4) { x++; } else { x = 0; newLine = 1; verseIndx++; };
        i++;
    };
    let d = document.createElement("div");
    d.id = `id-acbVrss${verseIndx + 1}`;
    d.textContent = ' ... ';
    d.classList.add('cs-acbSelectLine');
    document.getElementById(`id-acbInnerVerse`).appendChild(d);
    document.getElementById(verseClicked).style.color = "crimson";
    document.getElementById(verseClicked).style.backgroundColor = "#adb6bb";
    return Promise.resolve(true);
};

async function acbStartChapter() {

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
    document.getElementById(chapterClicked).style.backgroundColor = "#adb6bb";
    return Promise.resolve(true);
};
// #endregion End Start functions Section

// #region Change functions Section
function acbChangeVersion(e) {

    e.preventDefault();
    e.stopImmediatePropagation();

    acbCloseBox();
};

function acbChangeBook(e) {

    e.preventDefault();
    e.stopImmediatePropagation();

    acbCloseBox();
};

function acbChangeChapter(e) {

    e.preventDefault();
    e.stopImmediatePropagation();

    acbCloseBox();
    document.getElementById(chapterClicked).style.color = "black";
    document.getElementById(chapterClicked).style.backgroundColor = "white";
    e.target.style.color = "crimson";
    e.target.style.backgroundColor = "#adb6bb";
    chapterClicked = e.target.id;

};

function acbGoToVerse(e) {

    e.preventDefault();
    e.stopImmediatePropagation();

    acbCloseBox();
    document.getElementById(verseClicked).style.color = "black";
    document.getElementById(verseClicked).style.backgroundColor = "white";
    e.target.style.color = "crimson";
    e.target.style.backgroundColor = "#adb6bb";
    verseClicked = e.target.id;    
};
// #endregion End Change functions Section

// #region OpenClose functions Section
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
            case "id-acbArrow1":
                acbOpenBox("id-acbBook");
                bookOpen = 1;
                break;
            case "id-acbArrow2":
                acbOpenBox("id-acbChapter");
                chapterOpen = 1;
                break;
            case "id-acbArrow3":
                acbOpenBox("id-acbVerse");
                verseOpen = 1;
                break;
            case "id-acbBtn4":
                acbOpenBox('id-acbVersionList');
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
};
// #endregion End OpenClose functions Section

// #region Miscellaneous functions Section

async function fileFetch(url) {

    //nst res = await fetch(url, { mode: 'cors' });
    const res = await fetch(url, { mode: 'cors', headers: {"Content-Type": "text/plain;charset=UTF-8"}, method: "GET" });
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

    document.getElementById("id-acbTestament").textContent = "New Testament"
};

function acbSetOldTestament() {

    document.getElementById("id-acbTestament").textContent = "Old Testament"
};

function acbSort(e) {

    e.preventDefault();
    e.stopImmediatePropagation();

    if (bookOpen === 1) {
        alert('sort');
    };
};

// #endregion End Miscellaneous functions Section
