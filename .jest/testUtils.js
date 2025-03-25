expectAttributes = (object, keys) => {
  expect(object).toBeTruthy()
  const attrs = Object.keys(object)
  expect(attrs).toEqual(expect.arrayContaining(keys))
}