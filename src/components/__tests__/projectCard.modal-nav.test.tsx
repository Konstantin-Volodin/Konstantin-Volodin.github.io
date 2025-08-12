import React from 'react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '../../test-utils'
import Projects from '../projects'

// Make animations and visibility deterministic
vi.mock('react-visibility-sensor', () => {
  const React = require('react') as typeof import('react')
  const Sensor = ({ children, onChange }: any) => {
    React.useEffect(() => { onChange?.(true) }, [onChange])
    return <>{children}</>
  }
  return { default: Sensor }
})

// Mock data
vi.mock('../projectsData', () => ({
  default: [
    { company: 'A', name: 'One', description: 'd1', longDescription: 'l1', picture: '', technologies: ['Python'], skills: [] },
    { company: 'B', name: 'Two', description: 'd2', longDescription: 'l2', picture: '', technologies: ['React'], skills: [] },
    { company: 'C', name: 'Three', description: 'd3', longDescription: 'l3', picture: '', technologies: ['R'], skills: [] },
  ]
}))

const baseUrl = 'http://localhost/'

describe('ProjectCard modal deep-link + navigation', () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.history.replaceState(null, '', baseUrl)
  })

  it('opens modal when clicking a card and sets ?project=slug', async () => {
    render(<Projects />)

    // The card is a LinkBox as=article with aria-labelledby to its heading
    fireEvent.click(await screen.findByRole('article', { name: /one/i }))
    expect(window.location.search).toContain('project=one')

    // Close via close button
    const close = screen.getByRole('button', { name: /close/i })
    fireEvent.click(close)
    expect(window.location.search).not.toContain('project=')
  })

  it('opens modal from deep-link and responds to arrow keys', async () => {
    window.history.replaceState(null, '', baseUrl + '?project=two')
    render(<Projects />)

    // Modal should open with title "Two"
    expect(await screen.findByRole('heading', { name: 'Two', level: 2 })).toBeInTheDocument()

    // Arrow right should go to Three
    fireEvent.keyDown(window, { key: 'ArrowRight' })
    expect(await screen.findByRole('heading', { name: 'Three', level: 2 })).toBeInTheDocument()
    expect(window.location.search).toContain('project=three')

    // Arrow left should wrap to Two
    fireEvent.keyDown(window, { key: 'ArrowLeft' })
    expect(await screen.findByRole('heading', { name: 'Two', level: 2 })).toBeInTheDocument()
  })
})
