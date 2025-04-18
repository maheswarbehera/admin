
const BlankPage = ({title, children}) => {

    return (
        <>
            <div className="p-4 sm:ml-64">{title}
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    <div className="flex items-center justify-center h-48 mb-4 rounded-sm bg-gray-50 dark:bg-gray-800">
                        <p className="text-2xl text-gray-400 dark:text-gray-500">
                            {children}
                           
                        </p>

                    </div>
                </div>
            </div>
        </>
    )
}

export default BlankPage