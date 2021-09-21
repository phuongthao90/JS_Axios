function Validation (){
    var tk = getELE("TaiKhoan").value;
    var hoTen = getELE("HoTen").value;
    var mk = getELE("MatKhau").value;
    var email = getELE("Email").value;
    var hinh = getELE("HinhAnh").value;
    var loai = getELE("loaiNguoiDung").value;
    var ngonNgu = getELE("loaiNgonNgu").value;
    var moTa = getELE("MoTa").value;

    var isValid = true;
    layDSND();

    isValid &= valid.checkEmpty(tk, "spanTK", "Hãy nhập tài khoản") && valid.checkDup(tk, "spanTK", "Tài khoản bị trùng", response.data)

    //check Họ Tên
    isValid &= valid.checkEmpty(hoTen, "spanHoTen", "Hãy nhập Họ Tên") && valid.checkName(hoTen, "spanHoTen", "Họ Tên không được có số và ký tự đặc biệt")

    //Check Mật Khẩu
    isValid &= valid.checkEmpty(mk, "spanMK", "Hãy nhập mật khẩu") && valid.checkPass(mk, "spanMK", "Nhập từ 6 ký tự trở lên có ít nhất 1 ký tự Hoa, 1 ký tự thường và 1 số")

    //check Email
    isValid &= valid.checkEmpty(email, "spanEmail", "Hãy nhập Email") && valid.checkEmail(email, "spanEmail", "Email phải đúng định dạng abc@mail.com")

    //check Hình Ảnh 
    isValid &= valid.checkEmpty(hinh, "spanHinh", "Hình ảnh không được để trống")

    //check loại người dùng
    isValid &= valid.checkloaiNguoiDung("loaiNguoiDung", "spanLoai", "Bắt buộc chọn loại người dùng")

    //check loại ngôn ngữ
    isValid &= valid.checkNgonNgu("loaiNgonNgu", "spanNN", "Bắt buộc chọn ngôn ngữ")

    //check mô tả
    isValid &= valid.checkEmpty(moTa, "spanMT", "Hãy nhập mô tả") && valid.checkMoTa(moTa, "spanMT", "Mô tả không được quá 60 ký tự")

    return isValid;
}
//getELE("btnthem").addEventListener("click",Validation());