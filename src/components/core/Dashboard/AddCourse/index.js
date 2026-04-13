import React from 'react'
import RenderSteps from './RenderSteps'
const index = () => {
  return (
    <div className=' mx-auto w-11/12 max-w-[1000px] py-10'>

      <div className='flex w-full items-start gap-x-6'>

        <div className='flex flex-1 flex-col'>

          <h1 className='mb-14 text-3xl font-medium text-richblack-5'>
            Add Course
          </h1>

          <RenderSteps />

        </div>

        <div className='sticky top-10 hidden max-w-[400px] flex-1 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 xl:block'>

          <p className='mb-8 text-lg text-richblack-5'>
            ⚡ Course Upload Tips
          </p>

          <ul className='ml-5 list-disc space-y-4 text-xs text-richblack-5'>
            <li>Set the course price or make it free</li>
            <li>Set the course price or make it free</li>
            <li>Set the course price or make it free</li>
            <li>Set the course price or make it free</li>
          </ul>

        </div>

      </div>

    </div>
  );
}

export default index
