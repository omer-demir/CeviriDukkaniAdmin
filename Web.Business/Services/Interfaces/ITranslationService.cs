using System.Collections.Generic;
using Tangent.CeviriDukkani.Domain.Common;
using Tangent.CeviriDukkani.Domain.Dto.Request;
using Tangent.CeviriDukkani.Domain.Dto.Translation;

namespace Web.Business.Services.Interfaces {
    public interface ITranslationService {
        ServiceResult GetAverageDocumentPartCount(int orderId);
        ServiceResult<List<TranslationOperationDto>> SaveTranslationOperations(List<TranslationOperationDto> translationOperations);
        ServiceResult UpdateTranslatedDocumentPart(UpdateDocumentPartContentRequestDto request);
        ServiceResult UpdateEditedDocumentPart(UpdateDocumentPartContentRequestDto request);
        ServiceResult UpdateProofReadDocumentPart(UpdateDocumentPartContentRequestDto request);
        ServiceResult FinishTranslation(FinishDocumentPartRequestDto request);
        ServiceResult FinishEditing(FinishDocumentPartRequestDto request);
        ServiceResult FinishProofReading(FinishDocumentPartRequestDto request);
        ServiceResult GetTranslatedContent(int translationDocumentPartId, int userId);
        ServiceResult GetEditedContent(int translationDocumentPartId, int userId);
        ServiceResult GetProofReadContent(int translationDocumentPartId, int userId);
    }
}