angular.module("funcionarioCadastro").factory("enderecosAPI", ($http) => {

  let baseURL = "http://127.0.0.1:8080/api/enderecos";

  let _getEnderecos = () => {
    return $http.get(baseURL);
  };

  let _getEnderecoByIdFuncionario = (id) => {
    return $http.get(`${baseURL}/${id}`);
  };

  let _postEnderecos = (endereco) => {    
    return $http.post(baseURL, endereco);    
  };

  return {
    getEnderecos: _getEnderecos,
    getEnderecoByIdFuncionario: _getEnderecoByIdFuncionario,
    postEnderecos: _postEnderecos
  }

});