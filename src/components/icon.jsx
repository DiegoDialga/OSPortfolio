import Image from "next/image";

const Icon = ({className, logo, name, onDoubleClick}) => {

    return(
        <div
            className={`${className} w-[100px] -z-1 h-fit mb-3 text-center
            flex-col justify-center items-center
            cursor-pointer text-white
            hover:scale-110 hover:bg-gray-500
            rounded transition-transform`}
            onDoubleClick={onDoubleClick}>

            <div className="flex justify-center items-center">
            <Image src={logo} width={60} height={60} alt={"logo"} />
            </div>

            <div className="bottom-0">{name}</div>
        </div>
    )
}

export default Icon;