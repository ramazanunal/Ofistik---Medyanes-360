'use client';
import React, { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import { IoClose } from 'react-icons/io5';
import { GoDash } from 'react-icons/go';
import { FaEye } from 'react-icons/fa';

// API Fetch
import { postAPI } from '@/services/fetchAPI';
import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';

function RegisterModal() {
  const [showPassword, setShowPassword] = useState({
    password: false,
    passwordConfirm: false,
  });
  const [open, setOpen] = useState(false);
  return (
    <>
      <Formik
        // validationSchema={}
        initialValues={{
          name: '',
          surname: '',
          email: '',
          phone: '',
          password: '',
          passwordConfirm: '',
        }}
        onSubmit={async (values, { resetForm }) => {
          const response = await postAPI('/auth/register', values);
          if (response.error) return toast.error(response.error.message);
          if (response.statusCode === 201) {
            setOpen(false);
            toast.success('Kayıt Başarılı!');
            resetForm();
          } else {
            return toast.error(response.message);
          }
        }}
      >
        {(props) => (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>KAYIT OL</Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[450px]'>
              <DialogHeader className='flex flex-row justify-between items-center'>
                <DialogTitle>Ücretsiz Dene</DialogTitle>
                <DialogClose>
                  <div className='rounded-md p-4 cursor-pointer transition-all duration-700 relative  bg-red-500 hover:bg-green-500 group'>
                    <IoClose
                      size={25}
                      color='#FFF'
                      className='transition-all duration-700 rotate-180 flex absolute group-hover:opacity-0 group-hover:rotate-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                    />
                    <GoDash
                      size={25}
                      color='#FFF'
                      className='rotate-0 transition-all duration-700 opacity-0 group-hover:block group-hover:rotate-180 group-hover:opacity-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                    />
                  </div>
                </DialogClose>
              </DialogHeader>
              <hr />
              <Form>
                {/* Ad Soyad */}
                <div className='grid grid-cols-2 gap-3'>
                  <div className='flex flex-col'>
                    <Label
                      htmlFor='name'
                      className='text-[rgba(4,3,69,.4)] font-bold tracking-[-.16px] text-[13px] mb-3'
                    >
                      Adı
                    </Label>
                    <Input
                      id='name'
                      name='name'
                      type='text'
                      placeholder='Adı'
                      onChange={props.handleChange}
                      value={props.values.name}
                      className='outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-grey focus:border-green-500 hover:border-green-500 focus:ring-0 rounded-md transition-all duration-500'
                    />
                  </div>
                  <div className='flex flex-col'>
                    <Label
                      htmlFor='surname'
                      className='text-[rgba(4,3,69,.4)] font-bold tracking-[-.16px] text-[13px] mb-3'
                    >
                      Soyadı
                    </Label>
                    <Input
                      id='surname'
                      name='surname'
                      type='text'
                      placeholder='Soyadı'
                      onChange={props.handleChange}
                      value={props.values.surname}
                      className='outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-grey focus:border-green-500 hover:border-green-500 focus:ring-0 rounded-md transition-all duration-500'
                    />
                  </div>
                </div>
                {/* Email, Cep Telefonu */}
                <div className='grid grid-cols-2 gap-3 mb-3'>
                  <div className='flex flex-col'>
                    <Label
                      htmlFor='email'
                      className='text-[rgba(4,3,69,.4)] font-bold tracking-[-.16px] text-[13px] mb-3'
                    >
                      E-Posta
                    </Label>
                    <Input
                      id='email'
                      name='email'
                      type='email'
                      placeholder='E Posta'
                      onChange={props.handleChange}
                      value={props.values.email}
                      className='outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-grey focus:border-green-500 hover:border-green-500 focus:ring-0 rounded-md transition-all duration-500'
                    />
                  </div>
                  <div className='flex flex-col'>
                    <Label
                      htmlFor='phone'
                      className='text-[rgba(4,3,69,.4)] font-bold tracking-[-.16px] text-[13px] mb-3'
                    >
                      Cep Numarası
                    </Label>
                    <Input
                      id='phone'
                      name='phone'
                      type='text'
                      placeholder='Cep Numarası'
                      onChange={props.handleChange}
                      value={props.values.phone}
                      className='outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-grey focus:border-green-500 hover:border-green-500 focus:ring-0 rounded-md transition-all duration-500'
                    />
                  </div>
                </div>
                {/* Şifre, Şifre Tekrar*/}
                <div className='grid grid-cols-2 gap-3 mb-3'>
                  <div className='flex flex-col'>
                    <Label
                      htmlFor='password'
                      className='text-[rgba(4,3,69,.4)] font-bold tracking-[-.16px] text-[13px] mb-3'
                    >
                      Şifre
                    </Label>
                    <div className='flex items-center relative'>
                      <Input
                        id='password'
                        name='password'
                        type={`${showPassword.password ? 'text' : 'password'}`}
                        placeholder='Şifre'
                        onChange={props.handleChange}
                        value={props.values.password}
                        className='outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-grey focus:border-green-500 hover:border-green-500 focus:ring-0 rounded-md transition-all duration-500'
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
                  <div className='flex flex-col'>
                    <Label
                      htmlFor='passwordConfirm'
                      className='text-[rgba(4,3,69,.4)] font-bold tracking-[-.16px] text-[13px] mb-3'
                    >
                      Şifre Tekrar
                    </Label>
                    <div className=' flex items-center relative'>
                      <Input
                        id='passwordConfirm'
                        name='passwordConfirm'
                        type={`${
                          showPassword.passwordConfirm ? 'text' : 'password'
                        }`}
                        placeholder='Şifre Tekrar'
                        onChange={props.handleChange}
                        value={props.values.passwordConfirm}
                        className='outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-grey focus:border-green-500 hover:border-green-500 focus:ring-0 rounded-md transition-all duration-500'
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
                <DialogFooter className='mt-4 flex sm:justify-center'>
                  <Button type='submit'>Kayıt Ol</Button>
                </DialogFooter>
              </Form>
            </DialogContent>
          </Dialog>
        )}
      </Formik>
    </>
  );
}

export default RegisterModal;
