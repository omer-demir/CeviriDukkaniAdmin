﻿using System.Collections.Generic;
using Tangent.CeviriDukkani.Domain.Common;
using Tangent.CeviriDukkani.Domain.Dto.Common;
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
        ServiceResult GetTranslatedContentForEditor(int translationDocumentPartId, int userId);
        ServiceResult GetEditedContent(int translationDocumentPartId, int userId);
        ServiceResult GetEditedContentForProofReader(int translationDocumentPartId, int userId);
        ServiceResult GetProofReadContent(int translationDocumentPartId, int userId);
        ServiceResult AddCommentToTranslationOperation(CreateCommentRequestDto request);
        ServiceResult AddCommentToEditionOperation(CreateCommentRequestDto request);
        ServiceResult<List<CommentDto>> GetTranslationOperationComments(int translationDocumentPartId);
        ServiceResult MarkTranslatingAsFinished(MarkOperationAsFinishedRequestDto request);
        ServiceResult MarkEditingAsFinished(MarkOperationAsFinishedRequestDto request);
        ServiceResult MarkProofReadingAsFinished(MarkOperationAsFinishedRequestDto request);
        ServiceResult<List<TranslationOperationDto>> GetAssignedJobsAsTranslator(int userId);
        ServiceResult<List<TranslationOperationDto>> GetAssignedJobsAsEditor(int userId);
        ServiceResult<List<TranslationOperationDto>> GetAssignedJobsAsProofReader(int userId);
    }
}