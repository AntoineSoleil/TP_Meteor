AccountsTemplates.configure({
	showForgotPasswordLink: true,
	forbidClientAccountCreation : false,
	homeRoutePath : '/private/listeDev',
	defaultLayout : "layout1",
	defaultLayoutRegions:{
		nav : 'navigation',
		footer :{}
	},
	defaultContentRegion : 'main',
	defaultTemplate : 'authContent',
	texts : {
		errors : {
			loginForbidden : "L'identification a échoué."
		}
	},
})

// génére la route /sign-in / connexion
AccountsTemplates.configureRoute('signIn', {name : 'signIn'}); 

AccountsTemplates.configureRoute('signUp', {name : 'signUp'}); 