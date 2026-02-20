let students = [];

const nInp = document.getElementById('nameInp');
const mInp = document.getElementById('markInp');
const out = document.getElementById('output');
const tBtn = document.getElementById('themeToggle');

// Add Student with Auto-Color logic
function addStudent() {
    const name = nInp.value.trim();
    const score = parseInt(mInp.value);

    if (!name || isNaN(score)) {
        alert("Please enter a valid name and score!");
        return;
    }

    students.push({ name, score });
    nInp.value = "";
    mInp.value = "";
    showAll();
}

// Show All with Green/Red Logic
function showAll() {
    if (students.length === 0) {
        out.innerHTML = "List is empty.";
        return;
    }

    let html = "<b>Results:</b>";
    students.forEach(s => {
        const colorClass = s.score >= 40 ? "pass-text" : "fail-text";
        html += `<div class="item ${colorClass}">
                    <span>${s.name}</span>
                    <span>${s.score} ${s.score >= 40 ? '✓' : '✗'}</span>
                 </div>`;
    });
    out.innerHTML = html;
}

function showPassed() {
    const passed = students.filter(s => s.score >= 40);
    if (passed.length === 0) {
        out.innerHTML = "No students passed yet.";
        return;
    }
    
    let html = "<b>Passed Students:</b>";
    passed.forEach(s => {
        html += `<div class="item pass-text"><span>${s.name}</span> <span>${s.score}</span></div>`;
    });
    out.innerHTML = html;
}

function showStats() {
    if (students.length === 0) return out.innerHTML = "No data.";
    const total = students.reduce((a, b) => a + b.score, 0);
    const avg = (total / students.length).toFixed(1);
    out.innerHTML = `<div style="text-align:center">
        Avg Score: <b>${avg}</b><br>
        Class Total: <b>${total}</b>
    </div>`;
}

// Fixed Reset Function
function resetAll() {
    if (confirm("Delete all student records permanently?")) {
        students = []; // Empty the array
        out.innerHTML = "All data has been cleared."; // Update display
    }
}

// Theme Toggle
tBtn.onclick = () => {
    document.body.classList.toggle('dark');
    tBtn.textContent = document.body.classList.contains('dark') ? "☀️" : "🌙";
};