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

function RegisterModal() {
  const [showPassword, setShowPassword] = useState({
    password: false,
    passwordAgain: false,
  });
  return (
    <Dialog>
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
              type='text'
              placeholder='Adı'
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
              type='text'
              placeholder='Soyadı'
              className='outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-grey focus:border-green-500 hover:border-green-500 focus:ring-0 rounded-md transition-all duration-500'
            />
          </div>
        </div>
        {/* Email, Cep Telefonu */}
        <div className='grid grid-cols-2 gap-3'>
          <div>
            <Label
              htmlFor='eposta'
              className='text-[rgba(4,3,69,.4)] font-bold tracking-[-.16px] text-[13px] mb-3'
            >
              E-Posta
            </Label>
            <Input
              id='eposta'
              type='text'
              placeholder='E Posta'
              className='outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-grey focus:border-green-500 hover:border-green-500 focus:ring-0 rounded-md transition-all duration-500'
            />
          </div>
          <div>
            <Label
              htmlFor='cepNumarasi'
              className='text-[rgba(4,3,69,.4)] font-bold tracking-[-.16px] text-[13px] mb-3'
            >
              Cep Numarası
            </Label>
            <Input
              id='cepNumarasi'
              type='text'
              placeholder='Cep Numarası'
              className='outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-grey focus:border-green-500 hover:border-green-500 focus:ring-0 rounded-md transition-all duration-500'
            />
          </div>
        </div>
        {/* Şifre, Şifre Tekrar*/}
        <div className='grid grid-cols-2 gap-3'>
          <div className='flex flex-col'>
            <Label
              htmlFor='password'
              className='text-[rgba(4,3,69,.4)] font-bold tracking-[-.16px] text-[13px] mb-3'
            >
              Şifre
            </Label>
            <div className=' flex items-center relative'>
              <Input
                id='password'
                name='password'
                type={`${showPassword.password ? 'password' : 'text'}`}
                placeholder='Şifre'
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
                  showPassword.password ? 'text-gray-200' : 'text-green-500'
                } hover:text-green-500 cursor-pointer transition-all duration-500`}
                size={25}
              />
            </div>
          </div>
          <div className='flex flex-col'>
            <Label
              htmlFor='passwordAgain'
              className='text-[rgba(4,3,69,.4)] font-bold tracking-[-.16px] text-[13px] mb-3'
            >
              Şifre Tekrar
            </Label>
            <div className=' flex items-center relative'>
              <Input
                id='passwordAgain'
                name='passwordAgain'
                type={`${showPassword.passwordAgain ? 'password' : 'text'}`}
                placeholder='Şifre Tekrar'
                className='outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-grey focus:border-green-500 hover:border-green-500 focus:ring-0 rounded-md transition-all duration-500'
              />
              <FaEye
                onClick={() =>
                  setShowPassword({
                    ...showPassword,
                    passwordAgain: !showPassword.passwordAgain,
                  })
                }
                className={`absolute right-[16px] ${
                  showPassword.passwordAgain
                    ? 'text-gray-200'
                    : 'text-green-500'
                } hover:text-green-500 cursor-pointer transition-all duration-500`}
                size={25}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type='submit'>Kayıt Ol</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default RegisterModal;
