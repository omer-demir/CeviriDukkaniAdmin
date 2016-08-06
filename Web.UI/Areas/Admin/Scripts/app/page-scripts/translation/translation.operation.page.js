require(['../../common'],
    function (common) {
        require(
            [
                'utility',
                'css!../../../Scripts/dx/css/dx.common.css',
                'css!../../../Scripts/dx/css/dx.light.css',
                'jquery',
                '../../../Scripts/dx/js/dx.webappjs'
            ],
            function (utility) {
                var utilityObj = new utility();
                $(function () {
                    //private funcs
                    var getTranslationOperations = function () {
                        return $.ajax({
                            url: '/api/v1/translationapi/getAssignedJobsAsTranslator',
                            data: { userId: $('#userId').val() }
                        });
                    };
                    var initPage = function () {
                        getTranslationOperations().success(function (list) {

                                var gridOpts = $.extend(true,
                                {
                                    filterRow: {
                                        visible: true,
                                        applyFilter: "auto"
                                    },
                                    headerFilter: {
                                        visible: true
                                    },
                                    dataSource: list.data,
                                    paging: { pageSize: 10 },
                                    columns: [{
                                        dataField: 'translationDocumentPart.translationDocumentId',
                                            caption: 'Dosya Id'
                                        }, {
                                            dataField: 'translationOperationStatus.name',
                                            caption: 'İşlem Durumu'
                                        }, {
                                            dataField: 'translationProgressStatus.name',
                                            caption: 'Devam Durumu'
                                        }, {
                                            dataField: 'createdAt',
                                            caption: 'Oluşturulma Tarihi'
                                        }, {
                                            dataField: 'active',
                                            caption: 'Aktif'
                                        }, {
                                            dataField: 'id',
                                            caption: 'Aksiyon',
                                            alignment: 'left',
                                            cellTemplate: function(container, cellInfo) {
                                                var actions = '<a class="custom-link" href="/Admin/Order/Edit/{Id}" title="Sipariş düzenle"><i class="mdi-editor-mode-edit"></i></a>' +
                                                    '<a class="custom-link" href="/Admin/Order/Detail/{Id}" title="Sipariş Detay"><i class="icon-cog7"></i></a>';
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


                                $('#dataListGrid').dxDataGrid(gridOpts);
                                $('#dataListGrid').dxDataGrid('instance');
                                //utilityObj.unblockElement('#orderListGrid');
                            });
                    };

                    initPage();
                });
            });
    });