import React from 'react'

const Crime = ({ img, crime, click }) => {

    const onClickHandler = () => {
        click(crime)
    }

    return (
        <div
            onClick={onClickHandler}
            className="cursor-pointer w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4 pl-2 shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
            <img src={img} className="h-48 w-full" alt={crime} />
            <div className="h-12 text-center font-black border-2">{crime}</div>
        </div>
    )
}

export default Crime