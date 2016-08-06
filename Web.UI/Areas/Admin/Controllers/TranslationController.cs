using System.Web.Mvc;
using Web.UI.Areas.Admin.Helpers;

namespace Web.UI.Areas.Admin.Controllers {
    public class TranslationController : Controller {
        public ActionResult TranslateContent(int translationDocumentPartId, int translatorId) {
            return View();
        }

        public ActionResult EditContent(int translationDocumentPartId, int editorId) {
            return View();
        }

        public ActionResult ProofReadContent(int translationDocumentPartId, int proofReaderId) {
            return View();
        }

        public ActionResult TranslationOperations() {
            ViewBag.Id = SessionUser.User.Id;
            return View();
        }

        public ActionResult EditOperations() {
            ViewBag.Id = SessionUser.User.Id;
            return View();
        }

        public ActionResult ProofReadingOperations() {
            ViewBag.Id = SessionUser.User.Id;
            return View();
        }
    }
}