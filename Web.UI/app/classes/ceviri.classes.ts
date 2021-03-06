﻿class Constants {
    static Days: any[] = [
        { id: 1, text: 'Monday' },
        { id: 2, text: 'Tuesday' },
        { id: 3, text: 'Wednesday' },
        { id: 4, text: 'Thursday' },
        { id: 5, text: 'Friday' },
        { id: 6, text: 'Saturday' },
        { id: 7, text: 'Sunday' }];

    static Rates: any[] = [
        { id: 1, text: 'Beginner' },
        { id: 2, text: 'Intermediate' },
        { id: 3, text: 'Professional' }
    ];

    static WorkingDays: any[] = [
        { id: 1, text: "Monday" },
        { id: 2, text: "Tuesday" },
        { id: 3, text: "Wednesday" },
        { id: 4, text: "Thursday" },
        { id: 5, text: "Friday" },
        { id: 6, text: "Saturday" },
        { id: 7, text: "Sunday" }
    ];
}

class KeyValue {
    id: number;
    name: string;
}

class Select2Data {
    id: number;
    text: string;
    constructor(id: number, text: string) {
        this.id = id;
        this.text = text;
    }
}

class UpdateUserStep {
    user: User;
    step: number;
    public constructor(user: User, step: number) {
        this.user = user;
        this.step = step;
    }
}

class User {
    name: string;
    surname: string;
    email: string;
    genderId: number;
    mobilePhone: string;
    password: string;
    userContact: UserContact;
    userAbility: UserAbility;
    userPayment: UserPayment;
    userRoles: Array<UserRole>;
    userRate: Rate;
}


class UserRole {
    userId: number;
    userRoleTypeId: number;
}

class UserContact {
    address: string;
    postalCode: string;
    alternativeEmail: string;
    alternativePhone1: string;
    alternativePhone2: string;
    fax: string;
    skype: string;
    districtId: number;
    district: District;
}

class District {
    name: String;
    cityId: number;
}

class UserAbility {
    motherTongueId: number;
    tongueId: number;
    bilingualTongueId: number;
    yearsOfExperience: number;
    qualityEnsureDescription: string;
    qualifications: string;
    mainClients: string;
    capacity: Capacity;
    technologyKnowledges: TechnologyKnowledge[];
    specializations: Specialization[];
    freelanceCompanyName: string;
    title: string;
    timezone: string;
    workingDays: string;
    workingHoursStart: string;
    workingHoursEnd: string;
}

class Specialization {
    userAbilityId: number;
    terminologyId: number;
}

class Capacity {
    translation: number;
    translationWorkingTypeId:number;
    reviews: number;
    reviewsWorkingTypeId: number;
    proofReading: number;
    proofReadingWorkingTypeId: number;
}

class UserPayment {
    bankAccount: BankAccount;
    vatTaxNo: string;
    currencyId: number;
    workingTypeId: number;
    minimumChargeAmount: number;
}

class TechnologyKnowledge {
    softwareId: number;
    softwareVersion: string;
    operatingSystem: string;
    rating: number;
    userAbilityId: number;
}

class BankAccount {
    bankAccountTypeId: number;
    bankName: string;
    accountHolderFullName: string;
    IBAN: string;
    paypalEmailAddress: string;
    beneficiaryAddress: string;
    accountNumber: string;
    swiftBicCode: string;
    cityCountryBank: string;
    bankAddress: string;
}

class Rate {
    rateItems: RateItem[];
    dtpRate: number;
    glossaryCreationRate: number;
    translationMemoryManagementRate: number;
    terminologyExtractionRate: number;
    reviewSmeRate: number;
    linguisticTestingRate: number;
    reviewLqaRate: number;
    userDocuments: UserDocument[];
    userRateId: number;   
}

class RateItem {
    id: number;
    name: string;
    serviceTypeId: number;
    sourceLanguageId: number;
    targetLanguageId: number;
    price: number;
    swornOrCertified: boolean;
    certificateId: number;
    userRateId: number;
    currencyId:number;
}

class UserDocument {
    userDocumentTypeId: number;
}

class Company {
    id: number;
    accountingEmail: string;
    address: string;
    authorizedEmail: string;
    authorizedFullName: string;
    authorizedMobilePhone: string;
    extensionNumber: string;
    isContractPrice: boolean
    isUsingPo: boolean;
    name: string;
    phone: string;
    taxNumber: string;
    taxOffice: string;
}

class Customer {
    company: Company;
    companyId: number;
    email: string;    
    institutionCode: string;
    membershipTypeId: number;
    mobilePhone: string;
    name: string;
    password: string;
    surname: string;
}