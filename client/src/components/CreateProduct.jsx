import React, { useState } from 'react'
import { contractABI, contractAddress } from '../constants/constants';
import { ethers } from 'ethers';
const { ethereum } = window;
import { AiOutlineClose } from 'react-icons/ai';

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

const CreateProduct = ({ currentAddress, close }) => {

    const [imgBase64, setImgBase64] = useState();
    const [formData, setformData] = useState({ name: "", price: "", image: "", category: "", rating: "", stock: "" });


    const makeId = async (length) => {
        let result = '';
        const characters = '0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    const handlechange = (e, name) => {
        setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        const { name, price, image, description, category, rating, stock } = formData;
        e.preventDefault();
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const ProductContract = new ethers.Contract(contractAddress, contractABI, provider);
        const parsedAmount = ethers.utils.parseEther(price);

        
        const transactionHash = await ProductContract.connect(signer).CreateProcuct(
            makeId(20), 
            name, 
            description, 
            parsedAmount, 
            image, 
            category,
            rating, 
            stock
            );

        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        window.location = "/";
    }

    const changeImage = async (e) => {
        const reader = new FileReader()
        if (e.target.files[0]) reader.readAsDataURL(e.target.files[0])

        reader.onload = (readerEvent) => {
            const file = readerEvent.target.result
            setImgBase64(file)
            setFileUrl(e.target.files[0])
        }
    }

    return (
        <div className='product bg-[#1c1c24] overflow-y-auto'>
            <div className="bg-[#1c1c24]">
                <AiOutlineClose fontSize={28} className="text-white float-right cursor-pointer mt-3 mr-3" onClick={close} />
                <div className='bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4'>
                    {/* {isLoading && <Loader />} */}
                    <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#4a4a4d] rounded-[10px]">

                        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Start Creating a Product</h1>
                    </div>
                    <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
                        <div className="flex flex-wrap gap-[40px]">

                            <FormField
                                labelName="Product Name *"
                                placeholder="Type a Name for your Product"
                                inputType="text"
                                name="name"
                                handlechange={handlechange}
                            />

                            <FormField
                                labelName="Product Price *"
                                placeholder="Type a Price for your Product"
                                inputType="number"
                                name="price"
                                handlechange={handlechange}
                            />

                        </div>
                            <FormField
                                labelName="Product Description *"
                                placeholder="Type a description for your Product"
                                inputType="text"
                                isTextArea
                                name="description"
                                handlechange={handlechange}
                                />
                                

                        {/* <div className="flex flex-col justify-center items-center">
                            <img
                                alt="NFT"
                                className="w-20 h-20 object-cover cursor-pointer rounded-md mt-3"
                                src={imgBase64 || 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80'}
                            />

                        </div> */}

                        <div className="flex flex-wrap gap-[40px]">

                            {/* <label className="flex-1 w-full flex flex-col">
                            <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">NFT File *</span>

                            <input
                                type="file"
                                accept="image/png, image/gif, image/jpeg, image/webp"
                                className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px] file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#19212c] file:text-gray-400"
                                onChange={changeImage}
                                required
                            />
                        </label> */}

                            <FormField
                                labelName="Your Product Image URL *"
                                placeholder="Paste your Product image URL"
                                inputType="url"
                                name="image"
                                handlechange={handlechange}
                            />

                            <FormField
                                labelName="Your Product Category *"
                                placeholder="Education"
                                inputType="text"
                                name="category"
                                handlechange={handlechange}
                            />

                        </div>

                        <div className="flex flex-wrap gap-[40px]">
                            <FormField
                                labelName="Rating of your Product *"
                                placeholder="Rating in numbers "
                                inputType="number"
                                name="rating"
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

export default CreateProduct