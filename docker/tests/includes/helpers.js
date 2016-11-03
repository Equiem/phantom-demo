
exports.init = function init(phantomcss) {
  phantomcss.init({
    comparisonResultRoot: './results',
    failedComparisonsRoot: './failures',
    cleanupComparisonImages: false,
    addIteratorToImage: false,
    outputSettings: {
        errorType: 'movement',
        transparency: 0.3
    },
    libraryRoot: 'node_modules/phantomcss'
  });
}

exports.url = function url(path) {
  var protocol = 'http://';
  // Requires that the HOST_IP is actually set in the environment.
  var ip = env['HOST_IP'];
  var port = 3005;
  var path = path || '';

  return protocol + ip + ':' + port + path;
};

exports.initTests = function initTests() {
  casper.start(exports.url('/'), function() {});
}

exports.test = function test(url, callback) {
  casper.viewport(1024, 768).thenOpen(exports.url(url), callback);
}

exports.finaliseTests = function finaliseTests(phantomcss) {
  casper.then(function () {
    phantomcss.compareAll();
  })

  casper.run(function() {
    this.test.done();
  });
}
