class Constants {
    static Days: any[] = [
        { id: 1, text: 'Monday' },
        { id: 2, text: 'Tuesday' },
        { id: 3, text: 'Wednesday' },
        { id: 4, text: 'Thursday' },
        { id: 5, text: 'Friday' },
        { id: 6, text: 'Saturday' },
        { id: 7, text: 'Sunday' }]
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

class User {
    name: string;
    surname: string;
    genderId: number;
    mobilePhone: string;
    password: string;
    userContact: UserContact;
    userAbility: UserAbility;
    userPayment: UserPayment;
}

class UserContact {
    address: string;
    postalCode: string;
    alternativeEmail:string;
    alternativePhone1: string;
    alternativePhone2: string;
    fax: string;
    skype: string;
    districtId:number;
}

class UserAbility {
    motherTongueId: number;
    tongue: number;
    bilingualTongueId: number;
    yearsOfExperience:number;
    capacity:Capacity;
    qualityEnsureDescription: string;
    qualifications: string;
    mainClients:string;
    specializations: Specialization[];
}

class Specialization {
    id:number;
}

class Capacity {
    translation: number;
    reviews: number;
    proofReading: number;
}

class UserPayment {
    bankAccount: BankAccount;
    vatTaxNo: string;
    currencyId: number;
    workingTypeId: number;
    minimumChargeAmount: number;
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

class Rate{
    RateItems: RateItemDto[];
    DtpRate: number;
    GlossaryCreationRate: number;
    TranslationMemoryManagementRate: number;
    TerminologyExtractionRate: number;
    ReviewSmeRate: number;
    LinguisticTestingRate: number;
    ReviewLqaRate: number;
    UserDocuments: UserDocumentDto[];
    UserRateId: number;
}

class RateItemDto {
    ServiceTypeId: number;
    SourceLanguageId: number;
    TargetLanguageId: number;
    Price: number;
    SwornOrCertified: boolean;
    CertificateId: number;
    UserRateId: number;
}

class UserDocumentDto {
    UserDocumentTypeId: number;
}