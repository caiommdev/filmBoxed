class _APIService {
    constructor() {
      if (_APIService.SingletonInstance) {
        return _APIService.SingletonInstance;
      }
      const foo = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNmNjODhjYThiZTRjYTJkMTUxNWViMmNkMTM3YmYxMSIsIm5iZiI6MTczMjc5NjQwMC42ODk1NDIsInN1YiI6IjY2ZmYwODUwZTQ4MDE0OTE0Njg0ZmI4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AM4zD4V8bNwekKE33h4B5UOptU8_S1VVxKkoFCOwJeM"
      // Declara variaveis nescessarias para uma requisição bem sucedida
      this.baseUrl = "https://api.themoviedb.org";
      this.posterBaseUrl = "https://image.tmdb.org/t/p/";
      this.requestHeaders = {
        accept: "application/json",
        Authorization:
          `Bearer ${foo}`,
      };
      this.defaultParams = {};
      _APIService.SingletonInstance = this;
    }
  
    getDefaultQueryParams() {
      return this.defaultParams;
    }
  
    getPosterUrl(film, width = "500") {
      return `${this.posterBaseUrl}w${width}${film}`;
    }
  
    // metodo HTTP GET
    async get(route, query = this.defaultParams) {
      let q = this._query_string_from_obj(query);
      const path = `${this.baseUrl}/${route}${q}`;
      console.log(path)
      try {
        const response = await this._request(path);
        if (!response.ok) {
          console.log("## ERRO na requisição.\n url: " + path);
          console.log(response);
          console.log(response.status);
        }
        return await response.json();
      } catch (e) {
        console.log("## ERRO na tradução para JSON.\n url: \n" + path);
        console.log(e);
      }
    }
  
    // Define uma requisição HTTP Generica, por default, usa o metodo get
    //     FUNÇÃO PRIVADA
    //     NÃO UTILIZAR DIRETAMENTE
    _request(path, method = "GET") {
      const m = method.toUpperCase();
      const options = {
        method: m,
        headers: this.requestHeaders,
      };
      return fetch(path, options);
    }
  
    //     FUNÇÃO PRIVADA
    //     NÃO UTILIZAR DIRETAMENTE
    _query_string_from_obj(query) {
      let q = "";
      if (query != null) {
        q = "?";
        Object.keys(query).forEach((key) => {
          q = "" + q + key + "=" + query[key] + "&";
        });
        q = q.substring(0, q.length - 1);
      }
      return q;
    }
  }
  
  const ApiService = new _APIService();
  Object.freeze(ApiService);
  export default ApiService;
