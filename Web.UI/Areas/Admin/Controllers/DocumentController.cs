using System.Web.Mvc;
using Tangent.CeviriDukkani.Domain.Common;
using Tangent.CeviriDukkani.Domain.Dto.Enums;
using Web.Business.Services.Interfaces;
using Web.UI.Areas.Admin.Helpers;

namespace Web.UI.Areas.Admin.Controllers
{
    [SessionControl(new[] { UserRoleTypeEnum.Admin })]
    public class DocumentController : Controller
    {
        private readonly IDocumentService _documentService;

        public DocumentController(IDocumentService documentService)
        {
            _documentService = documentService;
        }

        // GET: Admin/Document
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Create()
        {
            return View();
        }

        public ActionResult Edit(int id)
        {
            var serviceResult = _documentService.GetTranslationDocument(id);
            if (serviceResult.ServiceResultType != ServiceResultType.Success)
            {
                return View("Index");
            }

            return View(serviceResult.Data);
        }

        public ActionResult Detail(int id)
        {
            var serviceResult = _documentService.GetTranslationDocument(id);
            if (serviceResult.ServiceResultType != ServiceResultType.Success)
            {
                return View("Index");
            }

            return View(serviceResult.Data);
        }

        public ActionResult History(int documentId)
        {
            var serviceResult = _documentService.GetDocumentAudits(documentId);

            if (serviceResult.ServiceResultType != ServiceResultType.Success)
            {
                return View("Index");
            }

            return View(serviceResult.Data);
        }
    }
}