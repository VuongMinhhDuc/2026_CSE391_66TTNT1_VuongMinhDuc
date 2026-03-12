let students = []; 

const fullnameInput = document.getElementById('fullname');
const scoreInput = document.getElementById('score');
const addBtn = document.getElementById('addBtn');
const studentBody = document.getElementById('studentBody');
const statsDiv = document.getElementById('stats');
const searchInput = document.getElementById('searchInput');
const filterGrade = document.getElementById('filterGrade');

// 1. Hàm vẽ bảng
function renderTable(dataDisplay = students) {
    studentBody.innerHTML = '';
    
    if (dataDisplay.length === 0) {
        studentBody.innerHTML = '<tr><td colspan="5" style="text-align:center">Không tìm thấy sinh viên nào</td></tr>';
    }

    dataDisplay.forEach((student, index) => {
        const row = document.createElement('tr');
        if (student.score < 5) row.classList.add('weak');
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.score}</td>
            <td>${student.grade}</td>
            <td><button class="deleteBtn" data-name="${student.name}">Xóa</button></td>
        `;
        studentBody.appendChild(row);
    });
    updateStats();
}

// 2. Hàm lọc (Dùng chung cho tìm kiếm và chọn loại)
function applyFilter() {
    const keyword = searchInput.value.toLowerCase().trim();
    const gradeSelected = filterGrade.value;

    const filtered = students.filter(s => {
        const matchName = s.name.toLowerCase().includes(keyword);
        const matchGrade = (gradeSelected === "Tất cả") || (s.grade === gradeSelected);
        return matchName && matchGrade;
    });

    renderTable(filtered);
}

// 3. Hàm thêm sinh viên (Tách riêng để dùng cho cả Click và Enter)
function handleAddStudent() {
    const name = fullnameInput.value.trim();
    const score = parseFloat(scoreInput.value);

    if (!name || isNaN(score) || score < 0 || score > 10) {
        alert("Vui lòng nhập đúng họ tên và điểm (0-10)");
        return;
    }

    students.push({ 
        name, 
        score, 
        grade: getGrade(score) 
    });
    
    // Reset bộ lọc để người dùng thấy sinh viên mới thêm
    searchInput.value = '';
    filterGrade.value = 'Tất cả';
    
    renderTable(); 
    fullnameInput.value = '';
    scoreInput.value = '';
    fullnameInput.focus();
}

// 4. Các hàm hỗ trợ
function getGrade(score) {
    if (score >= 8.5) return 'Giỏi';
    if (score >= 7.0) return 'Khá';
    if (score >= 5.0) return 'Trung bình';
    return 'Yếu';
}

function updateStats() {
    const tong = students.length;
    const trungbinh = tong > 0 ? (students.reduce((sum, s) => sum + s.score, 0) / tong).toFixed(2) : '0.00';
    statsDiv.textContent = `Tổng số sinh viên: ${tong} | Điểm trung bình: ${trungbinh}`;
}

// 5. Gán sự kiện
searchInput.addEventListener('input', applyFilter);
filterGrade.addEventListener('change', applyFilter);
addBtn.addEventListener('click', handleAddStudent);

scoreInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleAddStudent(); // Đã sửa từ addStudent thành handleAddStudent
});

studentBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('deleteBtn')) {
        const nameToDelete = e.target.getAttribute('data-name');   
        students = students.filter(s => s.name !== nameToDelete);
        renderTable();
    }
});