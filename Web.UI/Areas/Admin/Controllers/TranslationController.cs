using System.Web.Mvc;

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
    }
}