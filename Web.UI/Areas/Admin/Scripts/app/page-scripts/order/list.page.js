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
                    var getOrders = function () {
                        return $.ajax({
                            url: '/api/v1/orderapi/getOrder'
                        });
                    };
                    var initPage = function () {
                        utilityObj.blockElement('#orderListGrid');
                        getOrders().success(function (orderList) {

                                var gridOpts = $.extend(true,
                                {
                                    filterRow: {
                                        visible: true,
                                        applyFilter: "auto"
                                    },
                                    headerFilter: {
                                        visible: true
                                    },
                                    dataSource: orderList.data,
                                    paging: { pageSize: 10 },
                                    columns: [{
                                            dataField: 'customer.name',
                                            caption: 'Müşteri Adı'
                                        }, {
                                            dataField: 'sourceLanguage.name',
                                            caption: 'Sipariş İstek Dili'
                                        }, {
                                            dataField: 'terminology.name',
                                            caption: 'Terminoloji Adı'
                                        }, {
                                            dataField: 'translationQuality.name',
                                            caption: 'Kalite'
                                        }, {
                                            dataField: 'calculatedPrice',
                                            caption: 'Hesaplanan Tutar'
                                        }, {
                                            dataField: 'orderStatus.name',
                                            caption: 'Sipariş Durumu'
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


                                $('#orderListGrid').dxDataGrid(gridOpts);
                                $('#orderListGrid').dxDataGrid('instance');
                                utilityObj.unblockElement('#orderListGrid');
                            });
                    };

                    initPage();
                });
            });
    });