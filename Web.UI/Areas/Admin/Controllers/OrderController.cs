using System.Web.Mvc;
using Tangent.CeviriDukkani.Domain.Common;
using Tangent.CeviriDukkani.Domain.Dto.Enums;
using Tangent.CeviriDukkani.Domain.Dto.Request;
using Tangent.CeviriDukkani.Domain.Dto.Sale;
using Tangent.CeviriDukkani.Domain.Entities.Sale;
using Web.Business.Services.Interfaces;
using Web.UI.Areas.Admin.Helpers;

namespace Web.UI.Areas.Admin.Controllers {
    public class OrderController : BaseController
    {
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

        [SessionControl(new [] { UserRoleTypeEnum.Admin, UserRoleTypeEnum.Translator,UserRoleTypeEnum.FreelanceTranslator })]
        public ActionResult OrderDetailsList(int orderId) {
            ViewBag.UserId = SessionUser.User.Id;
            ViewBag.OrderId = orderId;
            return View();
        }

        [SessionControl(new[] { UserRoleTypeEnum.Admin, UserRoleTypeEnum.Editor })]
        public ActionResult OrderDetailsListAsEditor(int orderId) {
            ViewBag.UserId = SessionUser.User.Id;
            ViewBag.OrderId = orderId;
            return View();
        }

        [SessionControl(new[] { UserRoleTypeEnum.Admin, UserRoleTypeEnum.ProofReader })]
        public ActionResult OrderDetailsListAsProofReader(int orderId) {
            ViewBag.UserId = SessionUser.User.Id;
            ViewBag.OrderId = orderId;
            return View();
        }

        public ActionResult AcceptOrderDetail(int orderDetailId) {
            var userId = SessionUser.User.Id;
            var acceptOfferRequest=new AcceptOfferRequestDto {
                BidderId = userId,
                OrderDetailId = orderDetailId,
                Price = null
            };
            if (SessionUser.IsTranslator||SessionUser.IsTranslator) {
                //call accept as translator
                acceptOfferRequest.UserRoleType=UserRoleTypeEnum.Translator;
            }
            if (SessionUser.IsEditor) {
                //call accept as editor
                acceptOfferRequest.UserRoleType = UserRoleTypeEnum.Editor;
            }
            if (SessionUser.IsProofReader) {
                //call accept as proof reader
                acceptOfferRequest.UserRoleType = UserRoleTypeEnum.ProofReader;
            }

            var serviceResult = _orderService.AcceptOffer(acceptOfferRequest);
            if (serviceResult.ServiceResultType!=ServiceResultType.Success) {
                
            }
            return View();
        }

    }
}