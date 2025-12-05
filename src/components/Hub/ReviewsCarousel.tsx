import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './ReviewsCarousel.css';
import { UserReview } from './UserReview';

export function ReviewsCarousel() {
  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      navigation
      autoplay={{ delay: 3500, disableOnInteraction: false }}
      spaceBetween={20}
      slidesPerView={1}
      loop
      className="reviews-carousel"
    >
      <SwiperSlide>
        <UserReview
          userName="Jean-Michel D."
          rating={5}
          date="il y a 2 jours"
          comment="J'avais un problème informatique simple. Maintenant j'ai 5 problèmes existentiels et une crise de foi. Merci Dr. Philoso-Rien ! 10/10"
          verified={true}
        />
      </SwiperSlide>
      <SwiperSlide>
        <UserReview
          userName="Sophie L."
          rating={1}
          date="il y a 1 semaine"
          comment="Service absolument catastrophique. J'ai demandé de l'aide pour mes impôts, on m'a récité des haïkus sur la futilité de la bureaucratie. Paradoxalement, ça m'a aidé à relativiser."
          verified={true}
        />
      </SwiperSlide>
      <SwiperSlide>
        <UserReview
          userName="Marc P."
          rating={4}
          date="il y a 3 semaines"
          comment="Conseillère Contre-Productive a transformé ma vie. Avant je cherchais des solutions, maintenant j'accepte le chaos. Ma productivité a chuté de 80% mais je suis zen."
          verified={true}
        />
      </SwiperSlide>
    </Swiper>
  );
}