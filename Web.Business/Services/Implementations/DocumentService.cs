using System.Collections.Generic;
using Tangent.CeviriDukkani.Domain.Common;
using Tangent.CeviriDukkani.Domain.Dto.Document;
using Tangent.CeviriDukkani.Domain.Dto.Response;
using Web.Business.Services.Interfaces;

namespace Web.Business.Services.Implementations {
    public class DocumentService:IDocumentService {
        #region Implementation of IDocumentService

        public ServiceResult<TranslationDocumentDto> AddTranslationDocument(TranslationDocumentDto documentDto) {
            throw new System.NotImplementedException();
        }

        public ServiceResult<TranslationDocumentDto> EditTranslationDocument(TranslationDocumentDto documentDto) {
            throw new System.NotImplementedException();
        }

        public ServiceResult<List<TranslationDocumentDto>> GetTranslationDocuments() {
            throw new System.NotImplementedException();
        }

        public ServiceResult<TranslationDocumentDto> GetTranslationDocument(int id) {
            throw new System.NotImplementedException();
        }

        public ServiceResult<GeneralDocumentDto> AddGeneralDocument(GeneralDocumentDto documentDto) {
            throw new System.NotImplementedException();
        }

        public ServiceResult<GeneralDocumentDto> EditGeneralDocument(GeneralDocumentDto documentDto) {
            throw new System.NotImplementedException();
        }

        public ServiceResult<List<GeneralDocumentDto>> GetGeneralDocuments() {
            throw new System.NotImplementedException();
        }

        public ServiceResult<GeneralDocumentDto> GetGeneralDocument(int id) {
            throw new System.NotImplementedException();
        }

        public ServiceResult<UserDocumentDto> AddUserDocument(UserDocumentDto documentDto) {
            throw new System.NotImplementedException();
        }

        public ServiceResult<UserDocumentDto> EditUserDocument(UserDocumentDto documentDto) {
            throw new System.NotImplementedException();
        }

        public ServiceResult<List<UserDocumentDto>> GetUserDocuments() {
            throw new System.NotImplementedException();
        }

        public ServiceResult<UserDocumentDto> GetUserDocument(int id) {
            throw new System.NotImplementedException();
        }

        public ServiceResult<List<TranslationDocumentPartDto>> GetDocumentPartsNormalized(int translationDocumentId, int partCount) {
            throw new System.NotImplementedException();
        }

        public ServiceResult<DocumentUploadResponseDto> AnalyzeDocument(string localFolder, string fileName) {
            throw new System.NotImplementedException();
        }

        public ServiceResult<TranslationDocumentPartDto> GetTranslationDocumentPartById(int translationDocumentPartId) {
            throw new System.NotImplementedException();
        }

        #endregion
    }
}