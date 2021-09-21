function servicesUsers(){
    //lấy danh sách người dùng
    this.layDS = function(){
        return axios ({
            method:'get',
            url:'https://6114badacba40600170c1fb6.mockapi.io/api/v1/Users'
        });
    }

    this.them = function(user){
        return axios({
            method:'post',
            url:'https://6114badacba40600170c1fb6.mockapi.io/api/v1/Users',
            data:user
        });
    }

    this.layUser = function(id){
        return axios({
            method:'get',
            url:`https://6114badacba40600170c1fb6.mockapi.io/api/v1/Users/${id}`,
        });
    }

    this.capNhatUser = function(user,id){
        return axios ({
            method: 'put',
            url:`https://6114badacba40600170c1fb6.mockapi.io/api/v1/Users/${id}`,
            data:user
        });
    }

    this.xoaUser = function(id){
        return axios ({
            method:'delete',
            url:`https://6114badacba40600170c1fb6.mockapi.io/api/v1/Users/${id}`
        });
    }
}