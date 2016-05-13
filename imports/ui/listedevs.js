import { Devs } from '../api/devs.js'
import { VotesJ } from '../api/votesJ.js'
import { Session } from 'meteor/session'

Template.indexContent.helpers({
  getDevs() {
    return Devs.find({}, {sort: {votes:-1}});
  },
  getDevsCount() {
    count = Devs.find().count();
    var rStr = "";
    if (count == 0) {
      rStr = "Aucun développeur inscrit";
    } else if (count == 1) {
      rStr = "Un seul développeur inscrit";
    } else {
      rStr = count + " développeurs inscrits";
    }
    return rStr;
  },
  getVotesCount() {
    var votesCount = 0
    Devs.find().map(function(dev) {
      votesCount += dev.votes
    })
    if (votesCount == 0) {
      rStr = "Aucun vote enregistré";
    } else if (votesCount == 1) {
      rStr = "Un seul vote enregistré";
    } else {
      rStr = votesCount + " votes enregistrés";
    }
    return rStr;
  },
  hasVotes(votes) {
    return votes > 0;
  },
  stateClass() {
    return Session.equals('currentDev', this._id) ? "success" : ""
  },
  deleteBtn() {
    return Session.equals('currentDev', this._id) ?
    '<button class="deleteBtn btn btn-danger"><span class="fa fa-trash"></span></button>' :
     '';
  }
});

Template.listedevs.helpers({
  getDevs() {
    return Devs.find({}, {sort: {votes:-1}});
  },
  getDevsCount() {
    count = Devs.find().count();
    var rStr = "";
    if (count == 0) {
      rStr = "Aucun développeur inscrit";
    } else if (count == 1) {
      rStr = "Un seul développeur inscrit";
    } else {
      rStr = count + " développeurs inscrits";
    }
    return rStr;
  },
  getVotesCount() {
    var votesCount = 0
    Devs.find().map(function(dev) {
      votesCount += dev.votes
    })
    if (votesCount == 0) {
      rStr = "Aucun vote enregistré";
    } else if (votesCount == 1) {
      rStr = "Un seul vote enregistré";
    } else {
      rStr = votesCount + " votes enregistrés";
    }
    return rStr;
  },
  hasVotes(votes) {
    return votes > 0;
  },
  stateClass() {
    return Session.equals('currentDev', this._id) ? "success" : ""
  },
  deleteBtn() {
    return Session.equals('currentDev', this._id) ?
    '<button class="deleteBtn btn btn-danger red"><span class="fa fa-trash"></span></button>' :
     '';
  },
  GetEmail(){
    var EmailUser =  Meteor.user().emails[0].address;
    return "Bienvenue " + EmailUser ;
  },
  getCountVotesJourUser(){  
    var Auj = new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate(); 
    var NbVotesJ = VotesJ.find({user: Meteor.userId(), date : Auj}).count(); 
    return NbVotesJ;
  },
  GetNbVoteRestant(){
    var Auj = new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate(); 
    var NbVotesJ = VotesJ.find({user: Meteor.userId(), date : Auj}).count(); 
    var NbVoteRestant = 3 - NbVotesJ;
    return "Il vous reste " + NbVoteRestant +  " votes aujourd'hui";
  }
}); 

Template.listedevs.events({
  'click td.devName' : function(e) {
    Session.set('currentDev', this._id);
  },
  'click button.voteBtn' : function(e) {
    var devId = Session.get('currentDev');
    var NBVotesJour = Template.listedevs.__helpers.get('getCountVotesJourUser').call(); 
    if (NBVotesJour>=3){
      sweetAlert("Oups", "Vous ne pouvez voter que 3 fois par jour!", "error");
    }else{  
      var Auj = new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate(); 
      VotesJ.insert({user: Meteor.userId(), date : Auj});
      Devs.find({_id: devId}).fetch();
      Devs.update(devId, {$inc: {votes: 1}});
    }
  },
  'click button.deleteBtn' : function(e) {
    var devId = Session.get('currentDev');
    swal({
      title: "Confirmez-vous ?",
      text: "Ce développeur sera définitivement suppimé !",
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn-danger",
      confirmButtonText: "Oui, supprimer!",
      closeOnConfirm: false
    },
    function(){
      Devs.remove(devId);
      swal("Supprimé !", "Ce développeur a été supprimé", "success");

    });
  },
  'click button.addBtn' : function(e) {
    $('.addForm').removeClass('hide');
  },
  'click button.cancelBtn' : function(e) {
    $('.addForm').addClass('hide');
  },
  'submit form#newDevForm': function(e) {
    e.preventDefault();
    var devName = e.target.devNameInput.value;
    Devs.insert({name: devName, votes: 0});
    swal("Ajouté !", "Le développeur " + devName + " a été créé", "success");
    e.target.devNameInput.value = '';
    $('.addForm').addClass('hide');
  }
})
