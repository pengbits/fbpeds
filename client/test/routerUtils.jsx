import { render, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, createRoutesFromElements, RouterProvider, Route, useLoaderData } from "react-router"


export const renderComponentWithRoute = async(Component, opts={}) => {
  const router = createMemoryRouter(
    createRoutesFromElements(
      <Route path="/" Component={Component} />
    )
  )

  const rendered = await act (async() => {
    return render(<RouterProvider router={router}>
      <Component />
    </RouterProvider>
    )
  })

  return opts.withUser ? {
    user: userEvent.setup(),
    ...rendered
  } : rendered
}