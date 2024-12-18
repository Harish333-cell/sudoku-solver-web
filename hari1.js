
function createGrid() {
    const grid = document.getElementById('sudoku-grid');
    for (let i = 0; i < 81; i++) {
        const cell = document.createElement('input');
        cell.setAttribute('type', 'number');
        cell.setAttribute('min', '1');
        cell.setAttribute('max', '9');
        cell.setAttribute('id', `cell-${i}`);
        grid.appendChild(cell);
    }
}
function getGridValues() {
    let grid = [];
    for (let i = 0; i < 81; i++) {
        const value = document.getElementById(`cell-${i}`).value;
        grid.push(value ? parseInt(value) : 0);
    }
    return grid;
}


function setGridValues(grid) {
    for (let i = 0; i < 81; i++) {
        document.getElementById(`cell-${i}`).value = grid[i] || '';
    }
}


function isValid(grid, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (grid[row * 9 + i] === num || grid[i * 9 + col] === num) return false;
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        if (grid[(startRow + Math.floor(i / 3)) * 9 + (startCol + i % 3)] === num) return false;
    }
    return true;
}

function solveSudokuUtil(grid, row, col) {
    if (row === 9) return true;
    if (col === 9) return solveSudokuUtil(grid, row + 1, 0);
    if (grid[row * 9 + col] !== 0) return solveSudokuUtil(grid, row, col + 1);

    for (let num = 1; num <= 9; num++) {
        if (isValid(grid, row, col, num)) {
            grid[row * 9 + col] = num;
            if (solveSudokuUtil(grid, row, col + 1)) return true;
            grid[row * 9 + col] = 0;
        }
    }
    return false;
}

function solveSudoku() {
    let grid = getGridValues();
    if (solveSudokuUtil(grid, 0, 0)) {
        setGridValues(grid);
    } else {
        alert('No solution exists!');
    }
}

window.onload = createGrid;
