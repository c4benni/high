import { SVGProps } from "react";
import { ChatFilled } from "../Generic/ChatFilled";
import './logo.css'

export function AppLogo(props: SVGProps<SVGSVGElement>) {
    return (
        <ChatFilled
            {...props}
            className="AppLogo"
        />
    )
}