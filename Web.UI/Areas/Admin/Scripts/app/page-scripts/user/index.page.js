require(['../../common'],
    function (common) {
        require(['utility', 'dxdatagrid'],
            function (utility) {
                $(function () {

                    $('.passive').click(function () {
                        alert("oldu");
                    });



                    //variables
                    var utilityObj = new utility();
                    var dataGrid;

                    //private funcs
                    var getUsers = function () {
                        return $.ajax({
                            url: '/api/v1/userapi/getUsers'
                        });
                    };

                    var setActive = function (id, active) {
                        var userDto = {
                            Id: id,
                            Active: active
                        };

                        return $.ajax({
                            url: '/api/v1/userapi/setActive',
                            type: 'POST',
                            data: userDto
                        });
                    };


                    var initPage = function () {
                        getUsers()
                            .success(function (userList) {

                                var gridOpts = $.extend(true,
                                {
                                    filterRow: {
                                        visible: true,
                                        applyFilter: "auto"
                                    },
                                    headerFilter: {
                                        visible: true
                                    },
                                    dataSource: userList,
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
                                            dataField: 'surName',
                                            caption: 'Soyadı'
                                        }, {
                                            dataField: 'email',
                                            caption: 'Email'
                                        }, {
                                            dataField: 'mobilePhone',
                                            caption: 'Telefon'
                                        }, {
                                            dataField: 'genderId',
                                            caption: 'Cinsiyet',
                                            lookup: {
                                                dataSource: utilityObj.genders,
                                                displayExpr: 'text',
                                                valueExpr: 'id'
                                            }
                                        }, {
                                            dataField: 'userRoleTypeString',
                                            caption: 'Kullanıcı Tipi'
                                        }, {
                                            dataField: 'id',
                                            caption: 'Aksiyon',
                                            alignment: 'left',
                                            cellTemplate: function (container, cellInfo) {
                                                var actions = "";
                                                var hiddenActive = "";
                                                var hiddenPassive = "";
                                                if (cellInfo.data.active) {
                                                    hiddenActive = "hide";
                                                } else {
                                                    hiddenPassive = "hide";
                                                }
                                                actions = '<a class="custom-link" href="/Admin/User/Edit/{userId}" title="Kullanıcı bilgilerini düzenle"><i class="mdi-editor-mode-edit"></i></a>' +
                                                            '<a id="btnPassive{userId}" class="custom-link btnPassive ' + hiddenPassive + '" href="javascript:void(0)" title="Kullanıcı bilgilerini pasif et" data-id="{userId}"><i class="mdi-action-delete"></i></a>' +
                                                            '<a id="btnActive{userId}" class="custom-link btnActive ' + hiddenActive + '" href="javascript:void(0)" title="Kullanıcı bilgilerini aktif et" data-id="{userId}"><i class="mdi-content-undo"></i></a>';

                                                $(actions.supplant({ userId: cellInfo.value })).appendTo(container);
                                            }
                                        }
                                    ], editing: {
                                        insertEnabled: true
                                    },
                                    onInitNewRow: function (e) {
                                        window.location.href = "/Admin/User/Create";
                                    }
                                }, utilityObj.baseGridOptions);


                                $('#userListGrid').dxDataGrid(gridOpts);
                                dataGrid = $('#userListGrid').dxDataGrid('instance');
                            }).fail(function (ex) {
                                console.log(ex);
                            });
                    };

                    initPage();

                    $(document).on('click', '.btnPassive', function () {
                        var userId = $(this).attr("data-id");

                        setActive(userId, false).success(function (user) {
                            $("#btnPassive" + user.id).addClass("hide");
                            $("#btnActive" + user.id).removeClass("hide");
                            Materialize.toast('Kayıt pasif edildi.', 3000);
                        }).fail(function (err) {
                            Materialize.toast('Hata Oluştu.', 3000);
                            console.log(err);
                        });
                    });

                    $(document).on('click', '.btnActive', function () {
                        var userId = $(this).attr("data-id");
                        setActive(userId, true).success(function (user) {
                            $("#btnActive" + user.id).addClass("hide");
                            $("#btnPassive" + user.id).removeClass("hide");
                            Materialize.toast('Kayıt aktif edildi.', 3000);

                        }).fail(function (err) {
                            Materialize.toast('Hata Oluştu.', 3000);
                            console.log(err);
                        });
                    });
                });
            });
    });
