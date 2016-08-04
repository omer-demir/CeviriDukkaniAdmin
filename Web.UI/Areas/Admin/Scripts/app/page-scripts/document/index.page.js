require(['../../common'],
    function (common) {
        require(['utility', 'dxdatagrid'],
            function (utility) {
                var utilityObj = new utility();
                $(function () {
                    //private funcs
                    var getDocuments = function () {
                        return $.ajax({
                            url: '/api/v1/documentapi/getDocuments'
                        });
                    };
                    var initPage = function () {
                        getDocuments()
                            .success(function (documentList) {

                                var gridOpts = $.extend(true,
                                {
                                    filterRow: {
                                        visible: true,
                                        applyFilter: "auto"
                                    },
                                    headerFilter: {
                                        visible: true
                                    },
                                    dataSource: documentList,
                                    paging: { pageSize: 10 },
                                    columns: [{
                                            dataField: 'path',
                                            caption: 'Dosya Yolu'
                                        }, {
                                            dataField: 'name',
                                            caption: 'Dosya İsmi'
                                        }, {
                                            dataField: 'charCount',
                                            caption: 'Karakter Sayısı'
                                        }, {
                                            dataField: 'charCountWithSpaces',
                                            caption: 'Karakter Sayısı ( Boşluklar Dahil )'
                                        }, {
                                            dataField: 'active',
                                            caption: 'Aktif'
                                        },  {
                                            dataField: 'id',
                                            caption: 'Aksiyon',
                                            alignment: 'left',
                                            cellTemplate: function(container, cellInfo) {
                                                var actions = '<a class="custom-link" href="/Admin/Document/Edit/{Id}" title="Dokümanı düzenle"><i class="mdi-editor-mode-edit"></i></a>';
                                                $(actions.supplant({ Id: cellInfo.value })).appendTo(container);
                                            }
                                        }
                                    ],
                                    editing: {
                                        insertEnabled: true
                                    },
                                    onInitNewRow: function (e) {
                                        window.location.href = "Create";
                                    }
                                }, utilityObj.baseGridOptions);


                                $('#documentListGrid').dxDataGrid(gridOpts);
                                $('#documentListGrid').dxDataGrid('instance');
                            });
                    };

                    initPage();
                });
            });
    });