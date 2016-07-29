using Tangent.CeviriDukkani.Domain.Common;

namespace Web.Business.Services.Interfaces {
    public interface ITranslationService {
        ServiceResult GetAverageDocumentPartCount(int orderId);
    }
}