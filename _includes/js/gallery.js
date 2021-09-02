function initGallery(gallery) {
  $(`#${gallery}`)
    .justifiedGallery({ rowHeight: 320, lastRow: 'left', margins: 8, border: 0 })
    .on('jg.complete', function () {
      window.lightGallery(document.getElementById(gallery), {
        autoplayFirstVideo: false,
        pager: false,
        licenseKey: 'C156C168-AEF34EB8-96448D28-6C369D5D',
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

$(() => ['editorial', 'logo', 'illustration'].forEach(initGallery));
