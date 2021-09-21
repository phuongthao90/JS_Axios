function Validation() {
    //Kiểm tra ô nhập liệu có bị trống hay không
    this.checkEmpty = function (inputValue, spanID, message) {
        if (inputValue.trim() == "") {
            //Không hợp lệ
            document.getElementById(spanID).innerHTML = message;
            return false;
        } else {
            //Hợp lệ
            //Xoá câu thông báo lúc nhập sai trước đó đi
            document.getElementById(spanID).innerHTML = "";
            return true;
        }
    }
    this.checkDup = function (inputval, spanID, message, mang) {
        //Kiểm tra TK đã tồn tại trong mảng
        var isExist = false;
        isExist = mang.some(function (item) {
            return item.taiKhoan === inputval.trim();
        });
        if (isExist) {
            //không hợp lệ
            document.getElementById(spanID).innerHTML = message;
            return false;
        } else {
            //hợp lệ
            document.getElementById(spanID).innerHTML = "";
            return true;
        }
    }
    // kiểm tra tên sv
    this.checkName = function (inputVal, spanID, message) {
        //RegExp: Chuyển từ string sang regular expressions
        var pattern = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$");
        if (pattern.test(inputVal)) {
            //Hợp lệ
            document.getElementById(spanID).innerHTML = "";
            return true;
        } else {
            //không hợp lệ
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    }
    this.checkPass = function (inputVal, spanID, message) {
        var passFormat = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        if (passFormat.test(inputVal)) {
            // hợp lệ
            document.getElementById(spanID).innerHTML = "";
            return true;
        } else {
            //không hợp lệ
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    }
    this.checkEmail = function (inputVal, spanID, message) {
        var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (inputVal.match(mailFormat)) {
            // hợp lệ
            document.getElementById(spanID).innerHTML = "";
            return true;
        } else {
            //không hợp lệ
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    }
    this.checkloaiNguoiDung = function (selID, spanID, message) {
        console.log(document.getElementById(selID).selectedIndex)
        var optValue = document.getElementById(selID).selectedIndex;
        if (optValue != 0) {
            document.getElementById(spanID).innerHTML = "";
            return true;
        } else {
            //không hợp lệ
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    }
    this.checkNgonNgu = function (selID, spanID, message) {

        var optIndex = document.getElementById(selID).selectedIndex;
        if (optIndex != 0) {
            document.getElementById(spanID).innerHTML = "";
            return true;
        } else {
            //không hợp lệ
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    }
    this.checkMoTa = function (inputVal, spanID, message) {
        var moTaFormat = /^.{1,60}$/;
        if (inputVal.match(moTaFormat)) {
            // hợp lệ
            document.getElementById(spanID).innerHTML = "";
            return true;
        } else {
            //không hợp lệ
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    }




}