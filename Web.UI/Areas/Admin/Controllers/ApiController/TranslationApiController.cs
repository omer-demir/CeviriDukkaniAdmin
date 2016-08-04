using System.Exception;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Tangent.CeviriDukkani.Domain.Common;
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
    }
}