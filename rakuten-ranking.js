var phantom = require('phantom');
var settings = require('./settings');

settings.data.forEach(function (data) {
  phantom.create(function (ph) {
    ph.createPage(function (page) {
      page.customHeaders = {
        'User-Agent': settings.ua
      };
      page.viewportSize = { width: 1280, height: 1024 };
      page.paperSize = { width: 21, height: 29.7, border: '0px' };

      page.open(data.url, function (status) {
        if (status === 'fail') {
          console.log('Error! failed to open ' + data.url);
        } else {
          console.log("start");
        }

        page.evaluate(function () {

          var element = [
            // header
            '#rihCmnHeader', '#rnkCenterContentsAd', '#rnk_pnkz', '#sitemap', '.stmpLink',
            // sidebar
            '#left-sidebar', '#right-sidebar',
            // main
            '.rnkRanking_genreLink',
            // footer
            '.rnkFooterPartsContents', '#rnkBottomContents', '#rnkCmnFooter', '#rankingCaution', '#footer'
          ];

          function rankingArrayElements(element) {

            el = document.querySelector(element);
            if (el) {
              document.querySelector(element).style.display = 'none';
            }
          };
          element.forEach(rankingArrayElements);

          document.body.bgColor = 'white';

        });

        setTimeout(function () {
          page.render('capture/' + data.filename);
          ph.exit();
        }, 20);

      });
    });
  });
});
