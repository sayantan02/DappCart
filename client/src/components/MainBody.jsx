import React, { useState, useEffect } from 'react'
import { SiEthereum } from 'react-icons/si';
import { contractABI, contractAddress } from '../constants/constants';
import { ethers } from 'ethers';
import Purchase from './Purchase';
import ChangeDetails from './ChangeDetails';

const truncate = (str) => {
  return str.length > 15 ? str.substring(0, 60) + "..." : str;
}

const MainBody = ({ connected }) => {

  const [currentAccount, setCurrentAccount] = useState("");
  const [products, setProducts] = useState([]);
  const [togglePurchase, setTogglePurchase] = useState(false);
  const [toggleChange, setToggleChange] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [selectedProductId, setSelectedProductId] = useState();
  const [walletConnected, setWalletConnected] = useState(false);
  const [Contract, setContract] = useState();
  const [owner, setOwner] = useState();

  const SingleCard = ({ currentAccount, product, handleClick }) => {
    return (

      <div className="sm:w-[288px] w-full rounded-[15px] bg-[#121218] cursor-pointer" onClick={handleClick}>
        <img src={product.product_image} alt="fund" className="w-full h-[158px] object-cover rounded-[15px]" />

        <div className="flex flex-col p-4">
          <div className="flex flex-row items-center mb-[18px]">
            {/* <img src="../../assets/placeholder.png" alt="tag" className="w-[17px] h-[17px] object-contain" /> */}
            <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">{product.category}</p>
          </div>

          <div className="block">
            <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">{product.product_name}</h3>
            {/* <p title={product.owner} className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">{product.owner}</p> */}
          </div>
          <div className='text-white font-light font-sans'>
            {truncate(product.description)}
          </div>

          <div className="align-middle mt-[15px] gap-2">
            <div className="flex flex-row ">
              <SiEthereum fontSize={18} color="#FFF" />
              <h3 className="font-epilogue mx-2 font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">{product.product_price}</h3>
              {/* <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate"></p> */}
            </div>
            <br />
            <div className="flex justify-between flex-wrap items-center gap-[12px]">
              <div>
              {product.rating == 5 ? (
                <span className="flex items-center">
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                </span>
              ) : product.rating == 4 ? (
                <span className="flex items-center">
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                </span>
              ) : product.rating == 3 ? (
                <span className="flex items-center">
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>

                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                </span>
              ) : product.rating == 2 ? (
                <span className="flex items-center">
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>

                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                </span>
              ) : (
                <span className="flex items-center">
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                </span>
              )}
              </div>
              <div>
              {product.stock > 0 ? (<p className="flex-1 font-epilogue font-bold text-[12px] text-[#11c455]">In stock</p>)
                :
                (<p className="flex-1 font-epilogue font-bold text-[12px] text-[#d40c4f]">Out of Stock</p>)
              }
              </div>
            </div>
          </div>
          <div className='mt-3 flex w-full justify-center items-center'>
            {/* <CustomButton
                title={ValidateUser() ? ("Sell"):("Purchase")}
                btnType="button"
                styles={ValidateUser() ? ("bg-[#0f1fce]"):("bg-[#ce0e77]")}
                handleClick={() => {}} /> */}
          </div>
        </div>
      </div>
    )
  }

  const checkIfWalletIsConnected = async () => {
    try {
      if (!window.ethereum) return alert("Please install MetaMask.");

      const accounts = await window.ethereum.request({ method: "eth_accounts" });

      if (accounts.length > 0) {
        setWalletConnected(true);
        setCurrentAccount(accounts[0]);
        getProducts();
      } else {
        setWalletConnected(false);
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

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  const getProducts = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const ProductContract = new ethers.Contract(contractAddress, contractABI, provider);
    const Owner = await ProductContract.owner();
    setContract(ProductContract);
    setOwner(Owner);

    const items = await ProductContract.getAllProducts();

    const structuredProducts = items.map((product) => ({
      id: parseInt(product.id._hex).toString(),
      product_name: product.product_name,
      description: product.desciption,
      product_price: ethers.utils.formatEther(parseInt(product.product_price._hex).toString()),
      category: product.description,
      product_image: product.product_image,
      rating: parseInt(product.rating._hex).toString(),
      stock: parseInt(product.stock._hex).toString(),
    }));

    setProducts(structuredProducts);
  }

  const showPurchaseToggle = (product, id) => {
    setSelectedProduct(product);
    setSelectedProductId(id);
    { togglePurchase ? setTogglePurchase(false) : setTogglePurchase(true) }
  }

  const showChangeToggle = (product, id) => {
    { toggleChange ? setToggleChange(false) : setToggleChange(true) }
    setSelectedProduct(product);
    setSelectedProductId(id);
  }

  return (
    <div className='max-w-full h-full flex relative overflow-y-hidden'>
      <div className='h-full w-full py-2 mx-2 flex flex-wrap items-start justify-start rounded-tl grid-flow-col auto-cols-max gap-4 overflow-y-auto'>



        {!walletConnected && (
          <div className='h-full w-full flex flex-row flex-wrap justify-center items-center'>
            <p className='text-white text-lg top-50 left-50'>Please Connect Metamask Wallet to see all Products.</p>
          </div>
        )}

        {products.length <= 0 && walletConnected && (
          <div className='h-full w-full flex flex-row flex-wrap justify-center items-center'>
            <p className='text-white text-lg top-50 left-50'>No Products Found.</p>
          </div>
        )}



        {products.length > 0 && products.map((product, indexId) =>

          <SingleCard
            key={product.id}
            currentAccount={currentAccount}
            product={product}
            handleClick={() => {
              currentAccount.toLowerCase() == owner.toLowerCase() ?
                showChangeToggle(product, indexId) :
                showPurchaseToggle(product, indexId)
            }}
          />
        )}

        {togglePurchase && (
          <Purchase product={selectedProduct} id={selectedProductId} contract={Contract} close={() => setTogglePurchase(false)} currentAccount={currentAccount} connect={() => { connectWallet() }} />
        )}

        {toggleChange && (
          <ChangeDetails product={selectedProduct} id={selectedProductId} contract={Contract} close={() => setToggleChange(false)} currentAccount={currentAccount} connect={() => { connectWallet() }} />
        )}

        {/* <SingleCard owner={currentAccount} />
        <SingleCard owner={currentAccount} />
        <SingleCard owner={currentAccount} />
        <SingleCard owner={currentAccount} />
        <SingleCard owner={currentAccount} />
        <SingleCard owner={currentAccount} />
        <SingleCard owner={currentAccount} />
        <SingleCard owner={currentAccount} /> */}
      </div>
    </div>
  )
};

export default MainBody