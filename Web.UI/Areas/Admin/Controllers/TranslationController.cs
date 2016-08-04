using System.Web.Mvc;

namespace Web.UI.Areas.Admin.Controllers {
    public class TranslationController:Controller {
        public ActionResult TranslateContent(int translationOperationId,int translationDocumentPartId,int translatorId) {
            return View();
        }

        public ActionResult EditContent(int translationOperationId, int translationDocumentPartId, int editorId) {
            return View();
        }

        public ActionResult ProofReadContent(int translationOperationId, int translationDocumentPartId, int proofReaderId) {
            return View();
        }
    }
}