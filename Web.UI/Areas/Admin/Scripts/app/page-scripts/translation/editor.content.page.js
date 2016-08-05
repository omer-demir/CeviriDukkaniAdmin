require(['../../common'],
    function (common) {
        require(
            [
                'utility',
                'ckeditor',
                'css!../../../Scripts/dx/css/dx.common.css',
                'jquery',
            ],
            function (utility) {
                var utilityObj = new utility();
                var params = window.location.search.match(/[(0-9)]{1,3}/g);

                function getTranslationDocumentPart(translationDocumentPartId) {
                    $.ajax({
                        type: 'GET',
                        url: '/api/v1/documentapi/getTranslationDocumentPartById',
                        data: { translationDocumentPartId: translationDocumentPartId }
                    }).success(function (result) {
                        CKEDITOR.instances['original'].setData(result.data.content);
                    }).fail(function (erro) {

                    });
                }

                function getEditedContent(translationDocumentPartId, userId) {
                    $.ajax({
                        type: 'GET',
                        url: '/api/v1/translationapi/getEditedContent',
                        data: { translationDocumentPartId: translationDocumentPartId, userId: userId }
                    }).success(function (result) {
                        CKEDITOR.instances['translator'].setData(result.data);
                    }).fail(function (erro) {

                    });
                }

                function getTranslationOperationComments(translationDocumentPartId) {
                    $.ajax({
                        type: 'GET',
                        url: '/api/v1/translationapi/getTranslationOperationComments',
                        data: { translationDocumentPartId: translationDocumentPartId }
                    }).success(function (result) {
                        populateCommentList(result.data);
                    }).fail(function (erro) {

                    });
                }

                function populateCommentList(data) {
                    var $ulElement = $('#commentCollection');
                    data.forEach(function (item) {
                        $('<li class="collection-item"></li>')
                            .html(item.fromUser.name + ' ' + item.fromUser.surName + ':' + item.content)
                            .appendTo($ulElement);
                    });
                }

                function saveComment(data) {
                    $.ajax({
                        type: 'POST',
                        url: '/api/v1/translationapi/addCommentToTranslationOperation',
                        data: data
                    }).success(function (result) {
                        Materialize.toast('Yorum başarıyla eklendi', 3000);
                    }).fail(function (erro) {
                        Materialize.toast('Yorum eklerken hata alındı.', 3000);
                    });
                }

                function updateContent(data) {
                    $.ajax({
                        type: 'POST',
                        url: '/api/v1/translationapi/updateEditedDocumentPart',
                        data: data
                    }).success(function (result) {
                        Materialize.toast('İçerik başarıyla Güncellendi', 3000);
                    }).fail(function (erro) {
                        Materialize.toast('İçerik Güncellerken hata alındı.', 3000);
                    });
                }

                function markAsFinished(data) {
                    $.ajax({
                        type: 'POST',
                        url: '/api/v1/translationapi/markEditingAsFinished',
                        data: data
                    }).success(function (result) {
                        Materialize.toast('İşlem tamamlandı', 3000);
                    }).fail(function (erro) {
                        Materialize.toast('Hata alındı.', 3000);
                    });
                }

                $(document).on('click', '#finishContent', function () {
                    var data = {
                        userId: $('#userId').val(),
                        translationDocumentPartId: params[0]
                    };
                    markAsFinished(data);
                });

                $(document).on('click', '#updateContent', function () {
                    var data = {
                        changerId: $('#userId').val(),
                        translationDocumentPartId: params[0],
                        content: $('#translator').val()
                    };
                    updateContent(data);
                });

                $(document).on('click', '#addCommentBtn', function () {
                    var data = {
                        commentCreatorId: $('#userId').val(),
                        content: $('#content').val(),
                        translationDocumentPartId: params[0]
                    };
                    saveComment(data);

                });

                $(function () {
                    CKEDITOR.replace('original');
                    CKEDITOR.replace('translator');
                    getTranslationDocumentPart(params[0]);
                    getEditedContent(params[0], params[1]);
                    getTranslationOperationComments(params[0]);
                });
            });
    });