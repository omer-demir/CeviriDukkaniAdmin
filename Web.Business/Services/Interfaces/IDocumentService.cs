using System.Collections.Generic;
using Tangent.CeviriDukkani.Domain.Common;
using Tangent.CeviriDukkani.Domain.Dto.Document;
using Tangent.CeviriDukkani.Domain.Dto.Response;

namespace Web.Business.Services.Interfaces {
    public interface IDocumentService {
        ServiceResult<TranslationDocumentDto> AddTranslationDocument(TranslationDocumentDto documentDto);
        ServiceResult<TranslationDocumentDto> EditTranslationDocument(TranslationDocumentDto documentDto);
        ServiceResult<List<TranslationDocumentDto>> GetTranslationDocuments();
        ServiceResult<TranslationDocumentDto> GetTranslationDocument(int id);
        ServiceResult<GeneralDocumentDto> AddGeneralDocument(GeneralDocumentDto documentDto);
        ServiceResult<GeneralDocumentDto> EditGeneralDocument(GeneralDocumentDto documentDto);
        ServiceResult<List<GeneralDocumentDto>> GetGeneralDocuments();
        ServiceResult<GeneralDocumentDto> GetGeneralDocument(int id);
        ServiceResult<UserDocumentDto> AddUserDocument(UserDocumentDto documentDto);
        ServiceResult<UserDocumentDto> EditUserDocument(UserDocumentDto documentDto);
        ServiceResult<List<UserDocumentDto>> GetUserDocuments();
        ServiceResult<UserDocumentDto> GetUserDocument(int id);
        ServiceResult<List<TranslationDocumentPartDto>> GetDocumentPartsNormalized(int translationDocumentId, int partCount);
        ServiceResult<DocumentUploadResponseDto> AnalyzeDocument(string localFolder, string fileName);
        ServiceResult<TranslationDocumentPartDto> GetTranslationDocumentPartById(int translationDocumentPartId);
    }
}