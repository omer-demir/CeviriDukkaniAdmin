using System;
using System.Configuration;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Tangent.CeviriDukkani.Domain.Common;
using Tangent.CeviriDukkani.Domain.Dto.Document;
using Tangent.CeviriDukkani.Domain.Dto.Response;
using Web.Business.Services.Interfaces;

namespace Web.UI.Areas.Admin.Controllers.ApiController
{
    [RoutePrefix("api/v1/documentapi")]
    public class DocumentApiController : BaseApiController
    {
        private readonly IDocumentService _documentService;

        public DocumentApiController(IDocumentService documentService)
        {
            _documentService = documentService;
        }

        [HttpPost, Route("uploadDocument")]
        public HttpResponseMessage UploadDocument(HttpRequestMessage request)
        {
            var serviceResult = _documentService.UploadDocument(HttpContext.Current.Request);
            if (serviceResult.ServiceResultType != ServiceResultType.Success)
            {
                return Error(serviceResult);
            }

            return OK(serviceResult);
        }

        [HttpPost, Route("addTranslationDocument")]
        public HttpResponseMessage AddTranslationDocument(TranslationDocumentDto documentDto)
        {
            var serviceResult = _documentService.AddTranslationDocument(documentDto);

            if (serviceResult.ServiceResultType != ServiceResultType.Success)
                return Error();

            return OK(serviceResult.Data);
        }

        [HttpPost, Route("editTranslationDocument")]
        public HttpResponseMessage EditTranslationDocument(TranslationDocumentDto documentDto)
        {
            var serviceResult = _documentService.EditTranslationDocument(documentDto);

            if (serviceResult.ServiceResultType != ServiceResultType.Success)
                return Error();

            return OK(serviceResult.Data);
        }

        [HttpGet, Route("getTranslationDocuments")]
        public HttpResponseMessage GetTranslationDocuments()
        {
            var serviceResult = _documentService.GetTranslationDocuments();

            if (serviceResult.ServiceResultType != ServiceResultType.Success)
                return Error();

            return OK(serviceResult.Data);
        }

        [HttpGet, Route("getTranslationDocument/{id}")]
        public HttpResponseMessage GetTranslationDocument(int id)
        {
            var serviceResult = _documentService.GetTranslationDocument(id);

            if (serviceResult.ServiceResultType != ServiceResultType.Success)
                return Error();

            return OK(serviceResult.Data);
        }

        [HttpPost, Route("addGeneralDocument")]
        public HttpResponseMessage AddGeneralDocument(GeneralDocumentDto documentDto)
        {
            var serviceResult = _documentService.AddGeneralDocument(documentDto);

            if (serviceResult.ServiceResultType != ServiceResultType.Success)
                return Error();

            return OK(serviceResult.Data);
        }

        [HttpPost, Route("editGeneralDocument")]
        public HttpResponseMessage EditGeneralDocument(GeneralDocumentDto documentDto)
        {
            var serviceResult = _documentService.EditGeneralDocument(documentDto);

            if (serviceResult.ServiceResultType != ServiceResultType.Success)
                return Error();

            return OK(serviceResult.Data);
        }

        [HttpGet, Route("getGeneralDocuments")]
        public HttpResponseMessage GetGeneralDocuments()
        {
            var serviceResult = _documentService.GetGeneralDocuments();

            if (serviceResult.ServiceResultType != ServiceResultType.Success)
                return Error();

            return OK(serviceResult.Data);
        }

        [HttpGet, Route("getGeneralDocument/{id}")]
        public HttpResponseMessage GetGeneralDocument(int id)
        {
            var serviceResult = _documentService.GetGeneralDocument(id);

            if (serviceResult.ServiceResultType != ServiceResultType.Success)
                return Error();

            return OK(serviceResult.Data);
        }

        [HttpPost, Route("addUserDocument")]
        public HttpResponseMessage AddUserDocument(UserDocumentDto documentDto)
        {
            var serviceResult = _documentService.AddUserDocument(documentDto);

            if (serviceResult.ServiceResultType != ServiceResultType.Success)
                return Error();

            return OK(serviceResult.Data);
        }

        [HttpPost, Route("editUserDocument")]
        public HttpResponseMessage EditUserDocument(UserDocumentDto documentDto)
        {
            var serviceResult = _documentService.EditUserDocument(documentDto);

            if (serviceResult.ServiceResultType != ServiceResultType.Success)
                return Error();

            return OK(serviceResult.Data);
        }

        [HttpGet, Route("getUserDocuments")]
        public HttpResponseMessage GetUserDocuments()
        {
            var serviceResult = _documentService.GetUserDocuments();

            if (serviceResult.ServiceResultType != ServiceResultType.Success)
                return Error();

            return OK(serviceResult.Data);
        }

        [HttpGet, Route("getUserDocument/{id}")]
        public HttpResponseMessage GetUserDocument(int id)
        {
            var serviceResult = _documentService.GetUserDocument(id);

            if (serviceResult.ServiceResultType != ServiceResultType.Success)
                return Error();

            return OK(serviceResult.Data);
        }

        [HttpPost, Route("getDocumentPartsNormalized")]
        public HttpResponseMessage GetDocumentPartsNormalized(int translationDocumentId, int partCount)
        {
            var serviceResult = _documentService.GetDocumentPartsNormalized(translationDocumentId, partCount);

            if (serviceResult.ServiceResultType != ServiceResultType.Success)
                return Error();

            return OK(serviceResult.Data);
        }

        [HttpGet, Route("getTranslationDocumentPartById")]
        public HttpResponseMessage GetTranslationDocumentPartById([FromUri]int translationDocumentPartId)
        {
            var serviceResult = _documentService.GetTranslationDocumentPartById(translationDocumentPartId);
            if (serviceResult.ServiceResultType != ServiceResultType.Success)
            {
                return Error(serviceResult);
            }

            return OK(serviceResult);
        }

        [HttpGet, Route("getDocumentAudits")]
        public HttpResponseMessage GetDocumentAudits(int documentId)
        {
            var serviceResult = _documentService.GetDocumentAudits(documentId);
            if (serviceResult.ServiceResultType != ServiceResultType.Success)
            {
                return Error(serviceResult);
            }

            return OK(serviceResult);
        }
    }
}