﻿using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Tangent.CeviriDukkani.Domain.Common;
using Tangent.CeviriDukkani.Domain.Dto.Audit;
using Tangent.CeviriDukkani.Domain.Dto.Document;
using Tangent.CeviriDukkani.Domain.Dto.Response;
using Web.Business.Services.Interfaces;

namespace Web.Business.Services.Implementations
{
    public class DocumentService : BaseService, IDocumentService
    {
        #region Implementation of IDocumentService

        public ServiceResult<TranslationDocumentDto> AddTranslationDocument(TranslationDocumentDto documentDto)
        {
            var client = GetClient(ServiceUrl.Dms);
            return PostAsAsync<TranslationDocumentDto>(client, "api/documentapi/addTranslationDocument", documentDto);
        }

        public ServiceResult<TranslationDocumentDto> EditTranslationDocument(TranslationDocumentDto documentDto)
        {
            var client = GetClient(ServiceUrl.Dms);
            return PostAsAsync<TranslationDocumentDto>(client, "api/documentapi/editTranslationDocument", documentDto);
        }

        public ServiceResult<List<TranslationDocumentDto>> GetTranslationDocuments()
        {
            var client = GetClient(ServiceUrl.Dms);
            return GetAsAsync<List<TranslationDocumentDto>>(client, "api/documentapi/getTranslationDocuments");
        }

        public ServiceResult<TranslationDocumentDto> GetTranslationDocument(int id)
        {
            var client = GetClient(ServiceUrl.Dms);
            return GetAsAsync<TranslationDocumentDto>(client, $"api/documentapi/getTranslationDocument/{id}");
        }

        public ServiceResult<GeneralDocumentDto> AddGeneralDocument(GeneralDocumentDto documentDto)
        {
            var client = GetClient(ServiceUrl.Dms);
            return PostAsAsync<GeneralDocumentDto>(client, "api/documentapi/addGeneralDocument", documentDto);
        }

        public ServiceResult<GeneralDocumentDto> EditGeneralDocument(GeneralDocumentDto documentDto)
        {
            var client = GetClient(ServiceUrl.Dms);
            return PostAsAsync<GeneralDocumentDto>(client, "api/documentapi/editGeneralDocument", documentDto);
        }

        public ServiceResult<List<GeneralDocumentDto>> GetGeneralDocuments()
        {
            var client = GetClient(ServiceUrl.Dms);
            return GetAsAsync<List<GeneralDocumentDto>>(client, "api/documentapi/getGeneralDocuments");
        }

        public ServiceResult<GeneralDocumentDto> GetGeneralDocument(int id)
        {
            var client = GetClient(ServiceUrl.Dms);
            return GetAsAsync<GeneralDocumentDto>(client, $"api/documentapi/getGeneralDocument/{id}");
        }

        public ServiceResult<UserDocumentDto> AddUserDocument(UserDocumentDto documentDto)
        {
            var client = GetClient(ServiceUrl.Dms);
            return PostAsAsync<UserDocumentDto>(client, "api/documentapi/addUserDocument", documentDto);
        }

        public ServiceResult<UserDocumentDto> EditUserDocument(UserDocumentDto documentDto)
        {
            var client = GetClient(ServiceUrl.Dms);
            return PostAsAsync<UserDocumentDto>(client, "api/documentapi/editUserDocument", documentDto);
        }

        public ServiceResult<List<UserDocumentDto>> GetUserDocuments()
        {
            var client = GetClient(ServiceUrl.Dms);
            return GetAsAsync<List<UserDocumentDto>>(client, "api/documentapi/getUserDocuments");
        }

        public ServiceResult<UserDocumentDto> GetUserDocument(int id)
        {
            var client = GetClient(ServiceUrl.Dms);
            return GetAsAsync<UserDocumentDto>(client, $"api/documentapi/getUserDocument/{id}");
        }

        public ServiceResult<List<TranslationDocumentPartDto>> GetDocumentPartsNormalized(int translationDocumentId, int partCount)
        {
            var client = GetClient(ServiceUrl.Dms);
            return GetAsAsync<List<TranslationDocumentPartDto>>(client, $"api/documentapi/getDocumentPartsNormalized?translationDocumentId={translationDocumentId}&partCount={partCount}");
        }

        public ServiceResult<DocumentUploadResponseDto> AnalyzeDocument(string fileFullPath)
        {
            var client = GetClient(ServiceUrl.Dms);
            return GetAsAsync<DocumentUploadResponseDto>(client, $"api/documentapi/analyzeDocument?fileFullPath={fileFullPath}");
        }

        public ServiceResult<TranslationDocumentPartDto> GetTranslationDocumentPartById(int translationDocumentPartId)
        {
            var httpClient = GetClient(ServiceUrl.Dms);
            return GetAsAsync<TranslationDocumentPartDto>(httpClient, $"api/documentapi/getTranslationDocumentPartById?translationDocumentPartId={translationDocumentPartId}");
        }

        public ServiceResult<List<DocumentAuditDto>> GetDocumentAudits(int documentId)
        {
            var httpClient = GetClient(ServiceUrl.Dms);
            return GetAsAsync<List<DocumentAuditDto>>(httpClient, $"api/documentapi/getDocumentAudits?documentId={documentId}");
        }

        public ServiceResult<DocumentUploadResponseDto> UploadDocument(HttpRequest request)
        {
            //var httpClient = GetClient(ServiceUrl.Dms);
            ////EnchaneRequestWithUserInfo(httpClient, 1);
            //var jsonSerializerSettings = new JsonSerializerSettings
            //{
            //    ContractResolver = new CamelCasePropertyNamesContractResolver(),
            //    PreserveReferencesHandling = PreserveReferencesHandling.Objects
            //};

            //var objectContent=new ObjectContent(request.GetType(),request,new JsonMediaTypeFormatter
            //{
            //    SerializerSettings = jsonSerializerSettings
            //});

            //var response = httpClient.PostAsync("api/documentapi/uploadDocument", objectContent).Result;

            //return JsonConvert.DeserializeObject<ServiceResult<DocumentUploadResponseDto>>(response.Content.ReadAsStringAsync().Result, jsonSerializerSettings);
            throw new NotImplementedException();
        }

        #endregion
    }
}