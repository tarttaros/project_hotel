import {describe, it, expect, beforeEach, vi } from 'vitest'
import { fireEvent, cleanup, render, screen } from '@testing-library/react'
import { Router } from './Router.jsx'
import { Route } from './Route.jsx'
import { Link } from './Link.jsx'
import { getCurrentPath } from './utils.js'

vi.mock('./utils.js', () => ({
    getCurrentPath: vi.fn()
}))

describe('Router', () => {
    beforeEach(() => {
        cleanup()
        vi.clearAllMocks()
    })
    it('it should render without problems', () => {
        render(<Router routes={[]} />)
        expect(true).toBeTruthy()
    })

    it('should render 404 if no routes match', () => {
        render(<Router routes={[]} defaultComponent={ () => <h1>404</h1> } />)
        expect(screen.getByText('404')).toBeTruthy()
    })

    it('should render the component of the first route that matches', () => {
        getCurrentPath.mockReturnValue('/about')
        const routes = [
            {
                path: '/about',
                Component: () => <h1>About</h1>
            },
            {
                path: '/',
                Component: () => <h1>Home</h1>
            }
        ]
        render(<Router routes={routes} />)
        expect(screen.getByText('About')).toBeTruthy()
    })

    it('it should navigate using Links', () => {
        getCurrentPath.mockReturnValueOnce('/')

        render(
            <Router>
                <Route
                    path='/' Component={() => {
                        return (
                            <>
                                <h1>Home</h1>
                                <Link to='/about'>Go to About</Link>
                            </>
                        )
                    }}
                />
                <Route path='/about' Component={() => <h1>About</h1>}/>
            </Router>
        )
        const button = screen.getByText('Go to About')
        fireEvent.click(button)

        expect(screen.getByText('About')).toBeTruthy()
    })
})