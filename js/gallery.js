function initGallery(gallery) {
  $(`#${gallery}`)
    .justifiedGallery({ rowHeight: 320, lastRow: 'left', margins: 8, border: 0 })
    .on('jg.complete', function () {
      window.lightGallery(document.getElementById(gallery), {
        autoplayFirstVideo: false,
        pager: false,
        galleryId: gallery,
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
  ['editorial', 'logo', 'illustration'].forEach(initGallery);
});
