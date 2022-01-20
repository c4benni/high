import { SVGProps } from "react";

export function SidebarToRight(props: SVGProps<SVGSVGElement>) {
    return (
        <svg width="1em" height="1em" viewBox="0 0 21 21" {...props}><g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 15.5v-10a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2z"></path><path d="M15.5 15.5v-10a2 2 0 0 0-2-2h2c1 0 2 .895 2 2v10c0 1.105-1 2-2 2h-2a2 2 0 0 0 2-2z" fill="currentColor"></path><path d="M10.5 13.5l3-3l-3-3"></path><path d="M13.5 10.5h-8"></path></g></svg>
    )
}