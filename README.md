## Kaupunkipyörien asemat kartalla + reittiopas + sää.
Toteutin projektin Metropoliassa ohjelmistotuotanto pääaineen opinnoissa. Projektin tarkoitus oli testata avoimia rajapintoja ja avointa dataa web-sovelluksissa.
Projektissa käytettiin HSL:n avointa rajapintaa, josta saatiin kaikki data kaupunkipyöristä ja reiteistä. Säätila haettiin Openweathermap rajapinnasta.

### Rajapinnat:
https://www.hsl.fi/avoindata
https://digitransit.fi/en/developers/apis/1-routing-api/
https://openweathermap.org/api

Web-sovellus toteutettiin Reactilla ja pohjana käytettiin create-react-app pakettia.<br />
HSL:n data haettiin GraphQL rajapinnasta ja kutsuihin käytettiin Apollo Clientia. 

[https://imgur.com/qdk5SnO]


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.