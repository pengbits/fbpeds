import { render, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, createRoutesFromElements, RouterProvider, Route, useLoaderData } from "react-router"
import { Theme } from "@radix-ui/themes";


export const renderComponentWithRoute = async(Component, opts={}) => {
  const router = createMemoryRouter(
    createRoutesFromElements(
      <Route path="/" Component={Component} />
    )
  )

  const rendered = await act (async() => {
    return render(<RouterProvider router={router}>
      <Theme>
        <Component />
      </Theme>
    </RouterProvider>
    )
  })

  return opts.withUser ? {
    user: userEvent.setup(),
    ...rendered
  } : rendered
}