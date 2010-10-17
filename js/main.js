$(document).ready(function() {

    // Create the click handler for the "hitme" button
    $('#hitme').live('click', function() {
        $(this).text('I\'ve been hit!');
    });

    // Create the submit hander
    $('#loginform').submit(function(e) {
        e.preventDefault();
        $(this).hide();
        $('#loggedin').show();

        // Append the "hitme" button 2s from now
        setTimeout(function() {
            $('#loggedin p:last').html('<button id="hitme">Hit me!</button>');
        }, 2000);
    });
});

    
