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
                        //utilityObj.blockElement('#orderListGrid');
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
                                    dataField: 'id',
                                    caption: 'Sipariş Id'
                                }, {
                                    dataField: 'customer.company.name',
                                    caption: 'Kurum Adı',
                                    allowResizing:true
                                }, {
                                    dataField: 'customer.name',
                                    caption: 'Müşteri Adı',
                                    allowResizing: true
                                }, {
                                    dataField: 'sourceLanguage.name',
                                    caption: 'İstek Dili',
                                    allowResizing: true
                                }, {
                                    dataField: 'targetLanguages',
                                    caption: 'Talep Edilen Diller',
                                    customizeText: function (cellInfo) {
                                        var values = "";
                                        if (cellInfo.value) {
                                            cellInfo.value.forEach(function (item) {
                                                values += item.language.name;
                                            });
                                        }
                                        return values;
                                    },
                                    allowResizing: true
                                }, {
                                    dataField: 'calculatedPrice',
                                    caption: 'Hesaplanan Fiyat Tutar',
                                    allowResizing: true
                                }, {
                                    dataField: 'translationDocument.name',
                                    caption: 'Döküman Adı',
                                    allowResizing: true
                                }, {
                                    dataField: 'translationDocument.charCountWithSpaces',
                                    caption: 'Karakter Sayısı',
                                    allowResizing: true
                                }, {
                                    dataField: 'orderStatus.name',
                                    caption: 'Sipariş Durumu',
                                    allowResizing: true
                                }, {
                                    dataField: 'createdAt',
                                    caption: 'Oluşturulma Tarihi',
                                    customizeText:function(cellInfo) {
                                        return moment(cellInfo.value).format("DD.MM.YYYY HH:mm:ss");
                                    },
                                    allowResizing: true
                                }, {
                                    dataField: 'active',
                                    caption: 'Aktif Sipariş',
                                    allowResizing: true
                                }, {
                                    dataField: 'id',
                                    caption: 'Aksiyon',
                                    alignment: 'left',
                                    cellTemplate: function (container, cellInfo) {
                                        var actions = '<a class="custom-link" href="/Admin/Order/OrderDetail/{Id}" title="Sipariş Detay"><i class="mdi-action-info-outline"></i></a>';
                                        $(actions.supplant({ Id: cellInfo.value })).appendTo(container);
                                    },
                                    allowResizing: true
                                }
                                ],
                                editing: {
                                    insertEnabled: true
                                },
                                onInitNewRow: function (e) {
                                    window.location.href = "Create";
                                }, columnChooser: {
                                    enabled: true,
                                    mode: 'select'
                                }
                            }, utilityObj.baseGridOptions);


                            $('#orderListGrid').dxDataGrid(gridOpts);
                            $('#orderListGrid').dxDataGrid('instance');
                            //utilityObj.unblockElement('#orderListGrid');
                        });
                    };

                    initPage();
                });
            });
    });