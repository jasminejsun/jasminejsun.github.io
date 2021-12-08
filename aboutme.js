$(window).load(() => {
    windowLoaded();
  });

  const windowLoaded = () => {
    $('.preloader')
      .delay(400)
      .fadeOut('slow');
};