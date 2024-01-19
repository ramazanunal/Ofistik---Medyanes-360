'use client';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
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

import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';

function LoginModal() {
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Formik
        // validationSchema={}
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={async (values) => {
          setOpen(false);
          const result = await signIn('credentials', {
            email: values.email,
            password: values.password,
            callbackUrl: '/dashboard',
            redirect: false,
          });
          if (result.error) {
            return toast.error(result.error);
          }
          toast.success('Giriş başarılı');
        }}
      >
        {(props) => (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>GİRİŞ YAP</Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[350px]'>
              <DialogHeader className='flex flex-row justify-between items-center'>
                <DialogTitle>Giriş Yap</DialogTitle>
                <DialogClose>
                  <div className='w-10 h-10 rounded-md p-4 cursor-pointer transition-all duration-700 relative  bg-gray-200/50 hover:bg-red-500 group'>
                    <IoClose
                      size={30}
                      className='text-red-500 transition-all duration-700 rotate-180 flex absolute group-hover:opacity-0 group-hover:rotate-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                    />
                    <GoDash
                      size={30}
                      className='text-white rotate-0 transition-all duration-700 opacity-0 group-hover:block group-hover:rotate-180 group-hover:opacity-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                    />
                  </div>
                </DialogClose>
              </DialogHeader>
              <hr />
              <Form>
                <div className='flex flex-col mb-3'>
                  <Label
                    htmlFor='email'
                    className='text-[rgba(4,3,69,.4)] font-bold tracking-[-.16px] text-[13px] mb-3'
                  >
                    E-Posta
                  </Label>
                  <Input
                    id='email'
                    name='email'
                    type='text'
                    placeholder='E Posta'
                    onChange={props.handleChange}
                    value={props.values.email}
                    className='placeholder:text-gray-400 h-12 rounded-2xl px-4 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-grey focus:border-green-500 hover:border-green-500 focus:ring-0 transition-all duration-500'
                  />
                </div>
                <div className='flex flex-col mb-3'>
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
                      type={`${showPassword ? 'text' : 'password'}`}
                      placeholder='Şifre'
                      onChange={props.handleChange}
                      value={props.values.password}
                      className='placeholder:text-gray-400 h-12 rounded-2xl px-4 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-grey focus:border-green-500 hover:border-green-500 focus:ring-0 transition-all duration-500'
                    />
                    <FaEye
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute right-[16px] ${
                        showPassword ? 'text-green-500' : 'text-gray-200'
                      } hover:text-green-500 cursor-pointer transition-all duration-500`}
                      size={25}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type='submit'
                    className='rounded-xl bg-green-500 hover:bg-green-600 text-white text-md py-4 px-4 transition-all duration-500'
                  >
                    Giriş Yap
                  </Button>
                </DialogFooter>
              </Form>
            </DialogContent>
          </Dialog>
        )}
      </Formik>
    </>
  );
}

export default LoginModal;
