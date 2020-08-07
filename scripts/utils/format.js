function stringDateFormat(date) {
  return date.split("/").reverse().join("-");
}

function prepareToPost(txt) {
  if(txt){
    return txt.replace(/[\.\-\(\) ]/g, "")
  }else{
    return ""
  }    
}

function screenFormat(value, option) {
  switch (option) {
    case "DATA":
      return value.split("-").reverse().join("/");            
    case "CPF":
      let cpf = value.replace(/\D/g,"")
      cpf = cpf.replace(/(\d{3})(\d)/,"$1.$2")
      cpf = cpf.replace(/(\d{3})(\d)/,"$1.$2")
      cpf = cpf.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
      return cpf                  
    default:
      break;
  }    
}
