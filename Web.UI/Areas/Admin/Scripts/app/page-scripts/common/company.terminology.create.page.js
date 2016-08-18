require(['../../common'], function (common) {
    require(['utility', 'dropzone'], function (utility) {
        $(function () {

            //variables
            var fileName;
            var resources = null;
            var utilityObj = new utility();
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
                        company: 'required'
                    },
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
                    dictDefaultMessage: resources.terminolojiDokumaniniYuklemekIcinTıklayinYadaDosyayiSurukleyipBirakin,
                    dictFallbackMessage: resources.tarayicinizBuIcerigiGostermiyor,
                    dictFallbackText: '',
                    dictInvalidFileType: resources.uyumsuzDosyaTipi,
                    dictFileTooBig: resources.terminolojiDokumanininBoyutuTanimlanandanYuksektir,
                    dictResponseError: resources.hataOlustu,
                    dictCancelUpload: resources.yuklemeyiIptalEt,
                    dictCancelUploadConfirmation: resources.iptalEtmekIstediğinizeEminmisiniz,
                    dictRemoveFile: resources.terminolojiDokumaniniSil,
                    dictMaxFilesExceeded: resources.toplamYuklenebilirDosyaBoyutunuAstiniz
                });
                myDropzone.on('success', function (evt, serverResp) {
                    fileName = serverResp;
                });
            };
            var getResources = function () {
                var keyList = [
                    'TerminolojiDokumaniniYuklemekIcinTıklayinYadaDosyayiSurukleyipBirakin',
                    'TarayicinizBuIcerigiGostermiyor',
                    'UyumsuzDosyaTipi',
                    'TerminolojiDokumanininBoyutuTanimlanandanYuksektir',
                    'HataOlustu',
                    'YuklemeyiIptalEt',
                    'IptalEtmekIstediğinizeEminmisiniz',
                    'TerminolojiDokumaniniSil',
                    'ToplamYuklenebilirDosyaBoyutunuAstiniz'
                ];
                var resourceName = 'companyTerminologyCreate';
                $.when(utilityObj.initResources(keyList, resourceName)).then(function () {
                    resources = JSON.parse(localStorage.getItem(resourceName));
                    initPage();
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

            getResources();
        });
    });
});