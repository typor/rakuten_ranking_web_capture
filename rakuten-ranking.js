var phantom = require('phantom');
var settings = require('./settings');
var ua = settings.ua;
var rankingData = settings.rakutenranking;

rankingData.forEach(function (setting) {
  phantom.create(function (ph) {
    ph.createPage(function (page) {
      page.customHeaders = {
        'User-Agent': ua
      };
      page.viewportSize = { width: 1280, height: 1024 };
      page.paperSize = { width: 21, height: 29.7, border: '0px' };

      page.open(setting.url, function (status) {
        if (status !== 'success') {
          console.log('Unable to load the address!');
          return;
        } else {
          console.log("start");
        }

        page.evaluate(function () {
          document.querySelector('#rihCmnHeader').remove();
          var left = document.querySelector('#left-sidebar')
          if(left !== undefined) {
            left.remove();
          }
          var right = document.querySelector('#right-sidebar');
          if(right !== undefined) {
            right.remove();
          }
          var rnkFooterPartsContents = document.querySelector('#rnkFooterPartsContents');
          if(rnkFooterPartsContents !== null) {
            rnkFooterPartsContents.remove();
          }
          var rnkBottomContents = document.querySelector('#rnkBottomContents');
          if(rnkBottomContents !== null) {
            rnkBottomContents.remove();
          }

          var rankingCaution = document.querySelector('#rankingCaution');
          if(rankingCaution !== null) {
            rankingCaution.remove();
          }

          document.querySelector('#rnkCmnFooter').remove();
          document.querySelector('#footer').remove();
          document.querySelector('#rnkCenterContentsTop').style.margin = "0";
        });

        setTimeout(function () {
          page.render(setting.filename);
          ph.exit();
        }, 20);

      });
    });
  });
});
