function validarFormIngreso(forma) {
	var usuario = forma.usuario;
	if (correo.value == "") {
		alert("Debe de proporcionar un email");
		usuario.focus();
		usuario.select();
		return false;
	}

	var password = forma.password;
	if (password.value == "" || password.value.length < 8) {
		alert("Debe de proporcionar una contraseña de al menos de 8 caracteres");
		password.focus();
		password.select();
		return false;
	}

	return true;
}

function ingresoUsuario() {
	var form = document.getElementById("formRegistro");
	if (validarFormIngreso(form)) {
		fetch("/scripts/usuarios.json")
			.then((response) => response.json())
			.then((value) => {
				var correoAct = document.getElementById("correo").value;
				var password = document.getElementById("password").value;
				var esValido = false;
				for (var jsonObj of value) {
					if (jsonObj.correo == correoAct && jsonObj.password == password) esValido = true;
				}

				if (!esValido) {
					alert("No hay un usuario registrado con ese correo, vuelva a intentarlo");
					return;
				}

				var anchor = document.createElement("a");
				anchor.href = "index.html?user=" + correoAct.substring(0, correoAct.indexOf("@"));
				anchor.click();
			});
	}
}

function validarFormRegistro(forma) {
	var usuario = forma.usuario;
	if (correo.value == "") {
		alert("Debe de proporcionar un email");
		usuario.focus();
		usuario.select();
		return false;
	}

	var password = forma.password;
	if (password.value == "" || password.value.length < 8) {
		alert("Debe de proporcionar una contraseña de al menos de 8 caracteres");
		password.focus();
		password.select();
		return false;
	}

	var confirmarPassword = forma.validarPassword;
	if (confirmarPassword.value == "" || confirmarPassword.value != password.value) {
		alert("Su contraseña debe de coincidir");
		confirmarPassword.focus();
		confirmarPassword.select();
		return false;
	}

	return true;
}

function registroUsuario() {
	var form = document.getElementById("formRegistro");
	if (validarFormRegistro(form)) {
		alert("Se registró correctamente");
		var correoAct = document.getElementById("correo").value;
		var anchor = document.createElement("a");
		anchor.href = "index.html?user=" + correoAct.substring(0, correoAct.indexOf("@"));
		anchor.click();
	}
}

if (document.body.id === "index") {
	cambiarHeaderFijo();
}

const integrantesLista = document.querySelector(".integrantes__section");
const botonVerIntegrantes = document.getElementById("ver-mas");

botonVerIntegrantes.addEventListener("click", (e) => {
	integrantesLista.classList.toggle("hidden");

	if (botonVerIntegrantes.innerText === "Ver menos") {
		botonVerIntegrantes.innerText = "Ver más";
	} else {
		botonVerIntegrantes.innerText = "Ver menos";
	}
});
