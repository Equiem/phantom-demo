var env = require('system').env;
var phantomcss = require('phantomcss');
var helpers = require('./includes/helpers');
helpers.init(phantomcss);

casper.test.begin('tests', function suite(test) {
  helpers.initTests();

  helpers.test('/index.html', function () {
    this.waitForResource("style.css", function() {
      this.echo('styles/style.css has been loaded.');

      // test-flexible-height
      phantomcss.screenshot(
        '#test-flexible-height',
        'test-flexible-height'
      );

      // test-set-height
      phantomcss.screenshot(
        '#test-set-height',
        'test-set-height'
      );

      // test-float-left
      phantomcss.screenshot(
        '#test-float-left',
        'test-float-left'
      );

    });
  });

  helpers.finaliseTests(phantomcss);
});
