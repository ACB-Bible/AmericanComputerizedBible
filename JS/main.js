window.onload = async () => {

    acbLoadBooks(oldBooks)
};

// #region Load functions Section

async function acbLoadBooks(books) {

    let i = 0;

    acbRemoveItems('id-acbInnerBook');
    books.forEach(book => {
        let a = document.createElement("a");
        a.addEventListener("click", acbChangeBook, true);
        a.id = `id-acbBk${book.id}`;
        a.textContent = book.t;
        a.dataset.c = books.c;
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
        a.addEventListener("click", acbChangeChapter(this), true);
        a.id = `id-acbChp${i}`;
        //a.dataset.cn = i;
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

async function acbLoadVerses(verses, bid, cn) {

    let i = 0;
    let x = 0;
    let newLine = 1;
    var verseIndx = 0;

    acbRemoveItems('id-acbInnerVerse');
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
    document.getElementById(verseClicked).style.backgroundColor = "rgba(112, 111, 111, 0.25)";
    return Promise.resolve(true);
};
// #endregion End Load functions Section

// #region Change functions Section
async function acbChangeVersion() {

    this.event.preventDefault();
    this.event.stopImmediatePropagation();
    versionClicked = this.event.target.id;
    versionActive = document.getElementById(versionClicked).dataset.ar;
    let versionIdx = allVerses.length;
    //document.getElementById(versionClicked).dataset.idx = versionIdx;
    let loaded = document.getElementById(versionClicked).dataset.loaded;
    let returned = false;

    if (loaded === "1") {
        //alert("loaded version")
        returned = acbLoadVerses(allVerses[versionIdx], 1, 1);
    } else {
        //alert("load Version")
        const url = `${mainPath}DATA/${versionActive}/${versionActive}Verses.json`;
        const res = await fileFetch(url);
        allVerses.push(res);
        if (allVerses[versionIdx]) { returned = await acbLoadVerses(allVerses[versionIdx], 1, 1) };
    };
    if (returned) { acbScroll('id-acbInnerVerse') };
    document.getElementById('cs-acbTextTitle').textContent = document.getElementById(versionClicked).dataset.textContent;
    document.getElementById('cs-acbTextTitle2').textContent = "Genesis 1"
    acbCloseBox();
};

function acbChangeBook(e) {

    e.preventDefault();
    e.stopImmediatePropagation();
    alert(e.target.id)
    acbCloseBox();
};

function acbChangeChapter(e) {

    e.preventDefault();
    e.stopImmediatePropagation();
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
