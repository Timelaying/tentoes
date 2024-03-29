// FilePond.registerPlugin(
//     FilePoundPluginImagePreview,
//     FilePoundPluginImageResize,
//     FilePoundPluginImageEncode,

// )
// FilePound.setOptions({
//     stylePanelAspectRatio:  150/100,
//     imageResizeTargetWidth: 100,
//     imageResizeTargetHeight: 150
// })

// FilePond.parse(document.body);
document.addEventListener('DOMContentLoaded', function() {
    FilePond.registerPlugin(FilePondPluginImagePreview);
    FilePond.registerPlugin(FilePondPluginImageResize);
    FilePond.registerPlugin(FilePondPluginFileEncode);
    const inputElement = document.querySelector('input[type="file"]');
    const pond = FilePond.create(inputElement);
    FilePond.parse(document.body);
  }); 


