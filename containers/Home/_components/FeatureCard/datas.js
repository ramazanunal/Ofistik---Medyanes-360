import { GrValidate } from 'react-icons/gr';
import { BsCameraVideoOff } from 'react-icons/bs';
import { MdUpdateDisabled } from 'react-icons/md';
import { LuMessagesSquare } from 'react-icons/lu';

export const featureCardHizmetVer = [
  {
    id: 1,
    title: 'ÜYELİK ÜCRETİ YOK',
    desc: "Ofistik'de herhangi bir kayıt,üyelik,aylık gibi düzenli bir ücret ödemezsiniz. Sadece gerçekleşen randevularınız üzerinden kazancınız oranında komisyon alınır.",
    icon: <GrValidate className='text-[40px] lg:text-[60px] text-primary opacity-70' />,
  },
  {
    id: 2,
    title: 'GÜVENDESİNİZ, ENDİŞELENMEYİN',
    desc: 'Online görüşmeleriniz, mesajlarınız esnasında hizmet veren ile paylaştığınız ses, fotoğraf, video, belge ve yazışmalara Ofistik erişim sağlayamaz ve kayıt altına almaz.',
    icon: <BsCameraVideoOff className='text-[40px] lg:text-[60px] text-primary opacity-70' />,
    photoUrl: '',
  },
  {
    id: 3,
    title: '12 SAATE KADAR İPTAL FIRSATI',
    desc: 'Planlarınızda değişiklik olduğunda oluşturduğunuz randevuyu saat kalana kadar iptal edebilirsiniz.',
    icon: (
      <MdUpdateDisabled className='text-[40px] lg:text-[60px] text-iconColor opacity-70' />
    ),
    photoUrl: '',
  },
  {
    id: 4,
    title: 'CANLI DESTEK',
    desc: 'Ofistik, ihtiyacınız olduğu her an size destek olmak için yanınızda.',
    icon: (
      <LuMessagesSquare className='text-[40px] lg:text-[60px] text-iconColor opacity-70' />
    ),
    photoUrl: '',
  },
];

export const featureCardHizmetAl = [
  {
    id: 1,
    title: 'ONAYLI UZMAN KADRO',
    desc: 'Uzmanlarımız,Ofistik tarafından mesleki tüm belge ve evraklarının detaylı incelenmesi sonucu onaylanarak hizmet vermeye  başlar.',
    icon: <GrValidate className='text-[40px] lg:text-[60px] text-primary opacity-70' />,
  },
  {
    id: 2,
    title: 'GÜVENDESİNİZ, ENDİŞELENMEYİN',
    desc: 'Online görüşmeleriniz,mesajlarınız esnasında hizmet veren ile paylaştığınız ses,fotoğraf,video,belge ve yazışmalara Ofistik erişim sağlayamaz ve kayıt altına almaz.',
    icon: <BsCameraVideoOff className='text-[40px] lg:text-[60px] text-primary opacity-70' />,
    photoUrl: '',
  },
  {
    id: 3,
    title: '12 SAATE KADAR İPTAL FIRSATI',
    desc: 'Planlarınızda değişiklik olduğunda oluşturduğunuz randevuyu saat kalana kadar iptal edebilirsiniz.',
    icon: (
      <MdUpdateDisabled className='text-[40px] lg:text-[60px] text-iconColor opacity-70' />
    ),
    photoUrl: '',
  },
  {
    id: 4,
    title: 'CANLI DESTEK',
    desc: 'Ofistik, ihtiyacınız olduğu her an size destek olmak için yanınızda.',
    icon: (
      <LuMessagesSquare className='text-[40px] lg:text-[60px] text-iconColor opacity-70' />
    ),
    photoUrl: '',
  },
];
