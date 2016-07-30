using System;
using System.Configuration;
using System.Net.Http;
using System.Net.Http.Headers;
using Tangent.CeviriDukkani.Domain.Common;

namespace Web.Business.Services {
    public abstract class BaseService {
        private string GetBaseUrl(ServiceUrl serviceUrl) {
            switch (serviceUrl) {
                case ServiceUrl.System:
                    return ConfigurationManager.AppSettings["SystemEndpoint"];
                case ServiceUrl.Oms:
                    return ConfigurationManager.AppSettings["OMSEndpoint"];
                case ServiceUrl.Dms:
                    return ConfigurationManager.AppSettings["DMSEndpoint"];
                case ServiceUrl.Ts:
                    return ConfigurationManager.AppSettings["TSEndpoint"];
                case ServiceUrl.Mail:
                    return ConfigurationManager.AppSettings["MailEndpoint"];
                case ServiceUrl.Integration:
                    return ConfigurationManager.AppSettings["IntegrationEndpoint"];
                default:
                    return "";
            }
        }

        protected HttpClient GetClient(ServiceUrl serviceUrl) {
            var serviceEndpoint = GetBaseUrl(serviceUrl);
            var httpClient = new HttpClient {
                BaseAddress = new Uri(serviceEndpoint)
            };
            httpClient.DefaultRequestHeaders.Accept.Clear();
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            return httpClient;
        }

        protected ServiceResult PostAsAsync(HttpClient httpClient, string action, object data, int userId = 0) {
            EnchaneRequestWithUserInfo(httpClient, userId);
            var response = httpClient.PostAsJsonAsync(action, data).Result;
            return GetContentAsServiceResult(response);
        }

        protected ServiceResult GetAsAsync(HttpClient httpClient, string action, int userId = 0) {
            EnchaneRequestWithUserInfo(httpClient,userId);
            var response = httpClient.GetAsync(action).Result;
            return GetContentAsServiceResult(response);
        }

        protected ServiceResult<T> GetAsAsync<T>(HttpClient httpClient, string action, int userId = 0) where T:class {
            EnchaneRequestWithUserInfo(httpClient, userId);
            var response = httpClient.GetAsync(action).Result;
            return GetContentAsServiceResult<T>(response);
        }

        protected enum ServiceUrl {
            System = 1,
            Oms,
            Dms,
            Ts,
            Mail,
            Integration
        }

        private ServiceResult GetContentAsServiceResult(HttpResponseMessage response) {
            return response.Content.ReadAsAsync<ServiceResult>().Result;
        }

        private ServiceResult<T> GetContentAsServiceResult<T>(HttpResponseMessage response) where T:class {
            return response.Content.ReadAsAsync<ServiceResult<T>>().Result;
        }

        private void EnchaneRequestWithUserInfo(HttpClient httpClient, int userId) {
            httpClient.DefaultRequestHeaders.Add("x-cev-userid", userId.ToString());
        }
    }
}