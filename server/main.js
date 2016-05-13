import { Meteor } from 'meteor/meteor';
import { Devs } from '../imports/api/devs.js';
import { VotesJ } from '../imports/api/votesJ.js'
import '../imports/configs/at_configs.js'; 

Meteor.publish('getDevs', function(){
	return Devs.find();
}); 
Meteor.publish('getVotesJ', function(){
	return VotesJ.find();
}); 
Meteor.startup(() => {
  // code to run on server at startup
});
