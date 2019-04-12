const changeGeoPointType = 'CHANGE_GEOPOINT';
const requestWeatherForecastsType = 'REQUEST_WEATHER_FORECASTS';
const receiveWeatherForecastsType = 'RECEIVE_WEATHER_FORECASTS';
const initialState = { forecasts: { main: {}, weather:[]}, isLoading: false, lat: 37, lon: 54 };

export const actionCreators = {
  requestWeatherForecasts: (lat, lon) => async (dispatch, getState) => {

    let state = getState().weatherForecasts;
    dispatch({ type: requestWeatherForecastsType, lat, lon });

    const url = `api/forecast/GetByGeoPoint?lat=${state.lat}&lon=${state.lon}`;
    const response = await fetch(url);
    const forecasts = await response.json();

    dispatch({ type: receiveWeatherForecastsType, lat: state.lat, lon: state.lon,  forecasts });
  },
  changeGeoPoint: (lat, lon) => async (dispatch) => {
    dispatch({ type: changeGeoPointType, lat, lon });
  }
};

export const reducer = (state, action) => {
  state = state || initialState;
  if (action.type === requestWeatherForecastsType) {
    return {
      ...state,
      lat: action.lat,
      lon: action.lon,
      isLoading: true
    };
  }

  if (action.type === receiveWeatherForecastsType) {
    return {
      ...state,
      lat: action.lat,
      lon: action.lon,
      forecasts: action.forecasts,
      isLoading: false
    };
  }

  if (action.type === changeGeoPointType) {
    return {
      ...state,
      lat: action.lat,
      lon: action.lon,
    };
  }
  return state;
};
