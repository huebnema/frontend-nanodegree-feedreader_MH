/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This fest loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        describe ('The RSS Feed', function() {
            allFeeds.forEach(function(allFeeds) {
                it('has a URL defined', function() {
                    expect(allFeeds.url).toBeDefined();
                    expect(allFeeds.url.length).not.toBe(0);
                });
            });

            /*This test loops through each feed
             * in the allFeeds object and ensures it has a name defined
             * and that the name is not empty.
             */

            allFeeds.forEach(function(allFeeds) {
                it('has a name defined', function() {
                    expect(allFeeds.name).toBeDefined();
                    expect(allFeeds.name.length).not.toBe(0);
                });
            });

        });


    });



    describe ('The menu', function() {

        /* This test ensures the menu element is
         * hidden by default.
         */

        //Formatting help from:  https://discussions.udacity.com/t/the-menu-suite-for-hidden-menu-is-not-working/46867/5
        // On page load, body class='menu-hidden'

        it('is hidden', function() {
            expect($("body").hasClass('menu-hidden')).toBe(true);
        });



        /* This test ensures the menu changes
         * visibility when the menu icon is clicked.
         */

        //Reference for this test: https://discussions.udacity.com/t/testing-the-dom-in-jasmine/8438
        it('displays when clicked', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
        });

        //Set the false to true to test that the menu hides when clicked
        it('hides when clicked again', function() {
            $(".menu-icon-link").trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });


    /* This test ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     */
    // Reference:  https://discussions.udacity.com/t/step-13-help-initial-entries/14839/8

    describe ('Initial Entries', function() {

        // This makes the test work with asynchronous functions.
        // 'Done' lets Jasmine know when to go on to the next step.
        beforeEach(function(done) {
            loadFeed(0,done);
        });

        it('has at least one entry in the feed container', function(done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });

        /* This test ensures that when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        // Reference:  https://discussions.udacity.com/t/p6-new-feed-selection-test-question-problem/15562/14
        // Additional reference:  https://discussions.udacity.com/t/new-feed-selection-question/16274/13

        describe ('New Feed Selection', function() {

            // Set two variables when the test begins - one for the current feed and one for a new feed
            var feed0,
                feed1;

            // This makes the test work with asynchronous functions. 'Done' tells jasmine when to proceed on to the next step
            beforeEach(function(done) {
                loadFeed(1, function() {
                    feed0 = $('.feed').html();
                    done();
                });
            });

            it('changes the content that is loaded', function(done){
                loadFeed(0, function() {
                    expect($('.feed').html()).not.toEqual(feed0);
                    done();
                });
            });
        });
    });
});
