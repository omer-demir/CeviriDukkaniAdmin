/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../services/common.data.service.ts" />
/// <reference path="../../classes/util.ts" />
/// <reference path="../../classes/ceviri.classes.ts" />
(function () {
    var dropzoneElement;
    var dataService = new DataService();
    function initializeDropzone() {
        var dropzoneOpt = {
            url: "http://localhost:8003/api/documentapi/uploadTranslationDocument",
            uploadMultiple: true,
            parallelUploads: 1,
            addRemoveLinks: '/Admin/Home/RemoveFile',
            maxFiles: 1,
            maxFilesize: 500000,
            acceptedFiles: '.pdf, .docx, .doc, .txt',
            dictDefaultMessage: 'Dosya yüklemek için tıklayın ya da dosyayı sürükleyip bırakın',
            dictFallbackMessage: 'Tarayıcınız bu içeriği gösteremiyor',
            dictFallbackText: '',
            dictInvalidFileType: 'Uyumsuz dosya tipi',
            dictFileTooBig: 'Dosya boyutu tanımlanandan yüksektir',
            dictResponseError: 'Hata oluştu',
            dictCancelUpload: 'Yüklemeyi iptal et',
            dictCancelUploadConfirmation: 'İptal etmek istediğinize emin misiniz?',
            dictRemoveFile: 'Dosya sil',
            dictMaxFilesExceeded: 'Toplam yüklenebilir dosya sayısını aştınız',
            success: function (file, response) {
                var documentDto = {
                    Name: $("#txtName").val(),
                    Path: response.Data.FilePath,
                    PageCount: response.Data.PageCount,
                    CharCount: response.Data.CharCount,
                    CharCountWithSpaces: response.Data.CharCountWithSpaces
                };
                $('.dz-error-mark').hide();
                $('#txtPageCount').text(documentDto.PageCount);
                $('#txtCharCount').text(documentDto.CharCount);
                $('#txtCharCountWithSpaces').text(documentDto.CharCountWithSpaces);
            },
            sending: function (file, xhr, formData) {
                if (dropzoneElement.files.length > 1) {
                    dropzoneElement.cancelUpload(file);
                }
            },
            removed: function () {
                $('#txtPageCount').val("");
                $('#txtCharCount').val("");
                $('#txtCharCountWithSpaces').val("");
            }
        };
        dropzoneElement = new Dropzone("#file", dropzoneOpt);
    }
    $('#sourceLanguage').on('select2:select', function (e) {
        dataService.getTargetLanguages(e.params.data.id, function (result) {
            var morphedResult = [];
            result.forEach(function (item) {
                morphedResult.push(item.targetLanguage);
            });
            var opt = Util.extendOptions(Util.convertToSelect2Data(morphedResult), {
                placeholder: 'Lütfen seçim yapınız',
                multiple: true
            });
            $('#targetLanguages').select2(opt);
        });
    });
    $(function () {
        $("#processTabs").tabs({ show: { effect: "fade", duration: 400 } });
        $(".tab-linker").click(function () {
            var value = $(this).attr('rel');
            $("#processTabs").tabs("option", "active", parseInt(value, 10) - 1);
            return false;
        });
        $('.select').select2(Util.extendOptions([]));
        initializeDropzone();
        dataService.getLanguages(function (result) {
            var opt = Util.extendOptions(Util.convertToSelect2Data(result), {
                placeholder: 'Lütfen seçim yapınız'
            });
            $('#sourceLanguage').select2(opt);
        });
        dataService.getTerminologies(function (result) {
            $('#terminology').select2({
                data: Util.convertToSelect2Data(result)
            });
        });
    });
})();
//# sourceMappingURL=index.page.js.map