using System.Collections.Generic;
using Tangent.CeviriDukkani.Domain.Common;
using Tangent.CeviriDukkani.Domain.Dto.Common;
using Tangent.CeviriDukkani.Domain.Dto.Request;
using Tangent.CeviriDukkani.Domain.Dto.Translation;
using Web.Business.Services.Interfaces;

namespace Web.Business.Services.Implementations {
    public class TranslationService:BaseService,ITranslationService {
        #region Implementation of ITranslationService

        public ServiceResult GetAverageDocumentPartCount(int orderId) {
            var httpClient = GetClient(ServiceUrl.Ts);
            return GetAsAsync(httpClient, $"api/translationapi/getAverageDocumentPartCount?orderId={orderId}");
        }

        public ServiceResult<List<TranslationOperationDto>> SaveTranslationOperations(List<TranslationOperationDto> translationOperations) {
            var httpClient = GetClient(ServiceUrl.Ts);
            return PostAsAsync<List<TranslationOperationDto>>(httpClient, $"api/translationapi/saveTranslationOperations", translationOperations);
        }

        public ServiceResult UpdateTranslatedDocumentPart(UpdateDocumentPartContentRequestDto request) {
            var httpClient = GetClient(ServiceUrl.Ts);
            return PostAsAsync(httpClient, $"api/translationapi/updateTranslatedDocumentPart", request);
        }

        public ServiceResult UpdateEditedDocumentPart(UpdateDocumentPartContentRequestDto request) {
            var httpClient = GetClient(ServiceUrl.Ts);
            return PostAsAsync(httpClient, $"api/translationapi/updateEditedDocumentPart", request);
        }

        public ServiceResult UpdateProofReadDocumentPart(UpdateDocumentPartContentRequestDto request) {
            var httpClient = GetClient(ServiceUrl.Ts);
            return PostAsAsync(httpClient, $"api/translationapi/updateProofReadDocumentPart", request);
        }

        public ServiceResult FinishTranslation(FinishDocumentPartRequestDto request) {
            var httpClient = GetClient(ServiceUrl.Ts);
            return PostAsAsync(httpClient, $"api/translationapi/finishTranslation", request);
        }

        public ServiceResult FinishEditing(FinishDocumentPartRequestDto request) {
            var httpClient = GetClient(ServiceUrl.Ts);
            return PostAsAsync(httpClient, $"api/translationapi/finishEditing",request);
        }

        public ServiceResult FinishProofReading(FinishDocumentPartRequestDto request) {
            var httpClient = GetClient(ServiceUrl.Ts);
            return PostAsAsync(httpClient, $"api/translationapi/finishProofReading", request);
        }

        public ServiceResult GetTranslatedContent(int translationDocumentPartId, int userId) {
            var httpClient = GetClient(ServiceUrl.Ts);
            return GetAsAsync(httpClient, $"api/translationapi/getTranslatedContent?translationDocumentPartId={translationDocumentPartId}&userId={userId}");
        }

        public ServiceResult GetEditedContent(int translationDocumentPartId, int userId) {
            var httpClient = GetClient(ServiceUrl.Ts);
            return GetAsAsync(httpClient, $"api/translationapi/getEditedContent?translationDocumentPartId={translationDocumentPartId}&userId={userId}");
        }

        public ServiceResult GetProofReadContent(int translationDocumentPartId, int userId) {
            var httpClient = GetClient(ServiceUrl.Ts);
            return GetAsAsync(httpClient, $"api/translationapi/getProofReadContent?translationDocumentPartId={translationDocumentPartId}&userId={userId}");
        }

        public ServiceResult AddCommentToTranslationOperation(CreateCommentRequestDto request) {
            var httpClient = GetClient(ServiceUrl.Ts);
            return PostAsAsync(httpClient, $"api/translationapi/addCommentToTranslationOperation", request);
        }

        public ServiceResult AddCommentToEditionOperation(CreateCommentRequestDto request) {
            var httpClient = GetClient(ServiceUrl.Ts);
            return PostAsAsync(httpClient, $"api/translationapi/addCommentToEditionOperation", request);
        }

        public ServiceResult<List<CommentDto>> GetTranslationOperationComments(int translationDocumentPartId) {
            var httpClient = GetClient(ServiceUrl.Ts);
            return GetAsAsync<List<CommentDto>>(httpClient, $"api/translationapi/getTranslationOperationComments?translationDocumentPartId={translationDocumentPartId}");
        }

        public ServiceResult MarkTranslatingAsFinished(MarkOperationAsFinishedRequestDto request) {
            var httpClient = GetClient(ServiceUrl.Ts);
            return PostAsAsync(httpClient, $"api/translationapi/markTranslatingAsFinished", request);
        }

        public ServiceResult MarkEditingAsFinished(MarkOperationAsFinishedRequestDto request) {
            var httpClient = GetClient(ServiceUrl.Ts);
            return PostAsAsync(httpClient, $"api/translationapi/markEditingAsFinished", request);
        }

        public ServiceResult MarkProofReadingAsFinished(MarkOperationAsFinishedRequestDto request) {
            var httpClient = GetClient(ServiceUrl.Ts);
            return PostAsAsync(httpClient, $"api/translationapi/markProofReadingAsFinished", request);
        }

        #endregion
    }
}