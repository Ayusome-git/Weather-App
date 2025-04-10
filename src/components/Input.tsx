


export function Input({ref,placeholder,type}:{placeholder:string,ref:any,type:string}){
    return <div>
        <input ref={ref} placeholder={placeholder} type={type} className="px-4 py-2 border-2 border-gray-400 border-solid rounded m-2">
        </input>
    </div>
}