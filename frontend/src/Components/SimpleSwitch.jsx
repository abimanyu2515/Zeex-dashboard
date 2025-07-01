const SimpleSwitch = ({enabled, setEnabled}) => {
    return (
            <button 
            onClick={() => setEnabled(!enabled)}
            className={`w-37 h-5 rounded-full transition-colors duration-300 ease-in-out cursor-pointer ${enabled ? 'bg-blue-700' : 'bg-gray-500'} relative`}
            >
            <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-all bg-white duration-300 ease-in-out ${enabled ? "translate-x-5" : "translate-x-0"}`}></span>
            </button>
    )
}

export default SimpleSwitch