//text-color
textColorInput.addEventListener("click", function () {
    textColor.click();
})
textColor.addEventListener("change", function (e) {
    let color = textColor.value;
    let address = addressInput.value;;
    let { rid, cid } = getRidCidFromAddress(address);
    let tobeChangedCell = document.querySelector(`.grid .cell[rId='${rid}'][cId='${cid}']`);
    tobeChangedCell.style.color = color;
    db[rid][cid].color = color;
})

// background-color
backgroundInput.addEventListener("click", function (e) {
    backgroundColor.click();
})
backgroundColor.addEventListener("change", function (e) {
    let color = backgroundColor.value;
    let address = addressInput.value;
    let { rid, cid } = getRidCidFromAddress(address);
    let tobeChangedCell = document.querySelector(`.grid .cell[rId='${rid}'][cId='${cid}']`);
    tobeChangedCell.style.backgroundColor = color;
    db[rid][cid].backgroundColor = color;
})

//font-size
fontSizeInput.addEventListener("change", function () {
    let fontSize = fontSizeInput.value;
    let address = addressInput.value;;
    let { rid, cid } = getRidCidFromAddress(address);
    let tobeChangedCell = document.querySelector(`.grid .cell[rId='${rid}'][cId='${cid}']`);
    tobeChangedCell.style.fontSize = fontSize + "px";
    db[rid][cid].fontSize = fontSize;
})
console.log(fontFamilyInput);
//font family
fontFamilyInput.addEventListener("change", function () {
    let fontFamily = fontFamilyInput.value;
    let address = addressInput.value;;
    let { rid, cid } = getRidCidFromAddress(address);
    let tobeChangedCell = document.querySelector(`.grid .cell[rId='${rid}'][cId='${cid}']`);
    tobeChangedCell.style.fontFamily = fontFamily;
    db[rid][cid].fontFamily = fontFamily;
})
boldIcon.addEventListener("click", function () {
    let address = addressInput.value;
     let { rid, cid } = getRidCidFromAddress(address);
    let tobeChangedCell = document.querySelector(`.grid .cell[rId='${rid}'][cId='${cid}']`);
    let cellObj = db[rid][cid];
    if (cellObj.bold) {
        tobeChangedCell.style.fontWeight = "normal";
        boldIcon.classList.remove("selected");
        cellObj.bold = false;
    } else {
        tobeChangedCell.style.fontWeight = "bold";
        boldIcon.classList.add("selected");
        cellObj.bold = true;
    }
})
italicIcon.addEventListener("click", function () {
    let address = addressInput.value;
     let { rid, cid } = getRidCidFromAddress(address);
    let tobeChangedCell = document.querySelector(`.grid .cell[rId='${rid}'][cId='${cid}']`);
    let cellObj = db[rid][cid];
    if (cellObj.italic) {
        tobeChangedCell.style.fontStyle = "normal";
        italicIcon.classList.remove("selected");
        cellObj.italic = false;
    } else {
        tobeChangedCell.style.fontStyle = "italic";
        italicIcon.classList.add("selected");
        cellObj.italic = true;
    }
})
underlineIcon.addEventListener("click", function () {
    let address = addressInput.value;
    let { rid, cid } = getRidCidFromAddress(address);
    let tobeChangedCell = document.querySelector(`.grid .cell[rId='${rid}'][cId='${cid}']`);
    let cellObj = db[rid][cid];
    if (cellObj.underline) {
        tobeChangedCell.style.textDecoration = "none";
        underlineIcon.classList.remove("selected");
        cellObj.underline = false;
    } else {
        tobeChangedCell.style.textDecoration = "underline";
        underlineIcon.classList.add("selected");
        cellObj.underline = true;
    }
})
alignmentContainer.addEventListener("click", function (e) {
    if (e.target !== alignmentContainer) {
        let classesArr = e.target.classList;
        let hAlignment = classesArr[classesArr.length - 1];
        let address = addressInput.value;
        let { rid, cid } = getRidCidFromAddress(address);
        let tobeChangedCell = document.querySelector(`.grid .cell[rId='${rid}'][cId='${cid}']`);
        tobeChangedCell.style.textAlign = hAlignment;
        let optionElements = alignmentContainer.children;
        for (let i = 0; i < optionElements.length; i++) {
            optionElements[i].classList.remove("selected");
        }
        e.target.classList.add("selected");
        db[rid][cid].halign = hAlignment;
    }
})
function getRidCidFromAddress(address) {
    // A-Z, 1-100
    let AsciiValue = address.charCodeAt(0);
    let cid = AsciiValue - 65;
    let rid = Number(address.substring(1)) - 1;
    return {
        rid: rid, cid: cid
    }
}

