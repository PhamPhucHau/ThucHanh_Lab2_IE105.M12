window.onload = function () {
    obj = {
        gui: document.getElementById("gui"),
        comment1: document.getElementById("comment")
    }

    obj.gui.onclick = function () {
        if (obj.comment1.value == "" || obj.comment1.value == null) {
            alert("Comment is not emty");
        }
    }
}
