import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
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
      description: 'Use React Server Components for better performance',
      label: 'Server Components',
      outcome: 'Improved initial load time, but increased complexity',
    },
    {
      agent: {
        id: 'agent-2',
        name: 'Crawl_Spider',
        role: 'SEO Specialist',
        avatar: '/avatars/crawl-spider.png',
        metrics: { accuracy: 88, latency: 200 },
      },
      description: 'Use static generation for maximum SEO benefit',
      label: 'Static Generation',
      outcome: 'Better SEO scores, but slower build times',
    },
  ],
}

describe('ConflictPanel', () => {
  it('renders the conflict title and reason', () => {
    render(<ConflictPanel conflict={mockConflict} onResolve={jest.fn()} />)
    
    expect(screen.getByText(/Conflict Detected/i)).toBeInTheDocument()
    expect(screen.getByText(mockConflict.reason)).toBeInTheDocument()
  })

  it('renders all conflict options', () => {
    render(<ConflictPanel conflict={mockConflict} onResolve={jest.fn()} />)
    
    mockConflict.options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument()
      expect(screen.getByText(option.description)).toBeInTheDocument()
      expect(screen.getByText(option.agent.name)).toBeInTheDocument()
    })
  })

  it('highlights an option when selected', () => {
    render(<ConflictPanel conflict={mockConflict} onResolve={jest.fn()} />)
    
    const firstOption = screen.getByText(mockConflict.options[0].label).closest('button')
    fireEvent.click(firstOption!)
    
    // Verify the option has a selected state (checked via class or aria-pressed)
    expect(firstOption).toHaveClass('ring-2')
  })

  it('enables the Approve button when an option is selected', () => {
    render(<ConflictPanel conflict={mockConflict} onResolve={jest.fn()} />)
    
    const approveButton = screen.getByRole('button', { name: /approve/i })
    expect(approveButton).toBeDisabled()
    
    const firstOption = screen.getByText(mockConflict.options[0].label).closest('button')
    fireEvent.click(firstOption!)
    
    expect(approveButton).not.toBeDisabled()
  })

  it('calls onResolve with the selected option when Approve is clicked', async () => {
    const handleResolve = jest.fn()
    render(<ConflictPanel conflict={mockConflict} onResolve={handleResolve} />)
    
    // Select the second option
    const secondOption = screen.getByText(mockConflict.options[1].label).closest('button')
    fireEvent.click(secondOption!)
    
    // Click Approve
    const approveButton = screen.getByRole('button', { name: /approve/i })
    fireEvent.click(approveButton)
    
    await waitFor(() => {
      expect(handleResolve).toHaveBeenCalledTimes(1)
      expect(handleResolve).toHaveBeenCalledWith(
        mockConflict.id,
        mockConflict.options[1]
      )
    })
  })

  it('disables interactions after approval', async () => {
    const handleResolve = jest.fn()
    render(<ConflictPanel conflict={mockConflict} onResolve={handleResolve} />)
    
    // Select and approve
    const firstOption = screen.getByText(mockConflict.options[0].label).closest('button')
    fireEvent.click(firstOption!)
    
    const approveButton = screen.getByRole('button', { name: /approve/i })
    fireEvent.click(approveButton)
    
    await waitFor(() => {
      // After approval, buttons should be disabled
      expect(approveButton).toBeDisabled()
      expect(firstOption).toBeDisabled()
    })
  })

  it('displays resolved state after approval', async () => {
    render(<ConflictPanel conflict={mockConflict} onResolve={jest.fn()} />)
    
    const firstOption = screen.getByText(mockConflict.options[0].label).closest('button')
    fireEvent.click(firstOption!)
    
    const approveButton = screen.getByRole('button', { name: /approve/i })
    fireEvent.click(approveButton)
    
    await waitFor(() => {
      expect(screen.getByText(/resolved/i)).toBeInTheDocument()
      expect(screen.getByText(mockConflict.options[0].label)).toBeInTheDocument()
    })
  })

  it('allows switching selection before approval', () => {
    render(<ConflictPanel conflict={mockConflict} onResolve={jest.fn()} />)
    
    const firstOption = screen.getByText(mockConflict.options[0].label).closest('button')
    const secondOption = screen.getByText(mockConflict.options[1].label).closest('button')
    
    // Select first option
    fireEvent.click(firstOption!)
    expect(firstOption).toHaveClass('ring-2')
    
    // Switch to second option
    fireEvent.click(secondOption!)
    expect(secondOption).toHaveClass('ring-2')
    expect(firstOption).not.toHaveClass('ring-2')
  })
})
