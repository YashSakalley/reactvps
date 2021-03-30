import React from 'react'

const Footer = () => {

    return (
        <footer className="footer bg-black text-white relative pt-1 border-b-2 border-blue-700">
            <div className="container mx-auto px-6">
                <div className="sm:flex sm:mt-8">
                    <div className="mt-8 sm:mt-0 sm:w-full sm:px-8 flex flex-col md:flex-row justify-between">
                        <div className="flex flex-col">
                            <span className="font-bold text-white uppercase mb-2">Footer header 1</span>
                            <span className="my-2"><a href="/" className="text-blue-700  text-md hover:text-white">link 1</a></span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-white uppercase mt-4 md:mt-0 mb-2">Footer header 2</span>
                            <span className="my-2"><a href="/" className="text-blue-700 text-md hover:text-white">link 1</a></span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-white uppercase mt-4 md:mt-0 mb-2">Footer header 3</span>
                            <span className="my-2"><a href="/" className="text-blue-700  text-md hover:text-white">link 1</a></span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-6">
                <div className="mt-8 border-t-2 border-gray-300 flex flex-col items-center">
                    <div className="sm:w-2/3 text-center py-6">
                        <p className="text-sm text-white font-bold mb-2">
                            MAVERICKSS (C) 2020
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer