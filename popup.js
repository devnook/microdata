

function highlight(e) {
  $('.itemtype').removeClass('selected');
  $(e.target).addClass('selected');
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendMessage(tab.id, {itemtype: $(e.target).data('itemtype')});
  });
}

document.addEventListener('DOMContentLoaded', function () {

  $.getJSON('http://schema.rdfs.org/all.json', function(response) {
    var items = [];
    for (var type in response.types) {
      items.push(type);
    }
    $( "#tags" ).autocomplete({source: items});
  });

  var style = '{border: 5px solid rgb(255, 185, 61); margin: .5em; border-radius: 1em;}';
  chrome.tabs.insertCSS(null, {code:".ext-schema-item-highlight " + style});
  chrome.tabs.executeScript(null, {file:"jquery-1.9.1.min.js"});
  chrome.tabs.executeScript(null, {file:"cs.js"});

  chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    var mssg = request.foundTypes.length ? 'Fount schema.org types:' : 'No items found.';
    $('#result h2').text(mssg);
    var map = {};
    for (var i = 0, type; type = request.foundTypes[i]; i++) {
      if (!map[type]) {
        map[type] = 0;
      }
      map[type] += 1;
    }
    for (var type in map) {
      $('#result').append($('<span>')
        .addClass('itemtype')
        .text(type + '(' + map[type] + ')')
        .data('itemtype', type).click(highlight)
      );
    }
  });

});
