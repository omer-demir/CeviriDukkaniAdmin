require(['../../common'],
    function (common) {
        require(['utility'],function (utility) {
                $(function () {

                    //variables
                    var utilityObj = new utility();
                    var resources = null;

                    //private funcs
                    var getTargetLanguages = function (sourceLanguageId) {
                        return $.ajax({
                            url: '/api/v1/commonapi/getTargetLanguages?sourceLanguageId=' + sourceLanguageId
                        });
                    };
                    var addSourceTargetLanguages = function (sourceTargetLanguageDto) {
                        return $.ajax({
                            url: '/api/v1/commonapi/addSourceTargetLanguages',
                            type: 'POST',
                            data: sourceTargetLanguageDto
                        });
                    };
                    var deleteSourceTargetLanguages = function (sourceTargetLanguageDto) {
                        return $.ajax({
                            url: '/api/v1/commonapi/deleteSourceTargetLanguages',
                            type: 'POST',
                            data: sourceTargetLanguageDto
                        });
                    };
                    var initPage = function () {
                    };

                    //events
                    $('#ddlLanguages').change(function () {
                        var leagueId = $(this).val();
                        $('.chkLanguages').prop('disabled', $(this).val() === '');
                        $('.chkLanguages').prop('checked', false);
                        $('.dvLanguages').removeClass('hide');
                        if (leagueId) {
                            getTargetLanguages(leagueId)
                            .success(function (targetLanguages) {
                                for (var i = 0; i < targetLanguages.length; i++) {
                                    $('#chkLanguages_' + targetLanguages[i].targetLanguageId).prop('checked', true);
                                }
                            });
                        }
                        $('#chkLanguages_' + leagueId).closest('.dvLanguages').addClass('hide');
                    });
                    $('.chkLanguages').click(function (e) {
                        e.preventDefault();
                        var $chk = $(this);
                        var title = resources.hedefListesineEklemekIstediginizeEminmisiniz, text = resources.dilHedefListesineEklenecektir, confirmTitle = resources.eklendi, confirmText = resources.dilHedefListesineEklendi;
                        if (!$chk.prop('checked')) {
                            title = resources.hedefListesindenCikarmakIstediginizeEminmisiniz;
                            text = resources.dilHedefListesindenCikartilacaktir;
                            confirmTitle = resources.silindi;
                            confirmText = resources.dilHedefListesindenCikartildi;
                        }
                        swal({
                            title: title,
                            text: text,
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: resources.evet,
                            cancelButtonText: resources.hayir,
                            closeOnConfirm: false,
                            closeOnCancel: true
                        },
                         function (isConfirm) {
                             if (isConfirm) {
                                 var sourceTargetLanguageDto = {
                                     SourceLanguageId: $('#ddlLanguages').val(),
                                     TargetLanguageId: $chk.attr('leagueid')
                                 };
                                 if ($chk.prop('checked')) {
                                     deleteSourceTargetLanguages(sourceTargetLanguageDto)
                                         .success(function() {
                                             $chk.prop('checked', !$chk.prop('checked'));
                                             swal(confirmTitle, confirmText, "success");
                                         });
                                 } else {
                                     addSourceTargetLanguages(sourceTargetLanguageDto)
                                         .success(function () {
                                             $chk.prop('checked', !$chk.prop('checked'));
                                             swal(confirmTitle, confirmText, "success");
                                         });
                                 }
                                 
                             }
                         });
                    });
                    var getResources = function () {
                        var keyList = [
                            'HedefListesineEklemekIstediginizeEminmisiniz',
                            'DilHedefListesineEklenecektir',
                            'Eklendi',
                            'DilHedefListesineEklendi',
                            'HedefListesindenCikarmakIstediginizeEminmisiniz',
                            'DilHedefListesindenCikartilacaktir',
                            'Silindi',
                            'DilHedefListesindenCikartildi',
                            'Evet',
                            'Hayir'
                        ];
                        var resourceName = 'sourceTargetLanguages';
                        $.when(utilityObj.initResources(keyList, resourceName)).then(function () {
                            resources = JSON.parse(localStorage.getItem(resourceName));
                            initPage();
                        });
                    };
                    getResources();
                });
            });
    });