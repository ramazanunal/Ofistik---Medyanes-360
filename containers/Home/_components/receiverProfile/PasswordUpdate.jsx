'use client'

import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { postAPI } from '@/services/fetchAPI'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'

const PasswordUpdate = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { data: session } = useSession()

  const toggleVisibility = (field) => {
    if (field === 'current') {
      setShowCurrentPassword(!showCurrentPassword)
    } else if (field === 'new') {
      setShowNewPassword(!showNewPassword)
    } else if (field === 'confirm') {
      setShowConfirmPassword(!showConfirmPassword)
    }
  }

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required('Şu anki şifre zorunludur'),
      newPassword: Yup.string()
        .min(10, 'Şifre en az 10 karakter olmalıdır')
        .matches(/[A-Z]/, 'En az 1 büyük harf içermelidir')
        .matches(/[a-z]/, 'En az 1 küçük harf içermelidir')
        .matches(/\d/, 'En az 1 rakam içermelidir')
        .required('Yeni şifre zorunludur'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Şifreler eşleşmelidir')
        .required('Şifre doğrulama zorunludur'),
    }),
    onSubmit: (values) => {
      const updatePassword = async (values) => {
        const res = await postAPI('/profile/receiver/update-password', {
          ...values,
          userId: session.user.id,
        })
        if (res.status === 'UPDATED') {
          toast.success(res.message)
          formik.resetForm()
        } else {
          toast.error(res.message)
        }
      }

      updatePassword(values)
    },
  })

  return (
    <div className="flex flex-col p-6 bg-white shadow-lg rounded-md w-full h-[500px] overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Şifre Güncelleme</h2>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col space-y-4 h-full"
      >
        {/* Current Password */}
        <div className="flex gap-2 flex-col">
          <label htmlFor="" className="text-sm font-semibold">
            Şu Anki Şifre
          </label>
          <div className="relative">
            <input
              type={showCurrentPassword ? 'text' : 'password'}
              name="currentPassword"
              placeholder="Şu Anki Şifre"
              className="border p-2 rounded w-full"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.currentPassword}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 right-3 flex items-center cursor-pointer"
              onClick={() => toggleVisibility('current')}
            >
              {showCurrentPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </div>
          </div>
          <div className="min-h-[20px]">
            {formik.touched.currentPassword && formik.errors.currentPassword ? (
              <div className="text-red-500 text-sm">
                {formik.errors.currentPassword}
              </div>
            ) : null}
          </div>
        </div>

        {/* New Password */}
        <div className="flex gap-2 flex-col">
          <label htmlFor="" className="text-sm font-semibold">
            Yeni Şifre
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? 'text' : 'password'}
              name="newPassword"
              placeholder="Yeni Şifre"
              className="border p-2 rounded w-full"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 right-3 flex items-center cursor-pointer"
              onClick={() => toggleVisibility('new')}
            >
              {showNewPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </div>
          </div>
          <div className="min-h-[20px]">
            {formik.touched.newPassword && formik.errors.newPassword ? (
              <div className="text-red-500 text-sm">
                {formik.errors.newPassword}
              </div>
            ) : null}
          </div>
        </div>

        {/* Confirm New Password */}
        <div className="flex gap-2 flex-col">
          <label htmlFor="" className="text-sm font-semibold">
            Yeni Şifre (Tekrar)
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Yeni Şifre (Tekrar)"
              className="border p-2 rounded w-full"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 right-3 flex items-center cursor-pointer"
              onClick={() => toggleVisibility('confirm')}
            >
              {showConfirmPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </div>
          </div>
          <div className="min-h-[20px]">
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-red-500 text-sm">
                {formik.errors.confirmPassword}
              </div>
            ) : null}
          </div>
        </div>

        <button
          type="submit"
          className={`p-2 rounded text-white ${
            formik.isValid && formik.dirty ? 'bg-gray-500' : 'bg-gray-300'
          }`}
          disabled={!(formik.isValid && formik.dirty)}
        >
          Güncelle
        </button>
      </form>
    </div>
  )
}

export default PasswordUpdate
