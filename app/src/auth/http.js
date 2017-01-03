configHttp.$inject = ['$httpProvider'];

export default function configHttp($httpProvider) {
  $httpProvider.interceptors.push(interceptor);
}

interceptor.$inject = ['$state', 'tokenService'];

function interceptor($state, tokenService) {

  return {

    request(config) {
      config.headers = config.headers || {};
      const token = tokenService.get();

      if (token) {
        config.headers.Authorization = token;
      }
      return config;
    },

    responseError(response) {
      if (response.status === 403) {
        tokenService.remove();
        $state.go('welcome');
      }
      return Promise.reject(response);
    }
  };

}