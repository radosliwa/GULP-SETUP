
import { check } from './someModule';

$(document).ready(function() {
    var newDiv = document.createElement("h1");
    // and give it some content 
    var newContent = document.createTextNode("Hi there and greetings!");
    // add the text node to the newly created div

    check();
});