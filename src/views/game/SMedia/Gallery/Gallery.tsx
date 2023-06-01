import tw from 'twin.macro'
import { useState } from 'react'
import { BasicModal, OptimizedImage } from '../../../../components/ui'
import { IGames } from '../../../../interfaces'
import { AiOutlineClose } from 'react-icons/ai'
// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import SwiperCore, { Autoplay, Navigation, Thumbs } from 'swiper'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

interface Props {
  gameScrenshots: IGames
}
export const Gallery = ({ gameScrenshots }: Props) => {
  const [show, setShow] = useState(false)

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null)

  const screnshots = gameScrenshots.attributes.screenshots.data

  const onOpenClose = () => setShow(prevState => !prevState)

  //Clonamos el array
  const screnshotsClone = [...screnshots]
  //sacamos el primer elemento del array
  const pricipalImage = screnshotsClone.shift()
  //Luego screnshotsClone sera modificado teniendo solamente todo menos el primer elemento que tenia

  return (
    <>
      <div tw="grid lg:grid-cols-12 gap-5 grid-rows-2 pt-20 lg:pt-32">
        <div
          onClick={onOpenClose}
          tw="col-span-6 row-span-2 rounded-[20px] overflow-hidden cursor-pointer relative before:(absolute bg-gray-900/20 inset-0 opacity-0 hover:opacity-100 transition duration-300)"
        >
          <OptimizedImage
            src={pricipalImage!.attributes.url}
            alt={pricipalImage!.attributes.name}
            width={500}
            height={500}
            stylesImg={tw`h-full`}
          />
        </div>
        {screnshotsClone.map(screnshot => (
          <div
            key={screnshot.id}
            tw="col-span-3 rounded-[20px] overflow-hidden cursor-pointer relative before:(absolute bg-gray-900/20 inset-0 opacity-0 hover:opacity-100 transition duration-300)"
            onClick={onOpenClose}
          >
            <OptimizedImage
              src={screnshot.attributes.url}
              alt={screnshot.attributes.name}
              width={500}
              height={500}
            />
          </div>
        ))}
      </div>
      <BasicModal
        show={show}
        onClose={onOpenClose}
        styleBasicModal={tw`!w-full h-full !bg-gray-900 !rounded-[0] z-[10]`}
      >
        <div tw="absolute top-7 right-7">
          <AiOutlineClose size={40} tw="cursor-pointer" onClick={onOpenClose} />
        </div>
        <div tw="w-full  h-full overflow-auto max-w-[500px] lg:max-w-[1500px] mx-auto lg:w-[90%]">
          <div tw="flex flex-col justify-center min-h-[calc(100vh - 56px)] gap-[10px]  lg:h-full">
            <div tw="h-[300px] lg:h-[calc(85% - 10px)]">
              <Swiper
                tw="h-full relative"
                autoplay={{
                  delay: 3500,
                  disableOnInteraction: false,
                }}
                grabCursor
                spaceBetween={10}
                thumbs={{
                  swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed
                      ? thumbsSwiper
                      : null,
                }}
                modules={[Navigation, Thumbs, Autoplay]}
              >
                {screnshots.map(screnshot => (
                  <SwiperSlide key={screnshot.id} tw="h-auto">
                    <OptimizedImage
                      alt={screnshot.attributes.name}
                      src={screnshot.attributes.url}
                      width={1920}
                      height={1920}
                      stylesImg={tw`h-full rounded-[20px]`}
                    />
                  </SwiperSlide>
                ))}

                <BtnPrev />
                <BtnNext />
              </Swiper>
            </div>
            <div tw=" h-[100px] lg:h-[calc(15% - 10px) ]">
              <Swiper
                tw="h-full max-w-[750px]"
                grabCursor={true}
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={2}
                breakpoints={{
                  640: {
                    slidesPerView: 3,
                  },
                  768: {
                    slidesPerView: 4,
                  },
                }}
                watchSlidesProgress={true}
                modules={[Navigation, Thumbs]}
              >
                {screnshots.map(screnshot => (
                  <SwiperSlide key={screnshot.id}>
                    <OptimizedImage
                      alt={screnshot.attributes.name}
                      src={screnshot.attributes.url}
                      width={500}
                      height={500}
                      stylesImg={tw`h-full rounded-[20px]`}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </BasicModal>
    </>
  )
}

export const BtnPrev = () => {
  const swiper = useSwiper()
  return (
    <button
      tw="bg-orange-600 w-12 h-12 rounded-full grid place-content-center translate-y-[-50%] hover:bg-orange-600/80 transition duration-300 text-white top-[50%] z-10 absolute left-5"
      onClick={() => swiper.slidePrev()}
    >
      <FaArrowLeft size={20} />
    </button>
  )
}

export const BtnNext = () => {
  const swiper = useSwiper()
  return (
    <button
      tw="bg-orange-600 w-12 h-12 rounded-full grid place-content-center translate-y-[-50%] hover:bg-orange-600/80 transition duration-300 text-white top-[50%] z-10 absolute right-5"
      onClick={() => swiper.slideNext()}
    >
      <FaArrowRight size={20} />
    </button>
  )
}
