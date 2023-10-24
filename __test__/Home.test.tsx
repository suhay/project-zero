import { render, screen } from "@testing-library/react";
import Home from '@/app/page';

describe('Home', () => {
    it('should have Home text', () => {
        render(<Home />)
    
        const myElem = screen.getByText('Home')
    
        expect(myElem).toBeInTheDocument();
    })

    it('should not contain the text info', () => {
        render(<Home />)
    
        const myElem = screen.getByText(/home/i)
    
        expect(myElem).toBeInTheDocument();
    })
})
