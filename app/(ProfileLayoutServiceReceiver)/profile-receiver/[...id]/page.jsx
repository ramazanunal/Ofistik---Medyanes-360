import MembershipInfo from '@/containers/Home/_components/receiverProfile/MembershipInfo'
import PasswordUpdate from '@/containers/Home/_components/receiverProfile/PasswordUpdate'
import React from 'react'

const ProfilePage = () => {
  return (
    <div className="md:fixed bg-grayBg w-full h-full mx-auto z-0 pt-20 sm:pt-36 pb-10 p-3">
      <div className="max-w-4xl mx-auto">
        <div className="bg-green-100 text-green-700 p-4 rounded mb-4 flex justify-between items-center">
          <p>E-Posta Adresinizi Doğrulamanız Gerekmektedir</p>
          <button className="bg-green-500 text-white p-2 rounded ml-4">
            Doğrula
          </button>
        </div>

        {/* Ortalamak için flex ve justify-center */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <MembershipInfo />
          <PasswordUpdate />
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
