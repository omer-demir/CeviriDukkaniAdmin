require(['../../common'],
    function (common) {
        require(['utility', 'lodash', 'dxdatagrid'],
            function (utility, _) {

                $(function () {

                    //variables
                    var utilityObj = new utility();
                    var dataGrid;
                    var languages;
                    var editLang;
                    //private funcs
                    var getLanguages = function () {
                        return $.ajax({
                            url: '/api/v1/commonapi/getLanguages'
                        });
                    };
                    var addLanguage = function (languageDto) {
                        return $.ajax({
                            url: '/api/v1/commonapi/addLanguage',
                            type: 'POST',
                            data: languageDto
                        });
                    };
                    var editLanguage = function (languageDto) {
                        return $.ajax({
                            url: '/api/v1/commonapi/editLanguage',
                            type: 'POST',
                            data: languageDto
                        });
                    };
                    var initPage = function () {
                        getLanguages()
                            .success(function (list) {
                                languages = list;
                                var gridOpts = $.extend(true,
                                {
                                    filterRow: {
                                        visible: true,
                                        applyFilter: "auto"
                                    },
                                    headerFilter: {
                                        visible: true
                                    },
                                    dataSource: languages,
                                    paging: { pageSize: 10 },
                                    columns: [
                                        {
                                            width: "auto",
                                            caption: "#",
                                            alignment: 'center',
                                            cellTemplate: function (container, e) {
                                                var index = dataGrid.pageIndex() * dataGrid.pageSize() + e.rowIndex + 1;
                                                container.text(index);
                                            }
                                        },
                                        {
                                            dataField: 'name',
                                            caption: 'Adı',
                                            validationRules: [
                                            {
                                                type: 'required',
                                                message: 'Dil adı alanı boş olamaz.'
                                            },
                                            {
                                                type: 'custom',
                                                message: 'Dil adı alanı her kayıt için tek olmalıdır.',
                                                validationCallback: function (o) {
                                                    if (_.filter(languages, function (item) { return item !== editLang && item.name.toLocaleLowerCase() === o.value.toLocaleLowerCase() }).length > 0) {
                                                        return false;
                                                    }
                                                    return true;
                                                }
                                            }]
                                        }
                                    ],
                                    onRowInserted: function (e) {
                                        addLanguage(e.data).success(function (language) {
                                            Materialize.toast('Kayıt başarılı.', 3000);
                                        });
                                    },
                                    onRowUpdated: function (e) {
                                        editLanguage(e.key).success(function (language) {
                                            Materialize.toast('Kayıt başarılı.', 3000);
                                        });
                                    },
                                    onEditingStart: function (info) {
                                        editLang = info.data;
                                    }
                                    , editing: {
                                        insertEnabled: true,
                                        editEnabled: true,
                                        texts: {
                                            editRow: 'Düzenle',
                                            saveRowChanges: 'Kaydet',
                                            cancelRowChanges: 'İptal'
                                        }
                                    }
                                }, utilityObj.baseGridOptions);


                                $('#languageListGrid').dxDataGrid(gridOpts);
                                dataGrid = $('#languageListGrid').dxDataGrid('instance');
                            });
                    };

                    initPage();
                });
            });
    });