import React from 'react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '../../test-utils'
import Projects from '../Projects'
import { act } from 'react'

// Make animations and visibility deterministic
vi.mock('react-visibility-sensor', () => {
  const React = require('react') as typeof import('react')
  const Sensor = ({ children, onChange }: any) => {
    React.useEffect(() => { onChange?.(true) }, [onChange])
    return <>{children}</>
  }
  return { default: Sensor }
})

// Mock data to keep tests small and predictable
vi.mock('../projectsData', () => ({
  default: [
    {
      company: 'X',
      name: 'Alpha',
      description: 'A',
      longDescription: 'LA',
      picture: '',
      technologies: ['Python', 'React'],
      skills: ['Web Development']
    },
    {
      company: 'Y',
      name: 'Beta',
      description: 'B',
      longDescription: 'LB',
      picture: '',
      technologies: ['R', 'GCP'],
      skills: ['Cloud Providers']
    },
    {
      company: 'Z',
      name: 'Gamma',
      description: 'C',
      longDescription: 'LC',
      picture: '',
      technologies: ['SQL', 'PyTorch'],
      skills: ['Data Science']
    },
  ]
}))

const baseUrl = 'http://localhost/'

describe('Projects URL sync', () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.history.replaceState(null, '', baseUrl)
  })

  it('initializes selection from URL and shows only non-default params', async () => {
    window.history.replaceState(null, '', baseUrl + '?cat=ML&tech=Python')
    render(<Projects />)

    // Category pill
    const mlBtn = await screen.findByRole('button', { name: 'ML' })
    expect(mlBtn).toHaveAttribute('aria-pressed', 'true')

    // Tech pill
    const pyBtn = screen.getByRole('button', { name: 'Python' })
    expect(pyBtn).toHaveAttribute('aria-pressed', 'true')

    // URL should keep both since both are non-default
    expect(window.location.search).toContain('cat=ML')
    expect(window.location.search).toContain('tech=Python')
  })

  it('does not show ?cat when selecting All (default)', () => {
    window.history.replaceState(null, '', baseUrl + '?cat=Web&tech=React')
    render(<Projects />)

    // Set category to All (first row)
    const allButtons = screen.getAllByRole('button', { name: 'All' })
    fireEvent.click(allButtons[0])
    expect(window.location.search).not.toContain('cat=')

    // Now clear technology as well (second row 'All')
    fireEvent.click(allButtons[1])
    expect(window.location.search).not.toContain('tech=')
  })

  it('adds and removes only non-default params as user toggles filters', () => {
    render(<Projects />)

    // Select ML category
    fireEvent.click(screen.getByRole('button', { name: 'ML' }))
    expect(window.location.search).toContain('cat=ML')

    // Select Python technology
    fireEvent.click(screen.getByRole('button', { name: 'Python' }))
    expect(window.location.search).toContain('tech=Python')

    // Clear filters via button
    fireEvent.click(screen.getByRole('button', { name: /clear filters/i }))
    expect(window.location.search).not.toContain('cat=')
    expect(window.location.search).not.toContain('tech=')
  })

  it('reacts to browser navigation (popstate) and updates UI', async () => {
    render(<Projects />)

    // Simulate navigating to Analytics via history
    await act(async () => {
      window.history.pushState(null, '', baseUrl + '?cat=Analytics')
      window.dispatchEvent(new PopStateEvent('popstate'))
    })

    const btn = await screen.findByRole('button', { name: 'Analytics' })
    expect(btn).toHaveAttribute('aria-pressed', 'true')
  })

  it('coerces unknown tech to All and removes ?tech from URL', () => {
    // Databricks is present in data but may not be in TECH_NAMES
    window.history.replaceState(null, '', baseUrl + '?tech=Databricks')
    render(<Projects />)

    // After mount/effects run, tech should be All and URL cleaned
    const allTechBtn = screen.getAllByRole('button', { name: 'All' })[1] // second row (Technology)
    expect(allTechBtn).toHaveAttribute('aria-pressed', 'true')
    expect(window.location.search).not.toContain('tech=')
  })
})
