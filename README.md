# World Population Counter

Calculates the estimated population of the world at at point in time between 1950 and 2100 based on UN World Population Prospects data.

Currently uses the [2022 edition of UN World Population Prospects data](https://population.un.org/wpp/Download/Files/1_Indicators%20(Standard)/EXCEL_FILES/1_General/WPP2022_GEN_F01_DEMOGRAPHIC_INDICATORS_COMPACT_REV1.xlsx) from <https://population.un.org/wpp/Download/Standard/MostUsed/>.

## Usage

```typescript
import { estimate } from 'world-population';

// Returns the estimated population now.
estimate();

// Returns the estimated population on 1st May 2030.
estimate(new Date(2030,5,1));
```

This package also exports a few other functions that you might find useful. See `src/tests.ts` for more examples.

## Updating the dataset

The UN typically release a new edition of the dataset every two years. The process of updating this package with new data is as follows:

1. Find the relevant data.

Data is comprised of historical estimates for years until now, and future predictions for years in the future. We use the medium variant prediction. In 2022, this data was found in [this file](https://population.un.org/wpp/Download/Files/1_Indicators%20(Standard)/EXCEL_FILES/1_General/WPP2022_GEN_F01_DEMOGRAPHIC_INDICATORS_COMPACT_REV1.xlsx) split between two separate tabs.

2. Update the `data.csv` file.

Extract the relevant figures for the World Population and add them to the `data.csv` retaining the header row (`year,pop`).

3. Update the data.ts file.

Run `npm run csvtojson` which will output a json array that can be copied and pasted into the data.ts file and assigned to estimated variable.

## Credits

This package is sponsored by [Population Matters](https://populationmatters.org/). It is maintained by [Third Sector Design](https://www.thirdsectordesign.org/).
