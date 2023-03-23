
function acbOpenBook() {
    let element = this.event.target;

    this.event.stopImmediatePropagation();
    if (bookOpen === 0) {
        document.getElementById("id-acbBook").style.display = "block";
        bookOpen = 1;
    } else {
        document.getElementById("id-acbBook").style.display = "none";
        bookOpen = 0;
    };

}
function acbSortBook() {

    let element = this.event.target;

    this.event.stopImmediatePropagation();
    if (upDown === 0) {
        element.classList.remove("down");
        element.classList.add("up");
        element.setAttribute("title","Sort Books Biblically");
        upDown = 1;
    } else {
        element.classList.remove("up");
        element.classList.add("down");
        element.setAttribute("title","Sort Books Alphabetically");
        upDown = 0;
    };
}