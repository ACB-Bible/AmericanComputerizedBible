//The main.js Javascript file contains all the code needed to initialize the index.html page and loads first
window.onload = async () => {

    let res = false;
    if (localStorage.getItem("loaded")) {localStorage.removeItem("loaded")};
    res = await acbLoadBooks(oldBooks);
    if (res) { res = false; res = await acbLoadChapter() };
    if (res) { res = false; res = await acbStartVerses(1, 1) };
    if (res) {
        document.getElementById(chapterClicked).style.color = "crimson";
        document.getElementById(chapterClicked).style.backgroundColor = "rgba(112, 111, 111, 0.25)";
    };
    document.getElementById("id-acbIntro").textContent = "American Computerized Bible";
};

async function acbStartVerses(bid, cn) {
    const url = `${mainPath}DATA/${versionActive}/${versionActive}Verses.json`;
    const verse = await fetchJson(url);
    allVerses.push(verse);
    verses = allVerses[0];
    acbLoadVerses(bid, cn);
    return Promise.resolve(true);
};

async function acbLoadBooks(books) {

    let i = 0;

    acbRemoveItems('id-acbInnerBook');
    books.forEach(book => {
        let sp = document.createElement("span");
        sp.addEventListener("click", acbChangeBook, true);
        sp.id = `id-acbBk${book.id}`;
        sp.textContent = book.t;
        sp.dataset.bid = book.id;
        sp.dataset.c = book.c;
        sp.dataset.idx = i;
        sp.classList.add('cs-acbSelect');
        document.getElementById("id-acbInnerBook").appendChild(sp);
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
        let sp = document.createElement("span");
        sp.addEventListener("click", acbChangeChapter, true);
        sp.id = `id-acbChp${i}`;
        sp.textContent = i;
        sp.dataset.cn = i;
        sp.classList.add('cs-acbSelector');
        document.getElementById(`id-acbChpt${chapterIndx}`).appendChild(sp);
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
        let sp = document.createElement("span");
        sp.addEventListener("click", acbGoToVerse, true);
        sp.id = `id-acbVrs${y}`;
        sp.textContent = verses[i].vn;
        sp.dataset.bid = verses[i].bid;
        sp.dataset.cn = verses[i].cn;
        sp.dataset.vn = verses[i].vn;
        sp.classList.add('cs-acbSelector');
        document.getElementById(`id-acbVrss${verseIndx}`).appendChild(sp);
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

function acbRemoveItems(id) {

    let el = document.getElementById(id);
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    };
};
