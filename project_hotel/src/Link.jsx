import { BUTTON, EVENTS } from './consts'

export function navigate (href) {
    window.history.pushState({},'', href)
    const navigationEvent = new Event(EVENTS.PUSHSTATE)
    window.dispatchEvent(navigationEvent)
}

export function Link ({target, to, ...props}) {
    const handleClick = (event) => {
        const isMainEvent = event.button === BUTTON.primary
        const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
        const isManageableEvent = target === undefined || target === '_self'

        if(isMainEvent && isManageableEvent && !isModifiedEvent){
            event.preventDefault()
            navigate(to)  // navegacion con spa
            window.scrollTo(0,0) //al ingresar a la pagina se va a la parte superior
        }
    }

    return <a onClick={handleClick} href={to} target={target} {...props}/>
}