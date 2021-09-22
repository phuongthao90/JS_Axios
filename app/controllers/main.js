var svUsers = new servicesUsers();
var valid = new Validation();

function getELE(id) {
    //id: kiểu string
    return document.getElementById(id)
}
//Hiện danh sách
function layDSUser() {
    svUsers.layDS()
        .then(function (response) {
            //console.log(response.data);
            hienThiTable(response.data);
        })
        .catch(function (error) {
            console.log(error);
           
        })
}
layDSUser();

function hienThiTable(mangUsers) {
    var content = "";
    mangUsers.map(function (item, index) {
        content += `
        <tr>
        <td>${index + 1}</td>
        <td>${item.taiKhoan}</td>
        <td>${item.matKhau}</td>
        <td>${item.hoTen}</td>
        <td>${item.email}</td>
        <td>${item.ngonNgu}</td>
        <td>${item.loaiND}</td>
        <td>
        <button class="btn btn-danger" onclick="xoa('${item.id}');">Xoá</button>

        <button class="btn btn-info" onclick="layChiTiet('${item.id}');"
        data-toggle="modal" data-target ="#myModal">Xem</button>
        </td>
      
    </tr>
        `
    });
    document.getElementById('tblDanhSachNguoiDung').innerHTML = content;
}

//Clear dữ liệu
clear = ()=>{
    getELE('TaiKhoan').value = '';
    getELE('HoTen').value = '';
    getELE('MatKhau').value = '';
    getELE('Email').value = '';
    getELE('HinhAnh').value = '';
    getELE('loaiNguoiDung').value = '';
    getELE('loaiNgonNgu').value = '';
    getELE('MoTa').value = '';
}
//Thêm
function themUser() {
    //lấy thông tin từ form
    var tk = getELE("TaiKhoan").value;
    var hoTen = getELE("HoTen").value;
    var mk = getELE("MatKhau").value;
    var email = getELE("Email").value;
    var hinh = getELE("HinhAnh").value;
    var loai = getELE("loaiNguoiDung").value;
    var ngonNgu = getELE("loaiNgonNgu").value;
    var moTa = getELE("MoTa").value;
    //console.table(tk,hoTen,mk,email,loai,ngonNgu,moTa,hinh);

    svUsers.layDS()
    .then(function(response){
        if (checkValid(tk, hoTen, mk, email, hinh, "loaiNguoiDung", "loaiNgonNgu", moTa, response.data)) {
            var user = new User(tk, hoTen, mk, email, loai, ngonNgu, moTa, hinh);
            svUsers.them(user)
                .then(function (response) {
                    clear();
                    layDSUser();
                    document.querySelector("#myModal .close").click();
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    })
    .catch(function(error){
        console.log("Thất bại" + error);
    })
   // checkValitdation();
    //if (isValid) 
}

document.querySelector("#btnThemNguoiDung").addEventListener("click", function () {
    document.querySelector(".modal-footer").innerHTML = `
      <button class = "btn btn-success" id="btnthem" onclick = "themUser();">Thêm</button>`;
});

function layChiTiet(id) {
    svUsers.layUser(id)
        .then(function (response) {
            console.log(response.data);
            getELE("TaiKhoan").value = response.data.taiKhoan;
            getELE("HoTen").value = response.data.hoTen;
            getELE("MatKhau").value = response.data.matKhau;
            getELE("Email").value = response.data.email;
            getELE("HinhAnh").value = response.data.hinhAnh;
            getELE("loaiNguoiDung").value = response.data.loaiND;
            getELE("loaiNgonNgu").value = response.data.ngonNgu;
            getELE("MoTa").value = response.data.moTa;
            document.querySelector(".modal-footer").innerHTML = `
       <button class = "btn btn-success" onclick = "capNhat('${response.data.id}');">Cập Nhật</button>
       `;
       document.querySelector('#termTK').innerHTML = response.data.taiKhoan;

        })
        .catch(function (error) {
            console.log(error);
        })
}

//Cập nhật
function capNhat(id) {
    var tk = getELE("TaiKhoan").value;
    var hoTen = getELE("HoTen").value;
    var mk = getELE("MatKhau").value;
    var email = getELE("Email").value;
    var hinh = getELE("HinhAnh").value;
    var loai = getELE("loaiNguoiDung").value;
    var ngonNgu = getELE("loaiNgonNgu").value;
    var moTa = getELE("MoTa").value;

    //if(checkValitdation()){
        var user = new User(tk, hoTen, mk, email, hinh, loai, ngonNgu, moTa)
    // console.table(user);
    svUsers.capNhatUser(user, id)
        .then(function (response) {
            //console.log(response.data);
            layDSUser();
            document.querySelector("#myModal .close").click();
        })
        .catch(function (error) {
            console.log(error);
        })
    }
//}

//Xoá
function xoa(id) {
    svUsers.xoaUser(id)
        .then(function (response) {
            console.log(response.data);
            layDSUser();
        })
        .catch(function (error) {
            console.log(error);
        })
};


function layDSND() {
    svUsers.layDS()
        .then(function (response) {
            console.log(response.data);            
        })
        .catch(function (error) {
            console.log(error);
        })
}

//Validation

function checkValid (taiKhoan, hoTen, matKhau, email, hinhAnh, loaiND, ngonNgu, moTa, mang, termTK) {
    //console.log(taiKhoan, hoTen, matKhau, email, hinhAnh, loaiND, ngonNgu, moTa, mang,termTK);
    var isValid = true
    //check Tài Khoản
    isValid &= valid.checkEmpty(taiKhoan, "spanTK", "Hãy nhập tài khoản") && valid.checkDup(taiKhoan, "spanTK", "Tài khoản bị trùng", mang,termTK);

    //check Họ Tên
    isValid &= valid.checkEmpty(hoTen, "spanHoTen", "Hãy nhập Họ Tên") && valid.checkName(hoTen, "spanHoTen", "Họ Tên không hợp lệ");

    //Check Mật Khẩu
    isValid &= valid.checkEmpty(matKhau, "spanMK", "Hãy nhập mật khẩu hợp lệ (có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự số, độ dài 6-8)") && valid.checkPass(matKhau, "spanMK", "Mật khẩu không hợp lệ");

    //check Email
    isValid &= valid.checkEmpty(email, "spanEmail", "Hãy nhập Email") && valid.checkEmail(email, "spanEmail", "Email không hợp lệ");

    //check Hình Ảnh 
    isValid &= valid.checkEmpty(hinhAnh, "spanHinh", "Hình Ảnh không được để trống");

    //check loại người dùng
    isValid &= valid.checkloaiNguoiDung("loaiNguoiDung", "spanLoai", "Hãy chọn loại người dùng");

    //check loại ngôn ngữ
    isValid &= valid.checkNgonNgu("loaiNgonNgu", "spanNN", "Hãy chọn ngôn ngữ");

    //check mô tả
    isValid &= valid.checkEmpty(moTa, "spanMT", "Hãy nhập mô tả") && valid.checkMoTa(moTa, "spanMT", "Mô tả không được quá 60 ký tự");

    return isValid;
}



