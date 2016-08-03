using System.Collections.Generic;
using Tangent.CeviriDukkani.Domain.Common;
using Tangent.CeviriDukkani.Domain.Dto.Common;
using Tangent.CeviriDukkani.Domain.Dto.Request;
using Tangent.CeviriDukkani.Domain.Dto.Sale;
using Tangent.CeviriDukkani.Domain.Dto.System;
using Tangent.CeviriDukkani.Domain.Dto.Translation;

namespace Web.Business.Services.Interfaces {
    public interface ICommonService {
        ServiceResult<UserDto> Login(LoginRequestDto loginRequest);
        ServiceResult<UserDto> ChangePassword(ChangePasswordRequestDto changePasswordRequest);
        ServiceResult<MessageDto> AddMessage(MessageDto messageDto, int createdBy);
        ServiceResult<List<MessageDto>> GetIncomingMessages(int userId);
        ServiceResult<List<MessageDto>> GetSentMessages(int userId);
        ServiceResult<MessageDto> GetMessage(int messageId);
        ServiceResult<MessageDto> UpdateMessageForReadDate(int messageId);
        ServiceResult<MessageDto> DeleteSentMessage(int messageId);
        ServiceResult<MessageDto> DeleteIncomingMessage(int messageId);

        ServiceResult<List<CompanyDto>> GetCompanies();
        ServiceResult<CompanyDto> AddCompany(CompanyDto companyDto, int userId);
        ServiceResult<CompanyDto> UpdateCompany(CompanyDto companyDto, int userId);
        ServiceResult<CompanyDto> GetCompany(int companyId);

        ServiceResult<List<LanguageDto>> GetLanguages();
        ServiceResult<LanguageDto> AddLanguage(LanguageDto languageDto, int createdBy);
        ServiceResult<LanguageDto> UpdateLanguage(LanguageDto languageDto, int createdBy);
        ServiceResult<LanguageDto> GetLanguage(int languageId);

        ServiceResult<List<SourceTargetLanguageDto>> GetTargetLanguages(int sourceLanguageId);
        ServiceResult<SourceTargetLanguageDto> AddSourceTargetLanguages(SourceTargetLanguageDto sourceTargetLanguageDto, int createdBy);
        ServiceResult DeleteSourceTargetLanguages(SourceTargetLanguageDto sourceTargetLanguageDto);

        ServiceResult<List<TerminologyDto>> GetTerminologies();
        ServiceResult<TerminologyDto> AddTerminology(TerminologyDto terminologyDto, int createdBy);
        ServiceResult<TerminologyDto> UpdateTerminology(TerminologyDto terminologyDto, int createdBy);
        ServiceResult<TerminologyDto> GetTerminology(int terminologyId);

        ServiceResult<List<PriceListDto>> GetPriceLists();
        ServiceResult<PriceListDto> AddPriceList(PriceListDto priceListDto, int createdBy);
        ServiceResult<PriceListDto> UpdatePriceList(PriceListDto priceListDto, int createdBy);
        ServiceResult<PriceListDto> GetPriceList(int priceListId);

        ServiceResult<List<CompanyTerminologyDto>> GetCompanyTerminologies();
        ServiceResult<CompanyTerminologyDto> AddCompanyTerminology(CompanyTerminologyDto companyTerminologyDto, int createdBy);
        ServiceResult<CompanyTerminologyDto> UpdateCompanyTerminology(CompanyTerminologyDto companyTerminologyDto, int createdBy);
        ServiceResult<CompanyTerminologyDto> DeleteCompanyTerminology(int companyTerminologyId);
        ServiceResult<CompanyTerminologyDto> GetCompanyTerminology(int companyTerminologyId);

        ServiceResult<List<UserRoleTypeDto>> GetUserRoleTypes();

        ServiceResult<List<CountryDto>> GetCountries();
        ServiceResult<List<CityDto>> GetCitiesByCountryId(int countryId);
        ServiceResult<List<DistrictDto>> GetDistrictByCityId(int cityId);
        ServiceResult<List<TongueDto>> GetTongues();
        ServiceResult<List<SpecializationDto>> GetSpecializations();
        ServiceResult<List<SoftwareDto>> GetSoftwares();
        ServiceResult<List<BankAccountTypeDto>> GetBankAccountTypes();
        ServiceResult<List<CurrencyDto>> GetCurrencies();
        ServiceResult<List<WorkingTypeDto>> GetWorkingTypes();
        ServiceResult<List<ServiceTypeDto>> GetServiceTypes();
    }
}