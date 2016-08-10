using System.Web.Mvc;
using Tangent.CeviriDukkani.Domain.Common;
using Tangent.CeviriDukkani.Domain.Dto.Sale;
using Tangent.CeviriDukkani.Domain.Entities.Sale;
using Web.Business.Services.Interfaces;

namespace Web.UI.Areas.Admin.Controllers {
    public class OrderController : Controller {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService) {
            _orderService = orderService;
        }

        public ActionResult OrderList() {
            return View();
        }

        public ActionResult OrderDetail(int id) {
            var result = _orderService.GetOrderById(id);
            if (result.ServiceResultType != ServiceResultType.Success) {
                ViewBag.Message = result.Exception.Message;
            }
            return View(result.Data);
        }

        public ActionResult WaitingOrders() {
            return View();
        }

        public ActionResult ResponsePendingOrders() {
            return View();
        }

        public ActionResult Campaigns() {
            return View();
        }

        public ActionResult CampaignDetail(int id) {
            var result = _orderService.GetCampaign(id);
            if (result.ServiceResultType!=ServiceResultType.Success) {
                ViewBag.Message = result.Exception.Message;
            }
            return View(result.Data);
        }

        public ActionResult UpdateCampaign(int id) {
            var result = _orderService.GetCampaign(id);
            if (result.ServiceResultType != ServiceResultType.Success) {
                ViewBag.Message = result.Exception.Message;
            }
            return View(result.Data);
        }

        [HttpPost]
        public ActionResult UpdateCampaign(CampaignItemDto campaignItem) {
            var result = _orderService.UpdateCampaign(campaignItem);
            if (result.ServiceResultType!=ServiceResultType.Success) {
                ViewBag.Message = result.Exception.Message;
            }
            return View(result.Data);
        }

    }
}