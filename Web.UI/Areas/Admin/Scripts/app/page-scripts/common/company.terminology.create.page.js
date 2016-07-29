require(['../../common'], function (common) {
    require(['dropzone'], function () {
        $(function () {

            //variables
            var fileName;
            //private funcs
            var addCompanyTerminology = function (companyTerminologyDto) {
                return $.ajax({
                    url: '/api/v1/commonapi/addCompanyTerminology',
                    type: 'POST',
                    data: companyTerminologyDto
                });
            };
            var initPage = function () {
                //validator
                $("#formValidate").validate({
                    rules: {
                        name: {
                            required: true,
                            minlength: 5
                        },
                        company: 'required',
                    },
                    //For custom messages
                    messages: {
                        name: {
                            required: "Enter a terminology name",
                            minlength: "Enter at least 5 characters"
                        }
                    },
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

                Dropzone.autoDiscover = false;
                var myDropzone = new Dropzone("div#my-dropzone", {
                    url: "/Admin/Home/UploadFile",
                    uploadMultiple: false,
                    //addRemoveLinks: '/Admin/Home/RemoveFile',
                    maxFiles: 1,
                    maxFilesize: 5,
                    //acceptedFiles: 'image/*,.avi,.mp4',
                    dictDefaultMessage: 'Terminoloji dökümanını yüklemek için tıklayın ya da dosyayı sürükleyip bırakın',
                    dictFallbackMessage: 'Tarayıcınız bu içeriği gösteremiyor',
                    dictFallbackText: '',
                    dictInvalidFileType: 'Uyumsuz dosya tipi',
                    dictFileTooBig: 'Terminoloji dökümanını boyutu tanımlanandan yüksektir',
                    dictResponseError: 'Hata oluştu',
                    dictCancelUpload: 'Yüklemeyi iptal et',
                    dictCancelUploadConfirmation: 'İptal etmek istediğinize emin misiniz?',
                    dictRemoveFile: 'Terminoloji dökümanını sil',
                    dictMaxFilesExceeded: 'Toplam yüklenebilir dosya sayısını aştınız'
                });
                myDropzone.on('success', function (evt, serverResp) {
                    fileName = serverResp;
                });
            };
            //events
            $('#btnSave').click(function () {
                if ($("#formValidate").valid()) {
                    var companyTerminologyDto = {
                        Name: $('#txtName').val(),
                        CompanyId: $('#ddlCompanies').val(),
                        FileUrl: fileName
                    };
                    addCompanyTerminology(companyTerminologyDto).success(function (data) {
                        window.location.href = "/Admin/Common/CompanyTerminologies";
                        console.log(data);
                    });
                }
            });

            initPage();


        });
    });
});