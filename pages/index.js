import { Inter } from 'next/font/google';
import { useState } from 'react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function Home() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const getWeather = async () => {
    const apiKey = '0a5e49c27f2c44c3bb851118251205';
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

    if (location) {
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        if (data && data.current && data.location) {
          const tempFahrenheit = data.current.temp_f;
          const tempCelsius = ((tempFahrenheit - 32) * 5) / 9; // Convert Fahrenheit to Celsius

          const api_data = {
            country: data.location.country,
            city: data.location.name,
            temp: tempCelsius.toFixed(1), // Display 1 decimal point
            humidity: data.current.humidity,
            wind: data.current.wind_mph,
            gust: data.current.gust_mph,
            visibility: data.current.vis_miles,
            condition: data.current.condition.text,
            img: data.current.condition.icon,
          };
          setWeatherData(api_data);
        }
      } catch (err) {
        console.error('Failed to fetch weather data:', err);
      }
    }
  };

  return (
    <>
      <nav className='flex items-center justify-center py-4 bg-gray-900 w-full m-0 opacity-90'>
        <div className='relative'>
          <div className='absolute left-0 top-1/2 transform -translate-y-1/2 pl-3 pointer-events-none'>
            <svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'>
              <path d='M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M21,16h-5v5 c0,0.553-0.448,1-1,1s-1-0.447-1-1v-5H9c-0.552,0-1-0.447-1-1s0.448-1,1-1h5V9c0-0.553,0.448-1,1-1s1,0.447,1,1v5h5 c0.552,0,1,0.447,1,1S21.552,16,21,16z' />
            </svg>
          </div>
          <input
            className='block bg-slate-800 text-white rounded-lg opacity-70 pl-10 p-2'
            type='text'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder='Location (e.g., Islamabad)'
            aria-label='Location'
          />
        </div>
        <button
          onClick={getWeather}
          className='bg-blue-600 hover:bg-blue-800 text-white font-bold m-2 p-2.5 rounded-lg'
          type='button'
        >
          <svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'>
            <path d='M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z' />
          </svg>
          <span className='sr-only'>Search</span>
        </button>
      </nav>

      {weatherData && (
        <div className='flex w-full p-20 justify-center'>
          <div className='w-full max-w-xs'>
            <div className='bg-black shadow-lg rounded-xl px-8 pt-6 pb-8 text-white opacity-80'>
              <div className='text-center text-2xl p-2'>{weatherData.city}, {weatherData.country}</div>
              <div className='flex justify-center items-center'>
                <img src={weatherData.img} width='80' height='80' alt='condition' />
                <div className='text-6xl ml-4'>{weatherData.temp}°C</div> {/* Now displays °C */}
              </div>
              <div className='text-center text-gray-400 mt-2'>{weatherData.condition}</div>
              <div className='grid grid-cols-2 gap-2 text-gray-400 mt-4'>
                <div>Humidity: {weatherData.humidity}%</div>
                <div>Wind: {weatherData.wind} mph</div>
                <div>Visibility: {weatherData.visibility} mi</div>
                <div>Gust: {weatherData.gust} mph</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
