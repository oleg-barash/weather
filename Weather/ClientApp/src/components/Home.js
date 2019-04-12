import React from 'react';
import { connect } from 'react-redux';
import {Button, 
    Input, 
    InputGroup, 
    InputGroupAddon,
    Label,
    Table} from "reactstrap";
import { bindActionCreators } from 'redux'
import { actionCreators as actions } from '../store/WeatherForecasts'

const Home = props => {
    let loadWeather = () => {
        console.log("loadWeather called with: " + arguments);
        props.actions.requestWeatherForecasts(props.state.lat, props.state.lon)
    }
    let latChanged = (event)=>{
        props.actions.changeGeoPoint(event.target.value, props.state.lon)
    }

    let lonChanged = (event)=>{
        props.actions.changeGeoPoint(props.state.lat, event.target.value)
    }
    
    let items = props.state.forecasts.weather.map((item, key) =>
        <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.main}</td>
            <td>{item.description}</td>
        </tr>
    );
    return (
      <div>
        <h1>Weather</h1>
          <InputGroup>
              <InputGroupAddon addonType="prepend">lat</InputGroupAddon>
              <Input defaultValue="37" value={props.state.lat} onChange={latChanged} />
              <InputGroupAddon addonType="prepend">lon</InputGroupAddon>
              <Input defaultValue="54" value={props.state.lon} onChange={lonChanged}/>
          </InputGroup>
          <br/>
          <Button color="primary" onClick={loadWeather}>Get weather</Button>
          <br/>
          <Label for="Temperature" sm={2}>Temperature</Label> <Input name="Temperature" value={props.state.forecasts.main.temp}/>
          <Label for="Humidity" sm={2}>Humidity</Label> <Input name="Humidity" value={props.state.forecasts.main.humidity}/>
          <br/>
          <Label>Weather</Label>
          <Table hover>
              <thead>
              <tr>
                  <th>Id</th>
                  <th>Main</th>
                  <th>Description</th>
              </tr>
              </thead>
              <tbody>
              {items}
              </tbody>
          </Table>
      </div>
        
)};

export default connect(
    state => ({
        state: state.weatherForecasts
    }),
    dispatch => ({
        actions: bindActionCreators(actions, dispatch)
    })
)(Home)
