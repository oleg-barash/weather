namespace Weather.Business.Models
{
    public class WeatherData
    {
        public WeatherGeneralInfo[] Weather { get; set; }
        public WeatherCharacteristic Main { get; set; }
        public SystemData Sys { get; set; }
    }
}