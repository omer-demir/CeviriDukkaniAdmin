require(['../../common', '../../constants'], function (common, constants) {
    require(['dropzone'], function () {
        Dropzone.autoDiscover = false;

        $(function () {
            //variables


            var myDropzone = new Dropzone("#file", {
                url: constants.documentUploadUrl,
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
                dictMaxFilesExceeded: 'Toplam yüklenebilir dosya sayısını aştınız'
            });

            myDropzone.on('success', function (evt, response) {
                console.log(response);
                var documentDto = {
                    Name: $("#txtName").val(),
                    Path: response.Data.FilePath,
                    PageCount: response.Data.PageCount,
                    CharCount: response.Data.CharCount,
                    CharCountWithSpaces: response.Data.CharCountWithSpaces
                };

                $('#txtPageCount').val(documentDto.PageCount);
                $('#txtCharCount').val(documentDto.CharCount);
                $('#txtCharCountWithSpaces').val(documentDto.CharCountWithSpaces);
            });

            myDropzone.on('sending', function (file) {
                if (myDropzone.files.length > 1) {
                    myDropzone.cancelUpload(file);
                }
            });

            myDropzone.on('removedfile', function (removeThumb) {
                $('#txtPageCount').val("");
                $('#txtCharCount').val("");
                $('#txtCharCountWithSpaces').val("");
            });

            //private funcs
            var addDocument = function (documentDto) {
                return $.ajax({
                    url: '/api/v1/documentapi/addTranslationDocument',
                    type: 'POST',
                    data: documentDto
                });
            };

            //events

            $('#btnSave').click(function () {
                if ($("#formValidate").valid()) {

                    var documentDto = {
                        Name: $("#txtName").val(),
                        Path: $('#txtFilePath').val(),
                        PageCount: $('#txtPageCount').val(),
                        CharCount: $('#txtCharCount').val(),
                        CharCountWithSpaces: $('#txtCharCountWithSpaces').val()
                    };

                    addDocument(documentDto)
                        .success(function (document) {
                            window.location.href = "/Admin/Document/Index";
                        });
                }
            });

            var initPage = function () {

                $("#formValidate").validate({
                    errorElement: 'div',
                    errorPlacement: function (error, element) {
                        var placement = $(element).data('error');
                        if (placement) {
                            $(placement).append(error);
                        } else {
                            error.insertAfter(element);
                        }
                    }
                });
            };

            initPage();
        });
    });
});