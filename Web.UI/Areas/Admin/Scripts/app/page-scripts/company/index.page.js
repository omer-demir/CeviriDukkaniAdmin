require(['../../common'],
    function (common) {
        require(['utility', 'dxdatagrid'],
            function (utility) {
                $(function () {
                    //variables
                    var utilityObj = new utility();
                    var dataGrid;
                    var resources = null;

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
                                                caption: resources.sirketAdi
                                            }, {
                                                dataField: 'authorizedEmail',
                                                caption: resources.yetkiliEmail
                                            }, {
                                                dataField: 'authorizedFullName',
                                                caption: resources.yetkiliAdsoyad
                                            }, {
                                                dataField: 'authorizedMobilePhone',
                                                caption: resources.yetkiliCepTelefonu
                                            }, {
                                                dataField: 'taxOffice',
                                                caption: resources.vergiDairesi
                                            }, {
                                                dataField: 'taxNumber',
                                                caption: resources.vergiNumarasi
                                            }, {
                                                dataField: 'id',
                                                caption: resources.aksiyon,
                                                alignment: 'left',
                                                cellTemplate: function(container, cellInfo) {
                                                    var actions =
                                                        '<a class="custom-link" href="/Admin/Customer/Index/{companyId}" title="{showTitle}"><i class="mdi-social-group-add"></i></a>  ' +
                                                            '<a class="custom-link" href="/Admin/Company/Edit/{companyId}" title="editTitle"><i class="mdi-editor-mode-edit"></i></a>';
                                                    $(actions.supplant({ companyId: cellInfo.value, showTitle: resources.sirketUyeleriniGoruntule, editTitle: resources.sirketBilgileriniDuzenle }))
                                                        .appendTo(container);
                                                }
                                            }
                                        ],
                                        editing: {
                                            insertEnabled: true
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

                    var getResources = function () {
                        var keyList = [
                            'SirketAdi',
                            'YetkiliEmail',
                            'YetkiliAdsoyad',
                            'YetkiliCepTelefonu',
                            'VergiDairesi',
                            'VergiNumarasi',
                            'Aksiyon',
                            'SirketUyeleriniGoruntule',
                            'SirketBilgileriniDuzenle'
                        ];
                        var resourceName = 'terminologyManage';
                        $.when(utilityObj.initResources(keyList, resourceName)).then(function () {
                            resources = JSON.parse(localStorage.getItem(resourceName));
                            initPage();
                        });
                    };
                    getResources();
                });
            });
    });