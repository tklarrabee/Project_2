/* eslint-disable no-undef */
const task = '●'
const event = '○'
const note = '▷'

// document.write(task, event, note)

function Element (body, type, date, urgent, user) {
  this.body = body
  this.type = type
  this.date = date
  this.urgent = urgent
  this.user = user
}
// on submit do this
var str = $('#area').val()
// get information
var t = str.split('\n')
for (var i = 0; i < t.length; i++) {
  var arr = t[i].split('\t')
  document.write("'<row dc= '" + arr[0] + "' al='" + arr[1] + "' msg='" + arr[2] + "' />'")
}

// Used to determine the cursor position within the editor area.

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
$('#area').keyup(function (e) {
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
  if (deleted !== '') {
    console.log(deleted)
  }

  // Now you can test the deleted character(s) here
})

function getVal () {
  let editorState = $('#area').val()
  return editorState
}

function addSymbol (pos, sym, text) {
  let end = text.length
  let halfOne = text.substring(0, pos[0])
  let halfTwo = text.substring(pos[1], end)
  let newState = halfOne + ' ' + sym + ' ' + halfTwo
  return newState
}

$('#area').keydown(function (e) {
  if (e.ctrlKey && e.which === 190) {
    let text = getVal()
    let position = $(this).getCursorPosition()
    $(this).val(addSymbol(position, task, text))
  } else if (e.ctrlKey && e.which === 188) {
    let text = getVal()
    let position = $(this).getCursorPosition()
    $(this).val(addSymbol(position, event, text))
  } else if (e.ctrlKey && e.which === 191) {
    let text = getVal()
    let position = $(this).getCursorPosition()
    $(this).val(addSymbol(position, note, text))
  }
})

$('#log').on('click', function (e) {
  let log = getVal()
  // get information
  let t = log.split(/([○▷●])/g)
  // for (var i = 0; i < t.length; i++) {
  //   var arr = t[i].split('\t')
  //   document.write("'<row dc= '" + arr[0] + "' al='" + arr[1] + "' msg='" + arr[2] + "' />'")
  // }
  console.log(t)
})

// if (e.which === 190) {
//   $(this).val(addSymbol(position, task, text))
//   position = $(this).getCursorPosition()
//   text = getVal()
// }
// $('#area').keydown(function (e) {
//   switch (e.which) {
//     case 190:
//       $(this).val(addSymbol(position, task, text))
//       break
//     case 188:
//       $(this).val(addSymbol(position, event, text))
//       break
//     case 191:
//       $(this).val(addSymbol(position, note, text))
//       break
//   }
// })
// Constructor for new tasks, events, and notes.
