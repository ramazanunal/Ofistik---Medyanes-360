'use client'

import MyAppointments from '@/components/userAppointmentListModule/myAppointments'
import MembershipInfo from '@/containers/Home/_components/receiverProfile/MembershipInfo'
import PasswordUpdate from '@/containers/Home/_components/receiverProfile/PasswordUpdate'
import { getAPI } from '@/services/fetchAPI'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

const ProfilePage = ({ params }) => {
  const [activeTab, setActiveTab] = useState('profile')
  const [appointments, setAppointments] = useState([])
  const [profileInfo, setProfileInfo] = useState()
  const { data: session } = useSession()
  useEffect(() => {
    const getProfileInfo = async () => {
      const res = await getAPI(
        `/profile/${session.user.id}/get-profile-receiver`
      )
      setProfileInfo(res.data)
      if (res.status === 'success') {
        const appointments = await getAPI(
          `/appointment/receiver/${res.data.id}/get-appointment`
        )
        setAppointments(appointments.data)
      }
    }
    if (session?.user?.id) {
      getProfileInfo()
    }
  }, [session?.user?.id])
  return (
    <div className="bg-grayBg w-full min-h-screen pt-20 sm:pt-36 pb-10 p-3 overflow-auto">
      <div className="max-w-4xl mx-auto">
        {/* Tab Headers */}
        <div className="flex justify-center mb-6 gap-3">
          <button
            className={`text-lg font-semibold py-2 px-4 ${
              activeTab === 'profile'
                ? 'text-white bg-orange-500'
                : 'text-orange-700 bg-orange-100'
            } rounded`}
            onClick={() => setActiveTab('profile')}
          >
            Profil
          </button>
          <button
            className={`text-lg font-semibold py-2 px-4 ${
              activeTab === 'appointments'
                ? 'text-white bg-orange-500'
                : 'text-orange-700 bg-orange-100'
            } rounded`}
            onClick={() => setActiveTab('appointments')}
          >
            Randevularım
          </button>
        </div>

        {/* Tab Contents */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <MembershipInfo profileInfo={profileInfo} />
            <PasswordUpdate />
          </div>
        )}

        {activeTab === 'appointments' && (
          <MyAppointments appointments={appointments} />
        )}
      </div>
    </div>
  )
}

export default ProfilePage
