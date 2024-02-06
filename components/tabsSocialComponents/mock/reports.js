const reports = [
    {
        id: "0",
        name: "spam",
        child: {
            id: "0.1",
            name: "Bize bildirdiğiniz için teşekkürler",
            description: "Geri bildirimleriniz topluluğu güvende tutmamıza yardımcı olmak açısından önemlidir.",
        }
    },
    {
        id: "1",
        name: "Çıplaklık veya cinsel aktivite",
        child: {
            id: "1.1",
            name: "Bu gönderiyi neden rapor ediyorsunuz?",
            radioList: [
                { id: 0, name: "Çıplaklık veya cinsel aktivite" },
                { id: 1, name: "Cinsel istismar veya talep" },
                { id: 2, name: "Özel görüntüleri paylaşma" },
                { id: 3, name: "Çocuk istismarı" },
            ],
            listTitle: "Çıplaklık veya cinsel aktivite yönergeleri",
            listSubtitle: "Kaldırıyoruz:",
            listItems: [
                "Cinsel ilişki, cinsel organlar ve tamamen çıplak kalçaların yakın çekimlerini gösteren fotoğraflar, videolar ve dijital olarak oluşturulmuş bazı içerikler.",
                "Kadın meme uçlarının bazı fotoğraflarına, ancak mastektomi sonrası yara izi ve aktif olarak emziren kadınların videolarına izin verilir.",
                "Resim ve heykel fotoğraflarında çıplaklık sorun değildir.",
                "Çıplak veya kısmen çıplak çocukları gösteren videoları kaldırabileceğimiz zamanlar vardır.",
                "Başkalarının izinsiz paylaşılan mahrem görüntüleri.",
            ],
            child: {
                id: "1.1.1",
                name: "Bu gönderiyi bildirdiğiniz için teşekkürler",
                description: "You'll get a notification once we review your report. Thanks for helping us keep Instagram a safe and supportive community.",
            }
        }
    },
    {
        id: "2",
        name: "Nefret söylemi veya sembolleri",
        child: {
            id: "2.1",
            name: "Nefret söylemi veya sembolleri yönergeleri",
            listSubtitle: "Kaldırıyoruz:",
            listItems: [
                "Nefret söylemi veya sembollerinin fotoğrafları veya videoları.",
                "Şiddeti teşvik eden veya herhangi bir kişiye kim olduğu temelinde saldıran başlıklar içeren gönderiler.",
                "Belirli fiziksel zarar, hırsızlık veya vandalizm tehditleri.",
            ],
            child: {
                id: "2.1.1",
                name: "Bu gönderiyi bildirdiğiniz için teşekkürler",
                description: "You'll get a notification once we review your report. Thanks for helping us keep Instagram a safe and supportive community.",
            }
        }
    },
    {
        id: "3",
        name: "Şiddet veya tehlikeli organizasyonlar",
        child: {
            id: "3.1",
            name: "Bu gönderiyi neden rapor ediyorsunuz?",
            radioList: [
                { id: 0, name: "Şiddet Tehdidi" },
                { id: 1, name: "Hayvan istismarı" },
                { id: 2, name: "Ölüm veya ağır yaralanma" },
                { id: 3, name: "Tehlikeli kuruluşlar veya bireyler" },
            ],
            listTitle: "Şiddet veya tehlikeli kuruluşlar yönergeleri",
            listSubtitle: "Kaldırıyoruz:",
            listItems: [
                "Aşırı grafik şiddet içeren fotoğraflar veya videolar.",
                "Herhangi bir kişiye dini, etnik veya cinsel geçmişine dayalı şiddet veya saldırıları teşvik eden gönderiler.",
                "Belirli fiziksel zarar, hırsızlık, vandalizm veya mali zarar tehditleri.",
            ],
            child: {
                id: "3.1.1",
                name: "Bu gönderiyi bildirdiğiniz için teşekkürler",
                description: "You'll get a notification once we review your report. Thanks for helping us keep Instagram a safe and supportive community.",
            }
        }
    },
    {
        id: "4",
        name: "Yasa dışı veya düzenlemeye tabi malların satışı",
        child: {
            id: "4.1",
            name: "Bu gönderiyi neden rapor ediyorsunuz?",
            radioList: [
                { id: 0, name: "Sahte sağlık belgeleri" },
                { id: 1, name: "Uyuşturucu, alkol veya tütün" },
                { id: 2, name: "Ateşli Silahlar" },
                { id: 3, name: "Zayıflama ürünleri veya kozmetik prosedürler" },
                { id: 4, name: "Hayvanlar" },
            ],
            listTitle: "Yasadışı veya düzenlenmiş malların satışı yönergeleri",
            listSubtitle: "Yasadışı veya düzenlenmiş malları aşağıdaki gibi şeyler olarak tanımlıyoruz:",
            listItems: [
                "Sahte sağlık belgeleri.",
                "Eğlence amaçlı veya farmasötik ilaçların alımı, satımı veya ticareti.",
                "Eğlence amaçlı uyuşturucu kullanımını teşvik etmek.",
                "İnsanlar arasında silah, mühimmat, patlayıcı, tütün, canlı hayvan veya hayvan parçaları satışı veya ticareti.",
            ],
            child: {
                id: "4.1.1",
                name: "Bu gönderiyi bildirdiğiniz için teşekkürler",
                description: "You'll get a notification once we review your report. Thanks for helping us keep Instagram a safe and supportive community.",
            }
        }
    },
    {
        id: "5",
        name: "Zorbalık veya taciz",
        child: {
            id: "5.1",
            name: "Kim zorbalığa veya tacize uğruyor?",
            buttons: [
                { id: 0, name: "Bana" },
                { id: 1, name: "Tanıdığım birine" },
                { id: 2, name: "Başka birine" },
            ],
            child: {
                id: "5.1.1",
                name: "Zorbalık veya taciz yönergeleri",
                listSubtitle: "Kaldırıyoruz:",
                listItems: [
                    "İnsanları tehdit eden, aşağılayan veya utandıran gönderiler.",
                    "İnsanları taciz etmek veya şantaj yapmak için paylaşılan kişisel bilgiler içeren gönderiler.",
                    "Başkalarının mahrem görüntülerini yayınlamak veya yayınlamakla tehdit etmek. Instagram'ın bu davranış için sıfır tolerans politikası vardır."
                ],
                child: {
                    id: "5.1.1.1",
                    name: "Bu gönderiyi bildirdiğiniz için teşekkürler",
                    description: "You'll get a notification once we review your report. Thanks for helping us keep Instagram a safe and supportive community.",
                }
            }
        }
    },
    {
        id: "6",
        name: "Fikri mülkiyet ihlali",
        child: {
            id: "6.1",
            name: "Fikri mülkiyet ihlali yönergeleri",
            listSubtitle: "Kaldırıyoruz:",
            listItems: [
                "Telif Hakkı ihlali",
                "Ticari Marka ihlali",
            ],
            child: {
                id: "6.1.1",
                name: "Bu gönderiyi bildirdiğiniz için teşekkürler",
                description: "You'll get a notification once we review your report. Thanks for helping us keep Instagram a safe and supportive community.",
            }
        }
    },
    {
        id: "7",
        name: "İntihar veya kendine zarar verme",
        child: {
            id: "7.1",
            name: "İntihar veya kendine zarar verme yönergeleri",
            description: "Bu gibi hassas konular söz konusu olduğunda, toplumumuzu desteklemek istiyoruz.",
            listSubtitle: "Kaldırıyoruz:",
            listItems: [
                "İntihar ve kesmeyi de içeren kendine zarar vermeyi teşvik eden veya destekleyen gönderiler.",
                "Gönderinin saldırması ya da dalga geçmesi durumunda kendini yaralama mağdurları."
            ],
            child: {
                id: "7.1.1",
                name: "Bu gönderiyi bildirdiğiniz için teşekkürler",
                description: "You'll get a notification once we review your report. Thanks for helping us keep Instagram a safe and supportive community.",
            }
        }
    },
    {
        id: "8",
        name: "Yeme bozuklukları",
        child: {
            id: "8.1",
            name: "Yeme bozuklukları yönergeleri",
            description: "Bu gibi hassas konular söz konusu olduğunda, toplumumuzu desteklemek istiyoruz.",
            listSubtitle: "Kaldırıyoruz:",
            listItems: [
                "Yeme bozukluklarını teşvik eden veya destekleyen gönderiler.",
                "Yeme bozuklukları hakkında yanlış bilgi veren gönderiler."
            ],
            child: {
                id: "8.1.1",
                name: "Bu gönderiyi bildirdiğiniz için teşekkürler",
                description: "You'll get a notification once we review your report. Thanks for helping us keep Instagram a safe and supportive community.",
            }
        }
    },
    {
        id: "9",
        name: "Sahtecilik veya dolandırıcılık",
        child: {
            id: "9.1.1",
            name: "Bu gönderiyi bildirdiğiniz için teşekkürler",
            description: "You'll get a notification once we review your report. Thanks for helping us keep Instagram a safe and supportive community.",
        }
    },
    {
        id: "10",
        name: "Yanlış bilgi",
        child: {
            id: "10.1",
            name:"Bu gönderiyi neden rapor ediyorsunuz?",
            buttons:[
                { id: 0, name: "Sağlık" },
                { id: 1, name: "Politika" },
                { id: 2, name: "Sosyal sorun" },
                { id: 3, name: "Diğer" },
            ],
            child: {
                id: "10.1.1",
                name: "Bu gönderiyi bildirdiğiniz için teşekkürler",
                description: "You'll get a notification once we review your report. Thanks for helping us keep Instagram a safe and supportive community.",
            }
        }
    },
    {
        id: 11,
        name: "Sadece bundan hoşlanmadım",
        child: {
            id: "0.1",
            name: "Bize bildirdiğiniz için teşekkürler",
            description: "hoşunuza gitmeyen bir şey gördüğünüzde, Topluluk Kurallarımıza uymuyorsa bunu bildirebilir veya paylaşan kişiyi deneyiminizden kaldırabilirsiniz.",
        }
    },
];

export default reports;