/*
*
* Author: Ali Itani
*
* Auto Type Writer (JS): a javascript script file that runs a string as a automated type writer, sort off like a user typing effect
*
* Hope you like it!
*
* */

var input = document.getElementById('text');

var word_to_write = null;

set_string("Hello my name is Auto-Type-Writer, and I'm testing this to see if it works?!");

// added this just to see how more intervals work.
var word_errors = "sdafasdf";


var list = word_to_write.split("");
var error_list = word_errors.split("");

var error_corrected = false;
var counter = 0;
var count_error = 0;

var word = "";
var cursor_text = "";

/*
    interval ids, that will run independent of each other, since javascript engine runs on a single thread.
    we should clear interval id before setting a new one
 */
var write_interval_id = window.setInterval(write_text, 100);
var cursor_interval_id = null;
var add_text_id = null;

function set_string(s) {
    word_to_write = s;
}

function write_text() {

    // adds each char to word var on each count
    word += list[counter];

    // adds it to <p> tag in html
    input.innerText = word + "|";
    counter++;

    // adds the error string when counter reaches half the length of the string
    if (counter === parseInt((word_to_write.length/2), 10) && error_corrected === false) {
        clearInterval(write_interval_id);
        add_text_id = setInterval(add_text, 200);
    }

    if(counter === list.length) {
        input.innerText = word.substr(0, word.length);
        counter = 0;
        clearInterval(write_interval_id);
        cursor_interval_id = window.setInterval(set_cursor, 500);
    }
}

function add_text() {
    word += error_list[count_error];
    input.innerText = word + "|";
    count_error++;

    if (count_error === error_list.length) {

        word = word.substring(0, word_to_write.length/2);
        input.innerText = word;


        // sets error_corrected var to true once function is called.
        error_corrected = true;
        count_error = 0;

        // clear interval id and set new interval id
        clearInterval(add_text_id);
        write_interval_id = setInterval(write_text, 100);
    }
}

function set_cursor() {

    // checks if cursor char | exists
    if (cursor_text === "") {
        cursor_text = "|";
        input.innerText = word + cursor_text;
    } else {
        input.innerText = word;
        cursor_text = "";
    }

    counter++;

    // checks if counter is 10 clears interval ids and goes back to the beginning

    if (counter === 10) {
        counter = 0;

        // clears interval ids

        clearInterval(cursor_interval_id);
        clearInterval(write_interval_id);

        // resets vars to default

        word = "";
        error_corrected = false;

        // starts the interval again

        write_interval_id = window.setInterval(write_text, 100);
    }
}


