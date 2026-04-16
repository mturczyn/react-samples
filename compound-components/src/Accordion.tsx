import {
    useState,
    createContext,
    useContext,
    type PropsWithChildren,
} from 'react'

/*
Below implementation tackles problem described in the article:
https://neciudan.dev/10-react-tips-that-actually-matter?utm_source=bonobopress&utm_medium=newsletter&utm_campaign=2255

Here's the problem:

<Accordion items={items} renderHeader={...} renderBody={...} onToggle={...} />
I’ve built this component. You probably have too.

It takes a data array and a pile of render props, and it works right up until someone 
needs to put a custom icon in the third accordion header, but not the others.
*/

const AccordionItemContext = createContext<{
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}>({
    isOpen: false,
    setIsOpen: () => {},
})

function Accordion({ children }: PropsWithChildren) {
    return <div className="accordion">{children}</div>
}

function Item({ children }: PropsWithChildren) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <AccordionItemContext.Provider value={{ isOpen, setIsOpen }}>
            <div className="accordion-item">{children}</div>
        </AccordionItemContext.Provider>
    )
}

function Header({ children }: PropsWithChildren) {
    const { setIsOpen } = useContext(AccordionItemContext)
    return <div onClick={() => setIsOpen((open) => !open)}>{children}</div>
}

function Body({ children }: PropsWithChildren) {
    const { isOpen } = useContext(AccordionItemContext)
    return isOpen ? <div>{children}</div> : null
}

Accordion.Item = Item
Accordion.Header = Header
Accordion.Body = Body

export default Accordion
