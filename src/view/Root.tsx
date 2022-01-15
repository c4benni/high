import '../App.css';
import useTheme from '../hooks/theme';
import Onboard from './Onboard';
import useBreakpoint from '../hooks/breakpoint';

export function Root() {
    useTheme()
    useBreakpoint()

    return (
        <div className="App">
            <Onboard />
        </div>
    )
}