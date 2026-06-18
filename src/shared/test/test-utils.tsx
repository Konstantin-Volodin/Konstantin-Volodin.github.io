import React from 'react'
import { render, RenderOptions } from '@testing-library/react'

function customRender(ui: React.ReactElement, options?: RenderOptions) {
  return render(ui, options)
}

export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
export { customRender as render }
