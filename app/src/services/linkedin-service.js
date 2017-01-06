linkedInService.$inject = ['$http', 'apiUrl'];

export default function linkedInService($http, apiUrl) {
  return {
    get() {
      return $http.get(`${apiUrl}/linkedin/profile`)
        .then(res => res.data);
    },
    post(selectedInfo) {
      return $http.post(`${apiUrl}/linkedin/userupdate`, selectedInfo)
        .then(res => res.data);
    }
  };
}
