require(['../../common', '../../constants'], function (common, constants) {
    require(['jquery', , 'jqueryValidate'], function () {
        $(function () {

            //variables
            
            //private funcs
            var editDocument = function (documentDto) {

                return $.ajax({
                    url: '/api/v1/documentapi/editTranslationDocument',
                    type: 'POST',
                    data: documentDto
                });
            };
            var uploadDocument = function (file) {
                return $.ajax({
                    url: constants.documentUploadUrl,
                    type: 'POST',
                    data: file,
                    contentType: false,
                    processData: false
                });
            };

            //events
            
            $('#btnSave').click(function () {
                if ($("#formValidate").valid()) {

                    var formData = new FormData();
                    formData.append("MyFile", $('#FilePath')[0].files[0]);
                    
                    uploadDocument(formData)
                        .success(function (response) {
                            
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

                            editDocument(documentDto)
                                .success(function (document) {
                                    window.location.href = "/Admin/Document/Index";
                                });
                        });
                }
            });

            var initPage = function () {

                $("#formValidate").validate({
                    rules: {
                        fileUpload: {
                            required: true
                        }
                    },
                    //For custom messages
                    messages: {
                        fileUpload: {
                            required: "Upload a File"
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
            };

            initPage();
        });
    });
});