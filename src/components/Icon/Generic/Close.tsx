import { SVGProps } from "react";

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg width="1em" height="1em" viewBox="0 0 48 48" {...props}><g fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M8 8l32 32"></path><path d="M8 40L40 8"></path></g></svg>
    )
}