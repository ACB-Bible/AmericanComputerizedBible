
document.addEventListener("DOMContentLoaded", function () {
    acbFetchVersions();
});

// #region Fetch functions Section
function acbFetchVersions() {
    alert('test Version');
    acbRemoveItems('id-acbVersion');

}

function acbFetchBooks() {
    alert('test Book');
    acbRemoveItems('id-acbBook');
}

function acbFetchChapters() {
    alert('test Chapter');
    acbRemoveItems('id-acbChapter');
    acbCloseBox();
}

function acbFetchVerses() {
    alert('test Verse');
    acbRemoveItems('id-acbVerse');
    acbCloseBox();
}
// #endregion End Fetch functions Section

// #region Get functions Section
function acbGetVersion() {
    alert('test Version');
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