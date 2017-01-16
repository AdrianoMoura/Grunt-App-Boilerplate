Framework7.prototype.plugins.example = function (app, params) {

  'use strict';
  if (!params) return;

  var _this = {
      debug: false,

      hello: function (user) {
        return "Hello " + user != '' ? user : 'World'
      }
  };

  // return to app
  app.example = (function () {
      return _this;
  }());

    var _hooks = {
        appInit: function () {

        },
        navbarInit: function (navbar, pageData) {
            //console.log('navbarInit', navbar, pageData);
        },
        pageInit: function (pageData) {
            //console.log('pageInit', pageData);
        },
        pageBeforeInit: function (pageData) {
            //console.log('pageBeforeInit', pageData);
        },
        pageBeforeAnimation: function (pageData) {
            //console.log('pageBeforeAnimation', pageData);
        },
        pageAfterAnimation: function (pageData) {
            //console.log('pageAfterAnimation', pageData);
        },
        pageBeforeRemove: function (pageData) {
            //console.log('pageBeforeRemove', pageData);
        },
        addView: function (view) {
            //console.log('addView', view);
        },
        loadPage: function (view, url, content) {
            //console.log('loadPage', view, url, content);
        },
        goBack: function (view, url, preloadOnly) {
            //console.log('goBack', view, url, preloadOnly);
        },
        swipePanelSetTransform: function (views, panel, percentage) {
            //console.log('swipePanelSetTransform', views, panel, percentage);
        }
    };

    return {
        hooks: _hooks,
        prevents: {},
        processes: {}
    }
};
