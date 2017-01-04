githubService.$inject = ['$http', 'ghUrl'];

export default function githubService($http, ghUrl) {
  return {
    getProfile(ghaccess) {
      return $http.get(`${ghUrl}/user?access_token=${ghaccess}`)
        .then(res => res.data);
    }
  };
}