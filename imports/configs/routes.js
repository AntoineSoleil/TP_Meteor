var privateRoutes = FlowRouter.group({
	prefix : '/private',
	name : 'private',
	triggersEnter: [AccountsTemplates.ensureSignedIn]
});
FlowRouter.notFound = ({
	action : function(){
		BlazeLayout.render('layout1', {
			nav : "navigation",
			main : "notFoundContent"
		});
	}
});

FlowRouter.route('/', {
	name: 'index',
	subscriptions : function(params, queryParams){
		this.register('getDevs', Meteor.subscribe('getDevs'));
	},
	action : function(){ 
		BlazeLayout.render('layout1', { 
			nav : "navigation",
			main : "indexContent"
		});
	}
});

FlowRouter.route('/sign-out', {
	name: 'signOut',
	action : function(){
		AccountsTemplates.logout(); 
	}
});

privateRoutes.route('/listeDev', {
	name: 'listeDev',
	subscriptions : function(params, queryParams){
		this.register('getDevs', Meteor.subscribe('getDevs'));
		this.register('getVotesJ', Meteor.subscribe('getVotesJ'));
	}, 
	action : function(){ 
		BlazeLayout.render('layout1', { 
			nav : "navigation",
			main : "listedevs"
		});
	}
});

privateRoutes.route('/my-account', {
	name: 'myAccount', 
	action : function(){ 
		BlazeLayout.render('layout1', { 
			nav : "navigation",
			main : "accountContent"
		});
	}
}); 