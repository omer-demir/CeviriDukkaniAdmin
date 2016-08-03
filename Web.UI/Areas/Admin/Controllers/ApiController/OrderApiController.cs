using System.Net.Http;
using System.Web.Http;
using Tangent.CeviriDukkani.Domain.Common;
using Tangent.CeviriDukkani.Domain.Dto.Enums;
using Tangent.CeviriDukkani.Domain.Dto.Request;
using Tangent.CeviriDukkani.Domain.Dto.Sale;
using Web.Business.Services.Interfaces;

namespace Web.UI.Areas.Admin.Controllers.ApiController {
    [RoutePrefix("api/v1/orderapi")]
    public class OrderApiController : BaseApiController {
        private readonly IOrderService _orderService;

        public OrderApiController(IOrderService orderService) {
            _orderService = orderService;
        }

        [HttpPost, Route("createOrderForTranslation")]
        public HttpResponseMessage CreateOrderForTranslation([FromBody] CreateTranslationOrderRequestDto requestDto) {
            var serviceResult = _orderService.CreateOrderForTranslation(requestDto);
            if (serviceResult.ServiceResultType != ServiceResultType.Success) {
                return Error(serviceResult);
            }

            return OK(serviceResult.Data);
        }

        [HttpGet, Route("getOrder")]
        public HttpResponseMessage GetOrders() {
            var serviceResult = _orderService.GetOrders();
            if (serviceResult.ServiceResultType != ServiceResultType.Success) {
                return Error(serviceResult);
            }

            return OK(serviceResult);
        }

        [HttpGet, Route("getOrderById")]
        public HttpResponseMessage GetOrderById([FromUri]int orderId) {
            var serviceResult = _orderService.GetOrderById(orderId);
            if (serviceResult.ServiceResultType != ServiceResultType.Success) {
                return Error(serviceResult);
            }

            return OK(serviceResult);
        }

        [HttpPost, Route("updateTranslationOrder")]
        public HttpResponseMessage UpdateTranslationOrder([FromBody] OrderDto order) {
            var serviceResult = _orderService.UpdateOrder(order);
            if (serviceResult.ServiceResultType != ServiceResultType.Success) {
                return Error(serviceResult);
            }

            return OK(serviceResult);
        }

        [HttpGet, Route("deactivateOrder")]
        public HttpResponseMessage DeactivateOrder([FromUri]int orderId) {
            var serviceResult = _orderService.DeactivateOrder(orderId);
            if (serviceResult.ServiceResultType != ServiceResultType.Success) {
                return Error(serviceResult);
            }

            return OK(serviceResult);
        }

        [HttpGet, Route("getWaitingOrders")]
        public HttpResponseMessage GetWaitingOrders() {
            var serviceResult = _orderService.GetWaitingOrders();
            if (serviceResult.ServiceResultType != ServiceResultType.Success) {
                return Error(serviceResult);
            }

            return OK(serviceResult);
        }

        [HttpGet, Route("getResponsePendingOrders")]
        public HttpResponseMessage GetResponsePendingOrders() {
            var serviceResult = _orderService.GetResponsePendingOrders();
            if (serviceResult.ServiceResultType != ServiceResultType.Success) {
                return Error(serviceResult);
            }

            return OK(serviceResult);
        }
    }
}