linkedInService.$inject = ['$http', 'apiUrl'];

export default function linkedInService($http, apiUrl) {
  return {
    get() {
      return $http.get(`${apiUrl}/linkedin/profile`)
        .then(res => res.data);
    }
  };
}
