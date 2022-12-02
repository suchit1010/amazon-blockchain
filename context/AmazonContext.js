import { createContext, useState, useEffect } from 'react'
import { useMoralis, useMoralisQuery } from 'react-moralis'



export const AmazonContext = createContext()

export const AmazonProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState('')
  const [formattedAccount, setFormattedAccount] = useState('')
  const [balance, setBalance] = useState('')
  const [tokenAmount, setTokenAmount] = useState('')
  const [amountDue, setAmountDue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [etherscanLink, setEtherscanLink] = useState('')
  const [nickname, setNickname] = useState('')
  const [username, setUsername] = useState('')
  const [assets, setAssets] = useState([])
  const [recentTransactions, setRecentTransactions] = useState([])
  const [ownedItems, setOwnedItems] = useState([])



   
  const {
    authenticate,
    isAuthenticated,
    enableWeb3,
    Moralis,
    user,
    isWeb3Enabled,
  } = useMoralis()

  const {
    data: assetsData,
    error: assetsDataError,
    isLoading: assetsDataIsLoading,
  } = useMoralisQuery('Assets')

    useEffect ( ()=>{
        ;( async ()=> {

            if(isAuthenticated){
                const currentUsername = await user?.get('nickname')
                setusername(currentUsername)
            }

            })()
           

    },[isAuthenticated,user,username]) //is any of these variable chnage this useEffect will run

    //function for set username and chek some cases 
    const handleSetUsername = () =>{

        if(user){

            if(nickname){
                user.set('mickname', nickname)
                user.save () //bcz you dont wanna upate our databse
            }
            else{
                console.log('can not set empty nickname')
            }

        }else{
            console.log('No user ')
        }

    
    }

    const getAssets = async () => {
        try {
          await enableWeb3()
          // const query = new Moralis.Query('Assets')
          // const results = await query.find()
          setAssets(assets)
    
          setAssets(assetsData)
        } catch (error) {
          console.log(error)
        }
      }
    



    return (
        <AmazonContext.Provider
        
           value = {{

            isAuthenticated,
            nickname,
            setNickname,
            username,
            handleSetUsername,
            assets
           }}

           >
           {children}
         </AmazonContext.Provider>
    )
}