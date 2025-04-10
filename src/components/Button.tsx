type Variants = "login" | "logout"
interface ButtonProps{
    variant: Variants
    text: string
    startIcon?: any
    onClick?: ()=> void
}

const variantStyles={
    "login":"bg-white text-black",
    "logout": "bg-red-500 text-white "   
}

const defaultStyle="rounded-md px-4 py-2 flex items-center font-light text-center hover:opacity-80"

export const Button = (props: ButtonProps)=>{
     
    return <button onClick={props.onClick} className={`${defaultStyle} ${variantStyles[props.variant]}`}>
            {props.text}
            </button>
}