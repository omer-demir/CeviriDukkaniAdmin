require(['../../common'],
    function (common) {
        require(['utility', 'dxdatagrid'],
            function (utility) {
                $(function () {
                    //variables
                    var utilityObj = new utility();
                    var dataGrid;

                    //private funcs
                    var getCompanies = function () {
                        return $.ajax({
                            url: '/api/v1/commonapi/getCompanies'
                        });
                    };
                    
                    var initPage = function () {
                        getCompanies()
                            .success(function(list) {
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
                                                cellTemplate: function(container, e) {
                                                    var index =
                                                        dataGrid.pageIndex() * dataGrid.pageSize() + e.rowIndex + 1;
                                                    container.text(index);
                                                }
                                            },
                                            {
                                                dataField: 'name',
                                                caption: 'Şirket Adı'
                                            }, {
                                                dataField: 'authorizedEmail',
                                                caption: 'Yetkili Eposta'
                                            }, {
                                                dataField: 'authorizedFullName',
                                                caption: 'Yetkili Adsoyad'
                                            }, {
                                                dataField: 'authorizedMobilePhone',
                                                caption: 'Yetkili Cep telefonu'
                                            }, {
                                                dataField: 'taxOffice',
                                                caption: 'Vergi Dairesi'
                                            }, {
                                                dataField: 'taxNumber',
                                                caption: 'Vergi Numarası'
                                            }, {
                                                dataField: 'id',
                                                caption: 'Aksiyon',
                                                alignment: 'left',
                                                cellTemplate: function(container, cellInfo) {
                                                    var actions =
                                                        '<a class="custom-link" href="/Admin/Customer/Index/{companyId}" title="Şirket üyelerini görüntüle"><i class="mdi-social-group-add"></i></a>  ' +
                                                            '<a class="custom-link" href="/Admin/Company/Edit/{companyId}" title="Şirket bilgilerini düzenle"><i class="mdi-editor-mode-edit"></i></a>';
                                                    $(actions.supplant({ companyId: cellInfo.value }))
                                                        .appendTo(container);
                                                }
                                            }
                                        ],
                                        editing: {
                                            insertEnabled: true,
                                        },
                                        onInitNewRow: function(e) {
                                            window.location.href = "/Admin/Company/Create";
                                        }
                                    },
                                    utilityObj.baseGridOptions);


                                $('#companyListGrid').dxDataGrid(gridOpts);
                                dataGrid = $('#companyListGrid').dxDataGrid('instance');
                            });
                    };

                    initPage();
                });
            });
    });