/*

############## API ##############

codepen.api.signup(user_object)
	description: to sign up a new user
	parameters: user object, which contains properties: name, email, username, password
	returns: response object

codepen.api.login(user_object)
	description: to login an existing user
	parameters: user object, which contains properties: username, password
	returns: response object


Reponse Objects:

{
	success: true/false,
	error: (string)
}


##users already signed up (can log in)
	('suzy', 'I@msoawesome')
	('conan', 'gingertastic')
	('jerry', '@#!$%@')

*/


$('document').ready(function() {

	$(".signup-form-btn").click(function(){
		$(this).addClass("active");
		$(".login-form-btn").removeClass("active");
		$(".login-form").hide();
		$(".signup-form").show();
	})

	$(".login-form-btn").click(function(){
		$(this).addClass("active");
		$(".signup-form-btn").removeClass("active");
		$(".signup-form").hide();
		$(".login-form").show();
	})

	codepen.objects.User = {
		username: null,
		password: null,
		name: null,
		email: null,
		is_logged_in: false,
		validate: {
			response: {
				success: false,
				error: ''
				},
			name: function(field){
				if (field = "") {
					validate.response.error = 'Please provide a username';
					return "hi";
				}
			}
		}
	};
	codepen.objects.NewUser = {};

	$(".btn-login").click(function(){
		//we need to create an object called user to pass as an argument for the codepen.api.login() function.
		//we created it earlier, so let's just add to it.
		user = Object.create(codepen.objects.User);
		user.username = $("#login-username-field").val();
		user.password = $("#login-password-field").val();

		console.log(user);
		//codepen.api.login(user) will return an object with two keys: "success" and "error".
		//the values of the two keys depends on wether the info in the user object was good or not.
		//let's store the object so we can play with it.
		var serverResponse = codepen.api.login(user);

		//if the serverResponse object's "success" key's value is set to "false", throw an error.
		//otherwise, let the user know they've logged in successfully.
		if (!serverResponse.success){
			alert(serverResponse.error)
		} else {
			user.is_logged_in = true;
			console.log(user)
			alert("You are now logged in")
		}
	})

	$("#signup-firstname-field").blur(function(){
		var validateReturn = codepen.objects.User.validate.name($("#signup-firstname-field").val());
		alert(validateReturn);
	});

	$(".btn-signup").click(function(){
		//again, we add key/value pairs to the user object.
		user = Object.create(codepen.objects.User);
		user.firstname = $("#signup-firstname-field").val();
		user.lastname = $("#signup-lastname-field").val();
		user.email = $("#signup-email-field").val();
		user.username = $("#signup-username-field").val();
		user.password = $("#signup-password-field").val();
		console.log(user);
		var serverResponse = codepen.api.signup(user);
		console.log(user);
		if (!serverResponse.success){
			alert(serverResponse.error);
		} else {alert("yay you did it")}
	})

});
