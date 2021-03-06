const Utils = require('../utils');
const Discord = require('discord.js');
var constants = require('../models/constants');

var commands = {
    prefix: {
        help: [
            'Permet de changer le préfix des commandes du bot.'
        ],
        args: '[prefix]',
        runCommand: (args, message) => {
            if (args.length === 0) {
                Utils.reply(message, "**Préfix**: " + constants.prefix);
                return;
            }
            constants.prefix = args.join(' ');
            Utils.reply(message,'Le préfix a bien été modifié.');
        }
    },
    pseudoModifier: {
        help: [
            'Permet de changer le pseudo des joueurs en fonction de leurs rank', 
            '**%rank%**le nom du rank',
            '**%srank%** le smiley du rank',
            '**%clan%** le nom du clan',
            '**%sclan%** le smiley du clan',
            '**%player%** le nom du joueur',
            'pour que le bot ne modifie pas les nom mettre \'no\''
        ],
        args: '[modifier]',
        runCommand: (args, message) => {
            if (args.length === 0) {
                Utils.reply(message, "**pseudoModifier**: " + constants.pseudoModifier);
                return;
            }
            constants.pseudoModifier = args.join(' ');
            Utils.reply(message,'Le pseudo modifier a bien été modifié.');
        }
    },
    resetRankWhenChangeClan: {
        help: [
            'Est-ce que le rank sera reset lors du changement de clan ?'
        ],
        args: '[true|false]',
        runCommand: (args, message) => {
            if (args.length === 0) {
                Utils.reply(message, "**resetRankWhenChangeClan**: " + constants.resetRankWhenChangeClan);
                return;
            }
            if(args[0].toLowerCase() !== "true" && args[0].toLowerCase() !== "false") {
                Utils.reply(message, "la valeur dois être 'true' ou 'false'.", true);
                return;
            }
            constants.resetRankWhenChangeClan = args[0].toLowerCase() === "true";
            Utils.reply(message,'Le resetRankWhenChangeClan a bien été modifier.');
        }
    },
    leaveCooldown: {
        help: [
            'Au bout de combiens de minutes est-il possible de faire !leave après un join.',
            'mettre à -1 pour que le leave soit désactivé.'
        ],
        args: '[minutes]',
        runCommand: (args, message) => {
            if (args.length === 0) {
                Utils.reply(message, "**leaveCooldown**: " + constants.leaveCooldown);
                return;
            }
            var num = Number(args[0]);
            if(isNaN(num)) {
                Utils.reply(message, "la valeur dois être nombre.", true);
                return;
            }
            constants.leaveCooldown = num;
            Utils.reply(message,'Le leaveCooldown a bien été modifié.');
        }
    },
    joinmessage: {
        help: [
            'Le message qui sera afficher quand un nouveau membre rejoins le clan',
            'mettre à \'no\' pour que le message soit désactiver.',
            '**%clan%** le nom du clan',
            '**%player%** le nom du joueur'
        ],
        args: '[message]',
        runCommand: (args, message) => {
            if (args.length === 0) {
                Utils.reply(message, "**joinmessage**: " + constants.joinmessage);
                return;
            }
            constants.joinmessage = args.join(' ');
            Utils.reply(message,'Le joinmessage a bien été modifié.');
        }
    },
    leavemessage: {
        help: [
            'Le message qui sera afficher quand un membre quitte le clan',
            'mettre à \'no\' pour que le message soit désactiver.',
            '**%clan%** le nom du clan',
            '**%player%** le nom du joueur'
        ],
        args: '[message]',
        runCommand: (args, message) => {
            if (args.length === 0) {
                Utils.reply(message, "**leavemessage**: " + constants.leavemessage);
                return;
            }
            constants.leavemessage = args.join(' ');
            Utils.reply(message,'Le leavemessage a bien été modifié.');
        }
    }
}

var help = function (message) {
    var keys = Object.keys(commands);
    var fields = [];
    keys.forEach((command, index) => {
        fields.push({
            text: commands[command].help,
            title: `${constants.prefix}config ${command} ${commands[command].args}`,
            grid: false
        });
    });
    Utils.sendEmbed(message, 0x00AFFF,'Liste des commandes de config', "", message.author, fields);
}

module.exports = {
    role: 'MANAGE_GUILD',
    helpCat: 'Permet de changer les configurations de base du bot',
    help,
    runCommand: (args, message) => {
        if (!message.member.hasPermission("MANAGE_GUILD")) {
            Utils.reply(message, "Vous n'avez pas assez de couilles pour changer les config", true);
            return;
        }
        if (commands[args[0]]) {
            var label = args[0];
            args.shift();
            commands[label].runCommand(args, message);
        } else {
            help(message);
        }
    }
}