function initGallery(gallery) {
  $(gallery)
    .justifiedGallery({ rowHeight: 160, lastRow: 'justify', margins: 8, border: 0 })
    .on('jg.complete', function () {
      window.lightGallery(document.getElementById('lightgallery'), {
        autoplayFirstVideo: false,
        pager: false,
        galleryId: gallery,
        plugins: [lgZoom, lgThumbnail],
        mobileSettings: {
          controls: false,
          showCloseIcon: false,
          download: false,
          rotate: false,
        },
      });
    });
}

document.addEventListener('DOMContentLoaded', function (event) {
  ['#editorial', '#logo', '#illustration'].forEach(initGallery);
});
