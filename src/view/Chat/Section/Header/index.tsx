import { useState } from 'react';
import { MoonIcon } from '../../../../components/Icon/Generic/Moon';
import { SidebarToLeft } from '../../../../components/Icon/Generic/SidebarToLeft';
import { SidebarToRight } from '../../../../components/Icon/Generic/SidebarToRight';
import { SunIcon } from '../../../../components/Icon/Generic/Sun';
import IconWrapper from '../../../../components/Icon/Logo/IconWrapper';
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

    // to avoid theme icon from fading on initial render
    const [themeToggled, setThemeToggled] = useState(false);

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
                <Button
                    icon
                    disabled={sidebar.disabled}
                    onClick={() => toggleSidebar({
                        ...sidebar,
                        visible: !sidebar.visible
                    })}
                    htmlTitle='Toggle sidebar'
                    className={'text-lg'}
                    iconSlot={
                        sidebar.visible ?
                            <SidebarToRight />
                            : <SidebarToLeft />
                    }
                />

                <Button
                    icon
                    onClick={() => {
                        toggleTheme();
                        setThemeToggled(true)
                    }}
                    htmlTitle='Toggle theme'
                >

                    <IconWrapper
                        key={theme.is}
                        className={
                            className([
                                'text-lg',
                                {
                                    'fade-appear': themeToggled
                                }
                            ])
                        }>
                        {
                            theme.light ?
                                <SunIcon />
                                : <MoonIcon />
                        }
                    </IconWrapper>
                </Button>
            </div>
        </div>

    </header>;
}

export default Header;
