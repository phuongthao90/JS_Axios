
let userServices = new UserServices;
let valid = new Validation;
clear = () => {
    document.querySelector('#TaiKhoan').value = '';
    document.querySelector('#HoTen').value = '';
    document.querySelector('#MatKhau').value = '';
    document.querySelector('#Email').value = '';
    document.querySelector('#HinhAnh').value = '';
    document.querySelector('#loaiNguoiDung').value = '';
    document.querySelector('#loaiNgonNgu').value = '';
    document.querySelector('#MoTa').value = '';
}

//Hiển thị danh sách người dùng 
layDSUser = () => {
    userServices.layDanhSachUsers()
        .then(response => {
            //Thành công
            console.log(response.data)
            hienthiTable(response.data)
        })
        //Thất bại
        .catch(error => {
            console.log(error)
        })
}
layDSUser();

hienthiTable = mangUsers => {
    let content = "";
    mangUsers.map((item, index) => {
        content += `<tr>
        <td>${index + 1}</td>
        <td>${item.taiKhoan}</td>
        <td>${item.matKhau}</td>
        <td>${item.hoTen}</td>
        <td>${item.email}</td>
        <td>${item.ngonNgu}</td>
        <td>${item.loaiND}</td>
        <td>
            <button class="btn btn-danger" onclick="xoa(${item.id})">Xóa</button>
            <button class="btn btn-info" onclick="xem(${item.id})" data-toggle="modal" data-target="#myModal">Xem</button>
        </td>
    </tr>`
    })
    document.querySelector('#tblDanhSachNguoiDung').innerHTML = content;
}

//Thêm người dùng mới (validation)
themUserfc = () => {
    let taiKhoan = document.querySelector('#TaiKhoan').value;
    let hoTen = document.querySelector('#HoTen').value;
    let matKhau = document.querySelector('#MatKhau').value;
    let email = document.querySelector('#Email').value;
    let hinhAnh = document.querySelector('#HinhAnh').value;
    let loaiND = document.querySelector('#loaiNguoiDung').value;
    let ngonNgu = document.querySelector('#loaiNgonNgu').value;
    let moTa = document.querySelector('#MoTa').value;



    userServices.layDanhSachUsers()
        .then(response => {
            //Thành công
            console.log(response.data)
            if (checkValid(taiKhoan, hoTen, matKhau, email, hinhAnh, "loaiNguoiDung", "loaiNgonNgu", moTa, response.data)) {
                let user = new Users(taiKhoan, hoTen, matKhau, email, loaiND, ngonNgu, moTa, hinhAnh);
                userServices.themUser(user)
                    .then(response => {
                        console.log(response.data.taiKhoan)
                        clear();
                        layDSUser()
                        document.querySelector("#myModal .close").click()
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        })
        //Thất bại
        .catch(error => {
            console.log("Thất bại: " + error)
        })
}
document.querySelector('#btnThemNguoiDung').addEventListener("click", () => {
    document.querySelector('.modal-footer').innerHTML = `<button class="btn btn-success" onclick="themUserfc()">Thêm</button>`
})

//Xem thông tin người dùng
xem = id => {
    userServices.xemUser(id)
        .then(response => {
            console.log("xem" + response.data)
            document.querySelector('#TaiKhoan').value = response.data.taiKhoan;
            document.querySelector('#HoTen').value = response.data.hoTen;
            document.querySelector('#MatKhau').value = response.data.matKhau;
            document.querySelector('#Email').value = response.data.email;
            document.querySelector('#HinhAnh').value = response.data.hinhAnh;
            document.querySelector('#loaiNguoiDung').value = response.data.loaiND;
            document.querySelector('#loaiNgonNgu').value = response.data.ngonNgu;
            document.querySelector('#MoTa').value = response.data.moTa;
            document.querySelector(".modal-footer").innerHTML = `<button class="btn btn-success" onclick="capnhat('${response.data.id}')">Cập nhật</button>`
            //console.log("loaiND: " + response.data.loaiND, "ngonNgu: " + response.data.ngonNgu)

            document.querySelector('#termTK').innerHTML = response.data.taiKhoan;
        })
        .catch(error => {
            console.log(error)
        })
}

//Cập nhật thông tin người dùng (validation)
capnhat = id => {
    let taiKhoan = document.querySelector('#TaiKhoan').value;
    let hoTen = document.querySelector('#HoTen').value;
    let matKhau = document.querySelector('#MatKhau').value;
    let email = document.querySelector('#Email').value;
    let hinhAnh = document.querySelector('#HinhAnh').value;
    let loaiND = document.querySelector('#loaiNguoiDung').value;
    let ngonNgu = document.querySelector('#loaiNgonNgu').value;
    let moTa = document.querySelector('#MoTa').value;
    let termTK = document.querySelector('#termTK').innerHTML;
    userServices.layDanhSachUsers()
        .then(response => {
            //Thành công
            console.log(response.data)
            if (checkValid(taiKhoan, hoTen, matKhau, email, hinhAnh, "loaiNguoiDung", "loaiNgonNgu", moTa, response.data, termTK)) {
                let user = new Users(taiKhoan, hoTen, matKhau, email, loaiND, ngonNgu, moTa, hinhAnh);

                userServices.capnhatUser(user, id)
                    .then(response => {
                        console.log(response.data)
                        document.querySelector('#termTK').value = '';
                        clear();
                        layDSUser();
                        document.querySelector("#myModal .close").click();
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        })
        //Thất bại
        .catch(error => {
            console.log("Thất bại: " + error)
        })
}

//Xoá người dùng
xoa = (id) => {
    userServices.xoaUser(id)
        .then(response => {
            console.log(response.data)
            layDSUser()
        })
        .catch(error => {
            console.log(error)
        })
}

//Hàm Validation
checkValid = (taiKhoan, hoTen, matKhau, email, hinhAnh, loaiND, ngonNgu, moTa, mang, termTK) => {
    console.log(taiKhoan, hoTen, matKhau, email, hinhAnh, loaiND, ngonNgu, moTa, mang);
    let isValid = true
    //check Tài Khoản
    isValid &= valid.checkEmpty(taiKhoan, "spanTaiKhoan", "Hãy nhập tài khoản") && valid.checkID(taiKhoan, "spanTaiKhoan", "Tài khoản bị trùng", mang, termTK)

    //check Họ Tên
    isValid &= valid.checkEmpty(hoTen, "spanHoTen", "Hãy nhập Họ Tên") && valid.checkName(hoTen, "spanHoTen", "Họ Tên không được có số và ký tự đặc biệt")

    //Check Mật Khẩu
    isValid &= valid.checkEmpty(matKhau, "spanMatKhau", "Hãy nhập mật khẩu") && valid.checkPass(matKhau, "spanMatKhau", "Nhập từ 6 ký tự trở lên có ít nhất 1 ký tự Hoa, 1 ký tự thường và 1 số")

    //check Email
    isValid &= valid.checkEmpty(email, "spanEmail", "Hãy nhập Email") && valid.checkEmail(email, "spanEmail", "Mail phải có dạng @mail.com")

    //check Hình Ảnh 
    isValid &= valid.checkEmpty(hinhAnh, "spanHinhAnh", "Hãy nhập link ảnh")

    //check loại người dùng
    isValid &= valid.checkloaiNguoiDung("loaiNguoiDung", "spanLoaiND", "Hãy chọn loại người dùng")

    //check loại ngôn ngữ
    isValid &= valid.checkNgonNgu("loaiNgonNgu", "spanLoaiNgonNgu", "Hãy chọn ngôn ngữ")

    //check mô tả
    isValid &= valid.checkEmpty(moTa, "spanMoTa", "Hãy nhập mô tả") && valid.checkMoTa(moTa, "spanMoTa", "Mô tả không được quá 60 ký tự")

    return isValid;
}
