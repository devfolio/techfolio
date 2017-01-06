githubService.$inject = ['$http', 'apiUrl'];

export default function githubService($http, apiUrl) {
  return {
    getProfile() {
      return $http.get(`${apiUrl}/github/profile`)
        .then(res => res.data);
    },

    getRepos() {
      return $http.get(`${apiUrl}/github/repos`)
        .then(res => res.data);
    },

    saveGithub(info) {
      return $http.post(`${apiUrl}/github/repos`, info)
        .then(res => res.data);
    }
  };
}