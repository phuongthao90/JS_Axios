class UserServices {
    //Không xài arrow function cho phương thức của lớp
    layDanhSachUsers = function () {
        return axios({
            method: 'get',
            url: 'https://6114badacba40600170c1fb6.mockapi.io/api/v1/Users'

        });
    }
    themUser = function (user) {
        return axios({
            method: 'post',
            url: 'https://6114badacba40600170c1fb6.mockapi.io/api/v1/Users',
            data: user
        });
    }
    xemUser = function (id) {
        return axios({
            method: 'get',
            url: `https://6114badacba40600170c1fb6.mockapi.io/api/v1/Users/${id}`,
        });
    }
    capnhatUser = function (user, id) {
        return axios({
            method: 'put',
            url: `https://6114badacba40600170c1fb6.mockapi.io/api/v1/Users/${id}`,
            data: user
        });
    }
    xoaUser = function (id) {
        return axios({
            method: 'delete',
            url: `https://6114badacba40600170c1fb6.mockapi.io/api/v1/Users/${id}`
        });
    }
}




