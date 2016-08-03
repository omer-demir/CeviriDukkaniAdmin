using System.Web.Mvc;

namespace Web.UI.Areas.Admin.Controllers {
    public class OrderController:Controller {
        public ActionResult OrderList() {
            return View();
        }

        public ActionResult OrderDetail() {
            return View();
        }

        public ActionResult WaitingOrders() {
            return View();
        }

        public ActionResult ResponsePendingOrders() {
            return View();
        }

    }
}