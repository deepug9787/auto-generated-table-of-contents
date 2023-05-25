"use strict";

/* Generate toc */
const toc = document.querySelector(".toc");
const mainEl = document.querySelector("main");
const mainHeadingsEl = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
const listItemTemplate = document.querySelector("#toc-list-item");
let baseUl;
var H1Count = 0,
    H2Count = 0,
    H3Count = 0,
    H4Count = 0,
    H5Count = 0,
    H6Count = 0;

for (const heading of mainHeadingsEl) {
    const tagName = heading.tagName;

    const count = ++window[tagName + "Count"];
    heading.id = `${tagName}-${count}`;

    const listItem = listItemTemplate.content.cloneNode(true);
    listItem.querySelector("li").classList.add(tagName);
    listItem.querySelector("a").textContent = heading.textContent;
    listItem.querySelector("a").setAttribute("href", `#${heading.id}`);

    if (tagName === "H1") {
        baseUl = document.createElement("UL");
        baseUl.append(listItem);
        toc.append(baseUl);
    } else {
        const headingLevel = Number(tagName[1]);
        let parentHeadingAll = baseUl.querySelectorAll(`.H${headingLevel - 1}`);
        const parentHeadingLast = parentHeadingAll[parentHeadingAll.length - 1];

        if (!parentHeadingLast.querySelector(`.${tagName}`)) {
            const ul = document.createElement("UL");
            ul.append(listItem);
            parentHeadingLast.append(ul);

            if (!parentHeadingLast.classList.contains("H1")) {
                parentHeadingLast.querySelector("a").classList.add("accordion-title");
            }
        } else {
            const ul = parentHeadingLast.querySelector("ul");
            ul.append(listItem);
        }
    }
}

/* toc accordion */
const accordionItems = document.querySelectorAll(".accordion-title");

for (const item of accordionItems) {
    item.addEventListener("click", function () {
        item.nextElementSibling.classList.toggle("show");
    });
}
