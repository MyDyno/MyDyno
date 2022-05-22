function contact() {

    var request = new XMLHttpRequest();
    request.open("POST", 'https://discord.com/api/webhooks/833924527486009365/xgRQPDkBzZWpBAuBA2WPxYIL2J4H0ATG8ty399ZYJvqRbJuwFGj6cW9GkTbk5TEbBUqz');
    request.setRequestHeader('Content-type', 'application/json');

    var Discord_User = document.getElementById("cname").value;
    var Contact_Email = document.getElementById("cemail").value;
    var Contact_Message = document.getElementById("cmessage").value;

    var params = {
        username: "Contact Bot",
        avatar_url: "https://discordtemplates.me/static/img/icon.png",

        "embeds": [{
            "title": "**__Contact Info!__**",
            "color": 3447003,

            "thumbnail": {
                "url": "https://discordtemplates.me/static/img/icon.png",
            },

            "fields": [
                {
                    "name": "**__User Info:__**",

                    "value": "Username: " + Discord_User,
                    "inline": false,
                },
                {
                    "name": "**__User Email__**",

                    "value": "Email: " + Contact_Email,
                    "inline": false,
                },
                {
                    "name": "**__Message__**",

                    "value": "Message: " + Contact_Message,
                    "inline": false,
                },
            ],

            "timestamp": new Date(),

        }]
    }

    if(!Discord_User.length){
        alert('Enter Discord Username required!')
    }
    else{

        if(!Contact_Email.length){
            alert('Enter Email Address required!')
        }
        else{

            if(!Contact_Message.length){
                alert('Enter Message required!')
            }
            else{

                if(Discord_User.length > 2000){
                    alert('Username must not be greater than 2000 characters!')
                }
                else{
                    
                    if(Contact_Email.length > 2000){
                        alert('Email Address must not be greter than 2000 characters!')
                    }
                    else{

                        if(Contact_Message.length > 2000){
                            alert('Message must not be greater than 2000 characters!')
                        }
                        else{
                            request.send(JSON.stringify(params));
                            alert('Thank you for contacting us, we will reach out to you as soon as possible!');
                        }
                    }
                }
            }
        }
    }
};