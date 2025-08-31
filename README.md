# Excel Clone

A simple spreadsheet application built using **HTML, CSS, and JavaScript**.  
It supports editing cells, writing formulas (like `=A1 + B2`), and automatically updating dependent cells (including transitive dependencies).

---

##  Features

- ✍️ **Cell Editing**
  - Directly type values into cells.  
  - If a cell already had a formula, editing clears it and makes the cell independent.  

- ➕ **Formulas**
  - Supports expressions like:  
    - `=A1 + B1`  
    - `=A1 * 2`  
    - `=(A1 + B1) * 3`  
  - References other cells using **Excel-style addresses** (`A1`, `B2`, etc.).  
  - Uses `eval()` to calculate arithmetic expressions once references are replaced with values.  

- 🔗 **Dependency Tracking**
  - Each cell keeps track of its **children** (cells depending on it).  
  - When a cell changes:  
    - Its value is updated.  
    - All dependent cells are recalculated recursively (**supports transitive updates**).  

  **Example:**  
  - `B1 = A1 + 5`  
  - `C1 = B1 * 2`  
  - Updating `A1` → updates `B1` → updates `C1`.  

- ❌ **Formula Removal**
  - If a cell with a formula is edited directly:  
    - Its formula is removed.  
    - Dependencies are cleared from parent cells.  

---

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS  
- **Logic**: JavaScript (Vanilla, no frameworks)  

---

## 🗂️ Data Model

Each cell is represented in a **2D array (`db`)**, storing:  
- `value` → final evaluated result  
- `children` → list of dependent cells  

---

## ⚙️ How It Works

- **Cell Input (Blur Event)**  
  - User types in a cell and leaves it.  
  - If value is same → nothing changes.  
  - If formula existed → it’s removed.  
  - Cell value is updated, and all children update recursively.  

- **Formula Input (Enter Key)**  
  - User enters formula in formula bar → presses Enter.  
  - Formula is parsed:  
    - Cell references (A1, B2, …) replaced with values.  
    - Expression is evaluated using `eval`.  
    - Dependencies are registered in parent cells.  
  - Value is updated and propagated.  

- **Update Propagation**  
  - `updateUI()` updates the current cell’s value in UI and `db`.  
  - Recursively updates all child cells that depend on it.  

---

## ⚠️ Current Limitations

- Only supports basic arithmetic: `+`, `-`, `*`, `/`, `()`.  
- No built-in Excel functions (`SUM`, `AVERAGE`, etc.).  
- No support for ranges (like `A1:A5`).  
- No circular dependency detection (e.g., `A1 = B1 + 1` and `B1 = A1 + 1` will loop).  

---

## ▶️ How to Run

1. Clone the repository:  
   ```bash
   git clone https://github.com/username/Excel_Clone.git
   ```

Open index.html in any browser.

Start editing cells or entering formulas in the formula bar.
