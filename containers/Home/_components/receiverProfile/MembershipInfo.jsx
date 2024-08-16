'use client'

import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const MembershipInfo = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: 'vicasrob@gmail.com', // Default value
      phone: '',
      day: '',
      month: '',
      year: '',
      corporateCheck: false,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Ad zorunludur'),
      lastName: Yup.string().required('Soyad zorunludur'),
      email: Yup.string()
        .email('Geçersiz e-posta adresi')
        .required('E-posta zorunludur'),
      phone: Yup.string()
        .matches(/^\+?\d+$/, 'Geçerli bir telefon numarası girin')
        .required('Cep telefonu zorunludur'),
    }),
    onSubmit: (values) => {
      console.log('Form values:', values)
    },
  })

  return (
    <div className="flex flex-col p-6 bg-white shadow-lg rounded-md w-full  h-[500px] overflow-y-auto ">
      <h2 className="text-lg font-bold mb-4">Üyelik Bilgilerim</h2>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col justify-between h-full"
      >
        <div className="flex items-center gap-4">
          {/* First Name */}
          <div className="flex flex-col gap-1 flex-1">
            <label htmlFor="" className="text-sm font-semibold">
              Ad
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="Ad"
              className="border p-2 rounded w-full"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
            />
            <div className="min-h-[20px]">
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.firstName}
                </div>
              ) : null}
            </div>
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-1 flex-1">
            <label htmlFor="" className="text-sm font-semibold">
              Soyad
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Soyad"
              className="border p-2 rounded w-full"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
            />
            <div className="min-h-[20px]">
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.lastName}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="E-Mail" className="text-sm font-semibold">
            E-Mail
          </label>
          <input
            type="email"
            name="email"
            placeholder="E-Mail"
            className="border p-2 rounded w-full"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <div className="min-h-[20px]">
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold">Cep Telefonu</label>
          <div className="flex gap-4">
            <input
              type="tel"
              name="phone"
              placeholder="Cep Telefonu"
              className="border p-2 rounded w-full"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            <button className="bg-premiumOrange text-white p-1 px-2 rounded text-sm font-semibold">
              Güncelle
            </button>
          </div>
          <div className="min-h-[20px]">
            {formik.touched.phone && formik.errors.phone ? (
              <div className="text-red-500 text-sm">{formik.errors.phone}</div>
            ) : null}
          </div>
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="" className="text-sm font-semibold">
            Doğum Tarihiniz
          </label>
          <div className="flex w-full gap-4">
            <div className="w-full">
              <select
                name="day"
                className="border p-2 rounded w-full"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.day}
              >
                <option value="">Gün</option>
                {/* Add day options */}
              </select>
              <div className="min-h-[20px]">
                {formik.touched.day && formik.errors.day ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.day}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="w-full">
              <select
                name="month"
                className="border p-2 rounded w-full"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.month}
              >
                <option value="">Ay</option>
                {/* Add month options */}
              </select>
              <div className="min-h-[20px]">
                {formik.touched.month && formik.errors.month ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.month}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="w-full">
              <select
                name="year"
                className="border p-2 rounded w-full"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.year}
              >
                <option value="">Yıl</option>
                {/* Add year options */}
              </select>
              <div className="min-h-[20px]">
                {formik.touched.year && formik.errors.year ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.year}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <button type="submit" className="bg-orange-500 text-white p-2 rounded">
          Güncelle
        </button>
      </form>
    </div>
  )
}

export default MembershipInfo
