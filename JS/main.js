
/*document.addEventListener("DOMContentLoaded", function () {
    acbFetchVersions();
});*/
window.onload = () => {
    acbFetchVersions();
    acbFetchBooks();
    acbFetchVerses();
};

// #region Fetch functions Section
async function acbFetchVersions() {

    this.event.stopImmediatePropagation();
    this.event.preventDefault();
    let i = 1;
    const url = `${mainDataPath}Versions.jsonc`;
    const res = await fetch(url, { mode: 'cors' });
    const versions = await res.json();

    versions.forEach(version => {
        let a = document.createElement("a");
        a.addEventListener("click", acbGetVersion, true);
        a.id = version.id;
        a.textContent = version.vn;
        a.dataset.ar = version.ar;
        a.dataset.loaded = i;
        i = 0;
        a.classList.add('cs-acbSelect');
        document.getElementById("id-acbVersion").appendChild(a);
    });
};

async function acbFetchBooks() {

    this.event.stopImmediatePropagation();
    this.event.preventDefault();
    const url = `${mainDataPath}Books.jsonc`;
    const res = await fetch(url, { mode: 'cors' });
    const fetchBooks = await res.json();
    let aBook = '';
    acbRemoveItems('id-acbInnerBook');
    fetchBooks.forEach(book => {
        if (book.id < 40) {
            let a = document.createElement("a");
            a.addEventListener("click", acbGetBook, true);
            a.id = `id-acbBk${book.id}`;
            a.textContent = book.t;
            a.dataset.c = book.c;
            a.classList.add('cs-acbSelect');
            aBook = `{id: ${book.id}, title: ${book.t}}`;
            oldBooks.push(aBook);
            document.getElementById("id-acbInnerBook").appendChild(a);
        } else {
            aBook = `{id: "${book.id}", title: "${book.t}}"`
            newBooks.push(aBook);
        };
    });
};

async function acbFetchVerses() {

    this.event.stopImmediatePropagation();
    this.event.preventDefault();
    const url = `${mainDataPath}TWF/TWFVerses.jsonc`;
    const res = await fetch(url, { mode: 'cors' });
    const fetchVerses = await res.json();
    let aVerse = '';
    let holdVerse = [];

    acbRemoveItems('id-acbInnerChapter');
    fetchVerses.forEach(verse => {

        let a = document.createElement("a");
        a.addEventListener("click", acbGetChapter, true);
        a.id = `id-acbChp${verse.id}`;
        a.textContent = verse.vt;
        a.dataset.cn = verse.cn;
        a.dataset.vn = verse.vn;
        a.classList.add('cs-acbSelect');
        aVerse = `{id: ${verse.id}, cn: ${verse.cn}, pn: ${verse.pn}, vt: ${verse.vt}, jq: ${verse.jq}} `;
        holdVerse.push(aVerse);
        document.getElementById("id-acbInnerChapter").appendChild(a);
    });
    verses.push(holdVerse);
}
// #endregion End Fetch functions Section

// #region Get functions Section
function acbGetVersion() {
    alert('test Version1');
    acbCloseBox();
}

function acbGetBook() {
    alert('test Book');
    acbCloseBox();
}

function acbGetChapter() {
    alert('test Chapter');
    acbCloseBox();
}

function acbGetVerse() {
    alert('test Verse');
    acbCloseBox();
}
// #endregion End Get functions Section

// #region OpenClose functions Section

function acbOpenClose() {

    let id = this.event.target.id;
    this.event.stopImmediatePropagation();
    this.event.preventDefault();

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

function acbSort() {

    this.event.stopImmediatePropagation();
    this.event.preventDefault();
    if (bookOpen === 1) {
        alert('sort');
    };
};

// #endregion End Miscellaneous functions Section