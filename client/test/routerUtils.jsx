import { render } from '@testing-library/react'
import { createMemoryRouter, createRoutesFromElements, RouterProvider, Route, useLoaderData } from "react-router"

// would have been nice, but doesn't work due to how vi.mock hoists variables
export const mockLoaderData = async (MockData) => {}


export const renderComponentWithRoute = (Component) => {
  const router = createMemoryRouter(
    createRoutesFromElements(
      <Route path="/" Component={Component} />
    )
  )

  render(<RouterProvider router={router}>
    <Component />
  </RouterProvider>
  )
}