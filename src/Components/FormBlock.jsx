import Types from "prop-types"

const FormBlock = ({ ask, options, event })=> { 
    return(
        <div className="flex flex-col">
        <label htmlFor="age" className="text-2xl py-4 font-bold">{ask}</label>
        <div className="flex flex-col gap-4">
            {
                options.map((option, index) =>
                    <div 
                        key={index} 
                        className="flex gap-4 items-center p-4 rounded-md border-[1px] border-pink-200 cursor-pointer hover:bg-pink-400 transition-colors duration-200"
                        onClick={event}
                    >
                        <div className="w-[20px] h-[20px] bg-red-100 rounded-full"></div>
                        <p>{option}</p>
                    </div>
                )
            }
        </div>
    </div>
    )
}

FormBlock.propTypes = {
    ask: Types.string.isRequired,
    options: Types.array.isRequired,
    event: Types.func.isRequired
}

export default FormBlock