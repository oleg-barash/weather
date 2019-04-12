using System.Threading.Tasks;
using Weather.Business.Models;

namespace Weather.Business
{
    public interface IForecastProvider
    {
        Task<WeatherData> GetCurrentByGeoPointAsync(GeoPoint coordinates);
    }
}