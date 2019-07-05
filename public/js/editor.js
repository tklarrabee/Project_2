$(document).ready(function () {
  $('.tabs').tabs()
  /* eslint-disable no-undef */
  const task = '●'
  const event = '○'
  const note = '▷'
  const userId = $('#janky').attr('data-user')

  // Construct the note, task, or event 
  function Element(body, user) {
    this.body = body
    this.userId = user
  }

  // Used to determine the cursor position within the editor message.

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

  // Get current text editor value
  function getTask () {
    let editorState = $('#message').val()
    return editorState
  }

  // add Symbol, split editor value at cursor position and insert the symbol provided as an argument
  function addSymbol (pos, sym, text) {
    let end = text.length
    let halfOne = text.substring(0, pos[0])
    let halfTwo = text.substring(pos[1], end)
    let newState = halfOne + ' ' + sym + ' ' + halfTwo
    return newState
  }

  // Hotkey event listener
  $('#message').keydown(function (e) {
    if (e.ctrlKey && e.which === 190) {
      let text = getTask()
      let position = $(this).getCursorPosition()
      $(this).val(addSymbol(position, task, text))
    } else if (e.ctrlKey && e.which === 188) {
      let text = getTask()
      let position = $(this).getCursorPosition()
      $(this).val(addSymbol(position, event, text))
    } else if (e.ctrlKey && e.which === 191) {
      let text = getTask()
      let position = $(this).getCursorPosition()
      $(this).val(addSymbol(position, note, text))
    }
  })

  // Submit event listener.
  $('#add').on('click', function (e) {
    let log = getTask()
    let entries = []
    // get information
    let rawLog = log.split(/([○▷●])/g)
    console.log(rawLog)
    for (i = 0; i < rawLog.length; i++) {
      if (rawLog[i] === task) {
        bodyIndex = i + 1
        body = rawLog[bodyIndex].trim()
        if (body !== '' && body !== task && body !== note && body !== event) {
          let entry = new Element(body, userId)
          entry.task = true
          entries.push(entry)
        }
      } else if (rawLog[i] === event) {
        bodyIndex = i + 1
        body = rawLog[bodyIndex].trim()
        if (body !== '' && body !== task && body !== note && body !== event) {
          let entry = new Element(body, userId)
          entry.event = true
          entries.push(entry)
        }
      } else if (rawLog[i] === note) {
        bodyIndex = i + 1
        body = rawLog[bodyIndex].trim()
        if (body !== '' && body !== task && body !== note && body !== event) {
          let entry = new Element(body, userId)
          entry.note = true
          entries.push(entry)
        }
      }
    }

    // for(i = 0; i< entries.length; i++) {
    //   let rawBody = entries[i].body.split('||')
    //   if(rawBody[i] === '||') {
    //     dateIndex = i + 1
    //     date = date(rawBody[dateIndex])
    //   }
    // }

    // This pushes tasks individually because bulk create is a myth invented to crush the spirit of coders
    for (i = 0; i < entries.length; i++) {
      let entry = entries[i]
      $.ajax({
        method: 'POST',
        url: '/api/tasks',
        data: entry
      }).then(function (req, res) {
        location.reload()
      });
    }
  })
  // Handlebars is really dumb we had to change our model
  // Change view to view task list or note
  // $('.clicky').on('click', function (e) {
  //   url = '/api/entries/' + userId + '/' + $(this).attr('data-type')
  //   $.get(url, function (data) {
  //     console.log(url, data)
  //   })
  // })

  // Update entries 

  function updateEntry(entry) {
    url = '/api/tasks/' + entry.id
    $.put(url, function (data) {
      console.log(url, data)
    }).then(function() {
      location.reload()
    })
  }

  $("#urgent").on('click', function () {
    let urgent = this.attr("data-urgent")
    let id = this.attr("data-id")
    let update = {
      id: id,
      urgent: urgent
    }
    updateEntry(update)
  });

})

$('.delete-task').on('click', function () {
  let id = $(this).attr('data-id')
  let url = '/api/tasks/' + id
  $.ajax({
    method: 'DELETE',
    url: url,
    data: {id: id}
  }).then(function () {
    location.reload();
  })
})

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.fixed-action-btn');
  var instances = M.FloatingActionButton.init(elems, {
    direction: 'left',
    hoverEnabled: false
  });
});
