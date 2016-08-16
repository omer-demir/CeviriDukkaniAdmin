using System.Web.Mvc;

namespace Web.UI.Controllers {
    public class CommonController:Controller {
        public ActionResult UserMenu() {
            return PartialView();
        }

        public ActionResult Footer() {
            return PartialView();
        }
    }
}