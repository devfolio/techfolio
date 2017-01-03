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
    }
  };
}
