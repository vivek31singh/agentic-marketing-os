import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import ConflictPanel from '../ConflictPanel'

// Mock data for testing
const mockConflict = {
  id: 'conflict-1',
  reason: 'Technical disagreement on approach',
  options: [
    {
      agent: {
        id: 'agent-1',
        name: 'Tech_Lead',
        role: 'Technical Lead',
        avatar: '/avatars/tech-lead.png',
        metrics: { accuracy: 95, latency: 120 },
      },
      description: 'Use server-side rendering for optimal performance',
      label: 'SSR Approach',
      outcome: 'Improved initial load time but increased server load',
    },
    {
      agent: {
        id: 'agent-2',
        name: 'Frontend_Dev',
        role: 'Frontend Developer',
        avatar: '/avatars/frontend-dev.png',
        metrics: { accuracy: 88, latency: 90 },
      },
      description: 'Use static site generation for better caching',
      label: 'SSG Approach',
      outcome: 'Excellent caching but requires rebuild on content changes',
    },
  ],
}

describe('ConflictPanel', () => {
  it('renders the conflict reason and all options', () => {
    render(<ConflictPanel conflict={mockConflict} />)

    // Check if conflict reason is displayed
    expect(screen.getByText(mockConflict.reason)).toBeInTheDocument()

    // Check if both options are displayed
    expect(screen.getByText('SSR Approach')).toBeInTheDocument()
    expect(screen.getByText('SSG Approach')).toBeInTheDocument()

    // Check if agent names are displayed
    expect(screen.getByText('Tech_Lead')).toBeInTheDocument()
    expect(screen.getByText('Frontend_Dev')).toBeInTheDocument()

    // Check if descriptions are displayed
    expect(screen.getByText('Use server-side rendering for optimal performance')).toBeInTheDocument()
    expect(screen.getByText('Use static site generation for better caching')).toBeInTheDocument()
  })

  it('allows users to select a conflict option', () => {
    render(<ConflictPanel conflict={mockConflict} />)

    const firstOption = screen.getByText('SSR Approach')
    const secondOption = screen.getByText('SSG Approach')

    // Click on the first option
    fireEvent.click(firstOption)

    // The selected option should have a selected state (visual feedback)
    // This typically appears as a border or background color change
    expect(firstOption.closest('[role="radio"]')).toHaveClass('border-primary')
    expect(secondOption.closest('[role="radio"]')).not.toHaveClass('border-primary')

    // Click on the second option
    fireEvent.click(secondOption)

    // Now the second option should be selected
    expect(secondOption.closest('[role="radio"]')).toHaveClass('border-primary')
    expect(firstOption.closest('[role="radio"]')).not.toHaveClass('border-primary')
  })

  it('does not allow approval when no option is selected', () => {
    render(<ConflictPanel conflict={mockConflict} />)

    const approveButton = screen.getByRole('button', { name: /approve/i })

    // The approve button should be disabled when no option is selected
    expect(approveButton).toBeDisabled()
  })

  it('enables the approve button when an option is selected', () => {
    render(<ConflictPanel conflict={mockConflict} />)

    const approveButton = screen.getByRole('button', { name: /approve/i })
    const firstOption = screen.getByText('SSR Approach')

    // Approve button should be disabled initially
    expect(approveButton).toBeDisabled()

    // Select an option
    fireEvent.click(firstOption)

    // Approve button should now be enabled
    expect(approveButton).not.toBeDisabled()
  })

  it('updates state to resolved when approve is clicked', async () => {
    render(<ConflictPanel conflict={mockConflict} />)

    const firstOption = screen.getByText('SSR Approach')
    const approveButton = screen.getByRole('button', { name: /approve/i })

    // Select the first option
    fireEvent.click(firstOption)

    // Click approve
    fireEvent.click(approveButton)

    // Wait for state update and visual feedback
    await waitFor(() => {
      // Should show resolved state
      expect(screen.getByText(/resolved/i)).toBeInTheDocument()
      expect(screen.getByText('SSR Approach')).toBeInTheDocument()
    })

    // The approve button should no longer be visible or be disabled
    await waitFor(() => {
      const resolvedPanel = screen.getByText(/conflict resolved/i)
      expect(resolvedPanel).toBeInTheDocument()
    })
  })

  it('displays the selected outcome after approval', async () => {
    render(<ConflictPanel conflict={mockConflict} />)

    const firstOption = screen.getByText('SSR Approach')
    const approveButton = screen.getByRole('button', { name: /approve/i })

    // Select the first option
    fireEvent.click(firstOption)

    // Click approve
    fireEvent.click(approveButton)

    // Wait for resolution state
    await waitFor(() => {
      // The outcome should be displayed
      expect(screen.getByText('Improved initial load time but increased server load')).toBeInTheDocument()
    })
  })

  it('shows loading state while processing approval', async () => {
    render(<ConflictPanel conflict={mockConflict} />)

    const firstOption = screen.getByText('SSR Approach')
    const approveButton = screen.getByRole('button', { name: /approve/i })

    // Select an option
    fireEvent.click(firstOption)

    // Click approve
    fireEvent.click(approveButton)

    // Check for loading state immediately after click
    expect(approveButton).toBeDisabled()
    expect(screen.getByText(/processing/i) || screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it('switches between options correctly', () => {
    render(<ConflictPanel conflict={mockConflict} />)

    const firstOption = screen.getByText('SSR Approach')
    const secondOption = screen.getByText('SSG Approach')
    const approveButton = screen.getByRole('button', { name: /approve/i })

    // Select first option
    fireEvent.click(firstOption)
    expect(firstOption.closest('[role="radio"]')).toHaveClass('border-primary')
    expect(approveButton).not.toBeDisabled()

    // Switch to second option
    fireEvent.click(secondOption)
    expect(secondOption.closest('[role="radio"]')).toHaveClass('border-primary')
    expect(firstOption.closest('[role="radio"]')).not.toHaveClass('border-primary')
    expect(approveButton).not.toBeDisabled()
  })

  it('displays agent information for each option', () => {
    render(<ConflictPanel conflict={mockConflict} />)

    // Check for agent roles
    expect(screen.getByText('Technical Lead')).toBeInTheDocument()
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument()

    // Check for agent avatars (alt text or aria-label)
    const avatars = screen.getAllByRole('img')
    expect(avatars).toHaveLength(2)
  })
})
