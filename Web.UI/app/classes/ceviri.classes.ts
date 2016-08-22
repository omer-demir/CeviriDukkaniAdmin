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
    motherTongueId:number;
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
    bankAccountId:number;
    vatTaxNo: string;
    currencyId: number;
    workingTypeId: number;
    minimumChargeAmount: number;
}


//public int ? UserRateId { get; set; }
//public virtual UserRateDto UserRate { get; set; }
//public int ? UserScoreId { get; set; }
//public virtual UserScoreDto UserScore { get; set; }