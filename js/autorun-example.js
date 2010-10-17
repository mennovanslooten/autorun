/*
 * Autorun script example:
 *  - enter a username
 *  - enter a password
 *  - submit the form
 *  - click the "hitme" button
 *
 *  Note: all events are triggered as soon as the elements are detected
 */

$.autorun
    .type('#username', 'menno')
    .type('#password', 'hunter2')
    .submit('#loginform')
    .click('#hitme');

