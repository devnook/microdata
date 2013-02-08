// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


var schemaPrefix = 'http://schema.org/';
var schemaClass = 'ext-schema-item-highlight';

var els = $('*[itemtype]');
var types = [];
for (var i = 0, el; el = els[i]; i++) {
  types.push(el.getAttribute('itemtype').replace(schemaPrefix, ''));
}
chrome.extension.sendMessage({
  foundTypes: types
}, function(response) {
  console.log(response.farewell);
});

var highlight = function(itemtype) {
  $('*[itemtype]').parent().removeClass(schemaClass);
  var selector = '*[itemtype="http://schema.org/' + itemtype + '"]';
  var wrapper = $(selector).wrap('<div class="' + schemaClass + '" />');

  $('html, body').animate({
         scrollTop: $(wrapper).first().offset().top - 20
  }, 500);
}

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    highlight(request.itemtype);
});