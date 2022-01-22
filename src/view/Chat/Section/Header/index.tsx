import Tooltip from '../../../../components/Display/Overlay/Tooltip';
import { MoonIcon } from '../../../../components/Icon/Generic/Moon';
import { SidebarToLeft } from '../../../../components/Icon/Generic/SidebarToLeft';
import { SidebarToRight } from '../../../../components/Icon/Generic/SidebarToRight';
import { SunIcon } from '../../../../components/Icon/Generic/Sun';
import Button from '../../../../components/Inputs/Button/Button';
import { className } from '../../../../components/utils/main';
import useBreakpoint from '../../../../hooks/breakpoint';
import useTheme from '../../../../hooks/theme';
import { useChatAside } from '../../../../hooks/utils';
import Favorite from './Favorite';
import Heading from './Heading';

function Header() {

    const [breakpoint] = useBreakpoint();
    const [theme, toggleTheme] = useTheme();

    const [sidebar, toggleSidebar] = useChatAside();

    return <header
        className={
            className([
                'grid grid-flow-col justify-between z-10',
                breakpoint.isMobile ? [] : [
                    'h-[48px] fixed top-0 w-[calc(100%-316px)] right-0 bg-inherit border-b chat-divide-color grid-cols-[1fr,240px]'
                ]
            ])
        }
    >
        <Heading />

        <div
            className='pr-6 pl-1 grid items-center justify-between grid-flow-col'
        >
            <Favorite />

            <div className='gap-x-3 grid grid-flow-col'>
                <Tooltip
                    title='Toggle sidebar'
                    activator={({ toggle, ref, events }) => {
                        return <Button
                            ref={ref}
                            icon
                            disabled={sidebar.disabled}
                            {...events}
                            onClick={() => toggleSidebar({
                                ...sidebar,
                                visible: !sidebar.visible
                            })}
                            className={'text-lg'}
                            iconSlot={
                                sidebar.visible ?
                                    <SidebarToRight />
                                    : <SidebarToLeft />
                            }
                        />
                    }}
                />

                <Tooltip
                    title='Toggle theme'
                    activator={({ toggle, ref, events }) => {
                        return <Button
                            ref={ref}
                            {...events}
                            icon
                            className='text-lg'
                            onClick={() => {
                                toggleTheme();
                            }}
                            iconSlot={
                                theme.light ?
                                    <SunIcon />
                                    : <MoonIcon />
                            }
                        />
                    }}
                />
            </div>
        </div>

    </header>;
}

export default Header;
