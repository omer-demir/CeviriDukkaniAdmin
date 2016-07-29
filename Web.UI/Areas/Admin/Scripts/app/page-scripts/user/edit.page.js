require(['../../common'], function (common) {
    require(['utility', 'lodash'], function (utility, _) {
        $(function () {

            //variables
            var utilityObj = new utility();
            var userRoleTypes = [];
            var technologyKnowledges = [];
            var rateItems = [];
            var isTrigger = false;
            //private funcs
            var getCountries = function () {
                return $.ajax({
                    url: '/api/v1/commonapi/getCountries'
                });
            };
            var getTongues = function () {
                return $.ajax({
                    url: '/api/v1/commonapi/getTongues'
                });
            };
            var getTechnologyKnowledgesByUserAbilityId = function (userAbilityId) {
                return $.ajax({
                    url: '/api/v1/userapi/getTechnologyKnowledgesByUserAbilityId?userAbilityId=' + userAbilityId
                });
            };
            var getRateItemsByUserRateId = function (userRateId) {
                return $.ajax({
                    url: '/api/v1/userapi/getRateItemsByUserRateId?userRateId=' + userRateId
                });
            };
            //var fillOptionSelect = function (selectId, data, selectedValue) {
            //    $(selectId)
            //        .empty()
            //        .append('<option value="" disabled selected>Lütfen seçiniz.</option>');
            //    $.each(data,
            //        function (i, e) {
            //            $(selectId).append('<option value="{id}">{name}</option>'.supplant({ id: e.id, name: e.name }));
            //        });
            //    if (selectedValue) {
            //        $(selectId).val(selectedValue);
            //        $(selectId).trigger("change");
            //    }
            //    $(selectId).material_select();
            //    //return '<option value="{id}">{name}</option>'.supplant({ id: data.id, name: data.name });
            //};
            //var clearSelect = function (selectId) {
            //    $(selectId)
            //        .empty().append('<option value="" disabled selected>Lütfen seçiniz.</option>')
            //        .material_select();
            //};
            var getCitiesByCountryId = function (countryId) {
                return $.ajax({
                    url: '/api/v1/commonapi/getCitiesByCountryId?countryId=' + countryId
                });
            };
            var getDistrictByCityId = function (cityId) {
                return $.ajax({
                    url: '/api/v1/commonapi/getDistrictByCityId?cityId=' + cityId
                });
            };
            var editUser = function (userDto) {
                return $.ajax({
                    url: '/api/v1/userapi/editUser',
                    type: 'POST',
                    data: userDto
                });
            };
            var editUserContact = function (userDto) {
                return $.ajax({
                    url: '/api/v1/userapi/editUserContact',
                    type: 'POST',
                    data: userDto
                });
            };
            var editUserAbility = function (userDto) {
                return $.ajax({
                    url: '/api/v1/userapi/editUserAbility',
                    type: 'POST',
                    data: userDto
                });
            };
            var editUserPayment = function (userDto) {
                return $.ajax({
                    url: '/api/v1/userapi/editUserPayment',
                    type: 'POST',
                    data: userDto
                });
            };
            var editUserRate = function (userDto) {
                return $.ajax({
                    url: '/api/v1/userapi/editUserRate',
                    type: 'POST',
                    data: userDto
                });
            };
            var setAttrUserRoleType = function () {
                var i = 0;
                $(".dvUserRoles ul li:not(:first-child)")
                    .each(function () {
                        $(this).attr('data-id', utilityObj.userRoleTypes[i].id);
                        i++;
                    });
            };
            var setUserRoles = function () {
                //setAttrUserRoleType();
                //var roles = $('#hdnUserRoleNames').val();
                //$.each(roles.split(","), function (i, e) {
                //    isTrigger = true;
                //    $(".dvUserRoles ul li span:contains('" + e.trim() + "')").eq(0).find('input[type="checkbox"]').prop('checked', true).trigger('click');
                //    $(".dvUserRoles ul li span:contains('" + e.trim() + "')").eq(0).closest('li').addClass('active');
                //    isTrigger = false;
                //});
                //$('.dvUserRoles input.select-dropdown').val(roles);
                var selectedUserRoles = $('#hdnUserRoleTypes').val();
                if (selectedUserRoles) {
                    utilityObj.setValueMultiSelect('#ddlUserRole', selectedUserRoles.split(','), '.dvUserRoles ul');
                }
            };
            var getSelectedUserRoles = function () {
                var userRoles = [];
                if ($('#ddlUserRole').val().join(",") === $('#hdnUserRoleTypes').val()) return userRoles;
                $.each($("#ddlUserRole").val(),
                    function (i, e) {
                        userRoles.push({ userRoleTypeId: e });
                    });
                return userRoles;
            };
            var getSelectedSpecializations = function () {
                var specializations = [];
                if ($('#ddlSpecializations').val().join(",") === $('#hdnSpecializations').val()) return specializations;
                $.each($("#ddlSpecializations").val(),
                    function (i, e) {
                        specializations.push({ TerminologyId: e });
                    });
                return specializations;
            };
            var setCountries = function () {
                getCountries()
                    .success(function (data) {
                        utilityObj.fillOptionSelect('#ddlCountry', data, $('#hdnCountryId').val());
                        $('#hdnCountryId').val('');
                    });
            };
            var resetInputTech = function () {
                $('#ddlSoftwares').val('').material_select();
                $('#txtSoftwareVersion').val('').trigger('blur');
                $('#txtOperatingSystem').val('').trigger('blur');
                $('#ddlRating').val('1').material_select();
                $('#hdnTechnologyKnowledgeId').val('');
                $('#btnSaveTech').text('Ekle');
            };
            var resetInputRateItem = function () {
                $('#hdnRateItemId').val('');
                $('#ddlServiceTypes').val('').material_select();
                $('#ddlSourceLanguages').val('').material_select();
                $('#ddlTargetLanguages').val('').material_select();
                $('#txtPrice').val('').trigger('blur');
                $('#btnSaveRateItem').text('Ekle');
            };
            var initTechnologyKnowledges = function (data) {
                $('#tbTech').empty();
                $.each(data,
                    function (i, e) {
                        var template = '<tr id="{id}">' +
                                            '<td>{softwareName}</td>' +
                                            '<td>{softwareVersion}</td>' +
                                            '<td>{operatingSystem}</td>' +
                                            '<td>{rating}</td>' +
                                            '<td><a class="aLink techDelete" data-id="{id}">Sil</a> &nbsp;&nbsp;<a class="aLink techEdit" data-id="{id}">Düzenle</a></td>' +
                                        '</tr>';
                        $('#tbTech').append(template.supplant({ id: e.id, softwareName: e.software.name, softwareVersion: e.softwareVersion, operatingSystem: e.operatingSystem, rating: e.rating }));
                    });
                resetInputTech();
            };
            var initRateItems = function (data) {
                $('#tbRateItem').empty();
                $.each(data,
                    function (i, e) {
                        var template = '<tr id="{id}">' +
                                            '<td>{serviceTypeName}</td>' +
                                            '<td>{sourceLang}</td>' +
                                            '<td>{targetLang}</td>' +
                                            '<td>{price}</td>' +
                                            '<td>{swornTrans}</td>' +
                                            '<td>{certificate}</td>' +
                                            '<td><a class="aLink rateDelete" data-id="{id}">Sil</a> &nbsp;&nbsp;<a class="aLink rateEdit" data-id="{id}">Düzenle</a></td>' +
                                        '</tr>';
                        $('#tbRateItem').append(template.supplant({ id: e.id, serviceTypeName: e.serviceType.name, sourceLang: e.sourceLanguage.name, targetLang: e.targetLanguage.name, price: e.price, swornTrans: e.swornOrCertified, certificate: e.certificateId }));
                    });
                resetInputRateItem();
            };
            var setTechnologyKnowledgesByUserAbilityId = function (userAbilityId) {
                if (!userAbilityId) return;
                if (!parseInt(userAbilityId)) return;
                getTechnologyKnowledgesByUserAbilityId(userAbilityId)
                    .success(function (data) {
                        technologyKnowledges = data;
                        initTechnologyKnowledges(technologyKnowledges);
                    });
            };
            var setRateItemsByUserRateId = function (userRateId) {
                if (!userRateId) return;
                if (!parseInt(userRateId)) return;
                getRateItemsByUserRateId(userRateId)
                    .success(function (data) {
                        rateItems = data;
                        initRateItems(rateItems);
                    });
            };
            var setTongues = function () {
                getTongues()
                    .success(function (data) {
                        utilityObj.fillOptionSelect('#ddlMotherTongue', data, $('#hdnMotherTongueId').val());
                        $('#hdnMotherTongueId').val('');

                        utilityObj.fillOptionSelect('#ddlBilingualTongue', data, $('#hdnBilingualTongueId').val());
                        $('#hdnBilingualTongueId').val('');
                    });
            };
            var setCitiesByCountryId = function (countryId) {
                getCitiesByCountryId(countryId)
                    .success(function (data) {
                        utilityObj.fillOptionSelect('#ddlCity', data, $('#hdnCityId').val());
                        $('#hdnCityId').val('');
                    });
            };
            var setDistrictByCityId = function (cityId) {
                getDistrictByCityId(cityId)
                    .success(function (data) {
                        utilityObj.fillOptionSelect('#ddlDistrict', data, $('#hdnDistrictId').val());
                        $('#hdnDistrictId').val('');
                    });
            };
            var setSpecializations = function () {
                var selectedSpecializations = $('#hdnSpecializations').val();
                if (selectedSpecializations) {
                    utilityObj.setValueMultiSelect('#ddlSpecializations', selectedSpecializations.split(','), '.dvSpecializations ul');
                }
            };
            var initPage = function () {
                setUserRoles();
                setCountries();
                setTongues();
                setSpecializations();
                $('input[name="BankAccountType"]:checked').trigger('click');
                setTechnologyKnowledgesByUserAbilityId($('#hdnUserAbilityId').val());
                setRateItemsByUserRateId($('#hdnUserRateId').val());
                $("#formValidate").validate({
                    rules: {
                        Name: {
                            required: true,
                            minlength: 5
                        },
                        SurName: {
                            required: true,
                            minlength: 5
                        },
                        Email: {
                            required: true,
                            email: true
                        },
                        UserRoleType: 'required',
                        BirthDate: 'required'
                    },
                    //For custom messages
                    messages: {
                        Name: {
                            required: "Enter a username",
                            minlength: "Enter at least 5 characters"
                        }
                    },
                    errorElement: 'div',
                    errorPlacement: function (error, element) {
                        var placement = $(element).data('error');
                        if (placement) {
                            $(placement).append(error);
                        } else {
                            error.insertAfter(element);
                        }
                    }
                });
            };

            //events
            $('#btnSave').click(function () {
                if ($("#formValidate").valid()) {
                    var userDto = {
                        Id: $('#hdnUserId').val(),
                        Name: $('#txtName').val(),
                        SurName: $('#txtSurname').val(),
                        GenderId: $("input[type='radio'][name='GenderType']:checked").data('value'),
                        MobilePhone: $('#txtMobilePhone').val(),
                        Email: $('#txtEmail').val(),
                        Password: $('#txtPassword').val(),
                        UserRoles: getSelectedUserRoles(),
                        BirthDate: new Date($('.datepicker').val()).toJSON()
                    };
                    editUser(userDto).success(function (user) {
                        Materialize.toast('Kayıt başarılı.', 3000);

                        //window.location.href = "/Admin/User";
                    }).fail(function (err) {
                        console.log(err);
                    });
                }
            });
            $('#btnSaveContact').click(function () {
                if ($("#formValidateContact").valid()) {
                    var userDto = {
                        Id: $('#hdnUserId').val(),
                        UserContact: {
                            Id: $('#hdnUserContactId').val(),
                            Address: $('#txtAddress').val(),
                            PostalCode: $('#txtPostalCode').val(),
                            AlternativeEmail: $('#txtAlternativeEmail').val(),
                            AlternativePhone1: $('#txtAlternativePhone1').val(),
                            AlternativePhone2: $('#txtAlternativePhone2').val(),
                            Fax: $('#txtFax').val(),
                            Skype: $('#txtSkype').val(),
                            DistrictId: $('#ddlDistrict').val()
                        }
                    };
                    editUserContact(userDto).success(function (user) {
                        Materialize.toast('Kayıt başarılı.', 3000);

                        //window.location.href = "/Admin/User";
                    });
                }
            });
            $('#btnSaveAbility').click(function () {
                if ($("#formValidateAbility").valid()) {
                    var userDto = {
                        Id: $('#hdnUserId').val(),
                        UserAbility: {
                            Id: $('#hdnUserAbilityId').val(),
                            MotherTongueId: $('#ddlMotherTongue').val(),
                            BilingualTongueId: $('#ddlBilingualTongue').val(),
                            Qualifications: $('#txtQualifications').val(),
                            MainClients: $('#txtMainClients').val(),
                            QualityEnsureDescription: $('#txtQualityEnsureDescription').val(),
                            YearsOfExperience: $('#txtYearsOfExperience').val(),
                            CapacityId: $('#hdnCapacityId').val(),
                            Capacity: {
                                Id: $('#hdnCapacityId').val(),
                                Translation: $('#txtTranslation').val(),
                                Reviews: $('#txtReviews').val(),
                                ProofReading: $('#txtProofReading').val()
                            },
                            Specializations: getSelectedSpecializations(),
                            TechnologyKnowledges: technologyKnowledges
                        }
                    };
                    editUserAbility(userDto).success(function (user) {
                        Materialize.toast('Kayıt başarılı.', 3000);

                        //window.location.href = "/Admin/User";
                    });
                }
            });
            $('#btnSavePayment').click(function () {
                if ($("#formValidatePayment").valid()) {
                    var bankAccountTypeId = $('input[name="BankAccountType"]:checked').val();
                    var userDto = {
                        Id: $('#hdnUserId').val(),
                        UserPayment: {
                            Id: $('#hdnUserPaymentId').val(),
                            VatTaxNo: $('#txtVatTaxNo').val(),
                            CurrencyId: $('#ddlCurrencies').val(),
                            WorkingTypeId: $('#ddlWorkingTypes').val(),
                            MinimumChargeAmount: $('#txtMinimumChargeAmount').val(),
                            BankAccountId: $('#hdnBankAccountId').val(),
                            BankAccount: {
                                Id: $('#hdnBankAccountId').val(),
                                BankAccountTypeId: bankAccountTypeId
                            }
                        }
                    };
                    switch (bankAccountTypeId) {
                        case "1": //Turkish Bank
                            userDto.UserPayment.BankAccount.BankName = $('#txtBankName').val();
                            userDto.UserPayment.BankAccount.AccountHolderFullName = $('#txtAccountHolderFullName').val();
                            userDto.UserPayment.BankAccount.IBAN = $('#txtIBAN').val();
                            break;
                        case "2": //Other Country Bank
                            userDto.UserPayment.BankAccount.BankName = $('#txtBankNameEurop').val();
                            userDto.UserPayment.BankAccount.AccountHolderFullName = $('#txtAccountHolderFullNameEurop').val();
                            userDto.UserPayment.BankAccount.BeneficiaryAddress = $('#txtBeneficiaryAddress').val();
                            userDto.UserPayment.BankAccount.IBAN = $('#txtIBANEurop').val();
                            userDto.UserPayment.BankAccount.AccountNumber = $('#txtAccountNumber').val();
                            userDto.UserPayment.BankAccount.SwiftBicCode = $('#txtSwiftBicCode').val();
                            userDto.UserPayment.BankAccount.CityCountryBank = $('#txtCityCountryBank').val();
                            userDto.UserPayment.BankAccount.BankAddress = $('#txtBankAddress').val();
                            break;
                        case "3": //PayPal
                            userDto.UserPayment.BankAccount.PaypalEmailAddress = $('#txtPaypalEmailAddress').val();
                            break;
                        default:
                            userDto.UserPayment.BankAccount.BankName = $('#txtBankName').val();
                            userDto.UserPayment.BankAccount.AccountHolderFullName = $('#txtAccountHolderFullName').val();
                            userDto.UserPayment.BankAccount.IBAN = $('#txtIBAN').val();
                            break;
                    }
                    editUserPayment(userDto).success(function (user) {
                        Materialize.toast('Kayıt başarılı.', 3000);

                        //window.location.href = "/Admin/User";
                    });
                }
            });
            $('#btnSaveRates').click(function () {
                if ($("#formValidateRates").valid()) {
                    var userDto = {
                        Id: $('#hdnUserId').val(),
                        UserRate: {
                            Id: $('#hdnUserRateId').val(),
                            DtpRate: $('#txtDtpRate').val(),
                            GlossaryCreationRate: $('#txtGlossaryCreationRate').val(),
                            TranslationMemoryManagementRate: $('#txtTranslationMemoryManagementRate').val(),
                            TerminologyExtractionRate: $('#txtTerminologyExtractionRate').val(),
                            ReviewSmeRate: $('#txtReviewSmeRate').val(),
                            LinguisticTestingRate: $('#txtLinguisticTestingRate').val(),
                            ReviewLqaRate: $('#txtReviewLqaRate').val(),
                            RateItems: rateItems
                        }
                    };
                    editUserRate(userDto).success(function (user) {
                        Materialize.toast('Kayıt başarılı.', 3000);

                        //window.location.href = "/Admin/User";
                    });
                }
            });
            $('#btnSaveTech').click(function () {
                var softwareId = $('#ddlSoftwares').val();
                if (!softwareId) return;

                var isExistSoftware = _.find(technologyKnowledges, function (item) { return item.softwareId == softwareId });

                if (isExistSoftware) {
                    Materialize.toast(isExistSoftware.software.name + " daha önce eklenmiş. Dilerseniz güncelleyebilirsiniz.", 3000);
                    return;
                }
                var techId = $('#hdnTechnologyKnowledgeId').val();
                if (!techId) {
                    var tech = {
                        id: 'new' + technologyKnowledges.length,
                        softwareId: softwareId,
                        software: {
                            id: softwareId,
                            name: $('#ddlSoftwares option:selected').text()
                        },
                        softwareVersion: $('#txtSoftwareVersion').val(),
                        operatingSystem: $('#txtOperatingSystem').val(),
                        rating: $('#ddlRating').val(),
                        userAbilityId: $('#hdnUserAbilityId').val()
                    };
                    technologyKnowledges.push(tech);
                } else {
                    var editTech = _.find(technologyKnowledges, function (item) { return item.id == techId });
                    if (editTech) {
                        editTech.softwareId = $('#ddlSoftwares').val();
                        editTech.software = {
                            id: $('#ddlSoftwares').val(),
                            name: $('#ddlSoftwares option:selected').text()
                        };
                        editTech.softwareVersion = $('#txtSoftwareVersion').val();
                        editTech.operatingSystem = $('#txtOperatingSystem').val();
                        editTech.rating = $('#ddlRating').val();
                        editTech.userAbilityId = $('#hdnUserAbilityId').val();
                    }
                }
                initTechnologyKnowledges(technologyKnowledges);



            });
            $('#btnSaveRateItem').click(function () {
                var serviceTypeId = $('#ddlServiceTypes').val();
                if (!serviceTypeId) return;
                var sourceLanguageId = $('#ddlSourceLanguages').val();
                if (!sourceLanguageId) return;
                var targetLanguageId = $('#ddlTargetLanguages').val();
                if (!targetLanguageId) return;

                var rateItemId = $('#hdnRateItemId').val();
                if (!rateItemId) {
                    var rateItem = {
                        id: 'new' + technologyKnowledges.length,
                        serviceTypeId: serviceTypeId,
                        serviceType: {
                            id: serviceTypeId,
                            name: $('#ddlServiceTypes option:selected').text()
                        },
                        sourceLanguageId: sourceLanguageId,
                        sourceLanguage: {
                            id: sourceLanguageId,
                            name: $('#ddlSourceLanguages option:selected').text()
                        },
                        targetLanguageId: targetLanguageId,
                        targetLanguage: {
                            id: targetLanguageId,
                            name: $('#ddlTargetLanguages option:selected').text()
                        },
                        price: $('#txtPrice').val(),
                        userRateId: $('#hdnUserRateId').val()
                    };
                    rateItems.push(rateItem);
                } else {
                    var editRate = _.find(rateItems, function (item) { return item.id == rateItemId });
                    if (editRate) {
                        editRate.serviceTypeId = serviceTypeId;
                        editRate.serviceType = {
                            id: serviceTypeId,
                            name: $('#ddlServiceTypes option:selected').text()
                        };
                        editRate.sourceLanguageId = sourceLanguageId;
                        editRate.sourceLanguage = {
                            id: sourceLanguageId,
                            name: $('#ddlServiceTypes option:selected').text()
                        };
                        editRate.targetLanguageId = targetLanguageId;
                        editRate.targetLanguage = {
                            id: targetLanguageId,
                            name: $('#ddlServiceTypes option:selected').text()
                        };
                        editRate.price = $('#txtPrice').val();
                        editRate.userRateId = $('#hdnUserRateId').val();
                    }
                }
                initRateItems(rateItems);
            });
            $('#ddlCountry').change(function () {
                setTimeout(function () {
                    utilityObj.clearSelect('#ddlCity');
                    utilityObj.clearSelect('#ddlDistrict');

                    var countryId = $('#ddlCountry').val();
                    if (!countryId) return;
                    setCitiesByCountryId(countryId);
                }, 100);
            });
            $('#ddlCity').change(function () {
                setTimeout(function () {
                    utilityObj.clearSelect('#ddlDistrict');

                    var cityId = $('#ddlCity').val();
                    if (!cityId) return;
                    setDistrictByCityId(cityId);
                }, 100);
            });
            $('input[name="BankAccountType"]').click(function () {
                var bankAccountTypeId = $(this).val();
                $('.bankAccount').hide();
                switch (bankAccountTypeId) {
                    case "1":
                        $('#dvTurkishAccount').show();
                        break;
                    case "2":
                        $('#dvEuropeanAccount').show();
                        break;
                    case "3":
                        $('#dvPaypalAccount').show();
                        break;
                    default:
                        $('#dvTurkishAccount').show();
                        break;
                }
            });
            $(document).on('click', '.techDelete', function () {
                var techId = $(this).attr("data-id");
                _.remove(technologyKnowledges, function (item) { return item.id == techId });
                initTechnologyKnowledges(technologyKnowledges);
            });
            $(document).on('click', 'a.techEdit', function () {
                var techId = $(this).attr("data-id");
                var editTech = _.find(technologyKnowledges, function (item) { return item.id == techId });
                $('#hdnTechnologyKnowledgeId').val(techId);

                $('#ddlSoftwares').val(editTech.softwareId).material_select();
                $('#txtSoftwareVersion').val(editTech.softwareVersion).trigger('change');
                $('#txtOperatingSystem').val(editTech.operatingSystem).trigger('change');
                $('#ddlRating').val(editTech.rating).material_select();
                $('#btnSaveTech').text('Güncelle');
            });
            $(document).on('click', '.rateDelete', function () {
                var rateId = $(this).attr("data-id");
                _.remove(rateItems, function (item) { return item.id == rateId });
                initRateItems(rateItems);
            });
            $(document).on('click', 'a.rateEdit', function () {
                var rateId = $(this).attr("data-id");
                var editRate = _.find(rateItems, function (item) { return item.id == rateId });
                $('#hdnRateItemId').val(rateId);

                $('#ddlServiceTypes').val(editRate.serviceTypeId).material_select();
                $('#ddlSourceLanguages').val(editRate.sourceLanguageId).material_select();
                $('#ddlTargetLanguages').val(editRate.targetLanguageId).material_select();
                $('#txtPrice').val(editRate.price).trigger('change');
                $('#btnSaveRateItem').text('Güncelle');
            });
            initPage();
        });
    });
});