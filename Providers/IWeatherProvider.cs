using System.Collections.Generic;
using BookingServices.Models;

namespace BookingServices.Providers
{
    public interface IWeatherProvider
    {
        List<WeatherForecast> GetForecasts();
    }
}
