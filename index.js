$(window).load(() => {
  windowLoaded();
});

const windowLoaded = () => {
  $('.preloader')
    .delay(400)
    .fadeOut('slow');

  const words = ["developer & designer", "problem solver", "SYDE engineering student"];
  let i = 0;
  let timer;

  function typingEffect() {
    let word = words[i].split("");
    var loopTyping = function() {
      if (word.length > 0) {
        document.getElementById('word').innerHTML += word.shift();
      } else {
        deletingEffect();
        return false;
      };
      timer = setTimeout(loopTyping, 90);
    };
    loopTyping();
  };

  function deletingEffect() {
    let word = words[i].split("");
    var loopDeleting = function() {
      if (word.length > 0) {
        word.pop();
        document.getElementById('word').innerHTML = word.join("");
      } else {
        if (words.length > (i + 1)) {
          i++;
        } else {
          i = 0;
        };
        typingEffect();
        return false;
      };
      timer = setTimeout(loopDeleting, 50);
    };
    loopDeleting();
  };

  typingEffect();

  const popUpElem = $('.popUp');
  const mainElem = $('main');
  let popUpState = false;
  const closePopUpBtn = $('#cancelBtn');

  const projectElem = $('.project-item');
  //   Hiding the popUp element for now. and show it only when a 'project' is clicked.
  $(popUpElem).hide(1);

  mainElem.on('click', e => {
    if ($(e.target).closest('.project-item').length > 0) {
      // check if popUp is already 'up'
      if (popUpState === false) {
        // Now set popUp state to true!
        popUpState = true;
        if ($(window).width() >= 768) {
          // blur the main element and make it unscrollable. ONLY ON TAB AND DESKTOPS
          $('.projects').css('filter', 'blur(7px)');
        } else {
          // if been viewed on mobile just take away all element except popUp.
          $('.projects').css('display', 'none');
          $('footer').css('display', 'none');
          $('.intro').css('display', 'none');
          $('.contact').css('display', 'none');
        }

        // now the scroll is only disabled for smaller-screen size devices
        if ($(window).width() > 768) {
          $('body').css('overflow', 'hidden');
        }

        // display the popUp
        $(popUpElem).show(400);

        //   below is the data of the project clicked.
        const projectHeading = $(e.target)
          .closest('.project-figure')
          .children('figcaption')
          .children('h2')
          .text();

        const projectDesc = $(e.target)
          .closest('.project-figure')
          .children('figcaption')
          .children('.popUpdesc')
          .text();

        const projectImg = $(e.target)
          .closest('.project-figure')
          .children('img')
          .attr('src');

        const projectGithubRepo = $(e.target)
          .closest('.project-figure')
          .children('figcaption')
          .children('#githubRepo')
          .attr('href');
        //  END OF data of the project clicked.
        // setting the PARAGRAPH of the popUp to match that of the project clicked.
        $(popUpElem)
          .children('#popUpText')
          .children('p')
          .text(`${projectDesc}`);

        // setting the HEADING of the popUp to match that of the project clicked.
        $(popUpElem)
          .children('#popUpText')
          .children('h1')
          .text(`${projectHeading}`);

        // Setting the image here.
        $(popUpElem)
          .children('.popUpImg')
          .css('backgroundImage', `url(${projectImg})`);

        // setting up the github linking here
        $(popUpElem)
          .children('#popUpText')
          .children('div')
          .children('#githubLink')
          .attr('href', `${projectGithubRepo}`);
      }
    }
  });

  $(closePopUpBtn).on('click', () => {
    if (popUpState === true) {
      $(popUpElem).fadeOut(500);

      //   Unblur the main element and take off overflow: hidden
    }
    if ($(window).width() >= 768) {
      // blur the main element and make it unscrollable. ONLY ON TAB AND DESKTOPS
      $('.projects').css('filter', 'blur(0px)');
      $('body').css('overflow', 'scroll');
    } else {
      // if been viewed on mobile just take away all element except popUp.
      $('.projects').css('display', 'block');
      $('footer').css('display', 'block');
      $('.intro').css('display', 'block');
      $('.contact').css('display', 'block');
    }
    // set popUpState back to false so it could work accoridingly.
    popUpState = false;
  });
};
