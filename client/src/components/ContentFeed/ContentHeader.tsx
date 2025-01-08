import {  ArrowPathIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, EllipsisVerticalIcon, StopIcon } from '@heroicons/react/16/solid'
import React from 'react'
import '../styles.css'

const ContentHeader = () => {
  return (
    <div className='flex items-center h-10 p-4 border-solid'>
      <StopIcon className='content-header-svg'></StopIcon>
      <ChevronDownIcon className='h-3 w-3 text-gray-200 z-10 -ml-1 cursor-pointer' ></ChevronDownIcon>
      <ArrowPathIcon className='ml-10 content-header-svg text-gray-400 p-0.5 fill-slate-900' ></ArrowPathIcon>
      <EllipsisVerticalIcon className='content-header-svg p-0.5  text-gray-400 fill-current' > </EllipsisVerticalIcon>

      {/* pages navigation */}
      <div className='flex flex-row-reverse ml-auto  w-3/12 h-full items-center'>
          <ChevronRightIcon className='content-header-svg p-0.5  text-gray-400 fill-current' ></ChevronRightIcon>
          <ChevronLeftIcon className='content-header-svg p-0.5 mr-4 text-gray-400 fill-none' ></ChevronLeftIcon>
          <span className='text-gray-400 text-sm' >1-50 of 1,000</span>
      </div>
    </div>
  )
}

export default ContentHeader