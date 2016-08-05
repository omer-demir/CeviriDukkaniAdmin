using System.Net;
using System.Net.Http;
using System.Web.Http;
using Tangent.CeviriDukkani.Domain.Common;
using Tangent.CeviriDukkani.Domain.Dto.Request;
using Web.Business.Services.Interfaces;

namespace Web.UI.Areas.Admin.Controllers.ApiController {
    [RoutePrefix("api/v1/translationapi")]
    public class TranslationApiController : BaseApiController {
        private readonly ITranslationService _translationService;

        public TranslationApiController(ITranslationService translationService) {
            _translationService = translationService;
        }

        [HttpGet, Route("getTranslatedContent")]
        public HttpResponseMessage GetTranslatedContent([FromUri]int translationDocumentPartId, [FromUri]int userId) {
            var serviceResult = _translationService.GetTranslatedContent(translationDocumentPartId, userId);
            if (serviceResult.ServiceResultType != ServiceResultType.Success) {
                return Error(serviceResult);
            }
            return OK(serviceResult);
        }

        [HttpGet, Route("getEditedContent")]
        public HttpResponseMessage GetEditedContent([FromUri]int translationDocumentPartId, [FromUri]int userId) {
            var serviceResult = _translationService.GetEditedContent(translationDocumentPartId, userId);
            if (serviceResult.ServiceResultType != ServiceResultType.Success) {
                return Error(serviceResult);
            }
            return OK(serviceResult);
        }

        [HttpGet, Route("getProofReadContent")]
        public HttpResponseMessage GetProofReadContent([FromUri]int translationDocumentPartId, [FromUri]int userId) {
            var serviceResult = _translationService.GetProofReadContent(translationDocumentPartId, userId);
            if (serviceResult.ServiceResultType != ServiceResultType.Success) {
                return Error(serviceResult);
            }
            return OK(serviceResult);
        }

        [HttpPost, Route("addCommentToTranslationOperation")]
        public HttpResponseMessage AddCommentToTranslationOperation([FromBody]CreateCommentRequestDto request) {
            var serviceResult = _translationService.AddCommentToTranslationOperation(request);
            if (serviceResult.ServiceResultType != ServiceResultType.Success) {
                return Error(serviceResult);
            }
            return OK(serviceResult);
        }

        [HttpPost, Route("addCommentToEditionOperation")]
        public HttpResponseMessage AddCommentToEditionOperation([FromBody]CreateCommentRequestDto request) {
            var serviceResult = _translationService.AddCommentToEditionOperation(request);
            if (serviceResult.ServiceResultType != ServiceResultType.Success) {
                return Error(serviceResult);
            }
            return OK(serviceResult);
        }

        [HttpGet, Route("getTranslationOperationComments")]
        public HttpResponseMessage GetTranslationOperationComments([FromUri]int translationDocumentPartId) {
            var serviceResult = _translationService.GetTranslationOperationComments(translationDocumentPartId);
            if (serviceResult.ServiceResultType != ServiceResultType.Success) {
                return Error(serviceResult);
            }

            return OK(serviceResult);
        }

        [HttpPost, Route("updateTranslatedDocumentPart")]
        public HttpResponseMessage UpdateTranslatedDocumentPart([FromBody]UpdateDocumentPartContentRequestDto request) {
            var serviceResult = _translationService.UpdateTranslatedDocumentPart(request);
            if (serviceResult.ServiceResultType != ServiceResultType.Success) {
                return Error(serviceResult);
            }
            return OK(serviceResult);
        }

        [HttpPost, Route("updateEditedDocumentPart")]
        public HttpResponseMessage UpdateEditedDocumentPart([FromBody]UpdateDocumentPartContentRequestDto request) {
            var serviceResult = _translationService.UpdateEditedDocumentPart(request);
            if (serviceResult.ServiceResultType != ServiceResultType.Success) {
                return Error(serviceResult);
            }
            return OK(serviceResult);
        }
        [HttpPost, Route("updateProofReadDocumentPart")]
        public HttpResponseMessage UpdateProofReadDocumentPart([FromBody]UpdateDocumentPartContentRequestDto request) {
            var serviceResult = _translationService.UpdateProofReadDocumentPart(request);
            if (serviceResult.ServiceResultType != ServiceResultType.Success) {
                return Error(serviceResult);
            }
            return OK(serviceResult);
        }

        [HttpPost, Route("markTranslatingAsFinished")]
        public HttpResponseMessage MarkTranslatingAsFinished([FromBody]MarkOperationAsFinishedRequestDto request) {
            var serviceResult = _translationService.MarkTranslatingAsFinished(request);
            if (serviceResult.ServiceResultType != ServiceResultType.Success) {
                return Error(serviceResult);
            }
            return OK(serviceResult);
        }

        [HttpPost, Route("markEditingAsFinished")]
        public HttpResponseMessage MarkEditingAsFinished([FromBody]MarkOperationAsFinishedRequestDto request) {
            var serviceResult = _translationService.MarkEditingAsFinished(request);
            if (serviceResult.ServiceResultType != ServiceResultType.Success) {
                return Error(serviceResult);
            }
            return OK(serviceResult);
        }
        [HttpPost, Route("markProofReadingAsFinished")]
        public HttpResponseMessage MarkProofReadingAsFinished([FromBody]MarkOperationAsFinishedRequestDto request) {
            var serviceResult = _translationService.MarkProofReadingAsFinished(request);
            if (serviceResult.ServiceResultType != ServiceResultType.Success) {
                return Error(serviceResult);
            }
            return OK(serviceResult);
        }
    }
}