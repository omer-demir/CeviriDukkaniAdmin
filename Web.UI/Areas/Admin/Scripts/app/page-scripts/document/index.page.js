require(['../../common'],
    function (common) {
        require(['utility', 'dxdatagrid'],
            function (utility) {
                var utilityObj = new utility();
                $(function () {
                    //private funcs
                    var getDocuments = function () {
                        return $.ajax({
                            url: '/api/v1/documentapi/getTranslationDocuments'
                        });
                    };
                    var getAudits = function (id) {
                        return $.ajax({
                            url: '/api/v1/documentapi/getDocumentAudits?documentId=' + id
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
                                    }, {
                                        dataField: 'id',
                                        caption: 'Aksiyon',
                                        alignment: 'left',
                                        cellTemplate: function (container, cellInfo) {
                                            var actions = '<a class="custom-link" href="/Admin/Document/Edit/{Id}" title="Dokümanı düzenle"><i class="mdi-image-edit"></i></a>' +
                                                '<a class="custom-link audit-modal-trigger modal-trigger" data-id="' +
                                                cellInfo.value + '" href="#auditModal2" title="Doküman geçmişi">' +
                                                '<i class="mdi-action-list"></i></a>';
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

                                $(document)
                                    .on('click',
                                        '.audit-modal-trigger',
                                        function (ev) {
                                            var id = $(this).data("id");
                                            $($(this).attr('href')).modal('show');
                                            getAudits(id)
                                                .success(function (response) {

                                                    var gridOpts = $.extend(true,
                                                    {
                                                        filterRow: {
                                                            visible: true,
                                                            applyFilter: "auto"
                                                        },
                                                        headerFilter: {
                                                            visible: true
                                                        },
                                                        dataSource: response.data,
                                                        paging: { pageSize: 10 },
                                                        columns: [{
                                                            dataField: 'message',
                                                            caption: 'Bilgi'
                                                        }, {
                                                            dataField: 'status',
                                                            caption: 'Durum'
                                                        }, {
                                                            dataField: 'date',
                                                            caption: 'Tarih'
                                                        }]
                                                    }, utilityObj.baseGridOptions);

                                                    $('#documentAuditGrid').dxDataGrid(gridOpts);
                                                    $('#documentAuditGrid').dxDataGrid('instance');
                                                });

                                        });
                            });
                    };

                    initPage();
                });
            });
    });