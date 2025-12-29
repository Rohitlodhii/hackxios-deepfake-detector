import React from 'react'
import { Button } from './ui/button'
import { Github, Star } from 'lucide-react'

const Navbar = () => {
  return (
    <div className='max-w-4xl  w-full mx-auto flex items-center justify-between border border-border rounded-xl mt-2  px-4 shadow-sm h-14'>
      <div>Deepfake Detector</div>
      <div>
        <a
          href="https://github.com/Rohitlodhii/deepfake-detector"
          target="_blank"
          rel="noreferrer"
        >
          <Button variant={"outline"} className='cursor-pointer flex items-center justify-center gap-1'>
            <Github />
            <span>Github</span>
          </Button>
        </a>
      </div>
    </div>
  )
}

export default Navbar
