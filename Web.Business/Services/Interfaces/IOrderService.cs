using Tangent.CeviriDukkani.Domain.Common;
using Tangent.CeviriDukkani.Domain.Dto.Request;

namespace Web.Business.Services.Interfaces {
    public interface IOrderService {
        ServiceResult CreateOrderForTranslation(CreateTranslationOrderRequestDto requestDto);
    }
}