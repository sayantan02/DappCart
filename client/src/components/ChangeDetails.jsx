import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { contractABI, contractAddress } from '../constants/constants';
import { ethers } from 'ethers';
const { ethereum } = window;

const FormField = ({ labelName, placeholder, inputType, isTextArea, name, isDisabled, value, styles, handlechange }) => {
    return (
        <label className="flex-1 w-full flex flex-col">
            {labelName && (
                <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">{labelName}</span>
            )}

            {isTextArea ? (
                <textarea
                    required
                    name={name}
                    value={value}
                    rows={4}
                    placeholder={placeholder}
                    onChange={(e) => handlechange(e, name)}
                    className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
                />
            ) : isDisabled ? (
                <input
                    required
                    disabled
                    name={name}
                    value={value}
                    type={inputType}
                    step="0.01"
                    placeholder={placeholder}
                    className={`py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px] ${styles}`}
                />
            ) : (
                <input
                    required
                    name={name}
                    value={value}
                    type={inputType}
                    step="0.01"
                    placeholder={placeholder}
                    onChange={(e) => handlechange(e, name)}
                    className={`py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px] ${styles}`}
                />
            )}
            {/* 
        {isDisabled && (
          <input
            required
            disabled
            name={name}
            value={value}
            onChange={(e) => handlechange(e, name)}
            type={inputType}
            step="0.01"
            placeholder={placeholder}
            className={`py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px] ${styles}`}
          />
        )} */}

        </label>
    )
}

const CustomButton = ({ btnType, title, handleClick, styles }) => {
    return (
        <button
            type={btnType}
            className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${styles}`}
            onClick={handleClick}
        >
            {title}
        </button>
    )
}

const ChangeDetails = ({ product, id, contract, close, currentAccount, connect }) => {

    const [formData, setFormData] = useState({ price: "", stock: "" });

    const handleSubmit = async (e) => {
        const { price, stock } = formData;
        e.preventDefault();
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const ProductContract = new ethers.Contract(contractAddress, contractABI, provider);
        const parsedAmount = ethers.utils.parseEther(price);

        const transactionHash = await ProductContract.connect(signer).changeProduct(parseInt(id), parseInt(stock), parsedAmount);
        await transactionHash.wait();
        window.location = "/";
    }

    const handlechange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };


    return (
        <div className='change-product bg-[#1c1c24] overflow-y-auto'>
            <div className="bg-[#1c1c24]">
                <AiOutlineClose fontSize={28} className="text-white float-right cursor-pointer mt-3 mr-3" onClick={close} />
                <div className='bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4'>
                    {/* {isLoading && <Loader />} */}
                    <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#4a4a4d] rounded-[10px]">

                        <h1 className="font-sans font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Change Product Details</h1>
                    </div>
                    <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
                        <div className="flex flex-wrap gap-[40px]">


                            <FormField
                                labelName="Product Price *"
                                placeholder="Type a Price for your Product"
                                inputType="number"
                                name="price"
                                handlechange={handlechange}
                            />

                            <FormField
                                labelName="How much items you have *"
                                placeholder="Items in numbers "
                                inputType="number"
                                name="stock"
                                handlechange={handlechange}
                            />
                        </div>
                        <div className="flex justify-center items-center mt-[40px]">

                            <CustomButton
                                btnType="submit"
                                title="Create Product"
                                styles="bg-[#1dc071]" />

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChangeDetails