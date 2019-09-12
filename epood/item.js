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
   // alert(combined + combined2+ combined3)


    const container = document.createElement("div");
    container.className = "itemContainer";

    const image = document.createElement("img");
    image.src = src;
    image.className = "item_image";

    const titleElement = document.createElement("h2");
    titleElement.textContent = title;
    titleElement.className = "item_title";

    const description = "sisutekst";
    const textElement = document.createElement("p");
    textElement.textContent = description;
    textElement.className = "item_description";

    const costElement = document.createElement("div");
    costElement.textContent = cost;
    costElement.className = "item_price";

    container.append(image);
    container.append(titleElement);
    container.append(textElement);
    container.append(costElement);

      window.addEventListener("load", () =>{
        const app = document.getElementById("item-body");
        app.append(container);
    });