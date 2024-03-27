import sunset from "@/assets/image/e2d22020-3246-4f14-848a-b8fdcc83a151.jpg";
import traveler from "@/assets/image/6dee96b3-b6cc-4b50-81bf-35f2a76e5a7e.jpg";
import coffeelover from "@/assets/image/e49eaf8f-d9c6-4b99-b8bc-576de8646f73.jpg";
import fitness from "@/assets/image/ee773997-b6d3-4860-b734-3de8e299ac69.jpg";
import music from "@/assets/image/15f8e6c2-f4ee-468f-beb8-5f82817b6598.jpg";
import bookworm from "@/assets/image/1b6d7a8f-e9d1-4188-a9e7-b1b28eaf8fbf.jpg";
import fashionista from "@/assets/image/4be28fba-4961-4994-845b-feabcdb2800b.jpg";
import pets from "@/assets/image/b39c1ca8-de44-496e-8d4f-887006cefdd5.jpg";
import art from "@/assets/image/a0d42d0e-5444-4164-b3d0-6ea28e4d3a39.jpg";
import throwback from "@/assets/image/16359f96-f0fe-4bdf-9ec6-e63a596e83fa.jpg";
import artistthumbnail from "@/assets/image/artistthumbnail.jpg";
import foodthumbnail from "@/assets/image/foodthumbnail.jpg";

const posts = [
  {
    id: 1,
    username: "batuhantanir",
    caption: "Günbatımında huzurlu anlar. 🌅 #sunset #naturelover",
    category: "nature",
    isLiked: true,
    image_url: sunset,
    saveBook: false,
    likes: 120,
    comments: [],
    timestamp: "2024-01-10T17:45:00",
  },
  {
    id: 15,
    username: "foodie",
    caption: "Lezzetli bir yemek tarifi! 🍲 #cooking",
    image_url: foodthumbnail,
    video_url: "/assets/video/food.mp4",
    type: "video",
    category: "food",
    likes: 250,
    saveBook: true,
    isLiked: false,
    comments: [
      {
        id: 1101,
        username: "chef",
        comment: "Bu tarifi deneyeceğim!",
        timestamp: "2024-01-20T14:30:00",
      },
      {
        id: 1102,
        username: "foodlover",
        comment: "Harika görünüyor!",
        timestamp: "2024-01-20T14:45:00",
      },
    ],
    timestamp: "2024-01-20T14:15:00",
  },
  {
    id: 2,
    username: "traveler123",
    caption:
      "Yeni yerler keşfetmek her zaman heyecan verici! asdbjas asdh asjkldhklash lkdas dasıodhıoashdıoashıo dıoas ıdo asıdh ıoasdıo asıodhıası doha ıosd ıoashdo asooıasoıdh ıoa soıd hasıohd ıoasıo dhaoıs dhoıashıo doaı s 🌍 #travel",
    category: "travel",
    image_url: traveler,
    saveBook: true,
    likes: 85,
    isLiked: false,
    comments: [
      {
        id: 201,
        username: "globetrotter",
        comment: "Hangi şehirde bu güzel manzarayı buldun?",
        timestamp: "2024-01-11T09:30:00",
      },
      {
        id: 202,
        username: "adventureseeker",
        comment: "Bu benim de gitmek istediğim bir yer!",
        timestamp: "2024-01-11T09:45:00",
      },
    ],
    timestamp: "2024-01-11T09:15:00",
  },
  {
    id: 3,
    username: "coffeelover",
    caption: "Kahve zamanı! ☕️ #coffeetime",
    category: "lifestyle",
    saveBook: false,
    isLiked: false,
    image_url: coffeelover,
    likes: 200,
    comments: [
      {
        id: 301,
        username: "baristamaster",
        comment: "Bu kahve harika görünüyor!",
        timestamp: "2024-01-12T11:15:00",
      },
      {
        id: 302,
        username: "coffeeaddict",
        comment: "Sizce en iyi kahve nerde yapılır?",
        timestamp: "2024-01-12T11:30:00",
      },
    ],
    timestamp: "2024-01-12T11:00:00",
  },
  {
    id: 12,
    username: "artenthusiast",
    caption: "Ressamın çalışma süreci! 🎨 #art",
    image_url: artistthumbnail,
    video_url: "/assets/video/artist.mp4",
    type: "video",
    category: "art",
    likes: 300,
    isLiked: false,
    saveBook: true,
    comments: [
      {
        id: 1201,
        username: "artcritic",
        comment: "Bu sanat eseri beni etkiledi!",
        timestamp: "2024-01-21T17:00:00",
      },
      {
        id: 1202,
        username: "creativemind",
        comment: "Ressamın yeteneği olağanüstü!",
        timestamp: "2024-01-21T17:15:00",
      },
    ],
    timestamp: "2024-01-21T16:45:00",
  },
  {
    id: 4,
    username: "fitnessfreak",
    caption: "Spor yapmanın keyfini çıkartıyorum! 💪 #fitness",
    category: "health",
    image_url: fitness,
    isLiked: true,
    saveBook: false,
    likes: 150,
    comments: [
      {
        id: 401,
        username: "healthyliving",
        comment: "Hangi egzersizleri yapıyorsunuz?",
        timestamp: "2024-01-13T15:45:00",
      },
      {
        id: 402,
        username: "workoutbuddy",
        comment: "Ben de bugün antrenman yapacağım!",
        timestamp: "2024-01-13T16:00:00",
      },
    ],
    timestamp: "2024-01-13T15:30:00",
  },
  {
    id: 5,
    username: "musiclover",
    caption: "Müzik ruhun gıdasıdır! 🎶 #music",
    category: "music",
    image_url: music,
    likes: 180,
    saveBook: false,
    isLiked: false,
    comments: [
      {
        id: 501,
        username: "concertgoer",
        comment: "Favori müzik grubunuz kim?",
        timestamp: "2024-01-14T20:30:00",
      },
      {
        id: 502,
        username: "musician",
        comment: "Müzikle yaşamak çok güzel!",
        timestamp: "2024-01-14T20:45:00",
      },
    ],
    timestamp: "2024-01-14T20:15:00",
  },
  {
    id: 6,
    username: "bookworm",
    caption: "Bir kitapla baş başa kalmak. 📚 #reading",
    category: "books",
    image_url: bookworm,
    likes: 100,
    saveBook: false,
    isLiked: false,
    comments: [
      {
        id: 601,
        username: "bibliophile",
        comment: "Favori kitabınız nedir?",
        timestamp: "2024-01-15T14:00:00",
      },
      {
        id: 602,
        username: "bookclub",
        comment: "Bu kitap hakkında ne düşünüyorsunuz?",
        timestamp: "2024-01-15T14:15:00",
      },
    ],
    timestamp: "2024-01-15T13:45:00",
  },
  {
    id: 11,
    username: "foodie",
    caption: "Lezzetli bir yemek tarifi! 🍲 #cooking",
    image_url: foodthumbnail,
    video_url: "/assets/video/food.mp4",
    type: "video",
    category: "food",
    likes: 250,
    saveBook: true,
    isLiked: false,
    comments: [
      {
        id: 1101,
        username: "chef",
        comment: "Bu tarifi deneyeceğim!",
        timestamp: "2024-01-20T14:30:00",
      },
      {
        id: 1102,
        username: "foodlover",
        comment: "Harika görünüyor!",
        timestamp: "2024-01-20T14:45:00",
      },
    ],
    timestamp: "2024-01-20T14:15:00",
  },
  {
    id: 7,
    username: "fashionista",
    caption:
      "Moda her zaman baksjfksajfğpf askpğksafkpfas pkfsaasf asfasfkaskfüpğaslğüflasğül fğüaslğüflasğüflü ğaslfğü alsğfülasğüfla sfasşflms aflkasfkir tutkudur! 👗 #fashion",
    category: "fashion",
    image_url: fashionista,
    saveBook: false,
    likes: 220,
    isLiked: false,
    comments: [
      {
        id: 701,
        username: "styleicon",
        comment: "Bu kombin çok şık!",
        timestamp: "2024-01-16T18:45:00",
      },
      {
        id: 702,
        username: "trendsetter",
        comment: "Moda dünyasında yeni trendler neler?",
        timestamp: "2024-01-16T19:00:00",
      },
    ],
    timestamp: "2024-01-16T18:30:00",
  },
  {
    id: 8,
    username: "petlover",
    caption: "Evimizdeki küçük dostlar. 🐾 #pets",
    category: "pets",
    image_url: pets,
    saveBook: false,
    isLiked: false,
    likes: 130,
    comments: [
      {
        id: 801,
        username: "animallover",
        comment: "Bu köpek ne kadar sevimli!",
        timestamp: "2024-01-17T12:30:00",
      },
      {
        id: 802,
        username: "petowner",
        comment: "Benim de bir kediğim var!",
        timestamp: "2024-01-17T12:45:00",
      },
    ],
    timestamp: "2024-01-17T12:15:00",
  },
  {
    id: 9,
    username: "artistic",
    caption: "Sanatın gücüne hayranım! 🎨 #art",
    category: "art",
    image_url: art,
    likes: 190,
    saveBook: false,
    isLiked: false,
    comments: [
      {
        id: 901,
        username: "artlover",
        comment: "Ressamın eseri mi?",
        timestamp: "2024-01-18T16:15:00",
      },
      {
        id: 902,
        username: "creativemind",
        comment: "Bu tablodaki detaylar muazzam!",
        timestamp: "2024-01-18T16:30:00",
      },
    ],
    timestamp: "2024-01-18T16:00:00",
  },
  {
    id: 10,
    username: "throwback",
    caption: "Güzel anılar biriktirmek önemli! 📸 #throwback",
    category: "memories",
    image_url: throwback,
    likes: 160,
    saveBook: true,
    isLiked: false,
    comments: [
      {
        id: 1001,
        username: "nostalgic",
        comment: "Eski zamanlar ne güzeldi!",
        timestamp: "2024-01-19T21:00:00",
      },
      {
        id: 1002,
        username: "memories",
        comment: "Bu fotoğrafı nerede çektiniz?",
        timestamp: "2024-01-19T21:15:00",
      },
    ],
    timestamp: "2024-01-19T20:45:00",
  },
  {
    id: 10,
    username: "throwback",
    caption: "Güzel anılar biriktirmek önemli! 📸 #throwback",
    category: "memories",
    image_url: throwback,
    likes: 160,
    saveBook: true,
    isLiked: false,
    comments: [
      {
        id: 1001,
        username: "nostalgic",
        comment: "Eski zamanlar ne güzeldi!",
        timestamp: "2024-01-19T21:00:00",
      },
      {
        id: 1002,
        username: "memories",
        comment: "Bu fotoğrafı nerede çektiniz?",
        timestamp: "2024-01-19T21:15:00",
      },
    ],
    timestamp: "2024-01-28T10:29:00",
  },
];

export default posts;
