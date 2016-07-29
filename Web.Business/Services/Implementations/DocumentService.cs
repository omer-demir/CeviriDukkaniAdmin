using Tangent.CeviriDukkani.Domain.Common;
using Tangent.CeviriDukkani.Domain.Dto.Document;
using Tangent.CeviriDukkani.Domain.Dto.Response;
using Web.Business.Services.Interfaces;

namespace Web.Business.Services.Implementations {
    public class DocumentService:IDocumentService {
        #region Implementation of IDocumentService

        public ServiceResult AddTranslationDocument(TranslationDocumentDto documentDto) {
            throw new System.NotImplementedException();
        }

        public ServiceResult EditTranslationDocument(TranslationDocumentDto documentDto) {
            throw new System.NotImplementedException();
        }

        public ServiceResult GetTranslationDocuments() {
            throw new System.NotImplementedException();
        }

        public ServiceResult GetTranslationDocument(int id) {
            throw new System.NotImplementedException();
        }

        public ServiceResult AddGeneralDocument(GeneralDocumentDto documentDto) {
            throw new System.NotImplementedException();
        }

        public ServiceResult EditGeneralDocument(GeneralDocumentDto documentDto) {
            throw new System.NotImplementedException();
        }

        public ServiceResult GetGeneralDocuments() {
            throw new System.NotImplementedException();
        }

        public ServiceResult GetGeneralDocument(int id) {
            throw new System.NotImplementedException();
        }

        public ServiceResult AddUserDocument(UserDocumentDto documentDto) {
            throw new System.NotImplementedException();
        }

        public ServiceResult EditUserDocument(UserDocumentDto documentDto) {
            throw new System.NotImplementedException();
        }

        public ServiceResult GetUserDocuments() {
            throw new System.NotImplementedException();
        }

        public ServiceResult GetUserDocument(int id) {
            throw new System.NotImplementedException();
        }

        public ServiceResult GetDocumentPartsNormalized(int translationDocumentId, int partCount) {
            throw new System.NotImplementedException();
        }

        public ServiceResult<DocumentUploadResponseDto> AnalyzeDocument(string localFolder, string fileName) {
            throw new System.NotImplementedException();
        }

        #endregion
    }
}