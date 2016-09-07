/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../services/common.data.service.ts" />
/// <reference path="../../classes/util.ts" />
/// <reference path="../../classes/ceviri.classes.ts" />
declare var $: JQueryStatic;

(() => {
    var dropzoneElement: any;
    var dataService = new DataService();
    var document: any;

    function initializeDropzone() {
        var dropzoneOpt: any = {
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
            success: (file: DropzoneFile, response: any) => {
                var documentDto = {
                    Name: $("#txtName").val(),
                    Path: response.Data.FilePath,
                    PageCount: response.Data.PageCount,
                    CharCount: response.Data.CharCount,
                    CharCountWithSpaces: response.Data.CharCountWithSpaces
                };
                document = documentDto;

                $('.dz-error-mark').hide();

                $('#txtPageCount').text(documentDto.PageCount);
                $('#txtCharCount').text(documentDto.CharCount);
                $('#txtCharCountWithSpaces').text(documentDto.CharCountWithSpaces);
            },
            sending: (file: DropzoneFile, xhr: XMLHttpRequest, formData: {}) => {
                if (dropzoneElement.files.length > 1) {
                    dropzoneElement.cancelUpload(file);
                }
            },
            removed: () => {
                $('#txtPageCount').val("");
                $('#txtCharCount').val("");
                $('#txtCharCountWithSpaces').val("");

                document = null;
            }
        };

        dropzoneElement = new Dropzone("#file", dropzoneOpt);
    }

    $('#sourceLanguage').on('select2:select', (e: any) => {
        updateTargetLanguagesDropdown(e.params.data.id);
    });

    $(() => {
        $("#processTabs").tabs({ show: { effect: "fade", duration: 400 } });
        $(".tab-linker").click(function () {
            var value = $(this).attr('rel');
            $("#processTabs").tabs("option", "active", parseInt(value, 10) - 1);
            return false;
        });
        $('.select').select2(Util.extendOptions([]));

        initializeDropzone();

        dataService.getLanguages((result: any) => {
            initSourceLanguageDropdown(result);
        });

        dataService.getTerminologies((result: any) => {
            initTerminologiesDropdown(result);
        });

        dataService.getTranslationQualities((result: any) => {
            initTranslationQualitiesDropdown(result);
        });
    });

    function initSourceLanguageDropdown(data: any) {
        var opt = Util.extendOptions(Util.convertToSelect2Data(data), {
            placeholder: 'Lütfen seçim yapınız'
        });

        $('#sourceLanguage').select2(opt);
    };

    function initTerminologiesDropdown(data: any) {
        $('#terminology').select2({
            data: Util.convertToSelect2Data(data)
        });
    };

    function initTranslationQualitiesDropdown(data: any) {
        $('#translationQuality').select2({
            data: Util.convertToSelect2Data(data)
        });
    };
    
    function updateTargetLanguagesDropdown(id: any) {
        dataService.getTargetLanguages(id, (result: any) => {

            var morphedResult: any = [];
            result.forEach((item: any) => {
                morphedResult.push(item.targetLanguage);
            });

            var opt = Util.extendOptions(Util.convertToSelect2Data(morphedResult),
                {
                    placeholder: 'Lütfen seçim yapınız',
                    multiple: true
                });

            $('#targetLanguages').select2(opt);
        });
    };

})();
