using Tangent.CeviriDukkani.Domain.Common;
using Tangent.CeviriDukkani.Domain.Dto.Document;
using Tangent.CeviriDukkani.Domain.Dto.Response;

namespace Web.Business.Services.Interfaces {
    public interface IDocumentService {
        ServiceResult AddTranslationDocument(TranslationDocumentDto documentDto);
        ServiceResult EditTranslationDocument(TranslationDocumentDto documentDto);
        ServiceResult GetTranslationDocuments();
        ServiceResult GetTranslationDocument(int id);
        ServiceResult AddGeneralDocument(GeneralDocumentDto documentDto);
        ServiceResult EditGeneralDocument(GeneralDocumentDto documentDto);
        ServiceResult GetGeneralDocuments();
        ServiceResult GetGeneralDocument(int id);
        ServiceResult AddUserDocument(UserDocumentDto documentDto);
        ServiceResult EditUserDocument(UserDocumentDto documentDto);
        ServiceResult GetUserDocuments();
        ServiceResult GetUserDocument(int id);
        ServiceResult GetDocumentPartsNormalized(int translationDocumentId, int partCount);
        ServiceResult<DocumentUploadResponseDto> AnalyzeDocument(string localFolder, string fileName);
    }
}