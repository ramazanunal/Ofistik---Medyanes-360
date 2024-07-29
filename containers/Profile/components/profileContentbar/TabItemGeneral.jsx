import ResumeSection from '@/components/general/ResumeSection'
import EducationInfoSection from '@/components/general/EducationInfoSection'
import Certificate from '@/components/general/CertificateSection'
import { useEffect, useState } from 'react'
import { getAPI } from '@/services/fetchAPI'

import SkillsSection from '@/components/general/SkillsSection'
import LanguageSection from '@/components/general/LanguageSection'
import { useSession } from 'next-auth/react'

const TabItemsGeneral = ({ params }) => {
  const { data: session } = useSession()
  const id = session?.user.id

  const [profileInfo, setProfileInfo] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getProfile = async () => {
      const result = await getAPI(`/profile/${id}/get-profile`)
      console.log(result)
      setProfileInfo(result.data)
      setLoading(false)
    }
    getProfile()
  }, [id])
  return (
    !loading && (
      <div className="lg:h-[calc(100vh_-_200px)] w-full mx-auto lg:overflow-y-scroll top-0 bottom-0  flex flex-col gap-3 pt-5   ">
        <ResumeSection mockData={profileInfo} loading={loading} />
        <EducationInfoSection mockData={profileInfo} />
        <Certificate mockData={profileInfo} />
        <SkillsSection data={profileInfo} />
        <LanguageSection data={profileInfo} />
      </div>
    )
  )
}

export default TabItemsGeneral
