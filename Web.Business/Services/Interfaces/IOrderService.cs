using System.Collections.Generic;
using Tangent.CeviriDukkani.Domain.Common;
using Tangent.CeviriDukkani.Domain.Dto.Request;
using Tangent.CeviriDukkani.Domain.Dto.Sale;
using Tangent.CeviriDukkani.Domain.Dto.Translation;

namespace Web.Business.Services.Interfaces {
    public interface IOrderService {
        ServiceResult<OrderDto> CreateOrderForTranslation(CreateTranslationOrderRequestDto requestDto);
        ServiceResult<List<OrderDetailDto>> CreateOrderDetails(List<TranslationOperationDto> translationOperations, int orderId);
        ServiceResult<List<OrderDto>> GetOrders();
        ServiceResult<OrderDto> GetOrderById(int orderId);
        ServiceResult<OrderDto> UpdateOrder(OrderDto order);
        ServiceResult DeactivateOrder(int orderId);
        ServiceResult<List<OrderDto>> GetWaitingOrders();
        ServiceResult<List<OrderDto>> GetResponsePendingOrders();
    }
}