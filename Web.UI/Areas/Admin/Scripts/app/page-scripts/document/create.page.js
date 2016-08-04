require(['../../common'], function (common) {
    require([], function () {
        $(function () {

            //variables

            //private funcs
            var addDocument = function (documentDto) {

                return $.ajax({
                    url: '/api/v1/documentapi/addDocument',
                    type: 'POST',
                    data: documentDto
                });
            };
            var uploadDocument = function (file) {
                return $.ajax({
                    url: '/api/v1/documentapi/uploadDocument',
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

                            addDocument(documentDto)
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