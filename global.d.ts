import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeVisible(): R;
      // voit lisätä muita matchereita tarvittaessa
    }
  }
}
