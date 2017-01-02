userService.$inject = ['$http', '$apiUrl', 'tokenService'];

export default function userService($http, $apiUrl, tokenService) {
  return {
    signup(newUser) {
      return $http.post(`${$apiUrl}/auth/signup`, newUser)
        .then(res => {
          return res.data;
        });
    },
    sigin(user) {
      return $http.post(`${$apiUrl}/auth/signin`, user)
        .then(res => {
          return res.data;
        });
    },
    signout() {
      tokenService.remove();
    }
  };
}