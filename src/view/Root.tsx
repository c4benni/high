import '../App.css';
import useTheme from '../hooks/theme';
// import Onboard from './Onboard';
import useBreakpoint from '../hooks/breakpoint';
import ChatIndexPage from './Chat/Index';

export function Root() {
    useTheme()
    useBreakpoint()

    return (
        <div className="App">
            {/* <Onboard /> */}
            <ChatIndexPage />
        </div>
    )
}