import React from 'react'
import { useState,useEffect } from 'react'
import Loading from './Loading'
import { dummyPublishedImages } from '../assets/assets';
import toast from 'react-hot-toast';
import axios from 'axios';

const Community = () => {
  const [images,setImages]=useState([]);
  const[loading,setLoading]=useState(true);
  const[refreshing,setRefreshing]=useState(false);

  const fetchImages=async()=>{
    try{
      const {data} = await axios.get('/api/user/published-images')
      if (data.success){
        setImages(data.images)
      }else{
        toast.error(data.message)
      }
    }catch(error){
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleRefresh=()=>{
    setRefreshing(true);
    fetchImages();
  }

  useEffect(()=>{
    fetchImages();
  },[]);

  if (loading) return <Loading/>
   


  return (
    <div className='p-6 pt-12 xl:px-12 2xl:px-20 w-full mx-auto h-full overflow-y-scroll'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-semibold text-gray-800 dark:text-purple-100'>Community Images</h2>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className='px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2'
        >
          {refreshing ? (
            <>
              <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
              Refreshing...
            </>
          ) : (
            <>
              🔄 Refresh
            </>
          )}
        </button>
      </div>
      {images.length > 0 ? (
        <div className='flex flex-wrap max-sm:justify-center gap-5'>
          {images.map((item, index) => (
            <a key={index} href={item.imageUrl} target='_blank' className='relative group block rounded-lg overflow-hidden border border-gray-200 dark:border-purple-700 shadow-sm hover:shadow-md transition-shadow duration-300'>
              <img
                src={item.imageUrl} 
                alt=""
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDIwMCAxNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTYwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04MCA2MEgxMjBWODBIODBWNjBaIiBmaWxsPSIjOUI0MjQyIi8+CjxwYXRoIGQ9Ik04MCA5MEgxMjBWMTA4SDgwVjkwWiIgZmlsbD0iIzlCNDI0MiIvPgo8L3N2Zz4K';
                }}
                className='w-full h-40 md:h-50 2xl:h-62 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out'/>
                <p className='absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-sm p-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>Created by {item.userName}</p>
            </a>
          ))}
        </div>  
      ) : (
        <div className='text-center mt-10'>
          <p className='text-gray-600 dark:text-purple-400 mb-4'>No community images available yet.</p>
          <p className='text-sm text-gray-500 dark:text-purple-500'>
            Generate an image in chat and check "Publish Generated Image to Community" to share it here!
          </p>
        </div>
      )}
    </div>
  )
}

export default Community
