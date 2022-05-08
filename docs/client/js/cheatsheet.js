/* global bootstrap: false */

(function () {
  'use strict'

  // Tooltip and popover demos
  document.querySelectorAll('.tooltip-demo')
    .forEach(function (tooltip) {
      new bootstrap.Tooltip(tooltip, {
        selector: '[data-bs-toggle="tooltip"]'
      })
    })

  document.querySelectorAll('[data-bs-toggle="popover"]')
    .forEach(function (popover) {
      new bootstrap.Popover(popover)
    })

  document.querySelectorAll('.toast')
    .forEach(function (toastNode) {
      var toast = new bootstrap.Toast(toastNode, {
        autohide: false
      })

      toast.show()
    })

  // Disable empty links and submit buttons
  document.querySelectorAll('[href="#"], [type="submit"]')
    .forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault()
      })
    })

  function setActiveItem() {
    var hash = window.location.hash

    if (hash === '') {
      return
    }

    var link = document.querySelector('.bd-aside a[href="' + hash + '"]')

    if (!link) {
      return
    }

    var active = document.querySelector('.bd-aside .active')
    var parent = link.parentNode.parentNode.previousElementSibling

    link.classList.add('active')

    if (parent.classList.contains('collapsed')) {
      parent.click()
    }

    if (!active) {
      return
    }

    var expanded = active.parentNode.parentNode.previousElementSibling

    active.classList.remove('active')

    if (expanded && parent !== expanded) {
      expanded.click()
    }
  }

  async function saveSong(name, likes) {
    const data = JSON.stringify({ name, likes });
    const response = await fetch('/songRequest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });
    if (!response.ok) {
      console.error(`Unable to save ${data} to server`);
    }
  }


  document.getElementById('submit').addEventListener('click', async () => {
    // async function addSong(name){
      
    document.getElementById("add").innerHTML = '<div class="input-group"><span type="text" id = "user4" class="form-control" value = document.getElementById("songName").value ></span><span class="input-group-text">Likes</span><input id = "like4" type = "button" value = "0" onclick="myFunction(id)"></input></div>';
    document.getElementById("user4").innerText = "Jack1234: " + document.getElementById("songName").value;
    console.log( document.getElementById("user4"))
    // await saveSong("Juju: " + document.getElementById("user4").value, 0);
    });

  setActiveItem()
  window.addEventListener('hashchange', setActiveItem)

})()
