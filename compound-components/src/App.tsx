import './App.css'
import Accordion from './Accordion'

function App() {
    return (
        <Accordion>
            <Accordion.Item>
                <Accordion.Header>
                    <div style={{ border: '1px solid white' }}>
                        Is this flexible?
                    </div>
                </Accordion.Header>
                <Accordion.Body>
                    You can put whatever you want in here.
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item>
                <Accordion.Header>
                    <div style={{ border: '1px solid white' }}>
                        Is this flexible?
                    </div>
                </Accordion.Header>
                <Accordion.Body>
                    You can put whatever you want in here.
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item>
                <Accordion.Header>
                    <div style={{ border: '1px solid white' }}>
                        Is this flexible?
                    </div>
                </Accordion.Header>
                <Accordion.Body>
                    You can put whatever you want in here.
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default App
