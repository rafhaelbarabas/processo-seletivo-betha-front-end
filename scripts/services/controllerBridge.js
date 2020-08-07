angular.module("funcionarioCadastro").factory("controllerBridge", () => {

  const valor = ""

  return {
    getItem: () => { return valor },
    setItem: (val) => { valor = val },
    resetItem: () => valor = ""
  }
});