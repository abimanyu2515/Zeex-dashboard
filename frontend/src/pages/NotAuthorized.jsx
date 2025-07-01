const NotAuthorized = () => {
  return (
    <div className="mt-20 text-center items-center">
        <strong className="text-red-700 mr-1 text-2xl">
            404!  
        </strong>

        <strong className="text-blue-700 text-2xl">
            PAGE NOT FOUND
        </strong> <br />
        <br />

        <span className="text-lg">We're sorry. The Web address you entered is not a functioning page on our site.</span><br />
        <br />

        <span className="text-lg">Go to our <a href="/" className="text-orange-600 font-bold underline">Home</a> page</span>
    </div>
  )
}

export default NotAuthorized