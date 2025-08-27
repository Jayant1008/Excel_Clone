// A-Z
let topRow = document.querySelector(".top_row");
// 1-100
let leftCol = document.querySelector(".left_col");
// grid
let grid = document.querySelector(".grid");
//formula bar
let addressInput = document.querySelector(".address-input");
let formulaInput = document.querySelector(".formula-input");

//tools
let fontSizeInput = document.querySelector(".size-select");
let fontFamilyInput = document.querySelector(".font-select");
let boldIcon = document.querySelector(".bx-bold");
let underlineIcon = document.querySelector(".bx-underline");
let italicIcon = document.querySelector(".bx-italic");
let alignmentContainer = document.querySelector(".alignment");
let textColor = document.querySelector(".text-color");
let textColorInput = document.querySelector(".bx-font-color");
let backgroundColor = document.querySelector(".background-color");
let backgroundInput = document.querySelector(".bx-paint");
let createSheetIcon = document.querySelector(".add-sheet");
let sheetList = document.querySelector(".sheets-list");
let firstSheet = document.querySelector(".sheet");

for(let i=0;i<26;i++){
    let div = document.createElement("div");
    div.setAttribute("class","cell");
    div.textContent = String.fromCharCode(65+i);
    topRow.appendChild(div)
}


for (let i = 1; i <= 100; i++) {
    let div = document.createElement("div");
    div.setAttribute("class", "cell");
    div.textContent = i;
    leftCol.appendChild(div)
}

for (let i = 0; i < 100; i++) {
    let row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 26; j++) {
        let div = document.createElement("div");
        div.setAttribute("class", "cell");
        div.setAttribute("contentEditable", "true")
        div.setAttribute("rId", i);
        div.setAttribute("cId", j);
        row.appendChild(div);
    }
    grid.appendChild(row)
}

//store multiple sheets data
let sheetDb = [];
// default value put for every cell
function initDB() {
    let db = [];
    for (let i = 0; i < 100; i++) {
        let row_i = [];
        for (let j = 0; j < 26; j++) {
            let cellObject = {
                color: "black",
                backgroundColor: "white",
                fontFamily: "'Arial'",
                fontSize: 14,
                halign: "center",
                italic: false,
                underline: false,
                bold: false,
                value: "",
                formula: "",
                children: []
            }
            row_i.push(cellObject)
        }
        db.push(row_i);
    }
    sheetDb.push(db);
}
initDB();
let db = sheetDb[0];

//detect cell click
let allCells = document.querySelectorAll(".grid .cell");
for (let i = 0; i < allCells.length; i++) {
    // allCells[i].addEventListener("input", function (e) {
    //     let rid = Number(allCells[i].getAttribute("rId"));
    //     let cid = Number(allCells[i].getAttribute("cId"));

    //     db[rid][cid].value = allCells[i].innerText; // store typed text into db
    // });

    allCells[i].addEventListener("click", function (e) {
        let prevAddress = addressInput.value;
        if (prevAddress != "") {
            let ridcidObj = getRidCidFromAddress(prevAddress);
            let prevCell = document.querySelector(`.grid .cell[rId='${ridcidObj.rid}'][cId='${ridcidObj.cid}']`);
            prevCell.style.border = "0.1px solid gray";
            prevCell.style.borderRight = "none";
            prevCell.style.borderTop = "none";
        }

        let rid = allCells[i].getAttribute("rId");
        let cid = allCells[i].getAttribute("cId");
        rid = Number(rid);
        cid = Number(cid);
        addressInput.value = String.fromCharCode(cid + 65) + (rid + 1);

        let cCell = allCells[i];
        cCell.style.border = "2px solid #1B9CFC";
        let cellObject = db[rid][cid];
        fontSizeInput.value = cellObject.fontSize;
        boldIcon.classList.remove("selected");
        italicIcon.classList.remove("selected");
        underlineIcon.classList.remove("selected");
        let optionElements = alignmentContainer.children;
        for (let i = 0; i < optionElements.length; i++) {
            optionElements[i].classList.remove("selected");
        }
        // boldness
        if (cellObject.bold) {
            boldIcon.classList.add("selected");
        }
        if (cellObject.italic) {
            italicIcon.classList.add("selected");
        }
        if (cellObject.underline) {
            underlineIcon.classList.add("selected");
        }
        if (cellObject.halign) {
            for (let i = 0; i < optionElements.length; i++) {
                let elementClasses = optionElements[i].classList;
                let hAlignment = elementClasses[elementClasses.length - 1];
                if (hAlignment == cellObject.halign) {
                    elementClasses.add("selected");
                }
            }
        }
        //last input formula
        formulaInput.value = cellObject.formula
    })

}

let firstCell = document.querySelector(".grid .cell[rId='0'][cId='0']");
firstCell.click();
firstCell.focus();

firstSheet.addEventListener("click", function (e) {
    for (let i = 0; i < sheetList.children.length; i++) {
        sheetList.children[i].classList.remove("active-sheet")
    }
    
    firstSheet.classList.add("active-sheet");
    db = sheetDb[0];
    setUI();

})

createSheetIcon.addEventListener("click", function (e) {
    let noofChildren = sheetList.children.length;
    let newSheet = document.createElement("div");
    newSheet.setAttribute("class", "sheet");
    newSheet.setAttribute("sheetIdx", noofChildren);
    newSheet.textContent = `Sheet ${noofChildren + 1}`
    sheetList.appendChild(newSheet);
    initDB();
    newSheet.addEventListener("click", function () {
        for (let i = 0; i < sheetList.children.length; i++) {
            sheetList.children[i].classList.remove("active-sheet")
        }
        newSheet.classList.add("active-sheet");
        let index = newSheet.getAttribute("sheetIdx");
        db = sheetDb[index];
        setUI();

    })
    newSheet.click();

})
function setUI() {
    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 26; j++) {
            let cellObject = db[i][j];
            let tobeChangedCell = document.querySelector(`.grid .cell[rId='${i}'][cId='${j}']`);
            tobeChangedCell.innerText = cellObject.value;
            tobeChangedCell.style.color = cellObject.color;
            tobeChangedCell.style.backgroundColor = cellObject.backgroundColor;
            tobeChangedCell.style.fontFamily = cellObject.fontFamily;
            tobeChangedCell.style.textAlign = cellObject.halign;
            tobeChangedCell.style.textDecoration = cellObject.underline == false ? "none" : "underline";
            tobeChangedCell.style.fontStyle = cellObject.italic == false ? "normal" : "italic";
            tobeChangedCell.style.fontSize = cellObject.fontSize;
        }
    }
}