// ==UserScript==
// @name        PA UC Auto Chatter
// @namespace   Violentmonkey Scripts
// @match       https://www.uc.pa.gov/Chat/index.aspx
// @grant       none
// @version     1.2
// @author      Barkin MAD
// @description 4/30/2020, 10:37:42 AM
// ==/UserScript==
 
// Use this section to fill in your personal details that will be enterted into the chat form  
// KEEP EVERYTHING BETWEEN THE QUOTES, DO NOT DELETE SEMI COLONS OR ANYTHING ELSE NOT INBETWEEN QUOTES Example: FIRSTNAME = "Mike";
 
const FIRSTNAME = "FirstNameHere";
const LASTNAME = "LastNameHere";
const EMAIL = "EmailAddressHere";
const PHONE = "PhoneNumberHere";
 
// DO NOT EDIT ANYTHING BELOW THIS MESSAGE UNLESS YOU KNOW WHAT YOU'RE DOING. Things will break.
//.........................................................................................
//.WWW...WWWWW...WWW...AAAA......RRRRRRRRR....NNNN....NNN..III..NNNN....NNN.....GGGGGG.....
//.WWW...WWWWW...WWW...AAAAA.....RRRRRRRRRRR..NNNN....NNN..III..NNNN....NNN...GGGGGGGGGG...
//.WWWW..WWWWW..WWWW...AAAAA.....RRRRRRRRRRR..NNNNN...NNN..III..NNNNN...NNN...GGGGGGGGGGG..
//.WWWW..WWWWW..WWWW..AAAAAA.....RRR.....RRR..NNNNN...NNN..III..NNNNN...NNN..GGGG....GGGG..
//..WWW.WWWWWWW.WWW...AAAAAAA....RRR.....RRR..NNNNNN..NNN..III..NNNNNN..NNN..GGG......GG...
//..WWW.WWW.WWW.WWW..AAAA.AAA....RRRRRRRRRRR..NNNNNNN.NNN..III..NNNNNNN.NNN.NGGG...........
//..WWWWWWW.WWW.WWW..AAA..AAAA...RRRRRRRRRR...NNN.NNN.NNN..III..NNN.NNN.NNN.NGGG...GGGGGG..
//..WWWWWWW.WWWWWWW..AAAAAAAAA...RRRRRRRR.....NNN.NNNNNNN..III..NNN.NNNNNNN.NGGG...GGGGGG..
//...WWWWWW..WWWWW..AAAAAAAAAA...RRR..RRRR....NNN..NNNNNN..III..NNN..NNNNNN..GGG...GGGGGG..
//...WWWWW...WWWWW..AAAAAAAAAAA..RRR...RRRR...NNN..NNNNNN..III..NNN..NNNNNN..GGGG.....GGG..
//...WWWWW...WWWWW..AAA.....AAA..RRR....RRRR..NNN...NNNNN..III..NNN...NNNNN...GGGGGGGGGGG..
//...WWWWW...WWWWW.WAAA.....AAAA.RRR....RRRR..NNN....NNNN..III..NNN....NNNN...GGGGGGGGGG...
//...WWWW.....WWWW.WAA......AAAA.RRR.....RRRR.NNN....NNNN..III..NNN....NNNN.....GGGGGG.....
//.........................................................................................
// DO NOT EDIT ANYTHING BELOW THIS MESSAGE UNLESS YOU KNOW WHAT YOU'RE DOING. Things will break.
 
const SUBJECT = 2;
const BSCHAT = [
    "Welcome to the new PA Unemployment Compensation chat service.",
    "Chat is available Monday – Friday, 8 a.m. - 5 p.m.   An Unemployment Compensation Chat Agent will be with you shortly.",
    "We are experiencing a much higher than normal volume. An Unemployment Compensation Chat Agent will be with you shortly.",
    "All of our chat agents are busy assisting other customers. We are unable to process your chat request at this time. Please try again later.",
    "Our office is closed. Please try again during our normal hours of operation.",
    "Have a great day.",
    "Chat Ended"
];
const CHATENDPROMPT = "Chat Ended";
var listenerID;
 
setTimeout(function () {
    document.querySelector("#click").click();
    setTimeout(FillDetails, 1000);
    setTimeout(StartChat, 2000);
    listenerID = setInterval(ListenMessages, 5000);
}, 1000);
 
function FillDetails() {
    document.getElementById("cx_custom_form_firstname").value = FIRSTNAME;
    document.getElementById("cx_custom_form_lastname").value = LASTNAME;
    document.getElementById("cx_custom_form_email").value = EMAIL;
    document.getElementById("cx_custom_form_phone").value = PHONE;
    document.getElementById("cx_custom_form_subject").selectedIndex = SUBJECT;
}
 
// Finds the start chat buttom on the webpage and clicks it.
function StartChat() {
    var buttonTags = document.getElementsByTagName("button");
    var searchText = "Start Chat";
    var found;
 
    for (var i = 0; i < buttonTags.length; i++) {
        if (buttonTags[i].textContent == searchText) {
            found = buttonTags[i];
            break;
        }
    }
 
    if (found != null) {
        found.click();
    }
}
 
// Reads messages to see if chat ended, if so retries. If it sees a message from an agent or user it stops the script.
function ListenMessages() {
    StartChat();
    var liveMsgs = document.getElementsByClassName("message-text");
 
    for (var i = 0; i < liveMsgs.length; i++) {
        // Connected to chat
        if (!BSCHAT.includes(liveMsgs[i].textContent)) {
            console.log("Possible Chat Session Detected. Stopping script.")
            clearInterval(listenerID)
            return;
        }
        // Disconnected from chat
        else if (liveMsgs[i].textContent == CHATENDPROMPT) {
            console.log("Chat end prompt detected. Reloading page...")
            clearInterval(listenerID);
            setTimeout(function () {
                Refresh();
            }, 1000);
        }
    }
}
 
function Refresh() {
    clearInterval(listenerID);
    location.reload();
