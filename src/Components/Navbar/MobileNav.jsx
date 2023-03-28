import React, {useEffect, useState} from 'react'
import {IonIcon} from '@ionic/react'
import { reorderThreeSharp } from 'ionicons/icons'
import { closeSharp } from 'ionicons/icons'

const MobileNav = () => {

  const [windowHeight, setWindowHeight] = useState(window.scrollY)

  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setWindowHeight(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    console.log(windowHeight);
  }

  return (
    <>
      <div onClick={handleClick} className={` transition-all duration-300 ease-in-out h-20 w-screen flex md:hidden text-yellow-200 pt-4 fixed top-0 left-0 z-50 ${windowHeight > 0? 'bg-amber-900': ' bg-amber-900/0' }`}>
        <h1 className='text-4xl ml-4 font-bold'>Jill's Kitchen</h1>
        <div className='text-4xl ml-auto mr-4' onClick={()=> setOpen(!open)}>
          {open ? <IonIcon icon={closeSharp}/> : <IonIcon icon={reorderThreeSharp}/>}
        </div>
      </div>

      {/* Nav items */}
      <div className={`w-screen h-64 fixed left-0 bg-amber-900 text-2xl text-center text-yellow-200 transition-all duration-300 ease-in-out z-40 pt-20 ${open? 'top-0': 'top-[-400px]'}`}>
        <h1 className=' my-4'>Home</h1>
        <h1 className=' my-4'>About</h1>
      </div>
    </>
  )
}

export default MobileNav