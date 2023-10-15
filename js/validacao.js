function validarNome() {
   return inputsAluno.nome.value.length >= 3
}

function validarCPF(cpf) {	
	cpf = cpf.replace(/[^\d]+/g,'');	
	if(cpf == '') return false;	
	// Elimina CPFs invalidos conhecidos	
	if (cpf.length != 11 || 
		cpf == "00000000000" || 
		cpf == "11111111111" || 
		cpf == "22222222222" || 
		cpf == "33333333333" || 
		cpf == "44444444444" || 
		cpf == "55555555555" || 
		cpf == "66666666666" || 
		cpf == "77777777777" || 
		cpf == "88888888888" || 
		cpf == "99999999999")
			return false;		
	// Valida 1o digito	
	add = 0;	
	for (i=0; i < 9; i ++)		
		add += parseInt(cpf.charAt(i)) * (10 - i);	
		rev = 11 - (add % 11);	
		if (rev == 10 || rev == 11)		
			rev = 0;	
		if (rev != parseInt(cpf.charAt(9)))		
			return false;		
	// Valida 2o digito	
	add = 0;	
	for (i = 0; i < 10; i ++)		
		add += parseInt(cpf.charAt(i)) * (11 - i);	
	rev = 11 - (add % 11);	
	if (rev == 10 || rev == 11)	
		rev = 0;	
	if (rev != parseInt(cpf.charAt(10)))
		return false;		
	return true;   
}

function validarTelefone(telefone) {
    // Remove caracteres não numéricos, como espaços e traços
    const telefoneLimpo = telefone.replace(/[^0-9]/g, '');
  
    // Verifica se o número de telefone tem a quantidade correta de dígitos
    if (telefoneLimpo.length === 10 || telefoneLimpo.length === 11) {
      // Verifica se o número começa com 9 (para números de celular)
      if (telefoneLimpo.length === 11 && telefoneLimpo[2] !== '9') {
        return false;
      }
      return true;
    }
    return false;
  }

  function validarRG(rg) {
    return rg.length >= 9 && rg.length <= 10
  }

  function validarEmail(email) {
    // Expressão regular para validar email com ou sem máscara
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    
    // Remover máscara, se presente
    var emailSemMascara = email.replace(/[^a-zA-Z0-9@.-]/g, '');
  
    // Verificar se o email passado é válido
    return regex.test(emailSemMascara);
  }
  