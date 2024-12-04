import { render } from '@testing-library/react-native';
import FetchData from '../src/components/fetchData/FetchData';
import {Text} from "react-native";

describe('FetchData', () => {
  test('gets the correct page', (done) => {
    const setMovies = (value) => { 
      expect(value.page).toBe(1)
      done();
    }

    render(
    <FetchData
        setData={setMovies}
        queryParams={{
          language: "en_US",
          page: 1,
        }}
        route={"3/discover/movie"}
    >
    </FetchData>);
  });

  test('gets the correct ammount of films', (done) => {
    const setMovies = (value) => {
      expect(value.results.length).toBe(20)
      done();
    }

    render(
    <FetchData
        setData={setMovies}
        queryParams={{
          language: "en_US",
          page: 1,
        }}
        route={"3/discover/movie"}
    >
    </FetchData>);
  });
});
