console.log('some module');
$(document).ready(function() {
    var newDiv = document.createElement("h1");
    // and give it some content 
    var newContent = document.createTextNode("Hi there and greetings!");
    // add the text node to the newly created div

    $('.navbar').click(() => {
        console.log('kkkk')
    })
});