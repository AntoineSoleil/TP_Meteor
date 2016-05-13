import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
/*import '../imports/ui/body.js';
import './main.html'; */
import '../imports/configs/at_configs.js';
import '../imports/configs/routes.js';
T9n.setLanguage('fr-FR');
import './main.html'; 
import '../imports/ui/layout.html';   
import '../imports/ui/listedevs.js';  
BlazeLayout.setRoot('body');