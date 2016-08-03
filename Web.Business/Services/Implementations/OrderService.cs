using System;
using System.Collections.Generic;
using Tangent.CeviriDukkani.Domain.Common;
using Tangent.CeviriDukkani.Domain.Dto.Request;
using Tangent.CeviriDukkani.Domain.Dto.Sale;
using Tangent.CeviriDukkani.Domain.Dto.Translation;
using Web.Business.Services.Interfaces;

namespace Web.Business.Services.Implementations {
    public class OrderService : BaseService, IOrderService {
        #region Implementation of IOrderService

        public ServiceResult<OrderDto> CreateOrderForTranslation(CreateTranslationOrderRequestDto requestDto) {
            var httpClient = GetClient(ServiceUrl.Oms);
            return PostAsAsync<OrderDto>(httpClient, "api/orderapi/login", requestDto);
        }

        public ServiceResult<List<OrderDetailDto>> CreateOrderDetails(List<TranslationOperationDto> translationOperations, int orderId) {
            throw new NotImplementedException();
        }

        public ServiceResult<List<OrderDto>> GetOrders() {
            var httpClient = GetClient(ServiceUrl.Oms);
            return GetAsAsync<List<OrderDto>>(httpClient, "api/orderapi/getOrders");
        }

        public ServiceResult<OrderDto> GetOrderById(int orderId) {
            var httpClient = GetClient(ServiceUrl.Oms);
            return GetAsAsync<OrderDto>(httpClient, $"api/orderapi/getOrderById?{orderId}");
        }

        public ServiceResult<OrderDto> UpdateOrder(OrderDto order) {
            var httpClient = GetClient(ServiceUrl.Oms);
            return PostAsAsync<OrderDto>(httpClient, "api/orderapi/updateOrder", order);
        }

        public ServiceResult DeactivateOrder(int orderId) {
            var httpClient = GetClient(ServiceUrl.Oms);
            return GetAsAsync(httpClient, $"api/orderapi/deactivateOrder?{orderId}");
        }

        public ServiceResult<List<OrderDto>> GetWaitingOrders() {
            var httpClient = GetClient(ServiceUrl.Oms);
            return GetAsAsync<List<OrderDto>>(httpClient, "api/orderapi/getWaitingOrders");
        }

        public ServiceResult<List<OrderDto>> GetResponsePendingOrders() {
            var httpClient = GetClient(ServiceUrl.Oms);
            return GetAsAsync<List<OrderDto>>(httpClient, "api/orderapi/getResponsePendingOrders");
        }

        #endregion
    }
}