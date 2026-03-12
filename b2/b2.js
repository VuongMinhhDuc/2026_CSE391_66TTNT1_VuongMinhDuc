/** --- BÀI 2.1: ĐĂNG KÝ TÀI KHOẢN --- **/
const regForm = document.getElementById("registerForm");

function showError(id, message) {
  const errEl = document.getElementById(id + "Error");
  if (errEl) errEl.innerText = message;
}

function clearError(id) {
  const errEl = document.getElementById(id + "Error");
  if (errEl) errEl.innerText = "";
}

function validateFullname() {
  let name = document.getElementById("fullname").value.trim();
  // Regex hỗ trợ tiếng Việt có dấu
  let regex = /^[A-Za-zÀ-ỹ\s]{3,}$/;
  if (!regex.test(name)) {
    showError("fullname", "Tên phải ≥3 ký tự và chỉ chứa chữ");
    return false;
  }
  clearError("fullname");
  return true;
}

function validateEmail() {
  let email = document.getElementById("email").value.trim();
  let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    showError("email", "Email không hợp lệ");
    return false;
  }
  clearError("email");
  return true;
}

function validatePhone() {
  let phone = document.getElementById("phone").value.trim();
  let regex = /^0\d{9}$/;
  if (!regex.test(phone)) {
    showError("phone", "SĐT phải 10 số và bắt đầu bằng 0");
    return false;
  }
  clearError("phone");
  return true;
}

function validatePassword() {
  let pass = document.getElementById("password").value;
  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!regex.test(pass)) {
    showError("password", "Mật khẩu ≥8 ký tự, có chữ hoa, chữ thường và số");
    return false;
  }
  clearError("password");
  return true;
}

function validateConfirmPassword() {
  let pass = document.getElementById("password").value;
  let confirm = document.getElementById("confirmPassword").value;
  if (pass !== confirm || confirm === "") {
    showError("confirmPassword", "Mật khẩu không khớp");
    return false;
  }
  clearError("confirmPassword");
  return true;
}

function validateGender() {
  let genders = document.getElementsByName("gender");
  for (let g of genders) {
    if (g.checked) {
      clearError("gender");
      return true;
    }
  }
  showError("gender", "Vui lòng chọn giới tính");
  return false;
}

function validateTerms() {
  let terms = document.getElementById("terms");
  if (!terms.checked) {
    showError("terms", "Bạn phải đồng ý điều khoản");
    return false;
  }
  clearError("terms");
  return true;
}

// Event Submit cho Đăng ký
if (regForm) {
  regForm.addEventListener("submit", function (e) {
    e.preventDefault();
    // Dùng bitwise & để ép chạy tất cả các hàm validate
    let valid =
      validateFullname() &
      validateEmail() &
      validatePhone() &
      validatePassword() &
      validateConfirmPassword() &
      validateGender() &
      validateTerms();

    if (valid) {
      let name = document.getElementById("fullname").value;
      regForm.style.display = "none";
      document.getElementById("successMessage").innerText =
        "Đăng ký thành công! 🎉 Xin chào " + name;
    }
  });
}

// Blur events cho Đăng ký
document.getElementById("fullname")?.addEventListener("blur", validateFullname);
document.getElementById("email")?.addEventListener("blur", validateEmail);
document.getElementById("phone")?.addEventListener("blur", validatePhone);
document.getElementById("password")?.addEventListener("blur", validatePassword);
document.getElementById("confirmPassword")?.addEventListener("blur", validateConfirmPassword);


/** --- BÀI 2.2: ĐẶT HÀNG --- **/
const prices = {
  Áo: 150000,
  Quần: 200000,
  Giày: 500000,
};

const orderForm = document.getElementById("orderForm");

function validateProduct() {
  let p = document.getElementById("product").value;
  if (p === "") {
    showError("product", "Vui lòng chọn sản phẩm");
    return false;
  }
  clearError("product");
  return true;
}

function validateQuantity() {
  let q = document.getElementById("quantity").value;
  if (q === "" || q < 1 || q > 99) {
    showError("quantity", "Số lượng 1-99");
    return false;
  }
  clearError("quantity");
  return true;
}

function validateDelivery() {
  let d = document.getElementById("delivery").value;
  if (!d) {
    showError("delivery", "Vui lòng chọn ngày giao");
    return false;
  }
  let today = new Date();
  today.setHours(0, 0, 0, 0); // Reset giờ về 0 để so sánh ngày
  let chosen = new Date(d);
  chosen.setHours(0, 0, 0, 0);

  let max = new Date();
  max.setDate(today.getDate() + 30);

  if (chosen < today) {
    showError("delivery", "Không được chọn ngày quá khứ");
    return false;
  }
  if (chosen > max) {
    showError("delivery", "Không quá 30 ngày");
    return false;
  }
  clearError("delivery");
  return true;
}

function validateAddress() {
  let a = document.getElementById("address").value.trim();
  if (a.length < 10) {
    showError("address", "Địa chỉ ≥10 ký tự");
    return false;
  }
  clearError("address");
  return true;
}

function validateNote() {
  let n = document.getElementById("note").value;
  if (n.length > 200) {
    showError("note", "Tối đa 200 ký tự");
    return false;
  }
  clearError("note");
  return true;
}

function validatePayment() {
  let radios = document.getElementsByName("payment");
  for (let r of radios) {
    if (r.checked) {
      clearError("payment");
      return true;
    }
  }
  showError("payment", "Chọn phương thức thanh toán");
  return false;
}

function updateTotal() {
  let p = document.getElementById("product").value;
  let q = document.getElementById("quantity").value;
  if (p && q > 0) {
    let total = prices[p] * q;
    document.getElementById("total").innerText = Number(total).toLocaleString("vi-VN");
  } else {
    document.getElementById("total").innerText = "0";
  }
}

function updateNoteCount() {
  let note = document.getElementById("note").value;
  let count = note.length;
  let counter = document.getElementById("noteCount");
  if (counter) {
    counter.innerText = count + "/200";
    counter.style.color = count > 200 ? "red" : "black";
  }
}

// Event Submit cho Đặt hàng
if (orderForm) {
  orderForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let valid =
      validateProduct() &
      validateQuantity() &
      validateDelivery() &
      validateAddress() &
      validateNote() &
      validatePayment();

    if (valid) {
      let p = document.getElementById("product").value;
      let q = document.getElementById("quantity").value;
      let d = document.getElementById("delivery").value;
      let total = document.getElementById("total").innerText;
      let box = document.getElementById("confirmBox");

      box.style.display = "block";
      box.innerHTML = `
        <h3>Xác nhận đặt hàng</h3>
        <p>Sản phẩm: ${p}</p>
        <p>Số lượng: ${q}</p>
        <p>Ngày giao: ${d}</p>
        <p>Tổng tiền: ${total} VNĐ</p>
        <button id="confirmBtn">Xác nhận</button>
        <button id="cancelBtn">Hủy</button>
      `;

      document.getElementById("confirmBtn").onclick = function () {
        orderForm.style.display = "none";
        box.style.display = "none";
        document.getElementById("successMessageOrder").innerText = "Đặt hàng thành công 🎉";
      };

      document.getElementById("cancelBtn").onclick = function () {
        box.style.display = "none";
      };
    }
  });
}

// Listeners cho Đặt hàng
document.getElementById("product")?.addEventListener("change", updateTotal);
document.getElementById("quantity")?.addEventListener("input", updateTotal);
document.getElementById("note")?.addEventListener("input", updateNoteCount);

document.getElementById("product")?.addEventListener("blur", validateProduct);
document.getElementById("quantity")?.addEventListener("blur", validateQuantity);
document.getElementById("delivery")?.addEventListener("blur", validateDelivery);
document.getElementById("address")?.addEventListener("blur", validateAddress);
document.getElementById("note")?.addEventListener("blur", validateNote);

// Xóa lỗi khi gõ (Dùng chung cho cả 2 form)
document.querySelectorAll("input, textarea, select").forEach((el) => {
  el.addEventListener("input", function () {
    let id = this.id;
    if (id) clearError(id);
    // Nếu là radio button
    if (this.name === "gender") clearError("gender");
    if (this.name === "payment") clearError("payment");
  });
});