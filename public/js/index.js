// Get references to page elements
var $exampleText = $('#example-text')
var $exampleDescription = $('#example-description')
var $submitBtn = $('#submit')
var $exampleList = $('#example-list')

var str = $('#area').val()
// get information
var t = str.split('\n')
for (var i = 0; i < t.length; i++) {
  var arr = t[i].split('\t')
  document.write("'<row dc= '" + arr[0] + "' al='" + arr[1] + "' msg='" + arr[2] + "' />'")
}

$(function () {
  $('#button').on('click', function () {
    var text = $('#text');
    text.val(text.val() + ' after clicking');
  })
})

$.fn.getCursorPosition = function () {
  var el = $(this).get(0)
  var pos = 0
  var posEnd = 0
  if ('selectionStart' in el) {
    pos = el.selectionStart
    posEnd = el.selectionEnd
  } else if ('selection' in document) {
    el.focus()
    var Sel = document.selection.createRange()
    var SelLength = document.selection.createRange().text.length
    Sel.moveStart('character', -el.value.length)
    pos = Sel.text.length - SelLength
    posEnd = Sel.text.length
  }
  // return both selection start and end;
  return [pos, posEnd]
}
// Detect which key was deleted
// make it so that it will only log on a delete
$('#area').keydown(function (e) {
  var position = $(this).getCursorPosition()
  var deleted = ''
  var val = $(this).val()
  if (e.which == 8) {
    if (position[0] == position[1]) {
      if (position[0] == 0) { deleted = '' } else { deleted = val.substr(position[0] - 1, 1) }
    } else {
      deleted = val.substring(position[0], position[1])
    }
  } else if (e.which == 46) {
    var val = $(this).val()
    if (position[0] == position[1]) {
      if (position[0] === val.length) { deleted = '' } else { deleted = val.substr(position[0], 1) }
    } else {
      deleted = val.substring(position[0], position[1])
    }
  }
  console.log(deleted)
  // Now you can test the deleted character(s) here
})

function Element(body, type, date, urgent, user) {
  this.body = body
  this.type = type
  this.date = date
  this.urgent = urgent
  this.user = user
}

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function (example) {
    return $.ajax({
      headers: {
        'Content-Type': 'application/json'
      },
      type: 'POST',
      url: 'api/examples',
      data: JSON.stringify(example)
    })
  },
  getExamples: function () {
    return $.ajax({
      url: 'api/examples',
      type: 'GET'
    })
  },
  deleteExample: function (id) {
    return $.ajax({
      url: 'api/examples/' + id,
      type: 'DELETE'
    })
  }
}

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function () {
  API.getExamples().then(function (data) {
    var $examples = data.map(function (example) {
      var $a = $('<a>')
        .text(example.text)
        .attr('href', '/example/' + example.id)

      var $li = $('<li>')
        .attr({
          class: 'list-group-item',
          'data-id': example.id
        })
        .append($a)

      var $button = $('<button>')
        .addClass('btn btn-danger float-right delete')
        .text('ｘ')

      $li.append($button)

      return $li
    })

    $exampleList.empty()
    $exampleList.append($examples)
  })
}

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault()

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  }

  if (!(example.text && example.description)) {
    alert('You must enter an example text and description!')
    return
  }

  API.saveExample(example).then(function () {
    refreshExamples()
  })

  $exampleText.val('')
  $exampleDescription.val('')
}

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr('data-id')

  API.deleteExample(idToDelete).then(function () {
    refreshExamples()
  })
}

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);

// materialize functions
$(document).ready(function() {
  $(".tabs").tabs();
});
