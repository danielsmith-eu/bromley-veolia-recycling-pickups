# bromley-veolia-recycling-pickups 

## What?

Downloads the property pickup date information from the Bromley/Veolia service site and parses it into JSON for use downstream (e.g. for a Home Assistant panel, a WhatsApp/Telegram bot, IFTTT etc.)


## Why?

The printed calendars provided by the council work well when there is no distruption, but there has been recently, and the Veolia site is accurate - this software converts it into a machine-readable format for further processing.

Basically, it tells you which bins to put out, and uses the most accurate source information.


## Requirements

`node` (to run node.js app)

`wget` (to download the property info page)

`find` (to check how old the local cache is)

`bash` (to orchestrate the above)

`npm` (to get node.js dependencies from `package.json`)


## Configuration

copy `config.json.example` to `config.json`

set propertyid to the ID from the URL on the bromley/veolia site after you have searched for your address.

Search for your address here: `https://recyclingservices.bromley.gov.uk/` and it will forward you to a page.

e.g. if you lived in Chislehurst Caves, the URL is:

`https://recyclingservices.bromley.gov.uk/property/100020421898`

and the propertyid is: `100020421898`


## Running

The script `main.sh` will download the file into `source.html` and pass this filename into `main.js`.

If the file already exists and is less than a day old it will not re-download it.


## Example Output

```
[
  { name: 'Paper and cardboard', next: '15/05/2020' },
  { name: 'Non-recyclable refuse', next: '15/05/2020' },
  { name: 'Green Garden Waste (Subscription)', next: '14/05/2020' },
  { name: 'Food waste', next: '15/05/2020' },
  { name: 'Plastic, glass and tins', next: '22/05/2020' }
]
```

