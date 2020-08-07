angular.module("funcionarioCadastro").factory("telefonesAPI", ($http) => {

  let baseURL = "http://localhost:8080/api/telefones";

  let _getTelefones = () => {
    return $http.get(baseURL);
  };

  let _getTelefoneByIdFuncionario = (id) => {
    return $http.get(`${baseURL}/${id}`);
  };

  let _postTelefones = (telefone) => {
    return $http.post(baseURL, telefone);
  };

  return {
    getTelefones: _getTelefones,
    getTelefoneByIdFuncionario: _getTelefoneByIdFuncionario,
    postTelefones: _postTelefones
  }

});