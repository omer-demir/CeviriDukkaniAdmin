require(['../../common'],
    function (common) {
        require(['utility', 'dxdatagrid'],
            function (utility) {
                
                $(function () {

                    //variables
                    var companies;
                    var utilityObj = new utility();
                    var companyId;
                    var dataGrid;

                    //private funcs
                    var getCustomers = function (companyId) {
                        return $.ajax({
                            url: '/api/v1/customerapi/getCustomers?companyId=' + companyId
                        });
                    };
                    var getCompanies = function () {
                        return $.ajax({
                            url: '/api/v1/commonapi/getCompanies',
                            async: false
                        });
                    };
                    var setCompanies = function () {
                        getCompanies()
                            .success(function (data) {
                                companies = data;
                            });
                    };
                    var initPage = function () {
                        setCompanies();
                        companyId = $('#hdnCompanyId').val();
                        getCustomers(companyId)
                            .success(function (list) {

                                var gridOpts = $.extend(true,
                                {
                                    filterRow: {
                                        visible: true,
                                        applyFilter: "auto"
                                    },
                                    headerFilter: {
                                        visible: true
                                    },
                                    dataSource: list,
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
                                            caption: 'Adı'
                                        }, {
                                            dataField: 'surname',
                                            caption: 'Soyadı'
                                        }, {
                                            dataField: 'email',
                                            caption: 'Email'
                                        }, {
                                            dataField: 'mobilePhone',
                                            caption: 'Telefon'
                                        }, {
                                            dataField: 'institutionCode',
                                            caption: 'Şirket Kodu'
                                        }, {
                                            dataField: 'companyId',
                                            caption: 'Firma',
                                            lookup: {
                                                dataSource: companies,
                                                displayExpr: 'name',
                                                valueExpr: 'id'
                                            }
                                        }, {
                                            dataField: 'membershipTypeId',
                                            caption: 'Müşteri Tipi',
                                            lookup: {
                                                dataSource: utilityObj.membershipTypes,
                                                displayExpr: 'text',
                                                valueExpr: 'id'
                                            }
                                        }, {
                                            dataField: 'id',
                                            caption: 'Aksiyon',
                                            alignment: 'left',
                                            cellTemplate: function (container, cellInfo) {
                                                var actions = '<a class="custom-link" href="/Admin/Customer/Edit/{customerId}" title="Müşteri bilgilerini düzenle"><i class="mdi-editor-mode-edit"></i></a>';
                                                $(actions.supplant({ customerId: cellInfo.value })).appendTo(container);
                                            }
                                        }
                                    ], editing: {
                                        insertEnabled: true,
                                    },
                                    onInitNewRow: function (e) {
                                        window.location.href = "/Admin/Customer/Create";
                                    }
                                }, utilityObj.baseGridOptions);

                                
                                $('#customerListGrid').dxDataGrid(gridOpts);
                                dataGrid = $('#customerListGrid').dxDataGrid('instance');
                            });
                    };

                    initPage();
                });
            });
    });