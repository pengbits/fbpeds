import createFetchMock from 'vitest-fetch-mock';
import { vi } from 'vitest';
import '@testing-library/jest-dom/vitest'
const fetchMocker = createFetchMock(vi);

// sets globalThis.fetch and globalThis.fetchMock to our mocked version
fetchMocker.enableMocks()

global.expectAttributes = (object, keys) => {
  expect(object).toBeTruthy()
  const attrs = Object.keys(object)
  expect(attrs).toEqual(expect.arrayContaining(keys))
}

