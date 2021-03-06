﻿using System.Collections.Generic;
using Tangent.CeviriDukkani.Domain.Common;
using Tangent.CeviriDukkani.Domain.Dto.Request;
using Tangent.CeviriDukkani.Domain.Dto.Sale;
using Tangent.CeviriDukkani.Domain.Dto.Translation;

namespace Web.Business.Services.Interfaces {
    public interface IOrderService {
        ServiceResult<OrderDto> CreateOrderForTranslation(CreateTranslationOrderRequestDto requestDto);
        ServiceResult<List<OrderDetailDto>> CreateOrderDetails(List<TranslationOperationDto> translationOperations, int orderId);
        ServiceResult<List<TranslatingOrderDto>> GetOrders();
        ServiceResult<TranslatingOrderDto> GetOrderById(int orderId);
        ServiceResult<OrderDto> UpdateOrder(OrderDto order);
        ServiceResult DeactivateOrder(int orderId);
        ServiceResult<List<OrderDto>> GetWaitingOrders();
        ServiceResult<List<OrderDto>> GetResponsePendingOrders();
        ServiceResult<List<CampaignItemDto>> GetCampaigns();
        ServiceResult<CampaignItemDto> GetCampaign(int campaingItemId);
        ServiceResult<CampaignItemDto> UpdateCampaign(CampaignItemDto campaignItem);
        ServiceResult DeleteCampaign(int campaingItemId);
        ServiceResult<List<OrderDetailDto>> GetOrderDetailsByOrderId(int orderId);
        ServiceResult AcceptOffer(AcceptOfferRequestDto request);
    }
}