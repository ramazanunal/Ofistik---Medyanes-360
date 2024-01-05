'use client'
import React, {useRef, useState} from "react";
import MenuArea from "@/components/slider/menuArea";
import PageHeader from "@/components/slider/pageHeader";
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import EmployeeCard from "@/components/slider/card";

function CardSlider() {
    const [clickedButtonId, setClickedButtonId] = useState(null);
    const cardAreaRef = useRef(null);

    const handleButtonClick = (id) => setClickedButtonId(id);

    const employees = [
        {
            image:
                "https://api.hidoctor.health/assets/users/I1MhQGUueW5ZSzgvTGxPTFdvTkVXZHZ0RmQzZz09/IMG/1672396929619121.jpg",
            status: 1,
            starNumber: 5,
            name: "Berkant Güney",
            job: "Psikolog | Aile Danışmanı",
            category: "psikolog",
            videoNumber: 236,
            callNumber: 24,
            language: "TR",
            skills: [
                "Kaygı (Anksiyete)",
                "Depresyon",
                "Travma Sonrası Stres Bozukluğu",
                "Obsesif Kompulsif Bozukluk",
                "Uyum Bozuklukları",
            ],
            price: 420,
            showedSkillsNumber: 5,
            apointmentDate: "12 aralık 2023",
            commentNumber: 17,
            minSessionTime: 45,
        },
        {
            image:
                "https://api.hidoctor.health/assets/users/I1MhQGUuaFEwQ0R6SFd0OTh0L0JOWlRMcnpvUT09/etc/1697528520527728.png",
            status: 1,
            starNumber: 5,
            name: "Doğu Yıldırım",
            job: "Psikolog | Aile Danışmanı",
            category: "psikolog",
            videoNumber: 236,
            callNumber: 24,
            language: "TR",
            skills: [
                "Kaygı (Anksiyete)",
                "Depresyon",
                "Travma Sonrası Stres Bozukluğu",
                "Obsesif Kompulsif Bozukluk",
                "Uyum Bozuklukları",
            ],
            price: 420,
            showedSkillsNumber: 5,
            apointmentDate: "12 aralık 2023",
            commentNumber: 1,
            minSessionTime: 45,
        },
        {
            image:
                "https://api.hidoctor.health/assets/users/I1MhQGUuaFEwQ0R6SFd0OTh0L0JOWlRMcnpvUT09/etc/1694610836523525.png",
            status: 1,
            starNumber: 5,
            name: "Mert Berber",
            job: "Psikolog | Aile Danışmanı",
            category: "diyetisyen",
            videoNumber: 236,
            callNumber: 24,
            language: "TR",
            skills: [
                "Kaygı (Anksiyete)",
                "Depresyon",
                "Travma Sonrası Stres Bozukluğu",
                "Obsesif Kompulsif Bozukluk",
                "Uyum Bozuklukları",
            ],
            price: 420,
            showedSkillsNumber: 5,
            apointmentDate: "12 aralık 2023",
            commentNumber: 5,
            minSessionTime: 45,
        },
        {
            image:
                "https://api.hidoctor.health/assets/users/I1MhQGUuVmc5Tm1UaGRnUDlZTFU0RWljam9JUT09/IMG/1689749032870658.png",
            status: 1,
            starNumber: 4,
            name: "Görkem Erva Demir",
            job: "Psikolog | Aile Danışmanı",
            category: "sporEgitmeni",
            videoNumber: 75,
            callNumber: 6,
            language: "TR",
            skills: [
                "Depresyon",
                "Kaygı (Anksiyete)",
                "Fobiler",
                "Obsesif Kompulsif Bozukluk",
                "İlişki Sorunları",
            ],
            price: 320,
            showedSkillsNumber: 3,
            apointmentDate: "12 aralık 2023",
            commentNumber: 15,
            minSessionTime: 45,
        },
        {
            image:
                "https://api.hidoctor.health/assets/users/I1MhQGUuS1ltWFhRR0wyM05nbWlUTGl5Z0N3QT09/etc/1699606910571076.png",
            status: 1,
            starNumber: 5,
            name: "Fatma Türkan Pehlivan",
            job: "Psikolog | Aile Danışmanı",
            category: "psikolog",
            videoNumber: 2,
            callNumber: 1,
            language: "TR",
            skills: [
                "Bireysel Terapi",
                "Aile ve Çift Terapisi",
                "Varoluşsal Problemler",
                "Depresyon",
                "Özgüven Problemleri",
            ],
            price: 480,
            showedSkillsNumber: 4,
            apointmentDate: "12 aralık 2023",
            commentNumber: 9,
            minSessionTime: 45,
        },
        {
            image:
                "https://api.hidoctor.health/assets/users/I1MhQGUuSzM1VVoxUUVhZk5IbmlYa1ZFL1pZUT09/etc/1701238374838241.png",
            status: 1,
            starNumber: 5,
            name: "Berkan Çelik",
            job: "Psikolog | Aile Danışmanı",
            category: "psikolog",
            videoNumber: 1,
            callNumber: 0,
            language: "TR",
            skills: [
                "İlişki Sorunları",
                "Yas Süreci",
                "Travma Sonrası Stres Bozukluğu",
                "Depresyon",
                "Fobiler",
            ],
            price: 410,
            showedSkillsNumber: 4,
            apointmentDate: "12 aralık 2023",
            commentNumber: 12,
            minSessionTime: 45,
        },
        {
            image:
                "https://api.hidoctor.health/assets/users/I1MhQGUuaFEwQ0R6SFd0OTh0L0JOWlRMcnpvUT09/etc/1695040157790430.png",
            status: 1,
            starNumber: 5,
            name: "Sosin Yakacı",
            job: "Diyetisyen",
            category: "diyetisyen",
            videoNumber: 7,
            callNumber: 2,
            language: "TR | EN",
            skills: [
                "Kilo Verme",
                "Obezite",
                "Hamilelik ve Doğum Sonrası Beslenme",
                "İnsülin Direncinde Beslenme",
                "Kolesterol ve Beslenme",
            ],
            price: 350,
            showedSkillsNumber: 3,
            apointmentDate: "12 aralık 2023",
            commentNumber: 3,
            minSessionTime: 45,
        },
        {
            image:
                "https://api.hidoctor.health/assets/users/I1MhQGUuS1ltWFhRR0wyM05nbWlUTGl5Z0N3QT09/etc/1699952063617327.png",
            status: 0,
            starNumber: 5,
            name: "Tunahan Berber",
            job: "Diyetisyen",
            category: "diyetisyen",
            videoNumber: 0,
            callNumber: 1,
            language: "TR",
            skills: [
                "Kilo Verme",
                "Kilo Alma",
                "Kilo Kontrolü",
                "Sporcu Beslenmesi",
                "Obezite",
            ],
            price: 395,
            showedSkillsNumber: 3,
            apointmentDate: "12 aralık 2023",
            commentNumber: 8,
            minSessionTime: 45,
        },
        {
            image:
                "https://api.hidoctor.health/assets/users/I1MhQGUuaFEwQ0R6SFd0OTh0L0JOWlRMcnpvUT09/etc/1695974512263910.png",
            status: 0,
            starNumber: 4,
            name: "Güldane Coşkun",
            job: "Diyetisyen",
            category: "diyetisyen",
            videoNumber: 1,
            callNumber: 1,
            language: "TR",
            skills: [
                "Obezite",
                "Kilo Kontrolü",
                "Diyabet (Şeker) Hastalığında  Beslenme",
                "Hamilelik ve Doğum Sonrası Beslenme",
                "Çocukluk ve Ergenlikte Beslenme",
            ],
            price: 270,
            showedSkillsNumber: 5,
            apointmentDate: "12 aralık 2023",
            commentNumber: 1,
            minSessionTime: 45,
        },
        {
            image:
                "https://api.hidoctor.health/assets/users/I1MhQGUuaFEwQ0R6SFd0OTh0L0JOWlRMcnpvUT09/etc/1693209559158695.png",
            status: 0,
            starNumber: 4,
            name: "İrfan Yüncü",
            job: "Fitness Eğitmeni",
            category: "sporEgitmeni",
            videoNumber: 0,
            callNumber: 0,
            language: "TR",
            skills: [
                "Fonksiyonel Antrenman",
                "Atletik Performans",
                "Medikal Fitness",
                "Düzeltici Egzersizler",
            ],
            price: 245,
            showedSkillsNumber: 4,
            apointmentDate: "12 aralık 2023",
            commentNumber: 11,
            minSessionTime: 45,
        },
    ];

    return (
        <div className="h-fit w-full bg-white pb-8">
            <PageHeader/>
            <MenuArea onButtonClick={handleButtonClick}/>
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-5/6 md:w-2/3 mx-auto"
            >
                <CarouselContent>
                    {employees
                        .filter((ft, idx) => clickedButtonId ? ft.job.toLowerCase().includes(clickedButtonId) : true)
                        .map((employee, index) => (
                        <CarouselItem key={index} className="basis-auto">
                                    <EmployeeCard
                                        key={index}
                                        image={employee.image}
                                        status={employee.status}
                                        starNumber={employee.starNumber}
                                        name={employee.name}
                                        job={employee.job}
                                        category={employee.category}
                                        videoNumber={employee.videoNumber}
                                        callNumber={employee.callNumber}
                                        language={employee.language}
                                        skills={employee.skills}
                                        price={employee.price}
                                        showedSkillsNumber={employee.showedSkillsNumber}
                                        apointmentDate={employee.apointmentDate}
                                        commentNumber={employee.commentNumber}
                                        minSessionTime={employee.minSessionTime}
                                    />
                        </CarouselItem>
                    ))}
                    {employees
                        .filter((ft, idx) => clickedButtonId ? ft.job.toLowerCase().includes(clickedButtonId) : true).length <= 0
                    && <CarouselItem key="empty" className="basis-auto">
                            <h1>Empty not found</h1>
                        </CarouselItem> }
                </CarouselContent>

                <CarouselNext className="hidden md:flex"/>
                <CarouselPrevious className="hidden md:flex"/>
            </Carousel>
        </div>
    );
}

export default CardSlider;
