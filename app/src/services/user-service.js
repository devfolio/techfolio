userService.$inject = ['$http', 'apiUrl', 'tokenService'];

export default function userService($http, apiUrl, tokenService) {
  return {
    signup(newUser) {
      return $http.post(`${apiUrl}/auth/signup`, newUser)
        .then(res => {
          tokenService.set(res.data.token);
        });
    },
    signin(user) {
      return $http.post(`${apiUrl}/auth/signin`, user)
        .then(res => {
          tokenService.set(res.data.token);
        });
    },
    signout() {
      tokenService.remove();
    },
    getPublicProfile(userUrl) {
      return $http.get(`${apiUrl}/user/${userUrl}`)
        .then(res => {
          return res.data;
        });
    },
    getProfile() {
      return $http.get(`${apiUrl}/auth/`)
        .then(res => {
          return res.data;
        });
    }
  };
}
