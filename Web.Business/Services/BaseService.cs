using System;
using System.Collections.Generic;
using System.Configuration;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Text.RegularExpressions;
using System.Web.Script.Serialization;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
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
                BaseAddress = new Uri(serviceEndpoint),
            };
            httpClient.DefaultRequestHeaders.Accept.Clear();
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            return httpClient;
        }

        protected ServiceResult PostAsAsync(HttpClient httpClient, string action, object data, int userId = 0) {
            try {
                EnchaneRequestWithUserInfo(httpClient, userId);
                var response = httpClient.PostAsJsonAsync(action, data).Result;
                return GetContentAsServiceResult(response);
            } catch (Exception exc) {
                return new ServiceResult { Exception = exc, ExceptionCode = "General", ServiceResultType = ServiceResultType.Fail };
            }
        }

        protected ServiceResult GetAsAsync(HttpClient httpClient, string action, int userId = 0) {
            try {
                EnchaneRequestWithUserInfo(httpClient, userId);
                var response = httpClient.GetAsync(action).Result;
                return GetContentAsServiceResult(response);
            } catch (Exception exc) {
                return new ServiceResult { Exception = exc, ExceptionCode = "General", ServiceResultType = ServiceResultType.Fail };
            }
        }

        protected ServiceResult<T> GetAsAsync<T>(HttpClient httpClient, string action, int userId = 0) where T : class {
            try {
                EnchaneRequestWithUserInfo(httpClient, userId);
                var response = httpClient.GetAsync(action).Result;
                return GetContentAsServiceResult<T>(response);
            } catch (Exception exc) {
                return new ServiceResult<T> { Exception = exc, ExceptionCode = "General", ServiceResultType = ServiceResultType.Fail };
            }
        }

        protected ServiceResult<T> PostAsAsync<T>(HttpClient httpClient, string action, object data, int userId = 0) where T : class {
            try {
                EnchaneRequestWithUserInfo(httpClient, userId);
                var response = httpClient.PostAsJsonAsync(action, data).Result;
                return GetContentAsServiceResult<T>(response);
            } catch (Exception exc) {
                return new ServiceResult<T> { Exception = exc, ExceptionCode = "General", ServiceResultType = ServiceResultType.Fail };
            }
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
            var result = Regex.Unescape(response.Content.ReadAsStringAsync().Result.Replace(@"\", ""));
            var deserializedObject = new JavaScriptSerializer().Deserialize<ServiceResult>(result);
            return deserializedObject;
        }

        private ServiceResult<T> GetContentAsServiceResult<T>(HttpResponseMessage response) where T : class {
            var serializerSettings = new JsonSerializerSettings {
                ContractResolver = new CamelCasePropertyNamesContractResolver(),
                MetadataPropertyHandling = MetadataPropertyHandling.ReadAhead
            };
            return JsonConvert.DeserializeObject<ServiceResult<T>>(response.Content.ReadAsStringAsync().Result, serializerSettings);
        }

        private void EnchaneRequestWithUserInfo(HttpClient httpClient, int userId) {
            httpClient.DefaultRequestHeaders.Add("x-cev-userid", userId.ToString());
        }
    }
}