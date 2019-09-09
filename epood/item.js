    const x = window.location;
    console.log(x);
    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get("title");
    const cost = urlParams.get("cost");
    const src = urlParams.get("src");
    const combined = "Title: " + title;
    const combined2 = " Cons: " +cost;
    const combined3 = " Path: " + src;
    console.log();
    alert(combined + combined2+ combined3)


    const element = document.createElement("div");
    element.append(document.createTextNode("Hello World!"));

    const app = document.getElementById("item-body");
    app.append(element);