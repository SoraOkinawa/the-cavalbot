const Discord = require('discord.js');
const Utils = require('../utils');
var Players = require('../models/players');
var Ranks = require('../models/ranks');
var Clans = require('../models/clans');
var Constants = require('../models/constants');
module.exports = {
    role: 'SEND_MESSAGES',
    helpCat: 'Permet de changer son btag.',
    help: function(message) {
        Utils.sendEmbed(message, 0x00AFFF,"Utilisation de la commande btag", "", message.author, [{
            title: Constants.prefix + 'btag <btag>',
            text: "Permet de changer son btag.",
            grid: false
        }]);
    },
    runCommand: (args, message) => {
        if (args.length < 1) {
            Utils.reply(message, 'Vous devez mettre un btag', true);
            return;
        }
        Players.setBtag(message.member.id, args.join(' ')).then(() => {
            Utils.reply(message, 'Votre battle tag a été mis à jours.');
        }).catch(() => {
            Utils.reply(message, 'Votre battle tag est introuvable.');
        });
        Utils.reply(message, 'Recherche sur battle net...');
    }
}