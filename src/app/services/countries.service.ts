import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, shareReplay } from 'rxjs';
import { Country, CountryApiResponse } from '../models/country';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private countriesCache$: Observable<Country[]> | null = null;

  constructor(private http: HttpClient) {}

  fetchCountries(): Observable<Country[]> {
    // Yritetään hakea data localStorage:sta
    const cachedData = localStorage.getItem('countries');
    if (cachedData) {
      console.log('Returning cached data from localStorage');
      return of(JSON.parse(cachedData)); // Palautetaan tallennettu data
    }

    // Jos dataa ei löydy localStorage:sta, tehdään HTTP-pyyntö
    console.log('Fetching new data');
    return this.http
      .get<
        CountryApiResponse[]
      >('https://restcountries.com/v3.1/independent?status=true')
      .pipe(
        map((res) => {
          const countries = res.map((country) => ({
            id: country.cca3,
            name: country.name.common,
            flag: country.flags.svg,
            fin: country.translations.fin.common,
            region: country.region,
          }));
          localStorage.setItem('countries', JSON.stringify(countries));

          return countries;
        }),
        catchError((err) => {
          console.error(err.message);
          // Virhetilanteessa palautetaan tyhjä taulukko
          return of([]);
        }),
        shareReplay(1) // Säilytetään vain viimeisin haettu data
      );
  }
}

// Signaleilla tehty versio:
// private allCountries = signal<Country[]>([]);
// randomCountries = signal<Country[]>([]);
// selectedCountry = signal<Country | null>(null);
//
// constructor(private http: HttpClient) {}
//
// private httpGet(url: string): Observable<any> {
//   return this.http.get(url);
// }
//
// fetchCountries(): Observable<Country[]> {
//   return this.http
//     .get<CountryApiResponse[]>('https://restcountries.com/v3.1/all')
//     .pipe(
//       map((response) =>
//         response.map((country) => ({
//           id: country.cca3,
//           name: country.name.common,
//           flag: country.flags.svg,
//           fin: country.translations.fin.common,
//         }))
//       ),
//       tap((countries: Country[]) => this.allCountries.set(countries)),
//       tap(() => this.chooseFourRandomCountries())
//     );
// }
//
// chooseFourRandomCountries(): Observable<Country[]> {
//   if (!this.countries$) {
//     this.countries$ = this.fetchCountries();
//   }
//   return this.countries$?.pipe(
//     map(countries => {
//       const randomCountries: Country[] = [];
//       while (randomCountries.length < 4) {
//         const randomIndex = Math.floor(Math.random() * countries.length);
//         const randomCountry = countries[randomIndex];
//         if (!randomCountries.includes(randomCountry)) {
//           randomCountries.push(randomCountry);
//         }
//       }
//       return randomCountries;
//     })
//   );
// }
//
//
// chooseRandomCountryFromFour(fourCountries: Country[]): Country {
//   const randomIndex = Math.floor(Math.random() * fourCountries.length);
//   return fourCountries[randomIndex];
// }
