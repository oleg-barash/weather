using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Weather.Business;
using Weather.Business.Models;

namespace Weather.Controllers
{
    [Route("api/[controller]")]
    public class ForecastController : Controller
    {
        private readonly IForecastProvider _forecastProvider;
        public ForecastController(IForecastProvider forecastProvider)
        {
            _forecastProvider = forecastProvider;
        }
        [HttpGet("[action]")]
        public async Task<WeatherData> GetByGeoPoint(float lat, float lon)
        {
            return await _forecastProvider.GetCurrentByGeoPointAsync(new GeoPoint {Lat = lat, Lon = lon});
        }
    }
}