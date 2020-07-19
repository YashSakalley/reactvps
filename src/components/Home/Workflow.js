import React from 'react'

export default function workflow() {
    return (
        <div className="sm:h-screen" style={{ backgroundImage: "url('https://wallpaperaccess.com/full/1157091.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div id="login-section" className="bg-black font-black text-white text-2xl mx-12 p-5 border-l-8 border-purple-500" style={{ background: 'linear-gradient(45deg, black, gray)' }}>
                <div>
                    HOW IT WORKS
                    </div>
            </div>
            <div className="mx-12 mt-6 sm:mt-32 p-5">
                <div className="flex flex-wrap">
                    <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 mb-4">
                        <div className="text-center text-2xl font-bold bg-white mx-4 rounded-lg">STEP 1</div>
                        <div className="mx-4 mt-8">
                            <img src="https://ik.imagekit.io/wext/wp-content/uploads/2018/01/check-aadhar-authentication-history.png" className="w-full h-48" alt="" />
                        </div>
                        <div className="bg-gray-900 text-white px-5 mb-2 italic text-center text-xl mx-4 mt-4">
                            login using aadhar number
                        </div>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 mb-4">
                        <div className="text-center text-2xl font-bold bg-white rounded-lg">STEP 2</div>
                        <div className="mt-8">
                            <img src="https://ecdn.banglatribune.com/contents/cache/images/825x0x1/uploads/media/2019/09/22/b1ada9079da66bfe8830c14e87340ce2-5d86e86da47e7.png" className="w-full h-48" alt="" />
                        </div>
                        <div className="bg-gray-900 text-white px-5 mb-2 italic text-center text-xl mt-4">
                            interact with bot
                        </div>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 mb-4">
                        <div className="text-center text-2xl font-bold bg-white mx-4 rounded-lg">STEP 3</div>
                        <div className="mx-4 mt-8">
                            <img src="https://ak.picdn.net/shutterstock/videos/27350911/thumb/8.jpg" className="w-full h-48" alt="" />
                        </div>
                        <div className="bg-gray-900 text-white px-5 mb-2 italic text-center text-xl mx-4 mt-4">
                            signature and evidences
                        </div>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 mb-4">
                        <div className="text-center text-2xl font-bold bg-white rounded-lg">STEP 4</div>
                        <div className="mt-8">
                            <img src="https://www.scnsoft.com/blog-pictures/sharepoint/contract-management-new/sharepoint-dms-best-practices.png" className="w-full h-48" alt="" />
                        </div>
                        <div className="bg-gray-900 text-white px-5 mb-2 italic text-center text-xl mt-4">
                            finished reporting
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
