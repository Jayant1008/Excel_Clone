for (let i = 0; i < allCells.length; i++) {
    allCells[i].addEventListener("blur", function cellHelper(e) {
        let content = allCells[i].textContent;
        let address = addressInput.value;
        let { rid, cid } = getRidCidFromAddress(address);
        let cell = db[rid][cid];
        if (cell.value == content) {
            return;
        }
        if (cell.formula) {
            removeFormula(address, cell.formula);
            cell.formula = "";
        }
        updateUI(content, rid, cid);
    })
}
formulaInput.addEventListener("keydown", function (e) {
    if (e.key == "Enter" && formulaInput.value != "") {
        let cFormula = formulaInput.value;
        let address = addressInput.value;
        let { rid, cid } = getRidCidFromAddress(address);
        let cellObj = db[rid][cid];
        if (cellObj.formula != cFormula) {
            removeFormula(address, cellObj.formula);
        }
       
        let value = evaluateFormula(cFormula);
        updateUI(value, rid, cid);
        cellObj.formula = cFormula;
        setFormula(addressOfTheCell, cFormula);
    }
})
function evaluateFormula(formula) {
    let formulaEntities = formula.split(" ");
    // [(,A1,+,A2,)]
    for (let i = 0; i < formulaEntities.length; i++) {
        let ascii = formulaEntities[i].charCodeAt(0);
        if (ascii >= 65 && ascii <= 90) {
            let { rid, cid } = getRidCidFromAddress(formulaEntities[i]);
            let value = db[rid][cid].value;
            formula = formula.replace(formulaEntities[i], value);
        }
    }
    let result = eval(formula);
    return result;
}
function setFormula(address, formula) {
    let formulaEntities = formula.split(" ");
    for (let i = 0; i < formulaEntities.length; i++) {
        let ascii = formulaEntities[i].charCodeAt(0);
        if (ascii >= 65 && ascii <= 90) {
            let { rid, cid } = getRidCidFromAddress(formulaEntities[i]);
            let children = db[rid][cid].children;
            children.push(address);
        }
    }
}
function removeFormula(address, formula) {
    let formulaEntities = formula.split(" ");
    for (let i = 0; i < formulaEntities.length; i++) {
        let ascii = formulaEntities[i].charCodeAt(0);
        if (ascii >= 65 && ascii <= 90) {
            let { rid, cid }= getRidCidFromAddress(formulaEntities[i]);
            let children = db[rid][cid].children;
            let idx = children.indexOf(address);
            children.splice(idx, 1);
        }
    }
}

function updateUI(value, rid, cid) {
    let tobeChangedCell = document.querySelector(`.grid .cell[rId='${rid}'][cId='${cid}']`);
    tobeChangedCell.textContent = value;
    db[rid][cid].value = value;
    let childrenArr = db[rid][cid].children;
    for (let i = 0; i < childrenArr.length; i++) {
        let chriciobj = getRidCidFromAddress(childrenArr[i]);
        let chCellObj = db[chriciobj.rid][chriciobj.cid];
        let value = evaluateFormula(chCellObj.formula);
        updateUI(value, chriciobj.rid, chriciobj.cid)
    }
}