const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const prefix = botSettings.prefix;

const bot = new Discord.Client({disableEveryone: false});

bot.on("ready", async () => {                             
console.log(`${bot.user.username} is er klaar voor! ${bot.user.username} is er klaar voor!`);
 });

bot.on("message", async message =>  {
 if(message.author.bot) return;
 if(message.channel.type === "dm") return;
 
 let messageArray = message.content.split(" ");
 let command = messageArray[0];
 let args = messageArray.slice(1);

 if(!command.startsWith(prefix)) return;

 if(command == `${prefix}userinfo`){
    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setDescription("Dit is de info van de persoon!")
        .setColor("#decb00")
        .addField("Volledige gebruikersnaam", `${message.author.username}#${message.author.discriminator}`)
        .addField("ID", message.author.id)
        .addField("Gemaakt op", message.author.createdAt);

    message.channel.sendEmbed(embed);
    message.delete().catch(O_o=>{}); 

    return;
 }
 if(command === `${prefix}mute`) {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("Je hebt niet genoeg rechten!")

    let toMute = message.guild.member(message.mentions.users.first()) || message.guild.member.get(args[0]);
    if(!toMute) return message.channel.sendMessage("Je hebt geen persoon getagd!");
    
    if(toMute.id === message.author.id) return message.channel.sendMessage("Je kan jezelf niet muten!");

    let role = message.guild.roles.find(r => r.name === "Muted");
    if(!role) {
        try {
            role = await message.guild.createRole({
                name: "Muted",
                color: "#000000",
                permissions: []
            });

            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(role, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                });
            });
        } catch(e) {
            console.log(e.stack);
        }
    } 
    if(toMute.roles.has(role.id)) return message.channel.sendMessage("Deze persoon is al gemute!");

    await(toMute.addRole(role));
    message.channel.sendMessage("Ik heb hem / haar gemute voor je.")

    return;
    }

    if(command === `${prefix}unmute`) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("Je hebt niet genoeg rechten!")
    
        let toMute = message.guild.member(message.mentions.users.first()) || message.guild.member.get(args[0]);
        if(!toMute) return message.channel.sendMessage("Je hebt geen persoon getagd!");
        
        let role = message.guild.roles.find(r => r.name === "Muted");
            
        if(!role || !toMute.roles.has(role.id)) return message.channel.sendMessage("Deze persoon is al gemute!");

        await(toMute.removeRole(role));
        message.channel.sendMessage("Ik heb hem / haar geunmute voor je.")

        return;
    }

              if(command === `${prefix}GeefEbola`) {
                if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("Je hebt niet genoeg rechten!")
            
                let toMute = message.guild.member(message.mentions.users.first()) || message.guild.member.get(args[0]);
                if(!toMute) return message.channel.sendMessage("Je hebt geen persoon getagd!");
                
                if(toMute.id === message.author.id) return message.channel.sendMessage("Je kan jezelf geen Ebola geven!");
            
                let role = message.guild.roles.find(r => r.name === "Ebola");
                if(!role) {
                    try {
                        role = await message.guild.createRole({
                            name: "Ebola",
                            color: "#002106",
                            permissions: [1312283841]
                        });
            
                    } catch(e) {
                        console.log(e.stack);
                    }
                } 
                if(toMute.roles.has(role.id)) return message.channel.sendMessage("Deze persoon heeft al Ebola!");
            
                await(toMute.addRole(role));
                message.channel.sendMessage("Ik heb hem / haar Ebola gegeven voor je.")
            
                return;
                }
            
                if(command === `${prefix}genees`) {
                    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("Je hebt niet genoeg rechten!")
                
                    let toMute = message.guild.member(message.mentions.users.first()) || message.guild.member.get(args[0]);
                    if(!toMute) return message.channel.sendMessage("Je hebt geen persoon getagd!");
                    
                    let role = message.guild.roles.find(r => r.name === "Ebola");
                        
                    if(!role || !toMute.roles.has(role.id)) return message.channel.sendMessage("Deze persoon is al genezen van Ebola!");
            
                    await(toMute.removeRole(role));
                    message.channel.sendMessage("Ik heb hem / haar genezen van Ebola voor je.")
            
                    return;
                    }


                    if(command === `${prefix}help`) {
                            let embed = new Discord.RichEmbed()
                                .setTitle("Alle commands:")
                                .setColor("#decb00")
                                .addField("!help", `Je komt in dit lijsjte terecht.`)
                                .addField("!userinfo", `Alles wat jij wilt weten over jouw profiel.`)
                                .addField("!mute", `Je kan de persoon muten die je wilt muten. *Only Mods/Owners*`)
                                .addField("!unmute", `Je kan de persoon unmuten die je wilt unmuten. *Only Mods/Owners*`)
                                .addField("!say [tekst]", `Laat de bot iets zeggen wat jij leuk vind! `)
                            message.channel.sendEmbed(embed);
                    
                        
                            return;
                         }

                         if(command === `${prefix}say`) {
                            
                                const sayMessage = args.join(" ");
                            
                                message.delete().catch(O_o=>{}); 
                            
                                message.channel.send(sayMessage);
                              }

                        if(command === `${prefix}zeghet`) {
                                                          
                                message.delete().catch(O_o=>{}); 
                            
                                message.channel.send("Als de bot aan staat kan je al deze commands gebruiken: @everyone");
                            
                              } 
                        
                        if(command === `${prefix}site`) {
                                message.channel.send("http://www.xvideos.com/")
                                message.channel.send("http://www.pornhub.com/")
                                message.channel.send("http://www.xnxx.com/")
                                message.channel.send("http://www.xhamster.com/")
                                message.channel.send("http://www.youporn.com/")
                               
                                message.delete().catch(O_o=>{}); 
                            
                        }                
                              

                            
});
   


bot.login(botSettings.token);

