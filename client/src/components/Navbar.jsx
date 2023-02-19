import React, { useState, useEffect } from 'react'
import CreateProduct from './CreateProduct';
import MainBody from './MainBody';
import { contractABI, contractAddress } from '../constants/constants';
import { ethers } from 'ethers';
const { ethereum } = window;

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


const Navbar = () => {
    const [currentAccount, setCurrentAccount] = useState();
    const [toggleCreate, setToggleCreate] = useState(false);

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");

            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length > 0) {
                setCurrentAccount(accounts[0]);
            } else {
                console.log("No accounts found");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");

            const accounts = await ethereum.request({ method: "eth_requestAccounts", });

            if (accounts !== 0) {
                setCurrentAccount(accounts[0]);
                window.location.reload();
            } else {
                console.log("No authorised account found.");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const showProdToggle = () => {
        {toggleCreate ? setToggleCreate(false) : setToggleCreate(true)}
      } 

    useEffect(() => {
        checkIfWalletIsConnected();
    }, [])
    
    return (
        <div className="h-screen w-full relative flex overflow-hidden bg-[#1d1d1d]">
            {/* Sidebar */}
            <aside className="mx-3 my-3 rounded-lg w-14 flex flex-col space-y-10 items-center justify-center relative bg-gray-800 text-white">
                {/* Profile */}
                <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                </div>

                {/* Courses */}
                <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                </div>

                {/* Theme */}
                <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                </div>

                {/* Configuration */}
                <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
            </aside>



            <div className="w-full h-full flex flex-col justify-between">
                {/* Header */}

                <nav className="h-16 flex items-center relative justify-end px-5 space-x-10 bg-[#1d1d1d] text-white">
                    <div className="px-1 xl:px-12 py-3 flex w-full items-center">
                        <a className="text-3xl font-bold font-heading" href="#">
                            {/* <img className="h-9" src="logo.png" alt="logo"> */}
                            CodeLek.com
                        </a>
                        {/* Nav Links */}
                        <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                            <li><a className="rounded-lg px-2 py-2 hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white" href="#">Home</a></li>

                            <li><a className="rounded-lg px-2 py-2 hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white" href="#">Catagory</a></li>

                            <li><a className="rounded-lg px-2 py-2 hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white" href="#">Collections</a></li>

                            <li><a className="rounded-lg px-2 py-2 hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white" href="#">Contact Us</a></li>

                        </ul>
                        {/* Header Icons */}
                        <div className="hidden xl:flex space-x-5 items-center">
                            <a className="hover:text-gray-200" href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </a>
                            <a className="flex items-center hover:text-gray-200" href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span className="flex absolute -mt-5 ml-4">
                                    <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500">
                                    </span>
                                </span>
                            </a>
                            {/* Sign In / Register */}

                            <header title={currentAccount} className="h-16 w-full flex items-center relative justify-end px-2 space-x-10 bg-[#1d1d1d]">

                                <div className="flex flex-shrink-0 items-center space-x-4 text-white">

                                    <div className="h-10 w-10 rounded-full cursor-pointer bg-gradient-to-r from-pink-500 to-rose-500 border-2 border-blue-400"></div>
                                    <div>
                                        <CustomButton
                                            btnType="button"
                                            title={!currentAccount ? 'Connect Wallet' : 'Create Product'}
                                            styles={!currentAccount ? 'bg-[#8c6dfd]' : 'bg-[#1dc071]'}
                                            handleClick={() => {
                                                if(currentAccount) showProdToggle()
                                                 else connectWallet()
                                            }}
                                        />
                                    </div>
                                </div>
                            </header>

                        </div>
                    </div>

                    {/* Responsive navbar */}
                    <a className="xl:hidden flex mr-6 items-center" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="flex absolute -mt-5 ml-4">
                            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500">
                            </span>
                        </span>
                    </a>
                    <a className="navbar-burger self-center mr-12 xl:hidden" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </a>
                </nav>

                <MainBody />

                {toggleCreate && (
                    <CreateProduct currentAddress={currentAccount} close={() => {setToggleCreate(false)}} />
                )}

            </div>
        </div>
    )
}


export default Navbar;
