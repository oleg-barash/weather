using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Weather.Business.Models;
using Weather.Models;

namespace Weather.Business
{
    public class ForecastProvider : IForecastProvider 
    {
        private readonly HttpClient _httpClient;
        private readonly string _remoteServiceBaseUrl;
        private OpenWeatherConfiguration _config = new OpenWeatherConfiguration();
        public ForecastProvider(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            config.GetSection("OpenWeather").Bind(_config);
        }
        
        public async Task<WeatherData> GetCurrentByGeoPointAsync(GeoPoint coordinates)
        {
            UriBuilder builder = new UriBuilder(_config.BaseUrl);
            builder.Path = "data/2.5/weather";
            builder.Query = $"lat={coordinates.Lat}&lon={coordinates.Lon}&appid={_config.Key}";
            string url = builder.ToString();
            var responseString = await _httpClient.GetStringAsync(url);
            WeatherData response = Newtonsoft.Json.JsonConvert.DeserializeObject<WeatherData>(responseString);
            return response;
        }
    }
}