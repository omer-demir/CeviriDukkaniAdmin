/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../services/common.data.service.ts" />
/// <reference path="../../classes/util.ts" />
/// <reference path="../../../typings/globals/toastr/index.d.ts" />
/// <reference path="../../classes/ceviri.classes.ts" />
declare var $: JQueryStatic;


((() => {
    var dataService = new DataService;
    var technologyKnowledges: Array<TechnologyKnowledge> = new Array<TechnologyKnowledge>();
    var rateItems: Array<RateItem> = new Array<RateItem>();

    function initCityWithData(data: any[]) {
        $("#City").select2(Util.extendOptions(Util.getAsSelectData(data), { placeholder: 'Please select your city' }));
        $("#City").select2("val", "-1");
    }
    function initDistrictWithData(data: any[]) {
        $("#district").select2(Util.extendOptions(Util.getAsSelectData(data), { placeholder: 'Please select your district/county' }));
        $("#district").select2("val", "-1");
    }
    function changeVisibleByClassName(className: string, visible: boolean) {
        let elements: NodeListOf<HTMLElement> = document.getElementsByClassName(className) as NodeListOf<HTMLElement>;

        for (var i = 0; i < elements.length; i++) {
            let element: HTMLElement = elements[i];
            element.hidden = !visible;
        }
    }
    function initializeDropdowns() {
        $('select').select2({ placeholder: 'Please select any option' });

        dataService.getCountries((data: any) => {

            $("#Nationality").select2(Util.extendOptions(Util.getAsSelectData(data), { placeholder: 'Please select your nationality' }));
            $("#Nationality2").select2(Util.extendOptions(Util.getAsSelectData(data), { placeholder: 'Please select your second nationality' }));

            $("#country").select2(Util.extendOptions(Util.getAsSelectData(data), { placeholder: 'Please select country' }));
            $('#Resident').select2(Util.extendOptions(Util.getAsSelectData(data), { placeholder: 'Please select residency' }));

            $("#country").select2("val", "-1");
            $("#Resident").select2("val", "-1");
        });

        dataService.getTongues((data: any) => {
            $("#motherTongue").select2(Util.extendOptions(Util.getAsSelectData(data), { placeholder: 'Please select your mother tongue' }));
            $("#tongue").select2(Util.extendOptions(Util.getAsSelectData(data), { placeholder: 'Please select your other languages' }));
            $("#bilingualTongue").select2(Util.extendOptions(Util.getAsSelectData(data), { placeholder: 'Please select your bilingual tongue' }));

            $("#motherTongue").select2("val", "-1");
            $("#tongue").select2("val", "-1");
            $("#bilingualTongue").select2("val", "-1");
        });

        dataService.getSoftwares((data: any) => {
            $("#Software").select2(Util.extendOptions(Util.getAsSelectData(data), { placeholder: 'Please select software' }));
            $("#Software").select2("val", "-1");

        });

        dataService.getTerminologies((data: any) => {
            $("#SpecializationIhave").select2(Util.extendOptions(Util.getAsSelectData(data), { multiple: true, placeholder: 'Please select your specialized field' }));
            $("#SpecializationIhave").select2("val", "-1");
        });

        dataService.getLanguages((data: any) => {
            $("#SourceLanguageId").select2(Util.extendOptions(Util.getAsSelectData(data), { placeholder: 'Please select source language' }));
            $("#SourceLanguageId").select2("val", "-1");
        });

        dataService.getCurrencies((data: any) => {
            $("#currency").select2(Util.extendOptions(Util.getAsSelectData(data), { placeholder: 'Please select currency' }));
            $("#currency").select2("val", "-1");
        });

        dataService.getWorkingTypes((data: any) => {
            $("#workingType").select2(Util.extendOptions(Util.getAsSelectData(data), { placeholder: 'Please select working type' }));
            $("#workingType").select2("val", "-1");
        });

        dataService.getServiceTypes((data: any) => {
            $("#ServiceTypeId").select2(Util.extendOptions(Util.getAsSelectData(data), { placeholder: 'Please select service type' }));
            $("#ServiceTypeId").select2("val", "-1");
        });

        $('#WorkingDays').select2(Util.extendOptions(Constants.Days, { multiple: true, placeholder: 'Please select working type' }));
        $("#WorkingDays").select2("val", "-1");

        $('#Rating').select2(Util.extendOptions(Constants.Rates), { placeholder: 'Please select rating' });
        $("#Rating").select2("val", "-1");

    }

    function addSoftware() {
        var software = $('#Software').select2('data')[0].text;
        var softwareVersion = $('#Version').val();
        var operatingSystem = $('#OperatingSystem').val();
        var rating = $('#Rating').select2('data')[0].text;
        if (!software && !rating) {
            toastr.error('Please enter software and rating information', 'Error');
            return;
        }

        var technologyKnowledge = new TechnologyKnowledge();
        technologyKnowledge.softwareId = software.id;
        technologyKnowledge.softwareVersion = softwareVersion;
        technologyKnowledge.operatingSystem = operatingSystem;
        technologyKnowledge.rating = rating;
        technologyKnowledges.push(technologyKnowledge);

        var $table = $('#softwareKnowledge');
        var $tableBody = $table.find('tbody');

        var itemTemplate = `<tr><td>${software}</td><td>${technologyKnowledge.softwareVersion}</td><td>${technologyKnowledge.operatingSystem}</td><td>${technologyKnowledge.rating}</td></tr>`;
        $(itemTemplate).appendTo($tableBody);
    }
    function addRate() {
        var $table = $('#translatorRate');
        var $tableBody = $table.find('tbody');



        var service = $('#ServiceTypeId').select2('data')[0];
        var sourceLanguage = $('#SourceLanguageId').select2('data')[0];
        var targetLanguage = $('#TargetLanguageId').select2('data')[0];
        var price = $('#Price').val();
        var sworn = $('#SwornOrCertified').prop('checked');

        if (!service && !sourceLanguage && !targetLanguage && !price) {
            toastr.error('Please enter service,language information', 'Error');
            return;
        }

        var rate = new RateItem();
        rate.serviceTypeId = service.id;
        rate.sourceLanguageId = sourceLanguage.id;
        rate.targetLanguageId = targetLanguage.id;
        rate.price = price;
        rate.swornOrCertified = sworn;
        rateItems.push(rate);

        var itemTemplate = `<tr><td>${service.text}</td><td>${sourceLanguage.text}</td><td>${targetLanguage.text}</td><td>${price}</td><td>${sworn}</td></tr>`;
        $(itemTemplate).appendTo($tableBody);
    }
    $(() => {
        $('ul.tabs').tabs();
        initializeDropdowns();

        /**
         * Events
         */
        $('#country').on({
            'select2:select': (e: any) => {
                dataService.getCitiesByCountryId((data: any) => {
                    initCityWithData(data);

                }, e.params.data.id);
            },
            'select2:unselect': () => {
                $('#City').select2("val", "-1");
            }
        });

        $('#City').on({
            'select2:select': (e: any) => {
                dataService.getDistrictsByCityId((data: any) => {
                    initDistrictWithData(data);

                }, e.params.data.id);
            },
            'select2:unselect': () => {
                $('#district').select2("val", "-1");
            }
        });
        $('#SourceLanguageId').on({
            'select2:select': (e: any) => {
                dataService.getTargetLanguages(e.params.data.id, (data: any) => {
                    $("#TargetLanguageId").select2(Util.extendOptions(Util.getAsSelectData(data, "targetLanguage.name"), { placeholder: 'Please select target language' }));
                    $("#TargetLanguageId").select2("val", "-1");
                });
            },
            'select2:unselect': () => {
                $('#TargetLanguageId').select2("val", "-1");
            }
        });
        $('#addSoftware').on('click', addSoftware);
        $('#addRate').on('click', addRate);
        $(document).on('select2:select', (e: any, args: any) => {
            var $elem = $(e.target).siblings('.select2');
            $elem.css('border', 'none');
        });

        /**
         * Wizard events
         */
        $('#nextTo2').on('click', () => {
            if (isForm1Valid()) {
                $('ul.tabs').tabs('select_tab', 'tab2');
            }
        });
        $('#saveAndContinueLater').on('click', () => {
            if (isForm1Valid()) {
                let user = getUserFromForm();
                dataService.saveUser(user, (result: any) => {
                    if (result.IsSuccess) {
                        toastr.success("Perfect! We saved your profile. You can continue filling up your account details later.");
                    }
                });
            }
        });

        function isForm1Valid(): Boolean {
            var rules = {
                name: { required: true },
                surname: { required: true },
                email: { required: true, email: true },
                mobilePhone: { required: true },
                password: { required: true, minlength: 4, maxlength: 8 },
                repassword: { required: true, minlength: 4, maxlength: 8, equalTo: '#password' },
                agreement: { checkbox: true }
            };

            Util.handleValidationForm('#form1', rules, (a: any) => { $('ul.tabs').tabs('select_tab', 'tab2'); });
            return $("#form1").valid();
        }

        $('#nextTo3').on('click', () => {
            var rules = {
                country: { required: true },
                City: { required: true },
                district: { required: true },
                address: { required: true }
            };

            Util.handleValidationForm('#form2', rules, (a: any) => { $('ul.tabs').tabs('select_tab', 'tab3'); });
            if ($('#form2').valid()) {
                $('ul.tabs').tabs('select_tab', 'tab3');
            }
        });
        $('#nextTo4').on('click', () => {
            var rules = {
                motherTongue: { required: true },
                tongue: { required: true },
                translation: { required: true },
                reviews: { required: true },
                proofReading: { required: true },
                qualityEnsureDescription: { required: true },
                qualifications: { required: true },
                Specialization: { required: true }
            };

            Util.handleValidationForm('#form3', rules, (a: any) => { $('ul.tabs').tabs('select_tab', 'tab4'); });
            if ($('#form3').valid()) {
                $('ul.tabs').tabs('select_tab', 'tab4');
            }
        });
        $('#nextTo5').on('click', () => {
            $('ul.tabs').tabs('select_tab', 'tab5');
        });
        $('#nextTo6').on('click', () => {
            if ($('#bankAccountType0').prop('checked')) {
                var rules = {
                    bankName: { required: true },
                    accountHolderFullName: { required: true },
                    IBAN: { required: true },
                    minimumChargeAmount: { required: true }
                };
                Util.handleValidationForm('#form5', rules, (a: any) => { $('ul.tabs').tabs('select_tab', 'nextTo6'); });
                if ($('#form5').valid()) {
                    $('ul.tabs').tabs('select_tab', 'tab6');
                }
            } else if ($('#bankAccountType1').prop('checked')) {
                var rules2 = {
                    bankName: { required: true },
                    accountHolderFullName: { required: true },
                    beneficiaryAddress: { required: true },
                    accountNumber: { required: true },
                    swiftBicCode: { required: true },
                    cityCountryBank: { required: true },
                    bankAddress: { required: true },
                    minimumChargeAmount: { required: true }
                };
                Util.handleValidationForm('form5', rules2, (a: any) => { $('ul.tabs').tabs('select_tab', 'nextTo6'); });
                if ($('#form5').valid()) {
                    $('ul.tabs').tabs('select_tab', 'tab6');
                }
            } else if ($('#bankAccountType2').prop('checked')) {
                var rules3 = {
                    paypalEmailAddress: { required: true, email: true },
                    minimumChargeAmount: { required: true }
                };
                Util.handleValidationForm('form5', rules3, (a: any) => { $('ul.tabs').tabs('select_tab', 'nextTo6'); });
                if ($('#form5').valid()) {
                    $('ul.tabs').tabs('select_tab', 'tab6');
                }
            } else {
                //show message
            }
        });
        $('#nextTo7').on('click', () => {
            var rules = {
                ServiceType: { required: true },
                SourceLanguage: { required: true },
                TargetLanguage: { required: true },
                minimumChargeAmount: { required: true }
            };

            Util.handleValidationForm('#form6', rules, (a: any) => { $('ul.tabs').tabs('select_tab', 'tab7'); });
            if ($('#form6').valid()) {
                $('ul.tabs').tabs('select_tab', 'tab7');
            }
        });

        function getUserFromForm(): User {
            let user = new User();

            user.name = $('#name').val();
            user.surname = $('#surname').val();
            user.email = $('#email').val();
            user.genderId = $('input[name="gender"]:checked').val();
            user.mobilePhone = $('#mobilePhone').val();
            user.password = $('#password').val();
            return user;
        }

        $('input[type=radio][name=bankAccountType]').change(function () {

            changeVisibleByClassName("Turkish", false);
            changeVisibleByClassName("European", false);
            changeVisibleByClassName("PayPal", false);

            $('#spnAccountTypeHeader').text(this.value);

            if (this.value == 'Turkish') {
                changeVisibleByClassName("Turkish", true);
            }
            else if (this.value == 'European') {
                changeVisibleByClassName("European", true);
            } else if (this.value == 'PayPal') {
                changeVisibleByClassName("PayPal", true);
            }
        });
        $("#btnSave").on("click", (data: any) => {
            if ($('#TranslationResult').val().length < 1) {
                toastr.error('Please translate the test content', 'Error');
                return;
            }

            let user = getUserFromForm();

            let defaultUserRole = new UserRole();
            defaultUserRole.userRoleTypeId = 1;
            user.userRoles = new Array<UserRole>();
            user.userRoles.push(defaultUserRole);


            let userContact = new UserContact();
            userContact.address = $('#address').val();
            userContact.postalCode = $('#postalCode').val();
            userContact.alternativeEmail = $('#alternativeEmail').val();
            userContact.alternativePhone1 = $('#alternativePhone1').val();
            userContact.alternativePhone2 = $('#alternativePhone2').val();
            userContact.fax = $('#fax').val();
            userContact.skype = $('#skype').val();
            userContact.districtId = $('#district').val();
            user.userContact = userContact;

            let userAbility = new UserAbility();
            userAbility.motherTongueId = $('#motherTongue').val();
            userAbility.tongueId = $('#tongue').val();
            userAbility.bilingualTongueId = $('#bilingualTongue').val();
            userAbility.yearsOfExperience = $('#yearsOfExperience').val();
            userAbility.technologyKnowledges = technologyKnowledges;

            let capacity = new Capacity();
            capacity.translation = $('#translation').val();
            capacity.reviews = $('#reviews').val();
            capacity.proofReading = $('#proofReading').val();

            userAbility.capacity = capacity;
            userAbility.qualityEnsureDescription = $('#qualityEnsureDescription').val();
            userAbility.qualifications = $('#qualifications').val();
            userAbility.mainClients = $('#mainClients').val();

            let specializations = <Array<any>>$('#SpecializationIhave').val();
            let arrayOfSpecs = new Array<Specialization>();
            specializations.forEach((item: any) => {
                var spec = new Specialization();
                spec.terminologyId = item;
                arrayOfSpecs.push(spec);
            });
            userAbility.specializations = arrayOfSpecs;
            user.userAbility = userAbility;

            let userPayment = new UserPayment();
            let bankAccount = new BankAccount();

            if ($('#bankAccountType0').prop('checked')) {
                bankAccount.bankAccountTypeId = 1;
            } else if ($('#bankAccountType1').prop('checked')) {
                bankAccount.bankAccountTypeId = 2;
            } else if ($('#bankAccountType2').prop('checked')) {
                bankAccount.bankAccountTypeId = 3;
            }


            switch (bankAccount.bankAccountTypeId) {
                case 1:
                    bankAccount.bankName = $('#bankName').val();
                    bankAccount.accountHolderFullName = $('#accountHolderFullName').val();
                    bankAccount.IBAN = $('#IBAN').val();
                    break;
                case 2:
                    bankAccount.bankName = $('#bankName').val();
                    bankAccount.accountHolderFullName = $('#accountHolderFullName').val();
                    bankAccount.IBAN = $('#IBAN').val();
                    bankAccount.beneficiaryAddress = $('#beneficiaryAddress').val();
                    bankAccount.accountNumber = $('#accountNumber').val();
                    bankAccount.swiftBicCode = $('#swiftBicCode').val();
                    bankAccount.cityCountryBank = $('#cityCountryBank').val();
                    bankAccount.bankAddress = $('#bankAddress').val();
                    break;
                case 3:
                    bankAccount.paypalEmailAddress = $('#paypalEmailAddress').val();
                    break;
                default:
            }
            userPayment.bankAccount = bankAccount;
            userPayment.vatTaxNo = $('#vatTaxNo').val();
            userPayment.currencyId = $('#currency').val();
            userPayment.workingTypeId = $('#workingType').val();
            userPayment.minimumChargeAmount = $('#minimumChargeAmount').val();
            user.userPayment = userPayment;

            let rate = new Rate();
            rate.rateItems = rateItems;
            user.userRate = rate;


            dataService.saveUser(user, (data: any) => {
                toastr.info('Your registration saved. We will get in touch with you soon.', 'Information');
            });
        });




    });

})());

