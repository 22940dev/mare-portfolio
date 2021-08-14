document.addEventListener('DOMContentLoaded', function (event) {
  // Your code to run since DOM is loaded and ready
  console.log('TEST', { gallery: document.getElementById('lightgallery') });

  /* lightGallery(document.getElementById('lightgallery'), {
    // plugins: [lgZoom, lgThumbnail],
    speed: 500,
  }); */
  $('#lightgallery')
    .justifiedGallery({ rowHeight: 160, lastRow: 'justify', margins: 4 })
    .on('jg.complete', function () {
      window.lightGallery(document.getElementById('lightgallery'), {
        autoplayFirstVideo: false,
        pager: false,
        galleryId: 'nature',
        plugins: [lgZoom, lgThumbnail],
        mobileSettings: {
          controls: false,
          showCloseIcon: false,
          download: false,
          rotate: false,
        },
      });
    });
});
