'use client'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { IoClose } from 'react-icons/io5'
import { GoDash } from 'react-icons/go'
import { FaEye } from 'react-icons/fa'
import { postAPI } from '@/services/fetchAPI'
import { Formik, Form, Field } from 'formik'
import { toast } from 'react-toastify'
import { twMerge } from 'tailwind-merge'
import Select from 'react-select'

function RegisterModal({ className }) {
  const [showPassword, setShowPassword] = useState({
    password: false,
    passwordConfirm: false,
  })
  const [open, setOpen] = useState(false)
  const [userType, setUserType] = useState('Hizmet Al') // Default selection
  const [isCustomProfession, setIsCustomProfession] = useState(false)
  const professionOptions = [
    { value: 'Doctor', label: 'Doctor' },
    { value: 'Engineer', label: 'Engineer' },
    { value: 'Teacher', label: 'Teacher' },
    // Diğer meslekler...
    { value: 'custom', label: 'Mesleğinizi Ekleyin' },
  ]

  return (
    <>
      <Formik
        initialValues={{
          name: '',
          surname: '',
          email: '',
          phone: '',
          password: '',
          passwordConfirm: '',
          userType: 'Hizmet Al', // Default selection
          profession: '', // New field for profession when "Hizmet Ver" is selected
        }}
        onSubmit={async (values, { resetForm }) => {
          const profession =
            values.profession === 'custom'
              ? values.customProfession
              : values.profession
          const response = await postAPI('/auth/register', {
            ...values,
            userType,
            profession,
          })
          if (response.error) return toast.error(response.error.message)
          if (response.statusCode === 201) {
            setOpen(false)
            toast.success('Kayıt Başarılı!')
            resetForm()
          } else {
            return toast.error(response.message)
          }
        }}
      >
        {(props) => (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className={twMerge('', className)}>KAYIT OL</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[450px] !rounded-3xl">
              <DialogHeader className="flex flex-row justify-between items-center">
                <DialogTitle>Ücretsiz Dene</DialogTitle>
                <DialogClose>
                  <div className="w-10 h-10 rounded-md p-4 cursor-pointer transition-all duration-700 relative  bg-gray-200/50 hover:bg-red-500 group">
                    <IoClose
                      size={30}
                      className="text-red-500 transition-all duration-700 rotate-180 flex absolute group-hover:opacity-0 group-hover:rotate-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    />
                    <GoDash
                      size={30}
                      className="text-white rotate-0 transition-all duration-700 opacity-0 group-hover:block group-hover:rotate-180 group-hover:opacity-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    />
                  </div>
                </DialogClose>
              </DialogHeader>
              <hr />

              {/* Toggle for Hizmet Al / Hizmet Ver */}
              <div className="flex justify-center my-6">
                <div className="flex items-center space-x-4">
                  <label
                    className={`cursor-pointer ${
                      userType === 'Hizmet Al'
                        ? 'text-green-500'
                        : 'text-gray-500'
                    }`}
                    onClick={() => {
                      setUserType('Hizmet Al')
                      props.setFieldValue('userType', 'Hizmet Al')
                    }}
                  >
                    Hizmet Al
                  </label>
                  <label
                    className={`cursor-pointer ${
                      userType === 'Hizmet Ver'
                        ? 'text-green-500'
                        : 'text-gray-500'
                    }`}
                    onClick={() => {
                      setUserType('Hizmet Ver')
                      props.setFieldValue('userType', 'Hizmet Ver')
                    }}
                  >
                    Hizmet Ver
                  </label>
                </div>
              </div>

              <Form>
                {/* Ad Soyad */}
                <div className="grid grid-cols-2 gap-8 mb-3">
                  <div className="flex flex-col">
                    <Label
                      htmlFor="name"
                      className="text-[rgba(4,3,69,.4)] font-bold tracking-[-.16px] text-[13px] mb-3"
                    >
                      Adı
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Adı"
                      onChange={props.handleChange}
                      value={props.values.name}
                      className="placeholder:text-gray-400 h-12 rounded-2xl px-4 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-grey focus:border-green-500 hover:border-green-500 focus:ring-0 transition-all duration-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Label
                      htmlFor="surname"
                      className="text-[rgba(4,3,69,.4)] font-bold tracking-[-.16px] text-[13px] mb-3"
                    >
                      Soyadı
                    </Label>
                    <Input
                      id="surname"
                      name="surname"
                      type="text"
                      placeholder="Soyadı"
                      onChange={props.handleChange}
                      value={props.values.surname}
                      className="placeholder:text-gray-400 h-12 rounded-2xl px-4 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-grey focus:border-green-500 hover:border-green-500 focus:ring-0 transition-all duration-500"
                    />
                  </div>
                </div>
                {/* Email, Cep Telefonu */}
                <div className="grid grid-cols-2 gap-8 mb-3">
                  <div className="flex flex-col">
                    <Label
                      htmlFor="email"
                      className="text-[rgba(4,3,69,.4)] font-bold tracking-[-.16px] text-[13px] mb-3"
                    >
                      E-Posta
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="E Posta"
                      onChange={props.handleChange}
                      value={props.values.email}
                      className="placeholder:text-gray-400 h-12 rounded-2xl px-4 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-grey focus:border-green-500 hover:border-green-500 focus:ring-0 transition-all duration-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Label
                      htmlFor="phone"
                      className="text-[rgba(4,3,69,.4)] font-bold tracking-[-.16px] text-[13px] mb-3"
                    >
                      Cep Numarası
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="text"
                      placeholder="Cep Numarası"
                      onChange={props.handleChange}
                      value={props.values.phone}
                      className="placeholder:text-gray-400 h-12 rounded-2xl px-4 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-grey focus:border-green-500 hover:border-green-500 focus:ring-0 transition-all duration-500"
                    />
                  </div>
                </div>
                {/* Şifre, Şifre Tekrar*/}
                <div className="grid grid-cols-2 gap-8 mb-3">
                  <div className="flex flex-col">
                    <Label
                      htmlFor="password"
                      className="text-[rgba(4,3,69,.4)] font-bold tracking-[-.16px] text-[13px] mb-3"
                    >
                      Şifre
                    </Label>
                    <div className="flex items-center relative">
                      <Input
                        id="password"
                        name="password"
                        type={`${showPassword.password ? 'text' : 'password'}`}
                        placeholder="Şifre"
                        onChange={props.handleChange}
                        value={props.values.password}
                        className="placeholder:text-gray-400 h-12 rounded-2xl px-4 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-grey focus:border-green-500 hover:border-green-500 focus:ring-0 transition-all duration-500"
                      />
                      <FaEye
                        onClick={() =>
                          setShowPassword({
                            ...showPassword,
                            password: !showPassword.password,
                          })
                        }
                        className={`absolute right-[16px] ${
                          showPassword.password
                            ? 'text-green-500'
                            : 'text-gray-200'
                        } hover:text-green-500 cursor-pointer transition-all duration-500`}
                        size={25}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <Label
                      htmlFor="passwordConfirm"
                      className="text-[rgba(4,3,69,.4)] font-bold tracking-[-.16px] text-[13px] mb-3"
                    >
                      Şifre Tekrar
                    </Label>
                    <div className=" flex items-center relative">
                      <Input
                        id="passwordConfirm"
                        name="passwordConfirm"
                        type={`${
                          showPassword.passwordConfirm ? 'text' : 'password'
                        }`}
                        placeholder="Şifre Tekrar"
                        onChange={props.handleChange}
                        value={props.values.passwordConfirm}
                        className="placeholder:text-gray-400 h-12 rounded-2xl px-4 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-grey focus:border-green-500 hover:border-green-500 focus:ring-0 transition-all duration-500"
                      />
                      <FaEye
                        onClick={() =>
                          setShowPassword({
                            ...showPassword,
                            passwordConfirm: !showPassword.passwordConfirm,
                          })
                        }
                        className={`absolute right-[16px] ${
                          showPassword.passwordConfirm
                            ? 'text-green-500'
                            : 'text-gray-200'
                        } hover:text-green-500 cursor-pointer transition-all duration-500`}
                        size={25}
                      />
                    </div>
                  </div>
                </div>

                {userType === 'Hizmet Ver' && (
                  <div className="mb-3">
                    <Label
                      htmlFor="profession"
                      className="text-[rgba(4,3,69,.4)] font-bold tracking-[-.16px] text-[13px] mb-3"
                    >
                      Meslek
                    </Label>
                    <Select
                      id="profession"
                      name="profession"
                      options={professionOptions}
                      onChange={(selectedOption) => {
                        if (selectedOption.value === 'custom') {
                          setIsCustomProfession(true)
                          props.setFieldValue('customProfession', '') // Clear custom profession if selecting from dropdown
                          props.setFieldValue('profession', '') // Clear dropdown selection
                        } else {
                          setIsCustomProfession(false)
                          props.setFieldValue(
                            'profession',
                            selectedOption.value
                          )
                          props.setFieldValue('customProfession', '') // Clear custom profession if selecting from dropdown
                        }
                      }}
                      placeholder="Mesleğinizi Seçin"
                      className="h-12 w-full rounded-2xl outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-grey focus:border-green-500 hover:border-green-500 focus:ring-0 transition-all duration-500"
                    />

                    {/* Custom profession input */}
                    {isCustomProfession && (
                      <div className="mt-3">
                        <Input
                          id="customProfession"
                          name="customProfession"
                          type="text"
                          placeholder="Mesleğinizi Yazın"
                          onChange={props.handleChange}
                          value={props.values.customProfession}
                          className="placeholder:text-gray-400 h-12 rounded-2xl px-4 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-grey focus:border-green-500 hover:border-green-500 focus:ring-0 transition-all duration-500"
                        />
                      </div>
                    )}
                  </div>
                )}

                <DialogFooter className="mt-8 flex sm:justify-center gap-6">
                  <DialogClose>
                    <Button
                      type="button"
                      className="bg-gray-200 hover:bg-gray-300 rounded-xl text-black font-semibold text-md py-7 px-4 transition-all duration-500"
                    >
                      İptal Et
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    className="rounded-xl bg-green-500 hover:bg-green-600 text-white text-md py-7 px-4 transition-all duration-500"
                  >
                    Hemen Kaydol
                  </Button>
                </DialogFooter>
              </Form>
            </DialogContent>
          </Dialog>
        )}
      </Formik>
    </>
  )
}

export default RegisterModal
