import { GrValidate } from 'react-icons/gr';
import { BsCameraVideoOff } from 'react-icons/bs';
import { MdUpdateDisabled } from 'react-icons/md';
import { LuMessagesSquare } from 'react-icons/lu';

export default [
  {
    id: 1,
    title: '15 Gün İçinde İade İmkanı',
    desc: '15 Gün İçinde İade İmkanı',
    icon: <GrValidate className='text-[60px] text-primary opacity-70' />,
    photoUrl:
      'https://uxwing.com/wp-content/themes/uxwing/download/hand-gestures/good-icon.png',
  },
  {
    id: 2,
    title: 'Güvendesiniz, Endişelenmeyin',
    desc: 'Terapizone kişisel bilgilerinizi ve  video görüşmelerinizi kayıt altına almaz.',
    icon: <BsCameraVideoOff className='text-[60px] text-primary opacity-70' />,
    photoUrl: '',
  },
  {
    id: 3,
    title: '24 Saate Kadar Seans İptali',
    desc: 'Planlarda değişiklik olduğunda, seansınıza 24 saat kalana kadar iptal edebilirsiniz.',
    icon: (
      <MdUpdateDisabled className='text-[60px] text-iconColor opacity-70' />
    ),
    photoUrl: '',
  },
  {
    id: 4,
    title: '7/24 Canlı Destek',
    desc: 'Terapizone, ihtiyacınız olduğu her an size destek olmak için yanınızda!',
    icon: (
      <LuMessagesSquare className='text-[60px] text-iconColor opacity-70' />
    ),
    photoUrl: '',
  },
];
