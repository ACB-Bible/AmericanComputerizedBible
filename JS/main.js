function acbVersion() {
    alert('test');
    acbClose();
}

function acbSetOldTestament() {

    document.getElementById("id-acbTestament").textContent = "Old Testament"
};

function acbSetNewTestament() {

    document.getElementById("id-acbTestament").textContent = "New Testament"
};

function acbOpenBook() {

    this.event.stopImmediatePropagation();
    this.event.preventDefault();
    if (bookOpen === 0) {
        document.getElementById("id-acbBook").style.display = "block";
        document.getElementById("id-acbFixedPanel").style.display = "block";
        bookOpen = 1;
    } else {
        document.getElementById("id-acbBook").style.display = "none";
        document.getElementById("id-acbFixedPanel").style.display = "none";
        bookOpen = 0;
    };
};

function acbOpenVersion() {

    this.event.stopImmediatePropagation();
    this.event.preventDefault();
    if (versionOpen === 0) {
        document.getElementById("id-acbVersion").style.display = "block";
        document.getElementById("id-acbFixedPanel").style.display = "block";
        versionOpen = 1;
    } else {
        document.getElementById("id-acbVersion").style.display = "none";
        document.getElementById("id-acbFixedPanel").style.display = "none";
        versionOpen = 0;
    };
};

function acbClose() {

    if (bookOpen === 1) {
        document.getElementById("id-acbBook").style.display = "none";
        document.getElementById("id-acbFixedPanel").style.display = "none";
        bookOpen = 0;
        return;
    }

    if (versionOpen === 1) {
        document.getElementById("id-acbVersion").style.display = "none";
        document.getElementById("id-acbFixedPanel").style.display = "none";
        versionOpen = 0;
        return;
    };
};